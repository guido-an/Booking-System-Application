const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  password: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", adminSchema);

module.exports = User;