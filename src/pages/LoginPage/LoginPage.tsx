import { Helmet, HelmetProvider } from "react-helmet-async";

import LoginForm from "../../components/LoginForm/LoginForm";

import css from "./LoginPage.module.css";

const Login = () => {
  return (
    <HelmetProvider>
      <div className={css.container}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <LoginForm />
      </div>
    </HelmetProvider>
  );
};

export default Login;
