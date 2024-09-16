import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "../formStyles/massage.module.css";
import { AppDispatch } from "../../redux/store";
import { regist } from "../../js/validation";

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id = useId();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={regist}
      onSubmit={async (values, actions) => {
        const newUser = {
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password.trim(),
        };

        try {
          console.log(newUser);

          await dispatch(register(newUser)).unwrap();
          toast.success("Registration success!", { position: "top-center" });
          navigate("/login");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Error during registration or login";
          toast.error(errorMessage, {
            position: "top-center",
          });
        }

        actions.resetForm();
      }}
    >
      <Form className={styles.formContainer}>
        <label htmlFor={`${id}-n`}>Name</label>
        <Field
          type="text"
          name="name"
          id={`${id}-n`}
          className={styles.inputField}
          autoComplete="name"
        />
        <div className={styles.wrap}>
          <ErrorMessage
            name="name"
            component="span"
            className={styles.errorMessage}
          />
        </div>

        <label htmlFor={`${id}-e`}>Email</label>
        <Field
          type="email"
          name="email"
          id={`${id}-e`}
          className={styles.inputField}
          autoComplete="email"
        />
        <div className={styles.wrap}>
          <ErrorMessage
            name="email"
            component="span"
            className={styles.errorMessage}
          />
        </div>

        <label htmlFor={`${id}-p`}>Password</label>
        <Field
          type="password"
          name="password"
          id={`${id}-p`}
          className={styles.inputField}
          autoComplete="current-password"
        />
        <div className={styles.wrap}>
          <ErrorMessage
            name="password"
            component="span"
            className={styles.errorMessage}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
