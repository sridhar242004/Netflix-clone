import React, { useState, useEffect } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleshow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      handleshow(true);
    } else {
      handleshow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Emblem.jpg"
        alt="netflix logo"
      />
    </div>
  );
}

export default Nav;
