require("dotenv").config(); // 1. THIS IS THE MAIN FIX
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { User } = require("./models/userdata");
const { Product ,Order } = require("./models/order");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes"); 
const bcrypt = require("bcryptjs");

// Import the security middleware you created
const verifyToken = require("./middleware/verifyToken");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3001", // Your Frontend URL
  credentials: true,                // ALLOW COOKIES TO PASS
}));
app.use(express.json()); // Allows the server to read JSON
app.use(cookieParser()); // REQUIRED to read the JWT from cookies



// Put this right after your middlewares in index.js
app.put("/api/profile/update-profile", verifyToken, async (req, res) => {
    console.log("ROUTE HIT SUCCESSFULLY!"); // If you don't see this in terminal, request isn't reaching here
    res.json({ message: "Route is alive!" });
});


// --- Auth Routes ---
app.use("/api/auth", authRoutes);

// Use the routes
app.use("/api/profile", userRoutes);

// Use the URI from .env
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" ✅ Connnected Successfully Mongodb via.env");
  } catch (err) {
    console.error(" ❌ Mongodb Connection Error", err.message);
  }
};
connectdb();

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Server is Live on Port 5000!");
});

// 1. READ (Fetch all users) - Protected with verifyToken
app.get("/api/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// 2. ADD (create new users with Hashing)
app.post("/api/users", async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    let userData = { ...otherData };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(password, salt); // Hash before saving
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE (Remove user from table)
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

// 4. UPDATE (General User Edit with Hashing)
app.put("/api/users/:id", async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    
    // If a new password was provided, hash it
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }, 
    );
    
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});



// FETCH PRODUCTS
app.get("/api/Product", async (req, res) => {
  try {
    const { search, category, page = 1 } = req.query;
    const limit = 5; 
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category && category !== "All") {
      query.category = category;
    }

    const totalCount = await Product.countDocuments(query);
    const products = await Product.find(query).limit(limit).skip(skip);

    res.json({
      products,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error("Search Error:", err.message);
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// UPDATE ORDER STATUS - Protected with verifyToken
app.put("/api/orders/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true, runValidators: true }
    );
    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updateOrder);
  } catch (err) {
    res.status(400).json({ message: "Invalid status Update", error: err.message });
  }
});

// FETCH ALL ORDERS - Protected with verifyToken
app.get("/api/orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
});


app.put("/api/profile/update-profile", verifyToken, async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = req.userId; 

        if (!userId) {
            return res.status(400).json({ message: "User ID missing from token" });
        }

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

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully! ✨" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database Error" });
    }
});



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});