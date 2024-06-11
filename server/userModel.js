const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: Number, required: true },
  profession: {
    type: String,
    enum: ["lawyer", "architect", "doctor", "other"],
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
