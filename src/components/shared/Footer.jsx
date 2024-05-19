import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="min-h-[40vh] flex">
      <div className="bg-gradient-to-r from-black via-orange-400/15 to-black border-orange-400/20 md:flex-row container flex flex-col items-center justify-between w-full pt-6 pb-4 mx-auto mt-auto space-y-4 border-t">
        <p className="lg:block text-white/80 text- flex gap-1 font-semibold uppercase">
          Made with <span className="text-red-600">❤️</span> in India
        </p>

        <NavLink
          to="/privacy"
          className="lg:block text-white/60 underline-offset-2 text-xs font-semibold text-center underline"
        >
          Privacy Policy
        </NavLink>

        <p className="lg:block text-white/80 gap-x-1 flex items-center text-sm font-semibold">
          &copy; {new Date().getFullYear()} <Link to="/">HIAIDO</Link> All
          rights reserved.
        </p>

        <div className="sm:justify-between fle flex-col items-center justify-center hidden mt-auto">
          <div className="flex flex-col justify-between space-y-4">
            <div className="horizon-bar opacity-30 h-[1px] mt-6 bg-orange-400" />

            <p className="lg:block text-white/80 gap-x-1 flex items-center text-sm font-semibold">
              &copy; {new Date().getFullYear()} <Link to="/">HIAIDO</Link> All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
