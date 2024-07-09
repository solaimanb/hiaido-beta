import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="min-h-[40vh] flex">
      <div className="bg-gradient-to-r from-dark via-orange-400/15 to-dark border-orange-500/20 md:flex-row container flex flex-col items-center justify-center w-full pt-6 pb-4 mx-auto mt-auto space-y-4 md:space-y-0 border-t">
        <div>
          {/* <p className="text-white/80 text-sm flex gap-1 font-semibold uppercase">
          Made with <span className="text-red-600">❤️</span> in India
        </p> */}
        </div>

        <div className="flex items-center gap-2 text-sm text-white/80">
          {/* <NavLink
          to="/privacy"
          className="lg:block text-white/60 underline-offset-2 text-xs font-semibold text-center underline"
        >
          Privacy Policy
        </NavLink> */}



          {/* <NavLink
          to="/ethical-ai"
          className="lg:block text-white/60 underline-offset-2 text-xs font-semibold text-center underline"
        >
          Ethical AI
        </NavLink> */}

          <div>
            <p className="lg:block gap-x-1 flex items-center text-sm font-semibold">
              &copy; {new Date().getFullYear()}
              {" "}
              <Link to="/">HIAIDO</Link> •
              {" "}
              All rights reserved.
              {" "}
            </p>
          </div>

          <div>
            <NavLink
              to="/terms"
              className="lg:block underline-offset-2 font-semibold text-center underline"
            >
              Terms & Conditions
            </NavLink>
          </div>
        </div>

        <div className="sm:justify-between fle flex-col items-center justify-center hidden mt-auto">
          <div className="flex flex-col justify-between space-y-4">
            <div className="horizon-bar opacity-30 h-[1px] mt-6 bg-orange-400" />

            <p className="lg:block text-white/80 gap-x-1 flex items-center text-sm font-semibold">
              &copy; {new Date().getFullYear()} <Link to="/">HIAIDO</Link>. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
