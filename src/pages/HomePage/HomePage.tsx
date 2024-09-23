import { useSelector } from "react-redux";
import css from "./HomePage.module.css";

import { Helmet, HelmetProvider } from "react-helmet-async";
import Creators from "../../components/Creators/Creators";
import { selectUser } from "../../redux/user/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchUser } from "../../redux/user/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshingUser = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return isRefreshingUser ? (
    <Loader />
  ) : (
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
