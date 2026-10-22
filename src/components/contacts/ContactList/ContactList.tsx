import { useState } from "react";
import { Contact } from "@/types/general";

import {
  ContactItem,
  EditContactModal,
  ModalDelete,
} from "@/components/contacts";

interface ContactListProps {
  contacts: Contact[];
}

export const ContactList = ({ contacts }: ContactListProps) => {
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [editContact, setEditContact] = useState<Contact | null>(null);

  return (
    <div className="w-full">
      {contacts.length > 0 ? (
        /* CSS Grid с автозаполнением убирает пустые дыры при ресайзе */
        <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
          {contacts.map((contact) => (
            <li key={contact._id} className="flex justify-center">
              <ContactItem
                contactInfo={contact}
                onEdit={(c) => setEditContact(c)}
                onDelete={(id) => setDeleteModalId(id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="mt-[20vh] text-center text-xl font-medium text-[#f5f5f5] md:mt-[250px]">
          Let&apos;s add more contacts to the list!
        </h1>
      )}

      <ModalDelete
        isOpen={!!deleteModalId}
        contactId={deleteModalId}
        onClose={() => setDeleteModalId(null)}
      />

      {editContact && (
        <EditContactModal
          isOpen={!!editContact}
          contactToEdit={editContact}
          onClose={() => setEditContact(null)}
        />
      )}
    </div>
  );
};
