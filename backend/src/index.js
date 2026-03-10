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
// Moves up from 'src' to find the root 'public' folder
const uploadPath = path.join(__dirname, "..", "public", "uploads", "profiles");

// Ensure upload directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, uploadPath); },
  filename: (req, file, cb) => { cb(null, `${Date.now()}-${file.originalname}`); }
});
const upload = multer({ storage: storage });


// Serve static files from the root public folder
app.use("/", express.static(path.join(__dirname, "..", "public")));

// --- 3. DATABASE CONNECTION ---
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" ✅ Connected Successfully Mongodb via .env");
  } catch (err) {
    console.error(" ❌ Mongodb Connection Error", err.message);
  }
};
connectdb();

// --- 4. AUTH & USER PROFILE APIs ---

// Use external route files
app.use("/api/auth", authRoutes);
app.use("/api/profile", userRoutes);

// Update logged-in user's email or password
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

// --- 5. CUSTOMER MANAGEMENT APIs ---

// Create a new customer with profile image upload
app.post("/api/customers", [verifyToken, upload.single('profileImage')], async (req, res) => {
  try {
    const { firstName, lastName, email, number, currency, language } = req.body;
    const imagePath = req.file ? `/uploads/profiles/${req.file.filename}` : null;

    const newCustomer = new Customer({
      name: `${firstName} ${lastName}`.trim(),
      email,
      contact: number,
      currency,
      language,
      profileImage: imagePath
    });

    await newCustomer.save();
    res.status(201).json({ success: true, data: newCustomer });
  } catch (err) {
    res.status(400).json({ message: "Error adding customer", error: err.message });
  }
});

// Fetch all customers sorted by newest first
app.get("/api/customers", verifyToken, async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers" });
  }
});

// DELETE Customer
app.delete("/api/customers/:id", verifyToken, async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PATCH Status Toggle
app.patch("/api/customers/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    await Customer.findByIdAndUpdate(req.params.id, { status: status });
    res.status(200).json({ message: "Status Updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Customer API
app.put("/api/customers/:id", [verifyToken, upload.single('profileImage')], async (req, res) => {
  try {
    const { firstName, lastName, email, number, currency, language } = req.body;
    
    const updateData = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      contact: number,
      currency,
      language
    };

    // If a new file was uploaded, update the image path
    if (req.file) {
      updateData.profileImage = `/uploads/profiles/${req.file.filename}`;
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );

    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});


// Delete a customer by ID
app.delete("/api/customers/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer" });
  }
});

// --- 6. USER ADMINISTRATION APIs ---

// Get list of all registered users
app.get("/api/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Manually add a new user with password hashing
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

// Delete a user from the administration table
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Update user details and hash password if updated
app.put("/api/users/:id", async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// --- 7. PRODUCT & ORDER APIs ---

// Fetch products with search, category filter, and pagination
app.get("/api/Product", async (req, res) => {
  try {
    const { search, category, page = 1 } = req.query;
    const limit = 5; 
    const skip = (page - 1) * limit;
    let query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (category && category !== "All") query.category = category;

    const totalCount = await Product.countDocuments(query);
    const products = await Product.find(query).limit(limit).skip(skip);
    res.json({ products, totalPages: Math.ceil(totalCount / limit) });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Fetch all orders for the dashboard
app.get("/api/orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Update order status
app.put("/api/orders/:id", verifyToken, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updateOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(updateOrder);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// --- 8. SERVER START ---
app.get("/", (req, res) => res.send("Backend Server is Live!"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));