const mongoose = require("mongoose");
const Note = require("./Notes");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()._id;
  await Note.deleteMany({ userId });
  next();
});

module.exports = mongoose.model("User", userSchema);
