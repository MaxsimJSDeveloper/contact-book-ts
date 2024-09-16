import { useSelector } from "react-redux";
import css from "./HomePage.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Creators from "../../components/Creators/Creators";

export default function Home() {
  const user = useSelector(selectUser);

  return (
    <HelmetProvider>
      <div className={css.global}>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <div className={css.container}>
          <h1 className={css.title}>Welcome {user.name}!</h1>
          {user.name ? (
            <p className={css.desc}>
              Here you can add, edit and find your contacts
            </p>
          ) : (
            <p className={css.desc}>It is secure storage of your contacts</p>
          )}
        </div>
        <Creators />
      </div>
    </HelmetProvider>
  );
}
