import VerticalTabs from "@/components/VerticalTabs";
import { Helmet } from "react-helmet-async";
import MemberAccountPage from "./MemberAccountPage";
import NewTermsConditions from "@/components/NewTermsConditions";
import { useGlobalState } from "@/context/GlobalStateContext";
import Loader from "@/components/Loader";
import { Navigate, useSearchParams } from "react-router-dom";
import NewPriceList from "@/components/PriceList";

const Onboarding = () => {
  window.scrollTo(0, 0);
  const { memberAccounts } = useGlobalState();
  const [params, _] = useSearchParams();
  const activeTab = parseInt(params.get("step") || "0");

  if (activeTab < 0 || activeTab > 2)
    return <Navigate to="/onboarding?step=0" />;

  const tabs = [
    {
      title: "Terms & Conditions",
      // content: <TermsConditions setactiveTab={setactiveTab} />
      content: <NewTermsConditions />,
    },
    {
      title: "Free Trial & Paid Subscription",
      content: <NewPriceList />,
    },
    {
      title: "Choose Cloud Account",
      content: <MemberAccountPage />,
    },
  ];

  if (!memberAccounts) return <Loader />;

  if (
    memberAccounts.connectedAccounts.length > 0 ||
    memberAccounts.memberAccounts.length > 0
  ) {
    console.log("NAVIGATING");
    return <Navigate to={"/chat"} />;
  }

  return (
    <>
      {/* SEO CONTENT */}
      <Helmet>
        <title>Hiaido | Terms and Conditions</title>
        <meta
          name="description"
          content="Read Hiaido's Terms and Conditions. Learn about our policies and your responsibilities when using our services."
        />
        <meta
          name="keywords"
          content="Hiaido, Terms and Conditions, Policies, User Responsibilities"
        />
        <meta name="author" content="Hiaido" />
      </Helmet>

      {/* MAIN CONTENT */}
      <div className="w-full p-3 bg-orange-200 flex justify-center items-center">
        <VerticalTabs
          tabs={tabs}
          activeTab={activeTab}
        />
      </div>
    </>
  );
};

export default Onboarding;
