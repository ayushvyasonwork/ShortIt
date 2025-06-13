import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register=async (req, res) => {
  const { username, password ,confirmPassword} = req.body;
  try {
    if(!username || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if(password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: "Username taken" });

    const newUser = new User({ username, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: newUser._id, username } });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
}

const login=async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, username } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
}
export { register, login };