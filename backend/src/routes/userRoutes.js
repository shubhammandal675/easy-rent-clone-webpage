const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { LoginUser } = require("../models/logindata");
const verifyToken = require("../middleware/verifyToken");

router.put("/update-profile", verifyToken, async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = req.userId; 

        console.log("Attempting update for User ID:", userId);

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

        // --- CRITICAL FIX: Check if user exists before accessing .email ---
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found in database" });
        }

        res.status(200).json({ 
            message: "Profile updated successfully! ✨",
            user: { email: updatedUser.email } 
        });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ message: "Server error during update" });
    }
});

module.exports = router;