const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],

  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
});



module.exports = model("Order", orderSchema);
