import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { selectIsRefreshing } from "./redux/auth/selectors"; // Додай селектор для токену
import Layout from "./components/Layout/Layout";
import { refreshUser } from "./redux/auth/operations";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";

const RegisterPage = lazy(() => import("./pages/RegistPage/RegistPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshingUser = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshingUser ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
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
    </>
  );
}

export default App;
