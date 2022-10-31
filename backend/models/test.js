import mongoose from "mongoose";

const Schema = mongoose.Schema;

let employee = new Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    location: {
      type: String
    }
  },
  { collection: "Employees" }
);
export default mongoose.model("Employee", employee);