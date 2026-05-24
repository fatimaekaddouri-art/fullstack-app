const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nom:        { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);