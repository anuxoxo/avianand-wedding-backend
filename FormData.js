const mongoose = require("mongoose");

// Define formData schema
const formDataSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  numberOfAdults: { type: Number, required: true },
  numberOfKids: { type: Number, required: true },
  foodPreference: { type: String, enum: ["veg", "nonveg"], default: "nonveg" },
  beveragePreference: {
    type: String,
    enum: ["alcoholic", "nonalcoholic"],
    default: "alcoholic",
  },
});

// Create formData model
const FormData = mongoose.model("FormData", formDataSchema);

module.exports = FormData;
