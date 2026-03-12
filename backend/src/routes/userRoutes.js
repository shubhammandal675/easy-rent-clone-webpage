const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { LoginUser } = require("../models/logindata");
const { Customer } = require("../models/customerdata");
const verifyToken = require("../middleware/verifyToken");

// --- ADD CUSTOMER ROUTE ---
// --- ADD CUSTOMER ROUTE (FIXED) ---
router.post("/", async (req, res) => { 
    try {
        const { email, number, contact } = req.body;

        // 1. Data Cleaning: Spaces remove karein (Unique matching ke liye)
        // Aapke schema mein field 'contact' hai, isliye number ya contact dono check karein
        const phoneToCheck = (contact || number || "").trim();
        const emailToCheck = (email || "").toLowerCase().trim();

        // 2. MANUAL CHECK: Database mein search karein save karne se pehle
        const existing = await Customer.findOne({ 
            $or: [
                { email: emailToCheck }, 
                { contact: phoneToCheck }
            ] 
        });

        if (existing) {
            const isEmail = existing.email === emailToCheck;
            return res.status(400).json({ 
                message: `${isEmail ? 'Email' : 'Phone number'} is already registered. Please use a unique one.` 
            });
        }

        // 3. Agar duplicate nahi mila, tab save karein
        const newCustomer = new Customer({
            ...req.body,
            email: emailToCheck,
            contact: phoneToCheck
        });

        await newCustomer.save();
        res.status(201).json({ message: "Customer added successfully! 🎉" });

    } catch (err) {
        console.error("Save Error:", err);
        // Backup duplicate check (Mongoose Index)
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email or Phone already exists." });
        }
        res.status(500).json({ message: "Failed to add customer" });
    }
});

// --- UPDATE PROFILE ROUTE ---
router.put("/update-profile", verifyToken, async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = req.userId; 

        const updateData = { email };

        // Only hash if a new password is provided
        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await LoginUser.findByIdAndUpdate(
            userId, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            message: "Profile updated successfully! ✨",
            user: { email: updatedUser.email } 
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "This email is already in use." });
        }
        res.status(500).json({ message: "Server error during update" });
    }
});

module.exports = router;