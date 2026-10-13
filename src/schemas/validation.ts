import * as Yup from "yup";

export const regist = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(14, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

export const login = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

export const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(14, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .required("Required"),
});
