import { Helmet, HelmetProvider } from "react-helmet-async";

import css from "./ContactsPage.module.css";

const ContactsPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Contacts</title>
        </Helmet>
        <main className={css.container}>
          <h3>welcome</h3>
        </main>
      </HelmetProvider>
    </>
  );
};

export default ContactsPage;
