const mongoose = require("mongoose");

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  pet: {
    type: Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
