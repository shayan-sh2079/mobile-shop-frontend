import { z } from "zod";
import { PASS_RGX, EMAIL_RGX } from "@/common/constants/general";

const EMAIL_ERR = "Email format is wrong";
export const REQUIRED_ERR = "This field is required";
const PASS_LENGTH_ERR = "Password must contain 8 to 20 characters";
const PASS_FORMAT_ERR =
  "Password must contain at least one special character, one digit, one upper case and one lower case letter";
export const REPEAT_PASS_ERR = "Passwords don't match";

export const requiredFieldValidation = z
  .string({
    // eslint-disable-next-line camelcase
    required_error: REQUIRED_ERR,
  })
  .min(1, REQUIRED_ERR);
export const emailValidation = requiredFieldValidation.regex(
  EMAIL_RGX,
  EMAIL_ERR,
);
export const passValidation = requiredFieldValidation
  .min(8, PASS_LENGTH_ERR)
  .max(20, PASS_LENGTH_ERR)
  .regex(PASS_RGX, PASS_FORMAT_ERR);
