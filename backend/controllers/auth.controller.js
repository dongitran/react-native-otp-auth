import User from "../models/user.model.js";

import {
  PHONE_NOT_FOUND_ERR,
  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
  RegisterStatusResponse,
  RegisterMessageResponse,
  RegisterConfirmStatusResponse,
  RegisterConfirmMessageResponse,
  VerifyOtpResponseStatus,
  LoginTokenStatusResponse,
} from "../utils/constant.js";

import { checkPassword, hashPassword } from "../utils/password.util.js";
import { createJwtToken, verifyJwtToken } from "../utils/token.util.js";
import {
  generateOTP,
  fast2sms,
  requestOtp,
  verifyOtp,
} from "../utils/otp.util.js";

// --------------------- create new user ---------------------------------

export const checkUser = async (req, res) => {
  try {
    let { phoneNumber, name } = req.body;

    // check duplicate phone Number
    const phoneExist = await User.findOne({ phoneNumber: phoneNumber });
    console.log(phoneExist, "phoneExist");
    //if (phoneExist) {
    //  res.status(200).json({
    //    status: RegisterStatusResponse.PHONE_NUMBER_ALREADY_EXISTS,
    //    message: RegisterMessageResponse.PHONE_NUMBER_ALREADY_EXISTS,
    //    //data: {
    //    //  userId: userCreateLog._id,
    //    //},
    //  });
    //  return;
    //}

    // TODO: create log create user and send _id to client

    /**
     // create new user
    const createUser = new User({
      phoneNumber,
      name,
      role: "USER"
    });

    // save user
    const user = await createUser.save();
     */

    // send otp to phoneNumber number
    try {
      await requestOtp(phoneNumber);
    } catch (error) {
      console.log(error, "request otp error");
      res.status(200).json({
        type: "failed",
        message: "",
        //data: {
        //  userId: userCreateLog._id,
        //},
      });
      return;
    }

    res.status(200).json({
      type: "success",
      message: "Account created OTP sended to mobile number",
      //data: {
      //  userId: userCreateLog._id,
      //},
    });
  } catch (error) {
    console.log(error, "checkUser error");
    res.status(200).json({
      status: RegisterStatusResponse.FAILED,
    });
  }
};

// ---------------------- confirm otp -> create new user -------------------------
export const confirmCreateUser = async (req, res) => {
  try {
    const { otp, phoneNumber } = req.body;

    // TODO: verify phone number and otp

    // TODO: get log create user with _id and validate confirm

    // Verify otp
    const verifyOtpResult = await verifyOtp(phoneNumber, otp);
    console.log("123123123");
    if (verifyOtpResult?.status !== VerifyOtpResponseStatus.APPROVED) {
      res.status(400).json({
        status: RegisterConfirmStatusResponse.INCORRECT_OTP,
        message: RegisterConfirmMessageResponse.INCORRECT_OTP,
      });
      return;
    }

    // Check user exist
    let user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      // create new user
      const createUser = new User({
        phoneNumber,
        role: "USER",
      });

      // save user
      user = await createUser.save();
    }

    // Validate token
    const token = await createJwtToken({ userId: user._id });
    console.log(token, "token created");

    res.status(201).json({
      status: RegisterConfirmStatusResponse.SUCCESSFUL,
      message: RegisterConfirmMessageResponse.SUCCESSFUL,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------- verify token -------------------------
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token, "token");

    if (!token || token.length === 0) {
      res.status(200).json({
        status: LoginTokenStatusResponse.INVALID_TOKEN,
      });
      return;
    }

    const userId = verifyJwtToken(token);
    console.log(userId, "userId");

    // Get user
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        status: LoginTokenStatusResponse.FAILED,
      });
      return;
    }

    delete user._id;
    console.log(user, "user");

    res.status(201).json({
      status: LoginTokenStatusResponse.SUCCESSFUL,
      user,
    });
  } catch (error) {
    console.log(error, "verfiy token error");
    res.status(400).json({
      status: LoginTokenStatusResponse.FAILED,
    });
  }
};

// ------------ login with phoneNumber otp ----------------------------------
export const loginWithPhoneOtp = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      next({ status: 400, message: PHONE_NOT_FOUND_ERR });
      return;
    }

    res.status(201).json({
      type: "success",
      message: "OTP sended to your registered phoneNumber number",
      data: {
        userId: user._id,
      },
    });

    // generate otp
    const otp = generateOTP(6);
    // save otp to user collection
    user.phoneOtp = otp;
    user.isAccountVerified = true;
    await user.save();
    // send otp to phoneNumber number
    await fast2sms(
      {
        message: `Your OTP is ${otp}`,
        contactNumber: user.phoneNumber,
      },
      next
    );
  } catch (error) {
    next(error);
  }
};

// ---------------------- verify phoneNumber otp -------------------------
export const verifyPhoneOtp = async (req, res, next) => {
  try {
    const { otp, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      next({ status: 400, message: USER_NOT_FOUND_ERR });
      return;
    }

    if (user.phoneOtp !== otp) {
      next({ status: 400, message: INCORRECT_OTP_ERR });
      return;
    }
    const token = createJwtToken({ userId: user._id });

    user.phoneOtp = "";
    await user.save();

    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: {
        token,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------- fetch current user -------------------------

export const fetchCurrentUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------- admin access only -------------------------

export const handleAdmin = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "Okay you are admin!!",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
