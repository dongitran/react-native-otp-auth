import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

export const generateOTP = (otp_length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const fast2sms = async ({ message, contactNumber }, next) => {
  try {
    //const res = await fast2sms.sendMessage({
    //  authorization: FAST2SMS,
    //  message,
    //  numbers: [contactNumber],
    //});
    console.log(res);
  } catch (error) {
    next(error);
  }
};

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const verifySid = "VA4a2fca4291a16523cde9b95e957f80c9";
export const requestOtp = async (phoneNumber) => {
  return client.verify.v2
    .services(verifySid)
    .verifications.create({
      to: `+84${phoneNumber.substring(1)}`,
      channel: "sms",
    })
    .then((verification) => {
      console.log(verification, "Request otp");
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const verifyOtp = async (phoneNumber, otpCode) => {
  return client.verify.v2
    .services(verifySid)
    .verificationChecks.create({
      to: `+84${phoneNumber.substring(1)}`,
      code: otpCode,
    })
    .then((verification_check) => {
      console.log(verification_check, "verification_check");
      return verification_check;
    })
    .catch((error) => {
      console.log(error, "Verify otp error");
      return false;
    });
};
