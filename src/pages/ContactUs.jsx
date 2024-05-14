import { useEffect } from "react";
import Contact from "../components/shared/Contact";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Hiaido | Contact Us";
  }, []);

  return (
    <div className="mt-40">
      <Contact />
    </div>
  );
};
export default ContactUs;
