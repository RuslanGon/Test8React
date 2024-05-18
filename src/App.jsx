import { Route, Routes } from "react-router-dom";

// import css from './App.module.css'
// import clsx from "clsx";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./component/Loader/Loader";

import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import Layout from "./component/Layout/Layout";
import { useDispatch } from "react-redux";
import { apiRefreshUser } from "./redux/auth/authSlice";
import RestrictedRoute from "./component/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";

// import MailBoxPage from './pages/MailBoxPage'
// import ProductsPage from './pages/ProductsPage'
// import SearchPage from './pages/SearchPage'
// import HomePage from "./pages/HomePage";
// import NotFoundPage from "./pages/NotFoundPage";
// import ProductDetailsPage from "./pages/ProductDetailsPage";

const MailBoxPage = lazy(() => import("./pages/MailBoxPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));

function App() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(apiRefreshUser());
  }, [dispath]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RestrictedRoute><RegistrationPage /></RestrictedRoute>}/>
          <Route path="/login" element={<RestrictedRoute><LoginPage /></RestrictedRoute>}/>
          <Route path="/contacts" element={<PrivateRoute><ContactsPage /></PrivateRoute>} />
          <Route path="/mailbox" element={<PrivateRoute><MailBoxPage /> </PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
          <Route path="/products/:productId/*" element={<PrivateRoute><ProductDetailsPage /> </PrivateRoute>}/>
          <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
