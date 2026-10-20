import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/redux/hooks";
import {
  fetchContacts,
  selectContacts,
  selectError,
  selectIsLoading,
} from "@/redux/contacts";

import { Loader } from "@/components/ui";
import { AddContactBtn, ContactList } from "@/components/contacts";

const ContactsPage = () => {
  const dispatch = useAppDispatch();

  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <main className="mx-auto min-h-[75vh] w-full max-w-[400px] px-4 min-[375px]:px-6 md:max-w-[800px] md:px-12 xl:px-16 2xl:max-w-[1200px]">
        {error && <p className="text-center text-red-400">Error! Try again</p>}
        {loading && <Loader />}
        <ContactList contacts={contacts} />
      </main>
      <AddContactBtn />
    </HelmetProvider>
  );
};

export default ContactsPage;
