import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Email do usuario é um campo obrigatório"],
  },
  password: {
    type: String,
    required: [true, "Senha do usuario é um campo obrigatório"],
  },
  imgAvatar: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Nome do usuario é um campo obrigatório"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
