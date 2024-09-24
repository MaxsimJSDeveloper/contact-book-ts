import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import AddContactModal from "../AddContactModal/AddContactModal";

const AddContactBtn = () => {
  const [isOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CiSquarePlus
        style={{
          position: "fixed",
          top: "90%",
          left: "90%",
          height: 36,
          width: 36,
        }}
        onClick={handleOpen}
      />
      <AddContactModal isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};

export default AddContactBtn;
