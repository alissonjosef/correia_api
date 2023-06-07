import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    modelos: {
      type: String,
      required: [true, " Campo obrigatório"],
      enum: ["SAIA", "CAMISAS", "SHORT", "CINTO", "SANDALIA", "BOLSA" ]
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
