import { Helmet, HelmetProvider } from "react-helmet-async";

import css from "./RegistPage.module.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function RegistrationPage() {
  return (
    <HelmetProvider>
      <div className={css.container}>
        <Helmet>
          <title>Registration</title>
        </Helmet>
        <RegisterForm />
      </div>
    </HelmetProvider>
  );
}
