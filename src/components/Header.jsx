import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { hiaido } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useState } from "react";
import { useStore } from "../store/Store";

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
  const { logout, setUser } = useStore()
  const [loggedInuser, setLogin] = useState({})
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogin(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
    >
      <div className="flex items-center mt-4 mb-2 px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="block w-[12rem] xl:mr-8" to='/'>
          <img src={hiaido} alt="hiaido" />
        </Link>

        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed top-[7rem] left-0 right-0 bottom-0  lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative md:hidden z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>


          <HamburgerMenu />
        </nav>
        <Link
          to="/chat"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          HiAiDo AI
        </Link>
        <Link
          to="/hiring"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          Hiring
        </Link>
        <Link
          to="/contact-us"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          Contact US
        </Link>
        <Link
          to="/Pricing"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          Pricing
        </Link>
        {loggedInuser?.isAuthenticated ? <Button className="hidden lg:flex" onClick={() => logout()}>
          Welcome,{loggedInuser.name}
        </Button> : <Button className="hidden lg:flex" 
        href={"https://hiaido.auth.us-east-1.amazoncognito.com/login?client_id=3tj4g5qhml5kiu1ds37bogvol3&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fapis.hiaido.com%2Fauth-callback"}
        // href={"https://hiaido.auth.us-east-1.amazoncognito.com/login?client_id=3tj4g5qhml5kiu1ds37bogvol3&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost:5173"}
        
        >
          Login
        </Button>}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
