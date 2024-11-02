import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required.")
    .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed.")
    .min(2, "Name must be 2 and 16 characters.")
    .max(20, "Name must be 2 and 16 characters."),
  email: Yup.string()
    .required("Email address is required.")
    .email("Invalid email address"),
  status: Yup.string().max(64, "Status must be less than 64 characters"),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain alteast 6 characters long, 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
});
