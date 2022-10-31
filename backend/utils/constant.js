export const RegisterStatusResponse = {
  SUCCESSFUL: "successful",
  FAILED: "failed",
  INVALID_PHONE_NUMBER: "invalid_phone_number",
  PHONE_NUMBER_ALREADY_EXISTS: "phone_number_already_exists",
};

export const RegisterMessageResponse = {
    SUCCESSFUL: "successful",
    FAILED: "failed",
    INVALID_PHONE_NUMBER: "Số điện thoại không hợp lệ",
    PHONE_NUMBER_ALREADY_EXISTS: "Số điện thoại đã tồn tại",
  };

export const RegisterConfirmStatusResponse = {
  SUCCESSFUL: "successful",
  FAILED: "failed",
  INVALID_PHONE_NUMBER: "invalid_phone_number",
  PHONE_NUMBER_ALREADY_EXISTS: "phone_number_already_exists",
  INCORRECT_OTP: "incorrect_otp",
};

export const RegisterConfirmMessageResponse = {
  SUCCESSFUL: "successful", // App does not use this message
  FAILED: "failed", // App does not use this message
  INVALID_PHONE_NUMBER: "Số điện thoại không hợp lệ",
  PHONE_NUMBER_ALREADY_EXISTS: "Số điện thoại đã tồn tại",
  INCORRECT_OTP: "Sai otp, vui lòng nhập lại",
};

export const API_ENDPOINT_NOT_FOUND_ERR = "Api endpoint does not found";

export const SERVER_ERR = "Something went wrong";

export const AUTH_HEADER_MISSING_ERR = "auth header is missing";

export const AUTH_TOKEN_MISSING_ERR = "auth token is missing";

export const JWT_DECODE_ERR = "incorrect token";

export const USER_NOT_FOUND_ERR = "User not found";

export const ACCESS_DENIED_ERR = "Access deny for normal user";

export const INCORRECT_OTP_ERR = "Incorrect OTP";

export const PHONE_ALREADY_EXISTS_ERR = "Phone number already exists";

export const PHONE_NOT_FOUND_ERR = "Phone number not found";

export const Url = {
  REGISTER: "/auth/register",
  CONFIRM_REGISTER: "/auth/verify-register",
  LOGIN_TOKEN: '/auth/login-token',
  VERIFY_OTP: "/auth/verify_otp",
};

export const VerifyOtpResponseStatus = {
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const LoginTokenStatusResponse = {
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
};