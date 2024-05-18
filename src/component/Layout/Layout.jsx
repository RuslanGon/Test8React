import clsx from "clsx";
import css from "../../App.module.css";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSignedIn, selectUserdata } from "../../redux/auth/selectors";
import { apiLogout } from "../../redux/auth/authSlice";
import { useState } from "react";

const getNavLinkClass = ({ isActive }) =>
  clsx(css.navlink, {
    [css.active]: isActive,
  });

const Layout = ({ children }) => {
  const dispath = useDispatch()
  const isSignedIn = useSelector(selectIsSignedIn);
  const userData = useSelector(selectUserdata)
  const onLogout = () => {
    dispath(apiLogout())
    setModal()
  }

  const [modal, setModal] = useState(false)

  const closeModal = () => setModal(false)
  const openModal = () => setModal(true)

  

  return (
    <div>
      {modal && <div>
        <h3>Modal window</h3>
        <button onClick={onLogout} type="button">Yes</button>
        <button onClick={closeModal} type="button">Noy</button>
        </div>}
      <header>
        <nav className={css.nav}>
          <NavLink className={getNavLinkClass} to="/">
            Home
          </NavLink>
          {isSignedIn ? (
            <>
              <NavLink className={getNavLinkClass} to="/contacts">
                Contacts
              </NavLink>
              <NavLink className={getNavLinkClass} to="/mailbox">
                MailBox
              </NavLink>
              <NavLink className={getNavLinkClass} to="/products">
                Products
              </NavLink>
              <NavLink className={getNavLinkClass} to="/search">
                Search
              </NavLink>
              <div>
               <span> hello {userData.name} 👋</span>
               <button type="button" onClick={openModal}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <NavLink className={getNavLinkClass} to="/register">
                Registration
              </NavLink>
              <NavLink className={getNavLinkClass} to="/login">
                Login
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
