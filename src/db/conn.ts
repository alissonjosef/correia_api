import mongoose from "mongoose";

export async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://outlet2023:${process.env.MONGODB_SENHA}@cluster0.1tnnp01.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("connect DB 🚨");
  } catch (error) {
    console.log("🚀 ~ file: conn.ts:7 ~ main ~ error:", error);
  }
}
