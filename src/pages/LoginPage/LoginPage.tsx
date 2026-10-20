import { Helmet, HelmetProvider } from "react-helmet-async";
import { LoginForm } from "@/components/auth";

const Login = () => {
  return (
    <HelmetProvider>
      <div className="flex min-h-[75vh] flex-col items-center justify-center px-4">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <LoginForm />
      </div>
    </HelmetProvider>
  );
};

export default Login;
