import { Helmet, HelmetProvider } from "react-helmet-async";
import { RegisterForm } from "@/components/auth";

const RegistrationPage = () => {
  return (
    <HelmetProvider>
      <div className="flex min-h-[75vh] flex-col items-center justify-center px-4">
        <Helmet>
          <title>Registration</title>
        </Helmet>
        <RegisterForm />
      </div>
    </HelmetProvider>
  );
};

export default RegistrationPage;
