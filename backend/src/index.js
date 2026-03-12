require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

// Models
const { User } = require("./models/userdata");
const { Customer } = require("./models/customerdata");
const { Product, Order } = require("./models/order");

// Middleware & Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const verifyToken = require("./middleware/verifyToken");

const app = express();

// --- 1. MIDDLEWARE SETUP ---
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// --- 2. MULTER & STATIC FILES SETUP ---
const uploadPath = path.join(__dirname, "..", "public", "uploads", "profiles");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, uploadPath); },
  filename: (req, file, cb) => { cb(null, `${Date.now()}-${file.originalname}`); }
});
const upload = multer({ storage: storage });

app.use("/", express.static(path.join(__dirname, "..", "public")));

// --- 3. DATABASE CONNECTION ---
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" ✅ Connected Successfully Mongodb");
  } catch (err) {
    console.error(" ❌ Mongodb Connection Error", err.message);
  }
};
connectdb();

// --- 4. AUTH & USER PROFILE APIs ---
app.use("/api/auth", authRoutes);
app.use("/api/profile", userRoutes);

app.put("/api/profile/update-profile", verifyToken, async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = req.userId; 

        if (!userId) return res.status(400).json({ message: "User ID missing" });

        const updateData = { email };
        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            updateData, 
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "Profile updated successfully! ✨" });
    } catch (err) {
        res.status(500).json({ message: "Database Error" });
    }
});

// --- 5. CUSTOMER MANAGEMENT APIs (FIXED DUPLICATE CHECK) ---

app.post("/api/customers", [verifyToken, upload.single('profileImage')], async (req, res) => {
  try {
    const { firstName, lastName, email, number, currency, language } = req.body;

    // Normalize data: remove spaces and lowercase email
    const cleanEmail = email.toLowerCase().trim();
    const cleanContact = number.trim(); // keeps "+91 9876543210", just removes leading/trailing spaces

    // MANUAL DUPLICATE CHECK (Guarantees no direct entry)
    const existing = await Customer.findOne({ 
      $or: [{ email: cleanEmail }, { contact: cleanContact }] 
    });

    if (existing) {
      const field = existing.email === cleanEmail ? "Email" : "Phone number";
      return res.status(400).json({ message: `${field} is already registered.` });
    }

    const newCustomer = new Customer({
      name: `${firstName} ${lastName}`.trim(),
      email: cleanEmail,
      contact: cleanContact,
      currency,
      language,
      profileImage: req.file ? `/uploads/profiles/${req.file.filename}` : null
    });

    await newCustomer.save();
    res.status(201).json({ success: true, message: "Customer added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/customers", verifyToken, async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers" });
  }
});

app.put("/api/customers/:id", [verifyToken, upload.single('profileImage')], async (req, res) => {
  try {
    const { firstName, lastName, email, number, currency, language } = req.body;
    
    const cleanEmail = email.toLowerCase().trim();
    const cleanContact = number.trim();

    const emailDuplicate = await Customer.findOne({ _id: { $ne: req.params.id }, email: cleanEmail });
    const phoneDuplicate = await Customer.findOne({ _id: { $ne: req.params.id }, contact: cleanContact });

    if (emailDuplicate && phoneDuplicate) return res.status(400).json({ message: "Email and Phone number are already registered." });
    if (emailDuplicate) return res.status(400).json({ message: "Email is already registered." });
    if (phoneDuplicate) return res.status(400).json({ message: "Phone number is already registered." });

    const updateData = {
      name: `${firstName} ${lastName}`.trim(),
      email: cleanEmail,
      contact: cleanContact,
      currency,
      language
    };

    if (req.file) {
      updateData.profileImage = `/uploads/profiles/${req.file.filename}`;
    }

    const updated = await Customer.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Customer not found" });
    
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

app.delete("/api/customers/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer" });
  }
});

app.patch("/api/customers/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    await Customer.findByIdAndUpdate(req.params.id, { status: status });
    res.status(200).json({ message: "Status Updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --- 6. USER ADMINISTRATION APIs ---

app.get("/api/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    let userData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(password, salt);
    }
    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// --- 7. PRODUCT & ORDER APIs ---

app.get("/api/Product", async (req, res) => {
  try {
    const { search, category, page = 1 } = req.query;
    const limit = 5; 
    let query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (category && category !== "All") query.category = category;

    const totalCount = await Product.countDocuments(query);
    const products = await Product.find(query).limit(limit).skip((page - 1) * limit);
    res.json({ products, totalPages: Math.ceil(totalCount / limit) });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.get("/api/orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

app.put("/api/orders/:id", verifyToken, async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// --- 8. SERVER START ---
app.get("/", (req, res) => res.send("Backend Server is Live!"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));