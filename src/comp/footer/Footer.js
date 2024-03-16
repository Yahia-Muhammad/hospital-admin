import React from "react";
import "./Footer.css";
import LocationSvg from "../svg/LocationSvg.svg";
import Logo from "../svg/Logo.svg";
import PoneSvg from "../svg/PoneSvg.svg";
import FacebookSvg from "../svg/FacebookSvg.svg";
import WhatsappSvg from "../svg/WhatsappSvg.svg";
import LinkedinSvg from "../svg/LinkedinSvg.svg";

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <img src={LocationSvg} alt="Location" />
          <p>
            Qesm El Moqatam <br></br> 30.0033, 31.331704
          </p>
        </div>
        <div>
          <div className="logo">
            <div className="logo-svg">
              <img src={Logo} alt="ff" />
            </div>

            <div className="logo-text">
              <h1 className="tLogo">Al Shifa</h1>
              <h2 className="tLogo">Hospital</h2>
            </div>
          </div>
          <div>
            <ul className="social">
              <li>
                <img src={FacebookSvg} alt="Facebook" />
              </li>
              <li>
                <img src={WhatsappSvg} alt="Whatsapp" />
              </li>
              <li>
                <img src={LinkedinSvg} alt="Linkenin" />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img src={PoneSvg} alt="Phone" />
          <p>19125</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
