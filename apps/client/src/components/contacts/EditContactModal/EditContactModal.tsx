import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

import { useAppDispatch } from "@/redux/hooks";
import { FeedbackSchema } from "@/schemas/validation";
import { updateContact } from "@/redux/contacts";
import { Contact } from "@/types/general";
import { handleKeyPress } from "@/utils";
import { Modal } from "@/components/ui";

interface EditContactModalProps {
  isOpen: boolean;
  contactToEdit: Contact;
  onClose: () => void;
}

export const EditContactModal = ({
  isOpen,
  contactToEdit,
  onClose,
}: EditContactModalProps) => {
  const id = useId();
  const dispatch = useAppDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={{
          username: contactToEdit.name,
          number: contactToEdit.phoneNumber,
          email: contactToEdit.email || "",
          contactType: contactToEdit.contactType,
        }}
        validationSchema={FeedbackSchema}
        onSubmit={(values) => {
          const updatedData = {
            name: values.username.trim(),
            phoneNumber: values.number.trim(),
            email: values.email.trim(),
            contactType: values.contactType,
          };

          dispatch(
            updateContact({ id: contactToEdit._id, contactData: updatedData }),
          )
            .unwrap()
            .then(() => {
              toast.success("Contact updated!");
              onClose();
            })
            .catch(() => toast.error("Failed to update contact"));
        }}
      >
        <Form className="w-[330px] rounded-[28px] bg-[#d9ebee] px-8 py-8">
          <h2 className="mb-4 text-center text-xl font-bold text-[#00242a]">
            Edit Contact
          </h2>

          <label htmlFor={`${id}-n`} className="font-medium text-gray-800">
            Username
          </label>
          <Field
            type="text"
            name="username"
            id={`${id}-n`}
            className="mt-1 h-10 w-full rounded-xl border-none bg-white px-3 outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <div className="min-h-[20px] pt-1">
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
            className="mt-1 h-10 w-full rounded-xl border-none bg-white px-3 outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <div className="min-h-[20px] pt-1">
            <ErrorMessage
              name="number"
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
            className="mt-1 h-10 w-full rounded-xl border-none bg-white px-3 outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <div className="min-h-[20px] pt-1">
            <ErrorMessage
              name="email"
              component="span"
              className="text-[12px] text-red-500"
            />
          </div>

          <label htmlFor={`${id}-ct`} className="font-medium text-gray-800">
            Contact Type
          </label>
          <div className="relative mt-2">
            <Field
              as="select"
              name="contactType"
              id={`${id}-ct`}
              className="h-10 w-full cursor-pointer appearance-none rounded-xl border-none bg-white pl-3 pr-10 font-medium text-gray-800 outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <option value="home">Home</option>
              <option value="personal">Personal</option>
            </Field>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>

          <button
            type="submit"
            className="mt-2 h-[50px] w-full rounded-2xl bg-brand-accent text-[18px] text-[#f5f5f5] hover:bg-[#005e6e]"
          >
            Save Changes
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};
