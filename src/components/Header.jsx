import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { NavLink } from "react-router-dom";
import { navigation } from "../constants";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useState } from "react";
import AnimatedBtn from "./Buttons/AnimatedBtn";

import { hiaido } from "../assets";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
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
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out transform backdrop-blur-md ${
        navBarVisible ? "" : "-translate-y-full "
      }`}
    >
      <div className="container flex justify-between md:gap-4 items-center mt-4 mb-2 px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="flex items-center">
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
          <AnimatedBtn className="lg:flex hidden" href="/login">
            Sign In
          </AnimatedBtn>

          <button
            className="lg:hidden ml-auto"
            // px="px-3"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </button>
        </div>
      </div>

      <div className="hrzn opacity-30 containe h-[1px] mt-6 bg-orange-400" />

      {/* Small Screen Toggle Nav */}
      <nav
        className={`${
          openNavigation ? "flex" : "hidden"
        } fixed top-[7rem] left-0 right-0 bottom-0  lg:static lg:flex  lg:bg-transparent`}
      >
        <div className="z-2 lg:flex-row relative flex flex-col items-center justify-center m-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              href={item.url}
              onClick={handleClick}
              className={`block relative font-code text-2xl  text-n-1 transition-colors hover:text-color-1 ${
                item.onlyMobile ? "lg:hidden" : ""
              } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                item.url === pathname.hash
                  ? "z-2 lg:text-n-1"
                  : "lg:text-n-1/50"
              } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
            >
              {item.title}
            </NavLink>
          ))}
        </div>

        <HamburgerMenu />
      </nav>
    </div>
  );
};

export default Header;
