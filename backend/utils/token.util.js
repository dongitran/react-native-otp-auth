import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
  return token;
};

export const verifyJwtToken = (token) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  } catch (err) {
    console.log(err, "verify jwt token error");
    return false;
  }
};

//console.log(
//  verifyJwtToken(
//    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzVkNjgzZTg1N2ZjMmQwZmQxNjc1NmMiLCJpYXQiOjE2NjcwNjU5MTgsImV4cCI6MTY2NzEwOTExOH0.cdSikZQXsMluobcs4upCeaInbozJGV8VNiT4cLiDQeQ",
//    () => {
//      console.log("err");
//    }
//  ),
//  "test"
//);
