// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
// import { BsTrash, BsPencilSquare } from "react-icons/bs";
// import { setActiveContact } from "../../redux/contacts/slice";

// import { Avatar } from "@mui/material";
import { stringAvatar } from "../../js/utils";
import { Contact } from "../../types/general";
// import ModalEdit from "../ModalEdit/ModalEdit";

import css from "./Contact.module.css";

interface ContactItemProps {
  contactInfo: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contactInfo }) => {
  // const dispatch = useDispatch<AppDispatch>();

  const { name, phoneNumber } = contactInfo;

  // const handleEdit = () => {
  //   dispatch(setActiveContact({ name, phoneNumber, id }));
  // };

  // const handleDelete = () => {
  //   modalOpenDelete(id);
  // };

  return (
    <>
      <div {...stringAvatar(name)} className={css.avatar} />
      <div className={css.data}>
        <p className={css.info}> {name}</p>
        <p className={css.number}> {phoneNumber}</p>
      </div>
      {/* <IconButton
        variant="outlined"
        type="button"
        style={{ padding: "8px" }}
        onClick={handleEdit}
      >
        <BsPencilSquare className={css.pencil} />
      </IconButton>
      <IconButton
        variant="outlined"
        type="button"
        style={{ padding: "8px" }}
        onClick={handleDelete}
      >
        <BsTrash className={css.bin} />
      </IconButton> */}
      {/* <ModalEdit /> */}
    </>
  );
};

export default ContactItem;
