import Contact from "../components/shared/Contact";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  window.scrollTo(0, 0);

  return (
    <>
      {/* SEO CONTENT */}
      <Helmet>
        <title>Hiaido | Contact Us</title>
        <meta
          name="description"
          content="Get in touch with Hiaido. Contact us for any inquiries about our AI-powered cloud operations automation platform."
        />
        <meta
          name="keywords"
          content="Hiaido, Contact Us, AI, Cloud Operations, Automation, Inquiries"
        />
        <meta name="author" content="Hiaido" />
      </Helmet>

      {/* MAIN CONTENT */}
      <div className="mt-40">
        <Contact />
      </div>
    </>
  );
};
export default ContactUs;
