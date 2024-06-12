import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { NavLink } from "react-router-dom";
import { navigation } from "../../constants";
import MenuSvg from "../../assets/svg/MenuSvg";
import { useEffect, useState } from "react";
import AnimatedBtn from "../Buttons/AnimatedBtn";

import { hiaido } from "../../assets";
// import AnimatedText from "./AnimatedText";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useAuthenticator } from "@aws-amplify/ui-react";

const navItems = [
  // { name: "Hiring", path: "/hiring" },
  { name: "About", path: "/about" },
  {
    name: "Products",
    path: "/products",
    subNav: [
      {
        name: "AI Cloud Engineer",
        description:
          "Your intelligent assistant for streamlining cloud management tasks with efficiency and precision.",
      },
      {
        name: "Einstein",
        description:
          "Unleash the power of AI with Einstein, your trusted ally for tackling complex cloud challenges effortlessly.",
      },
      {
        name: "Sandh.ai",
        description:
          "Explore Sandh.ai, the marketplace for specialized AI agents tailored to your unique cloud automation needs.",
      },
    ],
  },
  { name: "Features", path: "/features" },
  { name: "Integrations", path: "/integrations" },
  { name: "Enterprise", path: "/enterprise" },
  { name: "Pricing", path: "/pricing" },
];

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [user, setUser] = useState();
  const [hoveredNavItem, setHoveredNavItem] = useState(true);

  const { signOut } = useAuthenticator((context) => [
    context.signOut,
    context.authStatus,
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Parse the user data from JSON
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out transform backdrop-blur-2xl pt-3 px-4 md:px-2
      `}
    >
      <div className="container flex items-center justify-between w-full px-0">
        <div className="z-50 flex items-center py-2 gap-x-8">
          <NavLink className="block" to="/">
            <img src={hiaido} alt="hiaido" className="w-24 md:w-40" />
          </NavLink>

          <nav className="hidden lg:block">
            <div className="relative flex gap-6">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredNavItem(item.name)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <NavLink
                    className="w-28 py-4 hover:text-orange-400/100 font-[400] text-center text-white/70 transition-all duration-300 ease-in-out"
                    to={item?.path}
                  >
                    {` ${item?.name}`}
                  </NavLink>

                  {item.subNav && hoveredNavItem === item.name && (
                    <div className="absolute left-0 z-10 w-full p-6 bg-gray-900 shadow-lg top-10 rounded-xl backdrop-blur-lg">
                      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                        {item.subNav.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="p-4 space-y-2 rounded-lg bg-gray-800/50 hover:bg-gray-700"
                          >
                            <NavLink
                              className="block text-lg font-bold text-white"
                              to={`#${subItem.name
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`}
                            >
                              {subItem.name}
                            </NavLink>

                            <p className="text-sm text-gray-400">
                              {subItem.description}
                            </p>
                          </div>
                        ))}

                        <div className="absolute z-0 w-10 h-10 rounded-lg -top-3 left-24">
                          <svg
                            width="40"
                            height="30"
                            viewBox="0 0 158 141"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M63.4115 9.00003C70.3397 -2.99997 87.6603 -3 94.5885 9L155.21 114C162.138 126 153.478 141 139.622 141H18.3783C4.52185 141 -4.13844 126 2.78976 114L63.4115 9.00003Z"
                              fill="#111827"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex items-center justify-center gap-4 px-5 ">
          <AnimatedBtn
            to={"/chat"}
            className="hidden font-semibold lg:block"
            outlined={true}
          >
            Start Free Trial
          </AnimatedBtn>

          {user ? (
            <Link to={"/chat"}>
              <AvatarIcon
                width={26}
                height={26}
                src={user.avatarUrl}
                className="hidden text-orange-500 lg:block"
              />
            </Link>
          ) : (
            <AnimatedBtn
              to={"/login"}
              className="hidden font-semibold lg:block"
            >
              Login
            </AnimatedBtn>
          )}

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
            <NavLink className="block xl:mr-8 w-fit" to="/">
              <img src={hiaido} alt="hiaido" className="w-24 md:w-40" />
            </NavLink>

            <button className="ml-auto lg:hidden" onClick={toggleNavigation}>
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
            <Link
              onClick={() => user && signOut()}
              className={`block relative uppercase text-white/80 border-orange-800/10 bg-orange-900/5 border p-2 rounded-md font-semibold
                `}
            >
              {user ? "Sign Out" : "Sign In"}
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="horizon-bar opacity-30 h-[1px] bg-orange-400" />

          <p className="text-xs font-semibold lg:block text-white/80">
            © {new Date().getFullYear()} HIAIDO All rights reserved.
          </p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
