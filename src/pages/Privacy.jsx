import { Helmet } from "react-helmet-async";
import { hiaido } from "../assets";

const sections = [
  {
    title: "Privacy Policy",
    content:
      "At HIAIDO, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or use our services.",
  },
  {
    title: "Information Collection and Use",
    content:
      "We collect personal information such as name, email address, and contact details when you sign up for our services or interact with our website. This information is used to provide and improve our services, communicate with you, and personalize your experience.",
  },
  {
    title: "Data Security",
    content:
      "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our systems are regularly monitored and updated to ensure the highest level of security.",
  },
  {
    title: "Cookie Policy",
    content:
      "We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. By using our website, you consent to the use of cookies as described in our Cookie Policy.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. After that, we securely dispose of or anonymize your data.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this page periodically for the latest information. If you have any questions or concerns about our Privacy Policy, please contact us at contact@hiaido.com",
    link: "mailto:contact@hiaido.com",
  },
  {
    title: "Terms and Conditions",
    content:
      "Welcome to HIAIDO! By accessing our website and using our services, you agree to comply with these Terms and Conditions. Please read this document carefully before proceeding.",
  },
  {
    title: "Service Availability",
    content:
      "HIAIDO's cloud automation platform is open to users of all backgrounds and ages. We welcome individuals from diverse communities and cultures to utilize our services. Our platform is inclusive and aims to empower users worldwide to harness the power of cloud automation without discrimination based on age, race, religion, or any other factors.",
  },
  {
    title: "User Conduct",
    content:
      "You agree to use our services for lawful purposes and in compliance with all applicable laws and regulations. You shall not engage in any conduct that violates the rights of others or inhibits their use of the services.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content and materials provided on our website and within our services, including but not limited to text, graphics, logos, and software, are the property of HIAIDO or its licensors and are protected by intellectual property laws.",
  },
  {
    title: "Disclaimer of Warranties",
    content:
      "Our services are provided on an &quote;as is&quote; and &quote;as available&quote; basis without warranties of any kind, whether express or implied. We make no representations or warranties regarding the accuracy, reliability, or completeness of the content provided.",
  },
  {
    title: "Limitation of Liability",
    content:
      "In no event shall HIAIDO or its affiliates be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services, even if advised of the possibility of such damages.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of Indian government, without regard to its conflict of law provisions.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions or concerns about these Terms and Conditions, please contact us at contact@hiaido.com",
    link: "mailto:contact@hiaido.com",
  },
];

const Privacy = () => {
  window.scrollTo(0, 0);

  return (
    <>
      {/* SEO CONTENT */}
      <Helmet>
        <title>Hiaido | Privacy Policy</title>
        <meta
          name="description"
          content="Read Hiaido's Privacy Policy. Learn how we collect, use, and protect your personal information."
        />
        <meta
          name="keywords"
          content="Hiaido, Privacy Policy, Personal Information, Data Protection"
        />
        <meta name="author" content="Hiaido" />
      </Helmet>

      {/* MAIN CONTENT */}
      <div className="min-h-screen overflow-hidden">
        <div className="md:mt-40 max-w-4xl px-4 mx-auto mt-32 space-y-4">
          <div className="flex justify-center">
            <img
              className="mb-5"
              src={hiaido}
              height={200}
              width={200}
              alt="hiaido"
            />
          </div>

          <div className="horizon-bar opacity-30 container h-[1px] mt-4 bg-orange-400" />

          {sections.map((section, index) => (
            <div key={index}>
              <h1 className="text-2xl bold-title">{section.title}</h1>
              <p className="opacity-90 text-sm">
                {section.link
                  ? section.content.replace(
                      section.link.replace("mailto:", ""),
                      ""
                    )
                  : section.content}
              </p>
              {section.link && (
                <a href={section.link} className="text-blue-300 underline">
                  {section.link.replace("mailto:", "")}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Privacy;
