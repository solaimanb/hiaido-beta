import prices from './prices.json';

export const pricing = [
  {
    id: "0",
    title: "Playground",
    description: "Per workspace\n Billed monthly",
    price: {
      INR: prices.INR.Playground,
      USD: prices.USD.Playground,
    },
    features: [
      "Explore cloud tech with AI",
      "Hiaido organizations",
      "AWS free-tier access",
      "Limited resource set",
      "Low rate limit",
      "Sandbox environment",
      "AI guided learning",
      "Email support",
    ],
    trigger: "Go",
  },
  {
    id: "1",
    title: "Starter",
    description: "Per workspace\n Billed monthly",
    price: {
      INR: prices.INR.Starter,
      USD: prices.USD.Starter,
    },
    features: [
      "Access to core functionalities",
      "Full access to Cloud Engineer AI agent",
      "Cloud resource management",
      "Full acess to cloud console",
      "Single agent system",
      "Moderate rate limit",
      "Limited resource provisioning",
      "Email support",
      "One cloud (AWS)",
    ],
    trigger: "Start 7-Day Free Trial",
  },
  {
    id: "2",
    title: "Elite",
    description: "Per workspace\n Billed monthly",
    price: {
      INR: prices.INR.Elite,
      USD: prices.USD.Elite,
    },
    features: [
      "Premium features and integrations",
      "Full access to cloud console",
      "Moderate rate limit",
      "Multi-agent system",
      "Moderate resource provisioning",
      "Email & chat support",
      "Access to multi-cloud",
    ],
    trigger: "Recommended",
  },
  {
    id: "3",
    title: "Enterprise",
    description: "Per workspace\n Billed yearly",
    price: {
      INR: prices.INR.Enterprise,
      USD: prices.USD.Enterprise,
    },
    features: [
      "Advanced AI-driven automation for complex workflows",
      "Extensive resource provisioning and management",
      "Dedicated account manager",
      "24x7 priority support",
      "Access to sandh.ai and production grade AI workforce",
      "Workforce cloner tool",
      "Einstein framework",
      "Multi-account environment",
      "Enterprise-grade cloud management",
      "Automate everything suite",
      "Smart task management",
      "Code reviewer AI",
      "Recommendations engine",
      "Optimizations package",
    ],
    trigger: "Buy Enterprise",
  },
  {
    id: "4",
    title: "XaaS",
    description: "Bring Your Own Cloud Account",
    price: {
      INR: prices.INR.XaaS,
      USD: prices.USD.XaaS,
    },
    features: [
      "Fully customizable AI automation tailored to specific business needs",
      "Unlimited resource provisioning and management",
      "Dedicated team of cloud experts",
      "SLA-backed 24/7 premium support",
      "Advanced analytics and optimization tools",
      "Advanced automation & orchestration",
      "Hybrid cloud management",
      "Vendor-specific optimizations",
    ],
    images: [
      "/aws.svg",
      "/azure.svg",
      "/google-cloud.svg",
      "/snowflake.svg",
      "/oracle.svg",
    ],
    trigger: "Contact Sales",
  },
];
