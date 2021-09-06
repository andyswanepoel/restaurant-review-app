const mongoose = require("mongoose");

// Set Schema of the model
const restaurantSchema = new mongoose.Schema({
  restaurant: { type: String, default: null },
  address: {
    street: { type: String, default: null },
    city: { type: String, default: null }
  },
  cuisines: [String],
  rating: { type: Number, min: 0, max: 10 },
  reviewer: { type: String, default: null }
});

// Transform the returned schema for use in our code
restaurantSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
