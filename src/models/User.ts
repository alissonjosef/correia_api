import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Nome do usuario é um campo obrigatório"],
    },
    password: {
        type: String,
        required: [true, "Senha do usuario é um campo obrigatório"],
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      createAt: {
        type: Date,
        default: Date.now,
      },
  },
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
