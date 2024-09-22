// import { useState } from "react";
import { useSelector } from "react-redux";

// import ModalDelete from "../ModalDelete/ModalDelete";
import css from "./ContactList.module.css";
import { selectError, selectIsLoading } from "../../redux/contacts/selectors";
// import { selectFilteredContacts } from "../../redux/contacts/slice";
import Loader from "../Loader/Loader";
import ContactItem from "../Contact/ContactItem";
import { Contact } from "../../types/general";

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
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
        <h1 className={css.title}>Let&apos;s add more contacts to the list!</h1>
      )}
      {/* <ModalDelete
        open={modalOpen}
        close={closeModalDelete}
        id={selectedContactId}
      /> */}
    </div>
  );
};

export default ContactList;
