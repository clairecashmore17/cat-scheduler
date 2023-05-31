const mongoose = require("mongoose");

const { Schema } = mongoose;

const petSchema = new Schema({
  pet_name: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
