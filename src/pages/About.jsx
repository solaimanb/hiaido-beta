import logo from "../assets/images/hiaido-logo.png";
import robot from "../assets/images/robot.png";
import glow from "../assets/images/glow.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main
      className="container mt-40 space-y-8"
      id="about"
    >
      <div className="flex justify-center lg:justify-start">
        <h1 className="text-3xl font-bold border border-orange-500/30 px-4 py-2 rounded-xl w-fit">About us</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <section className="space-y-10 border border-orange-500/30 p-4 rounded-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Welcome to HIAIDO</h2>
            <p>Your ultimate cloud automation platform tailored for comprehensive cloud management.</p>

            <p>We&apos;ve developed a powerful chat-based interface that lets you interact with the cloud using natural language commands, eliminating the need for complex scripts or manual configurations.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Core Functionalities</h2>
            <ul className="space-y-2">
              <li><span className="font-bold inline-block">Create:</span> Quickly provision new resources across multiple cloud platforms using natural language commands, enabling you to deploy infrastructure and services with ease.</li>
              <li><span className="font-bold inline-block">Describe:</span> Gain insights into your cloud resources by requesting detailed descriptions and configurations, allowing you to better understand and manage your environment.</li>
              <li><span className="font-bold inline-block">Update:</span> Modify and update existing cloud resources seamlessly, ensuring that your infrastructure evolves to meet changing business needs and requirements.</li>
              <li><span className="font-bold inline-block">List:</span> Easily retrieve lists of resources and their associated properties, enabling you to efficiently track and manage your cloud assets.</li>
              <li><span className="font-bold inline-block">Delete:</span> Safely remove unnecessary resources from your cloud environment, optimizing costs and streamlining operations by eliminating unused or outdated infrastructure.</li>
            </ul>
          </div>

          <div className="">
            <h2 className="text-2xl font-semibold mb-4">Our Product Portfolio</h2>
            <ul className="space-y-2">
              <li><span className="font-bold inline-block">AI Cloud Engineer:</span> Your digital assistant for seamless cloud management; assign tasks and get them delivered promptly.</li>
              <li><span className="font-bold inline-block">Einstein Framework:</span> Meet Einstein, a super-intelligent framework designed to handle special and complex requirements with unparalleled efficiency and intelligence.</li>
              <li><span className="font-bold inline-block">Sandh.ai:</span> Your marketplace for AI agents tailored to your unique requirements. Rent or hire purpose-built AI agents to work on specific activities.</li>
            </ul>
          </div>
        </section>

        <section
          className="mt-auto flex flex-col justify-center items-center"
        >
          {/* <img src={glow} alt="hiaido" className="scale-150" /> */}
          <img src={robot} alt="hiaido" className="lg:scale-150" />

          <div className="border rounded-lg border-orange-500/30 px-2 mt-4 w-fit flex gap-2 text-center space-x-2 font-semibold">
            <Link href="https://www.linkedin.com">LinkedIn</Link>
            <Link href="https://www.facebook.com">Facebook</Link>
            <Link href="https://www.twitter.com">Twitter</Link>
          </div>
        </section>

        <section className="">
          <div className="space-y-10 border border-orange-500/30 p-4 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-2">
              <li><span className="font-bold inline-block">Smart Web Portal:</span> Your intuitive hub for seamless cloud automation, management, and everything.</li>
              <li><span className="font-bold inline-block">Natural Language Interface:</span> Interact with the cloud platform using natural language commands, making it intuitive and user-friendly.</li>
              <li><span className="font-bold inline-block">Universal Search Bar:</span> Instantly access comprehensive details of your cloud ecosystem, resources, and predefined fields.</li>
              <li><span className="font-bold inline-block">Actionable Alerts:</span> Stay informed with actionable alerts that provide instant notifications when critical events occur in your cloud environment.</li>
              <li><span className="font-bold inline-block">Security. Automated:</span> Stop wasting time on manual security tasks. HIAIDO, the world&apos;s first AI-powered cloud automation platform, automates security configurations and compliance checks, freeing you to focus on innovation.</li>
              <li><span className="font-bold inline-block">Recommendations Engine:</span> Unlock the full potential of your cloud environment with personalized recommendations tailored to your specific usage patterns and business needs.</li>
              <li><span className="font-bold inline-block">JIRA Integration:</span> Streamline your workflow by integrating with JIRA, allowing you to seamlessly manage tasks and projects directly from the HIAIDO platform.</li>
            </ul>
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
