import { useState } from "react";
import { PlusSquare } from "lucide-react";
import { AddContactModal } from "@/components/contacts";

export const AddContactBtn = () => {
  const [isOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-[1000] rounded-lg bg-white text-brand-accent shadow-lg transition-colors hover:text-[#005e6e] md:hidden"
        type="button"
      >
        <PlusSquare className="h-12 w-12" strokeWidth={1.5} />
      </button>
      <AddContactModal
        isOpen={isOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
