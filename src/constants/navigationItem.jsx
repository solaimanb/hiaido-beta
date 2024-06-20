export const navigation = [
  { name: "About", path: "/about",
    onlyMobile: true,
   },
  {
    name: "Products",
    path: "/",
    onlyMobile: true,
    subNav: [
      {
        name: "AI Cloud Engineer",
        description: "Your digital assistant for seamless cloud management. Assign tasks and get them delivered promptly with our AI-powered Cloud Engineer. Say goodbye to manual processes and hello to efficient cloud operations.",
        icon: <span className="material-symbols-outlined">
        cloud_sync
        </span>,
      },
      {
        name: "Intelligent Chatbot",
        description: "Our state-of-the-art AI technology, get the job done with the power of natural language interaction with our advanced AI-driven chatbot. Seamlessly integrated into our cloud automation platform, it acts as a virtual assistant, executing commands, providing real-time insights, and guiding users through intricate processes effortlessly.",
        icon: <span className="material-symbols-outlined">smart_toy</span>,
      },
      {
        name: "Smart Web Portal",
        description: "Your intuitive hub for seamless cloud automation, management, and everything in between. Our Smart Web Portal simplifies complex tasks and provides a user-friendly experience for all your cloud needs.",
        icon: <span className="material-symbols-outlined">web</span>,
      },
      {
        name: "Einstein",
        description: "Meet Einstein, our super-intelligent framework built to handle special and complex requirements with unparalleled efficiency and intelligence. Let Einstein optimize your cloud operations and drive innovation in your organization.",
        icon: <span className="material-symbols-outlined">psychology</span>,
      },
      {
        name: "Sandh.ai",
        description: "Hire or Rent AI Agents. Sandhai is Hiaido's marketplace offering purpose-built AI agents tailored to your unique requirements. Access a diverse array of specialized AI agents for specific tasks or expertise in niche areas.",
        icon: <span className="material-symbols-outlined">store</span>,
      },
    ],
  },
  {
    name: "Features",
    path: "/",
    onlyMobile: true,
    subNav: [
      {
        name: "Natural Language Interface",
        description: "Interact with the cloud platform using natural language commands, making it intuitive and user-friendly. Our Natural Language Interface enables you to communicate with your cloud environment effortlessly, streamlining your workflow.",
        icon: <span className="material-symbols-outlined">
        interpreter_mode
        </span>,
      },
      {
        name: "Universal Search Bar",
        description: "Instantly access comprehensive details of your cloud ecosystem, resources, and predefined fields with our Universal Search Bar. Enjoy quick and intuitive navigation for enhanced productivity.",
        icon: <span className="material-symbols-outlined">
        policy
        </span>,
      },
      {
        name: "Actionable Alerts",
        description: "Stay informed with actionable alerts that provide instant notifications when critical events occur in your cloud environment. Our intelligent alerts empower you to proactively address issues before they impact your users, ensuring seamless operations.",
        icon: <span className="material-symbols-outlined">
        campaign
        </span>,
      },
      {
        name: "Security. Automated.",
        description: "Stop wasting time on manual security tasks. Hiaido automates security configurations and compliance checks, freeing you to focus on innovation. Our AI-powered platform ensures your cloud environment is secure, compliant, and efficient.",
        icon: <span className="material-symbols-outlined">
        encrypted
        </span>,
      },
      {
        name: "Recommendations Engine",
        description: "Unlock the full potential of your cloud environment with personalized recommendations tailored to your specific usage patterns and business needs. Our AI-driven recommendation engine analyzes your cloud usage data and provides actionable insights to optimize performance, reduce costs, and enhance security.",
        icon: <span className="material-symbols-outlined">
        pattern
        </span>,
      },
      {
        name: "Blockchain-based Security Ledger",
        description: "Enhance security and trust with a blockchain-powered security ledger. This feature provides an immutable record of all access attempts and resource modifications, ensuring complete transparency and accountability within your cloud environment.",
        icon: <span className="material-symbols-outlined">
        currency_bitcoin
        </span>,
      },
      {
        name: "Chaos Engineering Integration",
        description: "Stress test your cloud infrastructure proactively with integrated chaos engineering tools. This feature simulates disruptions and failures, helping you identify and address potential weak points before they impact your users.",
        icon: <span className="material-symbols-outlined">
        engineering
        </span>,
      },
      {
        name: "Cost Optimization",
        description: "Get personalized recommendations to optimize your cloud spending. Leverage our insights to identify underutilized resources and find cost-saving opportunities.",
        icon: <span className="material-symbols-outlined">
        price_check
        </span>,
      },
      {
        name: "Compliance Management Pack",
        description: "Ensure compliance with industry regulations and standards with our Compliance Management Pack. This feature provides pre-configured policies and automated checks to help you maintain compliance and mitigate risks in your cloud environment.",
        icon: <span className="material-symbols-outlined">rule</span>,
      },
      {
        name: "Unified Dashboard",
        description: "Gain visibility and control over your entire cloud environment with our Unified Dashboard. This feature provides a single pane of glass view of your resources and performance metrics, enabling you to monitor and manage your cloud infrastructure efficiently.",
        icon: <span className="material-symbols-outlined">dashboard</span>,
      },
      {
        name: "Code Review & Optimization",
        description: "Automate code reviews and optimizations to ensure your cloud applications are secure, efficient, and scalable. This feature analyzes your codebase, identifies potential issues and bottlenecks, and provides recommendations for improvement, streamlining your development process.",
        icon: <span className="material-symbols-outlined">code</span>,
      },
      {
        name: "Predictive Maintenance Suite",
        description: "Proactively maintain and optimize your cloud infrastructure with our Predictive Maintenance Suite. This feature leverages AI and machine learning algorithms to predict and prevent potential failures, minimizing downtime and maximizing resource utilization.",
        icon: <span className="material-symbols-outlined">precision_manufacturing</span>,
      },
      {
        name: "AI-Powered Anomaly Detection",
        description: "Detect and respond to anomalies in your cloud environment in real-time with our AI-Powered Anomaly Detection feature. This feature analyzes telemetry data and identifies abnormal behavior patterns, helping you mitigate security threats and performance issues before they escalate.",
        icon: <span className="material-symbols-outlined">bug_report</span>,
      },
      {
        name: "Resource Fusion Engine",
        description: "Optimize resource allocation and utilization across your cloud environment with our Resource Fusion Engine. This feature aggregates and consolidates resources from multiple clouds, enabling you to maximize efficiency and reduce costs.",
        icon: <span className="material-symbols-outlined">storage</span>,
      },
      {
        name: "Autonomous Optimization Matrix",
        description: "Streamline and automate optimization tasks with our Autonomous Optimization Matrix. This feature uses AI algorithms to continuously analyze and adjust your cloud resources for optimal performance and cost efficiency, freeing you from manual optimization efforts.",
        icon: <span className="material-symbols-outlined">auto_fix_high</span>,
      },
      {
        name: "Data Migration",
        description: "Effortlessly migrate data from local folders or on-prem to the cloud with HIAIDO's intuitive data migration feature, enabling smooth transition and accessibility.",
        icon: <span className="material-symbols-outlined">cloud_upload</span>,
      },
      {
        name: "Blockchain-Based Governance",
        description: "Ensure transparent and tamper-proof auditing of cloud operations, enhancing trust and accountability in multi-tenant environments with a blockchain-based governance framework.",
        icon: <span className="material-symbols-outlined">gavel</span>,
      },
    ],
  },
  {
    name: "Integrations",
    path: "/",
    onlyMobile: true,
    subNav: [
      {
        name: "Multi-Cloud Connectivity",
        description: "Harness the power of multiple cloud providers with ease. HIAIDO seamlessly integrates with AWS, Azure, and GCP, enabling you to manage resources across different clouds effortlessly. Achieve flexibility and scalability without the hassle of managing multiple platforms.",
        icon: <span className="material-symbols-outlined">
        settings_input_component
        </span>,
      },
      {
        name: "Smart Task mangement",
        description: "Streamline your project management and collaboration with HIAIDO's JIRA integration. Effortlessly track tasks, manage workflows, and ensure seamless coordination between development and operations teams. Enhance productivity and ensure alignment with your project goals.",
        icon: <span className="material-symbols-outlined">
        integration_instructions
        </span>,
      },
      {
        name: "GitHub Integration",
        description: "Simplify your code management and collaboration with HIAIDO's GitHub integration. Seamlessly synchronize your repositories, track changes, and automate deployments for a streamlined development workflow. Enhance code quality and accelerate your software delivery.",
        icon: <span className="material-symbols-outlined">merge_type</span>,
      },
      // {
      //   name: "Kubernetes Integration",
      //   description: "Leverage the power of container orchestration with HIAIDO's Kubernetes integration. Easily manage and scale your containerized applications, automate deployments, and ensure seamless orchestration across your cloud environment. Achieve greater efficiency and reliability in your cloud-native infrastructure.",
      //   icon: <span className="material-symbols-outlined">apps</span>,
      // },
      // {
      //   name: "ServiceNow Integration",
      //   description: "Enhance your IT service management with HIAIDO's ServiceNow integration. Streamline incident management, automate workflows, and ensure seamless coordination between your IT and cloud operations teams. Improve service delivery and minimize downtime.",
      //   icon: <span className="material-symbols-outlined">support_agent</span>,
      // },
    ],
  },
  { name: "Enterprise", path: "/enterprise",
    onlyMobile: true,
   },
  { name: "Pricing", path: "/pricing",
    onlyMobile: true,
   },
];