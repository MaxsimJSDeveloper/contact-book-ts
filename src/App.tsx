import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { selectIsRefreshing } from "./redux/auth/selectors";
import { selectIsLoggedIn } from "./redux/auth/selectors"; // Додайте селектор для перевірки статусу логіна

import Layout from "./components/Layout/Layout";
import { refreshUser } from "./redux/auth/operations";
import { AppDispatch } from "./redux/store";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";

const RegisterPage = lazy(() => import("./pages/RegistPage/RegistPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо статус логіна

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn); // Додайте це
    if (isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLoggedIn]);

  return isRefreshing ? (
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
