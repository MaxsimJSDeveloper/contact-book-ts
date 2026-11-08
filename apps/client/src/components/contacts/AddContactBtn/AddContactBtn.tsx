import { useState } from "react";
import { Plus } from "lucide-react";
import { AddContactModal } from "@/components/contacts";

export const AddContactBtn = () => {
  const [isOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-[1000] flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-white shadow-xl transition-all hover:scale-105 hover:bg-[#005e6e] active:scale-95 lg:hidden"
        type="button"
        aria-label="Add contact"
      >
        <Plus className="h-7 w-7" strokeWidth={2.5} />
      </button>
      <AddContactModal
        isOpen={isOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
