import { Helmet, HelmetProvider } from "react-helmet-async";

import css from "./ContactsPage.module.css";
import ContactList from "../../components/ContactList/ContactList";
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";

const ContactsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

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
          <h3 style={{ color: "black" }}>Contacts</h3>
          {error && "Error! Try again"}
          {loading && <Loader />}
          <ContactList contacts={contacts} />
        </main>
      </HelmetProvider>
    </>
  );
};

export default ContactsPage;
