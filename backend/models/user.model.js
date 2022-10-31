
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,

    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },


    phoneOtp: String


  },
  { timestamps: true }
);

export default model("User", userSchema);