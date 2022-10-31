import express from 'express';
//const checkAuth = require("../middlewares/checkAuth");
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  verifyOTP,
  handleAdmin
} from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/register", registerUser);

//router.post("/login_with_phone", loginUser);
//
//
//router.post("/verify", verifyOTP);
//
//router.get("/me", checkAuth, fetchCurrentUser);
console.log(router, 'routerrouter')
export default router;