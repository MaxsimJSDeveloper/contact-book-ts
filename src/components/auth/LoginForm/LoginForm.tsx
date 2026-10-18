import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import toast from "react-hot-toast";

import { useAppDispatch } from "@/redux/hooks";
import { logIn } from "@/redux/auth";
import { login } from "@/schemas/validation";

interface UserData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useId();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={login}
      onSubmit={(values, actions) => {
        const userData: UserData = {
          email: values.email.trim(),
          password: values.password.trim(),
        };
        dispatch(logIn(userData))
          .unwrap()
          .then(() => {
            toast.success("Success!", { position: "top-center" });
            navigate("/contacts");
          })
          .catch(() => {
            toast.error("Error, input correct data", {
              position: "top-center",
            });
          });
        actions.resetForm();
      }}
    >
      <Form className="mx-auto w-full max-w-[570px] rounded-[28px] bg-[#d9ebee] px-6 py-10 md:px-10">
        <label htmlFor={`${id}-e`} className="font-medium text-gray-800">
          Email
        </label>
        <Field
          type="email"
          name="email"
          id={`${id}-e`}
          autoComplete="email"
          className="mt-2 h-[50px] w-full rounded-xl border-none bg-white px-4 text-gray-800 outline-none focus:ring-2 focus:ring-brand-accent"
        />
        <div className="min-h-[26px] pt-1">
          <ErrorMessage
            name="email"
            component="span"
            className="text-[12px] text-red-500"
          />
        </div>

        <label htmlFor={`${id}-p`} className="font-medium text-gray-800">
          Password
        </label>
        <Field
          type="password"
          name="password"
          id={`${id}-p`}
          autoComplete="current-password"
          className="mt-2 h-[50px] w-full rounded-xl border-none bg-white px-4 text-gray-800 outline-none focus:ring-2 focus:ring-brand-accent"
        />
        <div className="min-h-[26px] pt-1">
          <ErrorMessage
            name="password"
            component="span"
            className="text-[12px] text-red-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 block h-[54px] w-full rounded-2xl bg-brand-accent text-[18px] text-[#f5f5f5] transition-colors hover:bg-[#005e6e]"
        >
          Log In
        </button>
      </Form>
    </Formik>
  );
};
