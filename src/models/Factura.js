import mongoose from "mongoose";
const { Schema, model } = mongoose;

const facturaSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: [true, "el campo product es obligatorio"],
    },
    quantity: {
      type: Number,
      required: [true, "el campo quantity es obligatorio"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const facturaModel = model("factura", facturaSchema);
