import React from "react";
import Section from "./Section";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container  flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <p className=" text-xl text-white lg:block">
         Made with ❤️ in India
        </p>
        <p>
        <NavLink
          to="/privacy"
          className=" text-xs text-white lg:block"
        >
         Privacy
        </NavLink>
        </p>
        <p className=" text-xl text-white lg:block">
          © {new Date().getFullYear()}  HIAIDO. All rights reserved. 
        </p>
      </div>
    </Section>
  );
};

export default Footer;
