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

import css from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useAppDispatch();

  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);

  // const [startLoad, setStartLoad] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!loading) setStartLoad(true);
  // }, [loading]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Contacts</title>
        </Helmet>
        <main className={css.container}>
          {error && "Error! Try again"}
          {loading && <Loader />}
          <ContactList contacts={contacts} />
        </main>
        <AddContactBtn />
      </HelmetProvider>
    </>
  );
};

export default ContactsPage;
