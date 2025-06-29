const express = require("express");
const router = express.Router();
const NoteType = require("../models/NoteTypes");

router.get("/", async (req, res) => {
  try {
    const types = await NoteType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
