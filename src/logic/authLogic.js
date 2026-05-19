import { error_msg_register } from "@/src/constants/auth/error_msg";

// Validates registration fields before sign up
// Throws an error with the corresponding message if validation fails
export const validateRegisterFields = ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  if (!email || !password || !username) {
    throw new Error(error_msg_register.required_fields);
  }

  if (password !== confirmPassword) {
    throw new Error(error_msg_register.password_mismatch);
  }

  if (password.length < 6) {
    throw new Error(error_msg_register.weak_password);
  }

  if (username.length < 3) {
    throw new Error(error_msg_register.invalid_username);
  }
};
