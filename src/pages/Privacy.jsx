import { useEffect } from "react";
import { hiaido } from "../assets";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black/90 min-h-screen overflow-hidden">
      <div className="md:mt-40 max-w-4xl mx-auto mt-20 space-y-4">
        <div>
          <div className="flex justify-center">
            <img
              className="mb-5"
              src={hiaido}
              height={200}
              width={200}
              alt="hiaido"
            />
          </div>

          <h1 className=" text-xl font-bold">Privacy Policy</h1>
          <p className="font-roboto ">
            At HIAIDO, we are committed to protecting your privacy and ensuring
            the security of your personal information. This Privacy Policy
            outlines how we collect, use, and safeguard your data when you visit
            our website or use our services.
          </p>
        </div>

        <div>
          <h1 className=" text-xl font-bold">Information Collection and Use</h1>
          <p className="font-roboto ">
            We collect personal information such as name, email address, and
            contact details when you sign up for our services or interact with
            our website. This information is used to provide and improve our
            services, communicate with you, and personalize your experience.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Data Security</h1>
          <p className="font-roboto ">
            We implement industry-standard security measures to protect your
            personal information from unauthorized access, alteration,
            disclosure, or destruction. Our systems are regularly monitored and
            updated to ensure the highest level of security.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Cookie Policy</h1>
          <p className="font-roboto ">
            We use cookies and similar tracking technologies to enhance your
            browsing experience and analyze website traffic. By using our
            website, you consent to the use of cookies as described in our
            Cookie Policy.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Data Retention</h1>
          <p className="font-roboto ">
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy or as required
            by law. After that, we securely dispose of or anonymize your data.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Changes to This Policy</h1>
          <p className="font-roboto ">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We encourage you to
            review this page periodically for the latest information. If you
            have any questions or concerns about our Privacy Policy, please
            contact us at
            <a href="mailto:contact@hiaido.com" className=" ml-2 underline">
              contact@hiaido.com
            </a>
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Terms and Conditions</h1>
          <p className="font-roboto ">
            Welcome to HIAIDO! By accessing our website and using our services,
            you agree to comply with these Terms and Conditions. Please read
            this document carefully before proceeding.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Service Availability</h1>
          <p className="font-roboto ">
            HIAIDO&apos;s cloud automation platform is open to users of all
            backgrounds and ages. We welcome individuals from diverse
            communities and cultures to utilize our services. Our platform is
            inclusive and aims to empower users worldwide to harness the power
            of cloud automation without discrimination based on age, race,
            religion, or any other factors.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">User Conduct</h1>
          <p className="font-roboto ">
            You agree to use our services for lawful purposes and in compliance
            with all applicable laws and regulations. You shall not engage in
            any conduct that violates the rights of others or inhibits their use
            of the services.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Intellectual Property</h1>
          <p className="font-roboto ">
            All content and materials provided on our website and within our
            services, including but not limited to text, graphics, logos, and
            software, are the property of HIAIDO or its licensors and are
            protected by intellectual property laws.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Disclaimer of Warranties</h1>
          <p className="font-roboto ">
            Our services are provided on an &quote;as is&quote; and &quote;as
            available&quote; basis without warranties of any kind, whether
            express or implied. We make no representations or warranties
            regarding the accuracy, reliability, or completeness of the content
            provided.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Limitation of Liability</h1>
          <p className="font-roboto ">
            In no event shall HIAIDO or its affiliates be liable for any
            indirect, incidental, special, or consequential damages arising out
            of or in connection with your use of our services, even if advised
            of the possibility of such damages.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Governing Law</h1>
          <p className="font-roboto ">
            These Terms and Conditions shall be governed by and construed in
            accordance with{" "}
            <a
              className="underline"
              href="https://www.meity.gov.in/data-protection-framework"
            >
              the laws of Indian government
            </a>
            , without regard to its conflict of law provisions.
          </p>
        </div>
        <div>
          <h1 className=" text-xl font-bold">Contact Us</h1>
          <p className="font-roboto ">
            If you have any questions or concerns about these Terms and
            Conditions, please contact us at{" "}
            <a href="mailto:contact@hiaido.com" className="underline">
              contact@hiaido.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Privacy;
