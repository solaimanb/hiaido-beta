import { Helmet } from "react-helmet-async";

const ethicalSections = [
  {
    title: "Intellectual Property Rights",
    content: [
      "**Ownership and Rights:** All proprietary AI technologies, algorithms, models, and related intellectual property developed by Hiaido Cloud Automation Pvt. Ltd are our exclusive property. Unauthorized use, reproduction, or distribution of these assets is strictly prohibited.",
    ],
  },
  {
    title: "Use of AI Services",
    content: [
      "**Permitted Use:** Our AI services are intended for lawful and legitimate purposes only. Users are granted a non-exclusive, non-transferable license to access and use the AI services solely for their internal business operations.",
      "**Prohibited Activities:** Users are prohibited from reverse engineering, decompiling, or otherwise attempting to derive the source code of our AI technologies. Unauthorized access or misuse of AI outputs for harmful, fraudulent, or unethical purposes is strictly forbidden.",
    ],
  },
  {
    title: "Data Handling and Privacy",
    content: [
      "**Data Usage:** We collect and process user data to enhance and improve our AI services. All data handling practices comply with relevant privacy laws and regulations. We implement advanced data anonymization techniques to ensure user privacy and confidentiality.",
      "**Data Protection:** We are committed to safeguarding user data through robust security measures, including encryption, access controls, and regular security audits.",
    ],
  },
  {
    title: "AI Ethics and Bias",
    content: [
      "**Ethical AI:** Hiaido Cloud Automation Pvt. Ltd is committed to ethical AI practices. We strive to mitigate bias, ensure fairness, and maintain transparency in AI decision-making processes. Our AI models undergo rigorous testing to detect and correct any biases.",
      "**User Responsibility:** We encourage users to report any perceived biases or ethical concerns related to our AI outputs. Your feedback is invaluable in helping us maintain high ethical standards.",
    ],
  },
  {
    title: "AI Service Limitations",
    content: [
      "**Accuracy and Reliability:** While our AI technology is state-of-the-art, it is not infallible. Users should be aware that AI-generated outputs may contain inaccuracies and should not be solely relied upon for critical decisions. Human oversight is recommended.",
      "**Beta Services:** We periodically offer beta versions of new AI features. These beta services are provided on an 'as-is' basis and may contain bugs or errors. Users should exercise caution and provide feedback to help us improve these features.",
    ],
  },
  {
    title: "Innovation and Updates",
    content: [
      "**Continuous Improvement:** We are dedicated to continuous improvement and innovation in AI technology. Regular updates and enhancements will be deployed to ensure our services remain cutting-edge and effective.",
      "**User Feedback:** We highly value user feedback and encourage you to share your experiences and suggestions. Your input plays a crucial role in refining and advancing our AI technologies.",
    ],
  },
  {
    title: "Startup Support",
    content: [
      "**Customer Support:** We provide comprehensive support to assist users in understanding and integrating our AI technologies. Our support team is available to address any questions or issues you may encounter.",
      "**Community Engagement:** Join our community of early adopters and AI enthusiasts. Participate in forums, share your experiences, and collaborate with others to shape the future of AI.",
    ],
  },
  {
    title: "Compliance and Legal Considerations",
    content: [
      "**Regulatory Compliance:** Hiaido Cloud Automation Pvt. Ltd adheres to all relevant regulations and standards in AI and data protection. Our practices are designed to comply with global data privacy laws.",
      "**Liability Limitations:** Given the experimental nature of some AI technologies, our liability is limited to the maximum extent permitted by law. Users assume all risks associated with the use of our AI services.",
    ],
  },
  {
    title: "Partnership Opportunities",
    content: [
      "**Collaborations:** We welcome partnerships and collaborations with organizations, researchers, and developers in the AI field. Together, we can drive innovation and create impactful AI solutions.",
    ],
  },
];

const EthicalAI = () => {

  const processContent = (content) => {
    const htmlContent = content
      .replace(/\n/g, "<br/>")
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    return { __html: htmlContent };
  };

  return (
    <>
      {/* SEO CONTENT */}
      <Helmet>
        <title>Hiaido | Ethical AI Principles</title>
        <meta
          name="description"
          content="Learn about Hiaido's Ethical AI Principles, including intellectual property rights, data handling and privacy, AI ethics, limitations, compliance, and partnership opportunities."
        />
        <meta
          name="keywords"
          content="Hiaido, Ethical AI, AI Principles, Intellectual Property, Data Privacy, AI Ethics, Compliance, Partnership"
        />
        <meta name="author" content="Hiaido" />
      </Helmet>

      {/* MAIN CONTENT */}
      <div className="md:mt-40 max-w-4xl px-4 mx-auto mt-32 space-y-4">
        {ethicalSections.map((section, index) => (
          <div key={index}>
            <h1 className="text-xl font-bold">{section.title}</h1>
            <div className="opacity-90">
              {section.content.map((paragraph, idx) => (
                 <p
                 key={idx}
                 className="py-1"
                 dangerouslySetInnerHTML={processContent(paragraph)}
               ></p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default EthicalAI