import express from 'express';
import db from '../db.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// ✅ Register a User
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
        [name, email, hashedPassword], 
        (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: "User registered successfully!" });
        }
    );
});

// ✅ Retrieve Users
router.get("/all", (req, res) => {
    db.query("SELECT id, name, email FROM users", (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

// ✅ Delete a User
router.delete("/delete/:id", (req, res) => {
    const userId = req.params.id;
    db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "User deleted successfully!" });
    });
});

export default router;
