const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Note = require("../models/Notes"); 

router.post("/", async (req, res) => {
  const { username } = req.body;

  try {
    const user = new User({ username });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    await Note.deleteMany({ userId: req.params.id });

    res.json({ message: "Kullanıcı ve ilişkili notlar silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
