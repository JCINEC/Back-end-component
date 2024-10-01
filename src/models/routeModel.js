const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  steps: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  initialLocationId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true
  }
})

const routeModel = mongoose.model("Route", routeSchema, "route");

module.exports = routeModel;