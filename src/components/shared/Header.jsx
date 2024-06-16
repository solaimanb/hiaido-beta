import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { NavLink } from "react-router-dom";
import { navigation } from "../../constants";
import MenuSvg from "../../assets/svg/MenuSvg";
import { useEffect, useState } from "react";
import AnimatedBtn from "../Buttons/AnimatedBtn";
import {
  BellRing,
  CloudFog,
  Cpu,
  SearchCode,
  ShoppingBag,
  ShieldCheck,
  LifeBuoy,
  HandCoins,
  Computer,
  Wallet,
  Box,
  LayoutDashboard,
  GitMerge,
  Brain,
  Server,
  TicketPercent,
  Workflow,
  HardDriveUpload,
  ShieldEllipsis,
  BrainCircuit,
  LayoutPanelTop,
  BotMessageSquare,
  MessageCircleDashed,
  ComputerIcon,
  Cloudy,
  Grid2x2Check,
} from "lucide-react";

import { hiaido } from "../../assets";
// import AnimatedText from "./AnimatedText";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useAuthenticator } from "@aws-amplify/ui-react";

const navItems = [
  // { name: "Hiring", path: "/hiring" },
  { name: "About", path: "/about" },
  {
    name: "Products",
    path: "/",
    subNav: [
      {
        name: "AI Cloud Engineer",
        description:
          "Your digital assistant for seamless cloud management. Assign tasks and get them delivered promptly with our AI-powered Cloud Engineer. Say goodbye to manual processes and hello to efficient cloud operations.",
        icon: CloudFog,
      },
      {
        name: "Intelligent Chatbot",
        description:
          "Our state-of-the-art AI technology, get the job done with the power of natural language interaction with our advanced AI-driven chatbot. Seamlessly integrated into our cloud automation platform, it acts as a virtual assistant, executing commands, providing real-time insights, and guiding users through intricate processes effortlessly.",
        icon: BotMessageSquare,
      },
      {
        name: "Smart Web Portal",
        description:
          "Your intuitive hub for seamless cloud automation, management, and everything in between. Our Smart Web Portal simplifies complex tasks and provides a user-friendly experience for all your cloud needs.",
        icon: LayoutPanelTop,
      },
      {
        name: "Einstein",
        description:
          "Meet Einstein, our super-intelligent framework built to handle special and complex requirements with unparalleled efficiency and intelligence. Let Einstein optimize your cloud operations and drive innovation in your organization.",
        icon: Cpu,
      },
      {
        name: "Sandh.ai",
        description:
          "Hire or Rent AI Agents. Sandhai is Hiaido's marketplace offering purpose-built AI agents tailored to your unique requirements. Access a diverse array of specialized AI agents for specific tasks or expertise in niche areas.",
        icon: ShoppingBag,
      },
    ],
  },
  {
    name: "Features",
    path: "/",
    subNav: [
      {
        name: "Natural Language Interface",
        description:
          "Interact with the cloud platform using natural language commands, making it intuitive and user-friendly. Our Natural Language Interface enables you to communicate with your cloud environment effortlessly, streamlining your workflow.",
        icon: BrainCircuit,
      },
      {
        name: "Universal Search Bar",
        description:
          "Instantly access comprehensive details of your cloud ecosystem, resources, and predefined fields with our Universal Search Bar. Enjoy quick and intuitive navigation for enhanced productivity.",
        icon: SearchCode,
      },
      {
        name: "Actionable Alerts",
        description:
          "Stay informed with actionable alerts that provide instant notifications when critical events occur in your cloud environment. Our intelligent alerts empower you to proactively address issues before they impact your users, ensuring seamless operations.",
        icon: BellRing,
      },
      {
        name: "Security. Automated.",
        description:
          "Stop wasting time on manual security tasks. Hiaido automates security configurations and compliance checks, freeing you to focus on innovation. Our AI-powered platform ensures your cloud environment is secure, compliant, and efficient.",
        icon: ShieldCheck,
      },
      {
        name: "Recommendations Engine",
        description:
          "Unlock the full potential of your cloud environment with personalized recommendations tailored to your specific usage patterns and business needs. Our AI-driven recommendation engine analyzes your cloud usage data and provides actionable insights to optimize performance, reduce costs, and enhance security.",
        icon: LifeBuoy,
      },
      {
        name: "Blockchain-based Security Ledger",
        description:
          "Enhance security and trust with a blockchain-powered security ledger. This feature provides an immutable record of all access attempts and resource modifications, ensuring complete transparency and accountability within your cloud environment.",
        icon: HandCoins,
      },
      {
        name: "Chaos Engineering Integration",
        description:
          "Stress test your cloud infrastructure proactively with integrated chaos engineering tools. This feature simulates disruptions and failures, helping you identify and address potential weak points before they impact your users.",
        icon: Computer,
      },
      {
        name: "Cost Optimization",
        description:
          "Get personalized recommendations to optimize your cloud spending. Leverage our insights to identify underutilized resources and find cost-saving opportunities.",
        icon: Wallet,
      },
      {
        name: "Compliance Management Pack",
        description:
          "Ensure compliance with industry regulations and standards with our Compliance Management Pack. This feature provides pre-configured policies and automated checks to help you maintain compliance and mitigate risks in your cloud environment.",
        icon: Box,
      },
      {
        name: "Unified Dashboard",
        description:
          "Gain visibility and control over your entire cloud environment with our Unified Dashboard. This feature provides a single pane of glass view of your resources and performance metrics, enabling you to monitor and manage your cloud infrastructure efficiently.",
        icon: LayoutDashboard,
      },
      {
        name: "Code Review & Optimization",
        description:
          "Automate code reviews and optimizations to ensure your cloud applications are secure, efficient, and scalable. This feature analyzes your codebase, identifies potential issues and bottlenecks, and provides recommendations for improvement, streamlining your development process.",
        icon: GitMerge,
      },
      {
        name: "Predictive Maintenance Suite",
        description:
          "Proactively maintain and optimize your cloud infrastructure with our Predictive Maintenance Suite. This feature leverages AI and machine learning algorithms to predict and prevent potential failures, minimizing downtime and maximizing resource utilization.",
        icon: Server,
      },
      {
        name: "AI-Powered Anomaly Detection",
        description:
          "Detect and respond to anomalies in your cloud environment in real-time with our AI-Powered Anomaly Detection feature. This feature analyzes telemetry data and identifies abnormal behavior patterns, helping you mitigate security threats and performance issues before they escalate.",
        icon: Brain,
      },
      {
        name: "Resource Fusion Engine",
        description:
          "Optimize resource allocation and utilization across your cloud environment with our Resource Fusion Engine. This feature aggregates and consolidates resources from multiple clouds, enabling you to maximize efficiency and reduce costs.",
        icon: TicketPercent,
      },
      {
        name: "Autonomous Optimization Matrix",
        description:
          "Streamline and automate optimization tasks with our Autonomous Optimization Matrix. This feature uses AI algorithms to continuously analyze and adjust your cloud resources for optimal performance and cost efficiency, freeing you from manual optimization efforts.",
        icon: Workflow,
      },
      {
        name: "Data Migration",
        description:
          "Effortlessly migrate data from local folders or on-prem to the cloud with HIAIDO's intuitive data migration feature, enabling smooth transition and accessibility.",
        icon: HardDriveUpload,
      },
      {
        name: "Blockchain-Based Governance",
        description:
          "Ensure transparent and tamper-proof auditing of cloud operations, enhancing trust and accountability in multi-tenant environments with a blockchain-based governance framework.",
        icon: ShieldEllipsis,
      },
    ],
  },
  {
    name: "Integrations",
    path: "/",
    subNav: [
      {
        name: "Multi-Cloud Connectivity",
        description:
          "Harness the power of multiple cloud providers with ease. HIAIDO seamlessly integrates with AWS, Azure, and GCP, enabling you to manage resources across different clouds effortlessly. Achieve flexibility and scalability without the hassle of managing multiple platforms.",
        icon: Cloudy,
      },
      {
        name: "JIRA Integration",
        description:
          "Streamline your workflow with our JIRA integration. Connect HIAIDO with your existing project management tools to seamlessly manage tasks, track progress, and collaborate with your team. Increase efficiency and productivity with integrated workflows.",
        icon: Grid2x2Check,
      },
      {
        name: "Virtual Assistant",
        description: "For advanced conversational AI capabilities, our Virtual Assistant empowers users to seamlessly interact with the platform using natural language voice commands. Fully integrated with HIAIDO, it delivers personalized assistance, tailored recommendations, and performs diverse functional tasks, elevating user experience and boosting productivity.",
        icon: MessageCircleDashed,
      }, {
        name: "Chaos Engineering",
        description: "Stress test your cloud infrastructure proactively with integrated chaos engineering tools. This feature simulates disruptions and failures, helping you identify and address potential weak points before they impact your users.",
        icon: ComputerIcon,
      }
    ],
  },
  { name: "Enterprise", path: "/" },
  { name: "Pricing", path: "/pricing" },
];

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [user, setUser] = useState();
  const [hoveredNavItem, setHoveredNavItem] = useState(null);

  const { signOut } = useAuthenticator((context) => [
    context.signOut,
    context.authStatus,
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Parse the user data from JSON
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const toggleNavigation = () => {
    setOpenNavigation((prevState) => !prevState);

    if (!openNavigation) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out transform backdrop-blur-2xl pt-3 px-4 md:px-2
      `}
    >
      <div className="container relative flex items-center justify-between w-full px-4">
        <div className="z-50 flex items-center w-full py-2 gap-x-8">
          <NavLink className="block" to="/">
            <img src={hiaido} alt="hiaido" className="w-24 md:w-40 lg:w-48" />
          </NavLink>

          <nav className="hidden w-full lg:block">
            <div className="flex gap-6 ">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredNavItem(item.name)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <NavLink
                    className="w-28 py-4 hover:text-orange-400/100 font-[400] text-center text-white/70 transition-all duration-300 ease-in-out relative"
                    to={item?.path}
                  >
                    {` ${item?.name}`}

                    {item.subNav && hoveredNavItem === item.name &&
                      <div className="indicator absolute h-2 w-full bottom-0 left-[20%]">
                        <svg
                          width="40"
                          height="30"
                          viewBox="0 0 158 141"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M63.4115 9.00003C70.3397 -2.99997 87.6603 -3 94.5885 9L155.21 114C162.138 126 153.478 141 139.622 141H18.3783C4.52185 141 -4.13844 126 2.78976 114L63.4115 9.00003Z"
                            fill="#111827"
                          />
                        </svg>
                      </div>
                    }

                  </NavLink>


                  {item.subNav && hoveredNavItem === item.name && (
                    <div className="absolute left-0 z-10 w-full pt-4 shadow-lg top-12 xl:top-14">
                      <div className="p-4 bg-gray-900 grid w-full grid-cols-1 gap-4 lg:grid-cols-3 overflow-y-scroll rounded-xl backdrop-blur-lg max-h-[60vh]">
                        {item.subNav.map((subItem, subIndex) => {
                          const Icon = subItem.icon;
                          return (
                            <div
                              key={subIndex}
                              className="p-4 space-y-2 rounded-lg bg-gray-800/50 hover:bg-gray-700"
                            >
                              <div className="flex items-center space-x-2">
                                {/* icon */}
                                <Icon className="w-6 h-6 text-orange-500/80" />
                                <NavLink
                                  className="block text-lg font-bold text-white"
                                  to={`#${subItem.name
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}`}
                                >
                                  {subItem.name}
                                </NavLink>
                              </div>
                              <p className="text-sm text-gray-400">
                                {subItem.description}
                              </p>
                            </div>
                          );
                        })}

                        {/* <div className="absolute z-0 w-10 h-10 rounded-lg -top-3 left-24">
                          <svg
                            width="40"
                            height="30"
                            viewBox="0 0 158 141"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M63.4115 9.00003C70.3397 -2.99997 87.6603 -3 94.5885 9L155.21 114C162.138 126 153.478 141 139.622 141H18.3783C4.52185 141 -4.13844 126 2.78976 114L63.4115 9.00003Z"
                              fill="#111827"
                            />
                          </svg>
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex items-center justify-center gap-4 px-5 ">
          <AnimatedBtn
            to={"/chat"}
            className="hidden font-semibold text-nowrap lg:block"
            outlined={true}
          >
            Start Free Trial
          </AnimatedBtn>

          {user ? (
            <Link to={"/chat"}>
              <AvatarIcon
                width={26}
                height={26}
                src={user.avatarUrl}
                className="hidden text-orange-500 lg:block"
              />
            </Link>
          ) : (
            <AnimatedBtn
              to={"/login"}
              className="hidden font-semibold lg:block"
            >
              Login
            </AnimatedBtn>
          )}

          <button
            className={`${openNavigation ? "hidden" : ""} lg:hidden ml-auto`}
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </button>
        </div>
      </div>

      <div className="horizon-bar opacity-30 container h-[1px] mt-4 bg-orange-400" />

      {/* Small Screen Toggle Nav */}
      <nav
        className={`${openNavigation
          ? "fixed top-0 bottom-0 left-0 flex translate-x-0 transition duration-500 ease-in-out bg-black h-[100vh]"
          : "flex -translate-x-full transition-all duration-500 ease-in-out opacity-0 bg-black h-[100vh]"
          } flex flex-col justify-between bg-black/90 fixed top-0 left-0 w-[90%] md:w-[80%] z-50 duration-300 ease-in-out transform backdrop-blur-3xl border border-orange-400/20 p-4`}
      >
        <div className="p-2">
          {/* Brand Logo */}
          <div className="flex items-center justify-between">
            <NavLink className="block xl:mr-8 w-fit" to="/">
              <img src={hiaido} alt="hiaido" className="w-24 md:w-40" />
            </NavLink>

            <button className="ml-auto lg:hidden" onClick={toggleNavigation}>
              <MenuSvg openNavigation={openNavigation} />
            </button>
          </div>

          <div className="pt-4 space-y-6">
            {navigation.map((item) => (
              <Link
                key={item?.id}
                to={item?.to}
                onClick={handleClick}
                className={`block relative uppercase text-white/80 border-orange-800/10 bg-orange-900/5 border p-2 rounded-md font-semibold ${item?.onlyMobile ? "lg:hidden" : ""
                  } ${item?.url === pathname.hash
                    ? "font-bold text-orange-400/80"
                    : "lg:text-n-1/50"
                  }`}
              >
                {item?.title}
              </Link>
            ))}
            <Link
              onClick={() => user && signOut()}
              className={`block relative uppercase text-white/80 border-orange-800/10 bg-orange-900/5 border p-2 rounded-md font-semibold
                `}
            >
              {user ? "Sign Out" : "Sign In"}
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="horizon-bar opacity-30 h-[1px] bg-orange-400" />

          <p className="text-xs font-semibold lg:block text-white/80">
            © {new Date().getFullYear()} HIAIDO All rights reserved.
          </p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
