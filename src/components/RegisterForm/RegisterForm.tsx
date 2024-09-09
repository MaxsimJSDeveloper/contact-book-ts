import { useDispatch } from "react-redux";
import { logIn, register } from "../../redux/auth/operations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Хук для редіректу
import styles from "../formStyles/massage.module.css";
import { AppDispatch } from "../../redux/store";
import { regist } from "../../js/validation";

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id = useId();
  const navigate = useNavigate(); // Ініціалізація навігації

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
          // Викликаємо реєстрацію
          await dispatch(register(newUser)).unwrap();
          toast.success("Registration success!", { position: "top-center" });

          // Після успішної реєстрації логінимося
          const loginedUser = {
            email: values.email.trim(),
            password: values.password.trim(),
          };
          await dispatch(logIn(loginedUser)).unwrap();
          toast.success("Login success!", { position: "top-center" });

          // Редірект на сторінку контактів
          navigate("/contacts");
        } catch (error) {
          toast.error("Error during registration or login", {
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
