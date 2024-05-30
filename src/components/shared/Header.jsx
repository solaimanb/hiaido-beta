import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { NavLink } from "react-router-dom";
import { navigation } from "../../constants";
import MenuSvg from "../../assets/svg/MenuSvg";
import { useEffect, useState } from "react";
import AnimatedBtn from "../Buttons/AnimatedBtn";

import { hiaido } from "../../assets";
import AnimatedText from "./AnimatedText";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    setOpenNavigation((prevState) => !prevState);

    if (!openNavigation) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const navItems = [
    // { name: "Chat", path: "/chat" },
    { name: "Hiring", path: "/hiring" },
    { name: "Contact Us", path: "/contact" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out transform backdrop-blur-2xl pt-3 px-4 md:px-2
      `}
    >
      <div className="container flex items-center justify-between w-full px-0">
        <div className="gap-x-10 z-50 flex items-center">
          <NavLink className="w-fit block" to="/">
            <img src={hiaido} alt="hiaido" className="md:w-48 w-28" />
          </NavLink>

          <nav className="lg:block hidden">
            <div className="flex">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  className="w-28 hover:text-orange-400/100 font-[400] text-center text-white/70 transition-all duration-300 ease-in-out"
                  to={item?.path}
                >
                  <AnimatedText text={` ${item?.name}`} />
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        <div className=" flex items-center justify-center gap-8 px-5">
          <AnimatedBtn to={"/login"} className="lg:flex hidden font-semibold">
            Sign In
          </AnimatedBtn>

          <button
            className={`${openNavigation ? "hidden" : ""} lg:hidden ml-auto`}
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </button>
        </div>
      </div>

      <div className="horizon-bar opacity-30 container h-[1px] mt-4 bg-orange-400" />

      {/* Small Screen Toggle Nav */}
      <nav
        className={`${
          openNavigation
            ? "fixed top-0 bottom-0 left-0 flex translate-x-0 transition duration-500 ease-in-out bg-black h-[100vh]"
            : "flex -translate-x-full transition-all duration-500 ease-in-out opacity-0 bg-black h-[100vh]"
        } flex flex-col justify-between bg-black/90 fixed top-0 left-0 w-[90%] md:w-[80%] z-50 duration-300 ease-in-out transform backdrop-blur-3xl border border-orange-400/20 p-4`}
      >
        <div className="p-2">
          {/* Brand Logo */}
          <div className="flex items-center justify-between">
            <NavLink className="xl:mr-8 w-fit block" to="/">
              <img src={hiaido} alt="hiaido" className="md:w-40 w-24" />
            </NavLink>

            <button className="lg:hidden ml-auto" onClick={toggleNavigation}>
              <MenuSvg openNavigation={openNavigation} />
            </button>
          </div>

          <div className="pt-4 space-y-6">
            {navigation.map((item) => (
              <Link
                key={item?.id}
                to={item?.to}
                onClick={handleClick}
                className={`block relative uppercase text-white/80 border-orange-800/10 bg-orange-900/5 border p-2 rounded-md font-semibold ${
                  item?.onlyMobile ? "lg:hidden" : ""
                } ${
                  item?.url === pathname.hash
                    ? "font-bold text-orange-400/80"
                    : "lg:text-n-1/50"
                }`}
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="horizon-bar opacity-30 h-[1px] bg-orange-400" />

          <p className="lg:block text-white/80 text-xs font-semibold">
            © {new Date().getFullYear()} HIAIDO All rights reserved.
          </p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
