import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { NavLink } from "react-router-dom";
import { navigation } from "../constants";
import MenuSvg from "../assets/svg/MenuSvg";
import { useEffect, useState } from "react";
import AnimatedBtn from "./Buttons/AnimatedBtn";

import { hiaido } from "../assets";

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
  const [navBarVisible, setNavBarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      if (currentScrollTop < lastScrollTop) {
        setNavBarVisible(true);
      } else {
        setNavBarVisible(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  // Random Hover Text:
  const letters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const [activeLink, setActiveLink] = useState(null);
  const [displayTexts, setDisplayTexts] = useState(Array(3).fill(""));
  const [interValIds, setIntervalIds] = useState(Array(3).fill(null));

  const onMouseEnter = (e, index) => {
    let iteration = 0;

    clearInterval(interValIds[index]);

    const newIntervalId = setInterval(() => {
      const newText = e.target.dataset.value
        .split("")
        .map((letter, idx) => {
          if (idx < iteration) {
            return e.target.dataset.value[idx];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      setDisplayTexts((prev) => {
        const newTexts = [...prev];
        newTexts[index] = newText;
        return newTexts;
      });

      if (iteration >= e.target.dataset.value.length) {
        clearInterval(newIntervalId);
      }

      iteration += 1 / 3;
    }, 30);

    setIntervalIds((prev) => {
      const newIds = [...prev];
      newIds[index] = newIntervalId;
      return newIds;
    });
  };

  const onMouseLeave = (index) => {
    clearInterval(interValIds[index]);

    setDisplayTexts((prev) => {
      const newTexts = [...prev];
      newTexts[index] = "";
      return newTexts;
    });
  };

  useEffect(() => {
    return () => {
      interValIds.forEach((id) => clearInterval(id));
    };
  }, [interValIds]);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const navItems = [
    { name: "Hiring" },
    { name: "Contact Us" },
    { name: "Pricing" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out transform backdrop-blur-md h-20 lg:h-24 ${
        navBarVisible ? "" : "-translate-y-full "
      }`}
    >
      <div className="container flex justify-between md:gap-4 items-center mt-4 mb-2 px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="z-50 flex items-center">
          <NavLink className="xl:mr-8 w-fit block" to="/">
            <img src={hiaido} alt="hiaido" className="md:w-40 w-24" />
          </NavLink>

          {/* <div className="gap-x-4 flex">
          {linkTexts.map((linkText, index) => (
            <div
              key={index}
              style={{ fontFamily: "monospace" }}
              onMouseEnter={() => onMouseEnter(index, linkText)}
              onMouseLeave={() => onMouseLeave(index)}
            >
              {hoverTexts[index] || linkText}
            </div>
          ))}
        </div> */}

          <nav className="lg:block hidden">
            <ul className="gap-x-10 flex">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="w-32 font-semibold text-center text-orange-400"
                >
                  <Link
                    to={`/${item?.name?.toLowerCase()}`}
                    className={`link uppercase ${
                      activeLink === index ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick(index)}
                    data-value={item?.name}
                    onMouseOver={(e) => onMouseEnter(e, index)}
                    onMouseOut={() => onMouseLeave(index)}
                  >
                    {` ${displayTexts[index] || item?.name}`}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className=" flex items-center justify-center gap-8 px-5">
          <AnimatedBtn className="lg:flex hidden font-semibold" href="/login">
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

      <div className="horizon-bar opacity-30 container h-[1px] mt-6 bg-orange-400" />

      {/* Small Screen Toggle Nav */}
      <nav
        className={`${
          openNavigation
            ? "flex translate-x-0 transition-all duration-500 ease-in-out opacity-100"
            : "flex -translate-x-full transition-all duration-500 ease-in-out opacity-0"
        } flex flex-col justify-between bg-black/90 fixed top-0 left-0 w-full z-50 duration-300 ease-in-out transform backdrop-blur-md h-svh border-r border-orange-400/20 p-4`}
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

          <div className="horizon-bar opacity-30 container h-[1px] mt-6 bg-orange-400" />

          <div className="pt-4 space-y-6">
            {navigation.map((item) => (
              <NavLink
                key={item?.id}
                href={item?.url}
                onClick={handleClick}
                className={`block relative text-xl text-gray-300 border border-orange-400/10 p-2 rounded-md font-semibold ${
                  item?.onlyMobile ? "lg:hidden" : ""
                } ${
                  item?.url === pathname.hash
                    ? "font-bold text-orange-400/80"
                    : "lg:text-n-1/50"
                }`}
              >
                {item?.title}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="horizon-bar opacity-30 containe h-[1px] mt-6 bg-orange-400" />

          <p className=" lg:block text-sm text-white">
            © {new Date().getFullYear()} HIAIDO. All rights reserved.
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Header;
