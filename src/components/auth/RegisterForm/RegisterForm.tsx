import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import toast from "react-hot-toast";

import { useAppDispatch } from "@/redux/hooks";
import { register } from "@/redux/auth";
import { registration } from "@/schemas/validation";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useId();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={registration}
      onSubmit={async (values, actions) => {
        const newUser = {
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password.trim(),
        };

        try {
          await dispatch(register(newUser)).unwrap();
          toast.success("Registration success!", { position: "top-center" });
          navigate("/login");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Error during registration";
          toast.error(errorMessage, { position: "top-center" });
        }
        actions.resetForm();
      }}
    >
      <Form className="mx-auto w-full max-w-[570px] rounded-[28px] bg-[#d9ebee] px-6 py-10 md:px-10">
        <label htmlFor={`${id}-n`} className="font-medium text-gray-800">
          Name
        </label>
        <Field
          type="text"
          name="name"
          id={`${id}-n`}
          autoComplete="name"
          className="mt-2 h-[50px] w-full rounded-xl border-none bg-white px-4 text-gray-800 outline-none focus:ring-2 focus:ring-brand-accent"
        />
        <div className="min-h-[26px] pt-1">
          <ErrorMessage
            name="name"
            component="span"
            className="text-[12px] text-red-500"
          />
        </div>

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
          Register
        </button>
      </Form>
    </Formik>
  );
};
