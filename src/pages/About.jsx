import logo from "../assets/images/hiaido-logo.png";
import robot from "../assets/images/robot.png";
import { Link } from "react-router-dom";


const coreFunctionalities = [
  {
    title: "Create",
    description:
      "Quickly provision new resources across multiple cloud platforms using natural language commands, enabling you to deploy infrastructure and services with ease.",
  },
  {
    title: "Describe",
    description:
      "Gain insights into your cloud resources by requesting detailed descriptions and configurations, allowing you to better understand and manage your environment.",
  },
  {
    title: "Update",
    description:
      "Modify and update existing cloud resources seamlessly, ensuring that your infrastructure evolves to meet changing business needs and requirements.",
  },
  {
    title: "List",
    description:
      "Easily retrieve lists of resources and their associated properties, enabling you to efficiently track and manage your cloud assets.",
  },
  {
    title: "Delete",
    description:
      "Safely remove unnecessary resources from your cloud environment, optimizing costs and streamlining operations by eliminating unused or outdated infrastructure.",
  },
];

const productPortfolio = [
  {
    title: "AI Cloud Engineer",
    description:
      "Your digital assistant for seamless cloud management; assign tasks and get them delivered promptly.",
  },
  {
    title: "Einstein Framework",
    description:
      "Meet Einstein, a super-intelligent framework designed to handle special and complex requirements with unparalleled efficiency and intelligence.",
  },
  {
    title: "Sandh.ai",
    description:
      "Your marketplace for AI agents tailored to your unique requirements. Rent or hire purpose-built AI agents to work on specific activities.",
  },
];

const keyFeatures = [
  {
    title: "Smart Web Portal",
    description:
      "Your intuitive hub for seamless cloud automation, management, and everything.",
  },
  {
    title: "Natural Language Interface",
    description:
      "Interact with the cloud platform using natural language commands, making it intuitive and user-friendly.",
  },
  {
    title: "Universal Search Bar",
    description:
      "Instantly access comprehensive details of your cloud ecosystem, resources, and predefined fields.",
  },
  {
    title: "Actionable Alerts",
    description:
      "Stay informed with actionable alerts that provide instant notifications when critical events occur in your cloud environment.",
  },
  {
    title: "Security. Automated",
    description:
      "Stop wasting time on manual security tasks. HIAIDO, the world's first AI-powered cloud automation platform, automates security configurations and compliance checks, freeing you to focus on innovation.",
  },
  {
    title: "Recommendations Engine",
    description:
      "Unlock the full potential of your cloud environment with personalized recommendations tailored to your specific usage patterns and business needs.",
  },
  {
    title: "JIRA Integration",
    description:
      "Streamline your workflow by integrating with JIRA, allowing you to seamlessly manage tasks and projects directly from the HIAIDO platform.",
  },
];

const About = () => {
  return (
    <main className="container mt-40" id="about">
      <div className="flex justify-center lg:justify-start">
        <h1 className="text-3xl font-bold border border-orange-500/30 px-4 py-2 rounded-xl w-fit">
          About us
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <section className="space-y-10 border border-orange-500/30 p-4 rounded-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Welcome to HIAIDO</h2>
            <p className="opacity-80">
              Your ultimate cloud automation platform tailored for comprehensive
              cloud management.
            </p>

            <p className="opacity-80">
              We&apos;ve developed a powerful chat-based interface that lets you
              interact with the cloud using natural language commands,
              eliminating the need for complex scripts or manual configurations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Core Functionalities
            </h2>
            <ul className="space-y-2">
              {coreFunctionalities.map((item, index) => (
                <li key={index}>
                  <span className="font-bold inline-block">{item.title}:</span>{" "}
                  <p className="opacity-80 inline">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Our Product Portfolio
            </h2>
            <ul className="space-y-2">
              {productPortfolio.map((item, index) => (
                <li key={index}>
                  <span className="font-bold inline-block">{item.title}:</span>{" "}
                  <p className="opacity-80 inline">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="flex flex-col items-center">
          <img src={robot} alt="hiaido" className="lg:scale-150" />

          <div className="border rounded-lg border-orange-500/30 px-2 mt-4 w-fit flex gap-2 text-center space-x-2 font-semibold">
            <Link target="_blank" to="https://www.linkedin.com">
              LinkedIn
            </Link>
            <Link target="_blank" to="https://www.facebook.com">
              Facebook
            </Link>
            <Link target="_blank" to="https://www.twitter.com">
              Twitter
            </Link>
          </div>
        </section>

        <section className="">
          <div className="space-y-10 border border-orange-500/30 p-4 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-2">
              {keyFeatures.map((item, index) => (
                <li key={index}>
                  <span className="font-bold inline-block">{item.title}:</span>{" "}
                  <p className="opacity-80 inline">{item.description}</p>
                </li>
              ))}
            </ul>

            <p>
              We hope you will love using our products and services as much as
              we enjoyed building them.
            </p>

            <p>
              Welcome to the world of cloud automation with{" "}
              <span className="font-bold inline-block">HIAIDO</span>
            </p>
          </div>

          <div className="mt-20 lg:mt-40 flex justify-center opacity-20">
            <img src={logo} alt="hiaido" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
