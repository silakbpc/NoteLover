const mongoose = require("mongoose");

const noteTypeSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    unique: true
  }
}
);

module.exports = mongoose.model("NoteType", noteTypeSchema);
