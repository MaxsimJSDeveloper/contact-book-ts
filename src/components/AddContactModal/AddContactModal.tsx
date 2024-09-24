import AddContactModalContent from "../AddContactModalContent/AddContactModalContent";
import Modal from "../Modal/Modal";
import { AddContactModalProps } from "./AddContactModal.types";

const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <AddContactModalContent />
      </Modal>
    </>
  );
};

export default AddContactModal;
