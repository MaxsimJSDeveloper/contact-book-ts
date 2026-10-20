import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { selectIsRefreshing } from "@/redux/auth";
import { fetchUser, selectUser } from "@/redux/user";
import { useAppDispatch } from "@/redux/hooks";

import { Loader } from "@/components/ui";
import { Creators } from "@/components/layout";

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
      <div className="flex min-h-[75vh] flex-col items-center justify-center">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="my-auto text-center">
          <h1 className="mb-6 text-2xl font-semibold text-[#fafafa] md:text-[40px] xl:text-[48px]">
            Welcome {user.name}!
          </h1>
          {user.name ? (
            <p className="pl-2.5 text-base font-semibold text-[#fafafa] md:text-2xl xl:text-[36px]">
              Here you can add, edit and find your contacts
            </p>
          ) : (
            <p className="pl-2.5 text-base font-semibold text-[#fafafa] md:text-2xl xl:text-[36px]">
              It is secure storage of your contacts
            </p>
          )}
        </div>
        <Creators />
      </div>
    </HelmetProvider>
  );
};

export default Home;
