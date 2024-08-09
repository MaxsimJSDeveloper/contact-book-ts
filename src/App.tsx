import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { selectIsRefreshing } from "./redux/auth/selectors";

import Layout from "./components/Layout/Layout";
import { refreshUser } from "./redux/auth/operations";
import { AppDispatch } from "./redux/store";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import ContactsPage from "./pages/ContactsPage/ContactsPage";

const RegisterPage = lazy(() => import("./pages/RegistPage/RegistPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/" component={RegisterPage} />
            }
          />
          <Route
            path="/login"
            element={<RestrictedRoute redirectTo="/" component={LoginPage} />}
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={ContactsPage} />
            }
          />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
