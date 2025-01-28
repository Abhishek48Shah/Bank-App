import * as yup from "yup";
export const SignUpValidation = yup.object({
  userName: yup
    .string()
    .required("User name is required")
    .min(4, "User name must be at least 4 characters"),
  password: yup
    .string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  phoneNumber: yup
    .number()
    .min(1000000000, "Phone number at least 10 digits")
    .max(9999999999, "Phone number at least 10 digits"),
  date: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .min(new Date(1900, 0, 1), "Date of birth cannot be earlier than 1900"),
  address: yup.string().required("Address is required"),
});
//
//
//
//
export const LoginValidation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .min(8, "Password must be at least 8 characters long"),
});
