import VerticalTabs from "@/components/VerticalTabs";
import TermsConditions from "@/components/termsConditions";
import { Tabs } from "@radix-ui/themes";
import { useState } from "react";
import { Helmet } from "react-helmet-async"
import Pricing from "./Pricing";
import NewPriceList from "@/components/PriceList";
import MemberAccountPage from "./MemberAccountPage";

const Terms = () => {
  window.scrollTo(0, 0);
  const [activeTab, setactiveTab] = useState(0)

  const tabs = [
    {
      title: "Terms & Conditions",
      content: <TermsConditions setactiveTab={setactiveTab} />
    },
    {
      title: "Free Trial & Paid Subscription",
      content: <NewPriceList setactiveTab={setactiveTab} />
    },
    {
      title: "Choose Cloud Account",
      content: <MemberAccountPage />
    }
  ]

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
        <VerticalTabs tabs={tabs} activeTab={activeTab} setactiveTab={setactiveTab} />
      </div>
    </>
  )
}

export default Terms