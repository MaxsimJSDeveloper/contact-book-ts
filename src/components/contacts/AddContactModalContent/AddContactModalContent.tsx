import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import { useAppDispatch } from "@/redux/hooks";
import { FeedbackSchema } from "@/schemas/validation";
import { addContact } from "@/redux/contacts";
import { handleKeyPress } from "@/utils";
import { NewContact, ContactType } from "@/types/general";

interface AddContactModalContentProps {
  handleClose?: () => void;
}

export const AddContactModalContent = ({
  handleClose,
}: AddContactModalContentProps) => {
  const id = useId();
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        username: "",
        number: "",
        contactType: "home" as ContactType,
      }}
      validationSchema={FeedbackSchema}
      onSubmit={(values, actions) => {
        const newContact: NewContact = {
          name: values.username.trim(),
          phoneNumber: values.number.trim(),
          contactType: values.contactType,
        };

        dispatch(addContact(newContact))
          .unwrap()
          .then(() => {
            toast.success("Successfully added!", { position: "top-center" });
            handleClose?.();
            actions.resetForm();
          })
          .catch((err) => {
            console.error("Add contact error:", err);
            toast.error("Error, input correct data", {
              position: "top-center",
            });
          });
      }}
    >
      <Form className="w-[330px] rounded-[28px] bg-[#d9ebee] px-8 py-10">
        <label htmlFor={`${id}-n`} className="font-medium text-gray-800">
          Username
        </label>
        <Field
          type="text"
          name="username"
          id={`${id}-n`}
          className="mt-2 h-10 w-full rounded-xl border-none bg-white px-3 text-gray-800 outline-none focus:ring-2 focus:ring-brand-accent"
        />
        <div className="min-h-[26px] pt-1">
          <ErrorMessage
            name="username"
            component="span"
            className="text-[12px] text-red-500"
          />
        </div>

        <label htmlFor={`${id}-p`} className="font-medium text-gray-800">
          Phone
        </label>
        <Field
          type="text"
          pattern="\d*"
          onKeyPress={handleKeyPress}
          name="number"
          id={`${id}-p`}
          className="mt-2 h-10 w-full rounded-xl border-none bg-white px-3 text-gray-800 outline-none focus:ring-2 focus:ring-brand-accent"
        />
        <div className="min-h-[26px] pt-1">
          <ErrorMessage
            name="number"
            component="span"
            className="text-[12px] text-red-500"
          />
        </div>

        <label htmlFor={`${id}-ct`} className="font-medium text-gray-800">
          Contact Type
        </label>
        <Field
          as="select"
          name="contactType"
          id={`${id}-ct`}
          className="mt-2 h-10 w-full cursor-pointer rounded-xl border-none bg-white px-3 text-gray-800 outline-none focus:ring-2 focus:ring-brand-accent"
        >
          <option value="home">Home</option>
          <option value="personal">Personal</option>
        </Field>
        <div className="min-h-[20px]" />

        <button
          type="submit"
          className="mt-2 h-[54px] w-full rounded-2xl bg-brand-accent text-[18px] text-[#f5f5f5] transition-colors hover:bg-[#005e6e]"
        >
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
