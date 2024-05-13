import { useEffect } from "react";
import Contact from "../components/page-components/homepage/Contact";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Hiaido | Contact Us";
  }, []);

  return (
    <div className="lg:mt-60 mt-40">
      <Contact />
    </div>
  );
};
export default ContactUs;
