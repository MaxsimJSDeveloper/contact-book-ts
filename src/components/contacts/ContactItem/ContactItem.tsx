// import { BsTrash, BsPencilSquare } from "react-icons/bs";
// import { setActiveContact } from "../../redux/contacts/slice";

// import { Avatar } from "@mui/material";

// import { useAppDispatch } from "../../redux/hooks";

// import ModalEdit from "../ModalEdit/ModalEdit";

import { Contact } from "@/types/general";
import { stringAvatar } from "@/utils";

import css from "./Contact.module.css";

interface ContactItemProps {
  contactInfo: Contact;
}

export const ContactItem = ({ contactInfo }: ContactItemProps) => {
  // const dispatch = useAppDispatch();

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

