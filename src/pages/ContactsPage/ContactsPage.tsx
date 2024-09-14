import { Helmet, HelmetProvider } from "react-helmet-async";

import css from "./ContactsPage.module.css";
import { LogoutForDesktop } from "../../components/LogoutForDesktop/LogoutForDesktop";

const ContactsPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Contacts</title>
        </Helmet>
        <LogoutForDesktop />
        <main className={css.container}>
          <h3 style={{ color: "black" }}>Contacts</h3>
        </main>
      </HelmetProvider>
    </>
  );
};

export default ContactsPage;
