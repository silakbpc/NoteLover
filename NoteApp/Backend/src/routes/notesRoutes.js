const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");

router.post("/", async (req, res) => {
  const { title, content, type, userId } = req.body;

  try {
    const newNote = new Note({ title, content, type, userId });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:noteId", async (req, res) => {
  const { title, content, type } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.noteId,
      { title, content, type },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:noteId", async (req, res) => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
      if (!deletedNote) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json({ message: "Note deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
