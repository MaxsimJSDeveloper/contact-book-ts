import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { lazy, useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "@/RestrictedRoute";
import { PrivateRoute } from "@/PrivateRoute";

import { refreshUser, selectIsRefreshing } from "@/redux/auth";
import { useAppDispatch } from "@/redux/hooks";

import { Loader } from "@/components/ui";
import { Layout, Logo } from "@/components/layout";


const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("@/pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useAppDispatch();
  const isRefreshingUser = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshingUser ? (
    <Loader />
  ) : (
    <>
      <Logo />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/login" component={RegisterPage} />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={LoginPage} />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={ContactsPage} />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
