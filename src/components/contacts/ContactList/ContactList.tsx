import { useSelector } from "react-redux";
import { selectError, selectIsLoading } from "@/redux/contacts";
import { Contact } from "@/types/general";

import { ContactItem } from "@/components/contacts";
import { Loader } from "@/components/ui";

interface ContactListProps {
  contacts: Contact[];
}

export const ContactList = ({ contacts }: ContactListProps) => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div className="w-full">
      {isLoading && !error && <Loader />}

      {contacts.length > 0 ? (
        <ul className="flex w-full flex-wrap justify-center gap-6 md:justify-start md:gap-x-8 md:gap-y-6">
          {contacts.map((contact) => (
            <li key={contact._id} className="flex justify-center">
              <ContactItem contactInfo={contact} />
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="mt-[20vh] text-center text-xl font-medium text-[#f5f5f5] md:mt-[250px]">
          Let&apos;s add more contacts to the list!
        </h1>
      )}
    </div>
  );
};
