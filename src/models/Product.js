import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: [true, "el campo name es obligatorio"] },

    description: {
      type: String,
      required: [true, "el campo description es obligatorio"],
    },

    rate: {
      type: Number,
      min: [0, "el rate debe llevar un valor entre 0 y 5"],
      max: [5, "el rate debe llevar un valor entre 0 y 5"],
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "el campo price es obligatorio"],
    },

    stock: {
      type: Number,
      default: 0,
    },

    user: { type: Schema.Types.ObjectId, ref: "user" },

    imgUrl: {
      type: String,
      default: null,
    },

    public_id: String,
  },
  { timestamps: true }
);

productSchema.methods.setImg = function setImg({ secure_url, public_id }) {
  this.imgUrl = secure_url;
  this.public_id = public_id;
};

export const productModel = model("product", productSchema);
