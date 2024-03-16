import React, { useEffect } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Logo from "../svg/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


const Header = () => {
  const [cookies, setCookies] = useCookies("access_admin_token");


  const removeCookies = () => {
    setCookies("access_admin_token", "");
    localStorage.removeItem("access_id");
    window.location.reload(false)

  }

  return (
    <>
      <header className="pc">
        <div className="inside-header">
          <div style={{ margin: "7px 0" }}>
            <div className="logo">
              <div className="logo-svg">
                <img src={Logo} alt="ff" />
              </div>

              <div className="logo-text">
                <h1 className="tLogo">Al Shifa</h1>
                <h2 className="tLogo">Hospital</h2>
              </div>
            </div>

            {cookies.access_admin_token &&
              <ul className="basic-ul">
                <li>
                  <NavLink to={"/"}>
                    Bookings
                  </NavLink>
                </li>
                {
                  localStorage.getItem("role") === "ADMIN" &&
                  <>
                    <li>
                      <NavLink to={"/ShowDoctors"}>
                        Selected
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/AddDoctor"}>
                        Add Doctor
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/AddAccount"}>
                        Add Account
                      </NavLink>
                    </li>
                  </>
                }

                <li>
                  <button className="sign-in-btn" onClick={removeCookies}>Log out</button>
                </li>
              </ul>
            }


          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
