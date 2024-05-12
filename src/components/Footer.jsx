import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <section className="min-h-[40vh] flex">
      <div className="bg-gradient-to-r from-black via-orange-400/20 to-black border-orange-400/20 container w-full py-10 mx-auto mt-auto border-t">
        <div className="sm:justify-between flex items-center justify-center gap-10 mt-auto">
          <p className=" lg:block text-sm text-white">Made with ❤️ in India</p>
          <p>
            <NavLink to="/privacy" className=" lg:block text-xs text-white">
              Privacy
            </NavLink>
          </p>
          <p className=" lg:block text-sm text-white">
            © {new Date().getFullYear()} HIAIDO. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
