import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { selectIsRefreshing } from "@/redux/auth";
import { fetchUser, selectUser } from "@/redux/user";
import { useAppDispatch } from "@/redux/hooks";

import { Loader } from "@/components/ui";
import { Creators } from "@/components/layout";

import css from "./HomePage.module.css";

const Home = () => {
  const isRefreshingUser = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);

  const dispatch = useAppDispatch();

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
};

export default Home;
