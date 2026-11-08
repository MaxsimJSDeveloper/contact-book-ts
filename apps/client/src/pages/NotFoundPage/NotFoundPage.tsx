import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <HelmetProvider>
      <div className="mt-[10%] text-center text-[#d9ebee]">
        <Helmet>
          <title>404</title>
        </Helmet>
        <h1 className="m-0 text-[96px] font-bold text-[#d9ebee]">404</h1>
        <p className="my-5 text-[24px]">Page not found</p>
        <p className="text-[18px]">
          Please check the URL or go back to the homepage.
        </p>
        <Link
          to="/"
          className="mt-[30px] inline-block rounded-md bg-brand-accent px-5 py-2.5 text-white transition-colors hover:bg-[#005e6e]"
        >
          Go to Home
        </Link>
      </div>
    </HelmetProvider>
  );
};

export default NotFoundPage;
