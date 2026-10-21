import { createPortal } from "react-dom";
import { useAppDispatch } from "@/redux/hooks";
import { deleteContact } from "@/redux/contacts";
import toast from "react-hot-toast";

interface ModalDeleteProps {
  isOpen: boolean;
  contactId: string | null;
  onClose: () => void;
}

export const ModalDelete = ({
  isOpen,
  contactId,
  onClose,
}: ModalDeleteProps) => {
  const dispatch = useAppDispatch();

  if (!isOpen || !contactId) return null;

  const handleDelete = () => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .then(() => toast.success("Contact deleted!"))
      .catch(() => toast.error("Failed to delete contact"));
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-xl">
        <p className="mb-6 text-xl font-medium text-gray-800">
          Delete this contact?
        </p>
        <div className="flex gap-4">
          <button
            className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            className="rounded-xl bg-[#b31818] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#841c1c]"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
