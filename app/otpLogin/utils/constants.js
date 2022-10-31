export const TimeOtp = 120; // seconds

export const Paths = {
  REGISTER: '/auth/register',
  CONFIRM_REGISTER: '/auth/verify-register',
  LOGIN_TOKEN: '/auth/login-token',
  VERIFY_OTP: '/auth/verify_otp',
};

export const RegisterConfirmStatusResponse = {
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
  INVALID_PHONE_NUMBER: 'invalid_phone_number',
  PHONE_NUMBER_ALREADY_EXISTS: 'phone_number_already_exists',
  INCORRECT_OTP: 'incorrect_otp',
};

export const RegisterStatusResponse = {
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
  INVALID_PHONE_NUMBER: 'invalid_phone_number',
  PHONE_NUMBER_ALREADY_EXISTS: 'phone_number_already_exists',
};

export const LoginTokenStatusResponse = {
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
};
