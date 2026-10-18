import { AddContactModalContent } from "@/components/contacts";
import { Modal } from "@/components/ui";

export interface AddContactModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const AddContactModal = ({
  isOpen,
  handleClose,
}: AddContactModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <AddContactModalContent handleClose={handleClose} />
    </Modal>
  );
};
