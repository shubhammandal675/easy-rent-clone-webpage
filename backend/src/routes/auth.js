const router = require("express").Router();
const { Login } = require("../models/logindata");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 1. REGISTER (Fixed Path: just "/register")
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new Login({
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Admin Registered Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. LOGIN (Fixed Path + Added JWT & Cookie logic)
router.post("/login", async (req, res) => {
    try {
        const user = await Login.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Wrong password!" });

        // --- INDUSTRIAL JWT STEP ---
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        // --- SETTING THE COOKIE ---
        res.cookie("token", token, {
            httpOnly: true,     // JS cannot access this (Secure!)
            secure: false,      // Set to true when you deploy with HTTPS
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        }).status(200).json({ 
            message: "Logged in successfully!",
            user: { email: user.email } 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. LOGOUT
router.post("/logout", (req, res) => {
    res.clearCookie("token").json({ message: "Logged out successfully" });
});

module.exports = router;