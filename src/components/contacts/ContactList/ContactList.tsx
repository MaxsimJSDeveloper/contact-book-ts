// import { useState } from "react";
// import ModalDelete from "../ModalDelete/ModalDelete";
// import { selectFilteredContacts } from "../../redux/contacts/slice";

import { useSelector } from "react-redux";

import { selectError, selectIsLoading } from "@/redux/contacts";
import { Contact } from "@/types/general";

import { ContactItem } from "@/components/contacts";
import { Loader } from "@/components/ui";

import css from "./ContactList.module.css";

interface ContactListProps {
  contacts: Contact[];
}

export const ContactList = ({ contacts }: ContactListProps) => {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedContactId, setSelectedContactId] = useState(null);

  // console.log(contacts);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // const openModalDelete = (id) => {
  //   setSelectedContactId(id);
  //   setModalOpen(true);
  // };

  // const closeModalDelete = () => {
  //   setSelectedContactId(null);
  //   setModalOpen(false);
  // };

  return (
    <div className={css.wrap}>
      {isLoading && !error && <Loader />}
      {contacts.length > 0 ? (
        <ul className={css.contactList}>
          {contacts.map((contact) => (
            <li key={contact._id} className={css.contactItem}>
              {/* <Contact contact={contact} modalOpenDelete={openModalDelete} /> */}
              <ContactItem contactInfo={contact} />
            </li>
          ))}
        </ul>
      ) : (
        <h1 className={css.title}>
          Let&apos;s add more contacts to t=he list!
        </h1>
      )}
      {/* <ModalDelete
        open={modalOpen}
        close={closeModalDelete}
        id={selectedContactId}
      /> */}
    </div>
  );
};
