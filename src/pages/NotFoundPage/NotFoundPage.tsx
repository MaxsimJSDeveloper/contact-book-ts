import { Helmet, HelmetProvider } from "react-helmet-async";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <HelmetProvider>
      <div className={css.container}>
        <Helmet>
          <title>404</title>
        </Helmet>
        <h1 className={css.heading}>404</h1>
        <p className={css.message}>Page not found</p>
        <p className={css.instruction}>
          Please check the URL or go back to the homepage.
        </p>
        <a href="/" className={css.homeLink}>
          Go to Home
        </a>
      </div>
    </HelmetProvider>
  );
};

export default NotFoundPage;
