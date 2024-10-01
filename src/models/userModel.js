//Terminado
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  birthDate: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hasDriverLicense: {
    type: Boolean,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  joinedRoutes: [{
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    distance: { type: Number, required: true },
    initStep: {type: Number, required: true},
    endStep: {type: Number, required: true},
    modified: { type: Boolean, default: false },
    createdBy: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now },
  }],
  
})

const userModel = mongoose.model("User", userSchema, "user");

module.exports = userModel;