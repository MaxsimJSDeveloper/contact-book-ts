import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import { useAppDispatch } from "@/redux/hooks";
import { FeedbackSchema } from "@/schemas/validation";
import { addContact } from "@/redux/contacts";
import { handleKeyPress } from "@/utils";

import styles from "@/styles/massage.module.css";
import css from "./AddContactModalContent.module.css";

export const AddContactModalContent = () => {
  const id = useId();

  const dispatch = useAppDispatch();

  return (
    <>
      <Formik
        initialValues={{ username: "", number: "" }}
        validationSchema={FeedbackSchema}
        onSubmit={(values, actions) => {
          const newContact = {
            name: values.username.trim(),
            phoneNumber: values.number.trim(),
            contactType: "home",
          };

          dispatch(addContact(newContact))
            .unwrap()
            .then(() => {
              toast.success("Successfully add!", { position: "top-center" });
            })
            .catch(() => {
              toast.error("Error, input correct data", {
                position: "top-center",
              });
            });
          actions.resetForm();
        }}
      >
        <Form className={css.formContainer}>
          <label htmlFor={`${id}-n`}>Username</label>
          <Field
            type="text"
            name="username"
            id={`${id}-n`}
            className={css.inputField}
          />
          <div className={styles.wrap}>
            <ErrorMessage
              name="username"
              component="span"
              className={styles.errorMessage}
            />
          </div>

          <label htmlFor={`${id}-p`}>Phone</label>
          <Field
            type="text"
            pattern="\d*"
            onKeyPress={handleKeyPress}
            name="number"
            id={`${id}-p`}
            className={css.inputField}
          />
          <div className={styles.wrap}>
            <ErrorMessage
              name="number"
              component="span"
              className={styles.errorMessage}
            />
          </div>

          <button onClick={close} type="submit" className={css.submitButton}>
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
};

