import TableOfContents from "@/components/page-components/terms/TableOfContents";
import { Helmet } from "react-helmet-async";
import terms from "@/constants/terms";

// import { Tabs } from "@radix-ui/themes";
// import { useState } from "react";
// import Pricing from "./Pricing";
// import NewPriceList from "@/components/PriceList";
// import MemberAccountPage from "./MemberAccountPage";
// import { useGlobalState } from "@/context/GlobalStateContext";

const Terms = () => {
  window.scrollTo(0, 0);
  // const { memberAccounts } = useGlobalState();
  // const navigate = useNavigate();
  // const [activeTab, setactiveTab] = useState(0);

  // const tabs = [
  //   {
  //     title: "Terms & Conditions",
  //     content: <TermsConditions setactiveTab={setactiveTab} />,
  //   },
  //   {
  //     title: "Free Trial & Paid Subscription",
  //     content: <NewPriceList setactiveTab={setactiveTab} />,
  //   },
  //   {
  //     title: "Choose Cloud Account",
  //     content: <MemberAccountPage />,
  //   },
  // ];
  // if (!memberAccounts) return <Loader />;

  // if (
  //   memberAccounts.connectedAccounts.length > 0 ||
  //   memberAccounts.memberAccounts.length > 0
  // ) {
  //   console.log("NAVIGATING");
  //   return <Navigate to={"/chat"} />;
  // }

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
        {/* <VerticalTabs
          tabs={tabs}
          activeTab={activeTab}
          setactiveTab={setactiveTab}
        /> */}
        <div className="md:mt-32 max-w-4xl px-4 mx-auto mt-32 space-y-4">
          <div>
            <h2 className="bold-title text-3xl font-bold">
              TERMS AND CONDITIONS
            </h2>
            <p className="font-semibold text-lg opacity-80">
              Last Updated: July 01, 2024
            </p>
          </div>


          <div className="space-y-4">
            <h4 className="font-bold text-lg">
              AGREEMENT TO OUR LEGAL TERMS
            </h4>

            <p className="text-sm">
              Welcome! We are Hiaido Cloud Automation Pvt. Ltd (&apos;Company&apos;,
              &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;), operating the website https://hiaido.com (the
              &apos;Site&apos;), as well as other related products and services that refer
              or link to these legal terms (the &apos;Legal Terms&apos;) (collectively, the
              &apos;Services&apos;).
              <br />
              <br />
              We provide access to cloud engineer AI agents to help users
              fully automate their tasks, especially in cloud technologies like
              AWS, Azure, and GCP, through our cloud automation platform.
              <br />
              <br />
              For inquiries, please contact us via email at
              <a href="mailto:contact@hiaido.com" className="text-blue-300 hover:underline"> contact@hiaido.com</a>.
              <br />
              <br />
              These Legal Terms constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity
              (&apos;you&apos;), and Hiaido Cloud Automation Pvt. Ltd, concerning your
              access to and use of the Services. By accessing the Services,
              you agree that you have read, understood, and agreed to be
              bound by all of these Legal Terms. IF YOU DO NOT AGREE
              WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE
              EXPRESSLY PROHIBITED FROM USING THE SERVICES
              AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              <br />
              <br />
              We will provide you with prior notice of any scheduled changes
              to the Services you are using. Changes to Legal Terms will
              become effective thirty (30) days after the notice is given,

              except if the changes apply to new functionality, security
              updates, and bug fixes, in which case the changes will be
              effective immediately. By continuing to use the Services after
              the effective date of any changes, you agree to be bound by the
              modified terms. If you disagree with such changes, you may
              terminate Services as per the section &apos;[TERM AND
              TERMINATION](#terms)&apos;.
              <br />
              <br />
              We recommend that you print a copy of these Legal Terms for
              your records.
            </p>
          </div>


          <TableOfContents />

          <div>
            {terms.map((term, index) => (
              <div key={index} id={term.id} className="my-4">
                <h4 className="font-bold text-lg">{term.title}</h4>
                {Array.isArray(term.content) ? (
                  term.content.map((subTerm, subIndex) => (
                    <div key={subIndex} className="my-2 ml-1">
                      <h5 className="font-semibold">{subTerm["sub-title"]}</h5>
                      {subTerm["sub-content"].split('\n').map((paragraph, paraIndex) => {
                        const boldRegex = /\*\*(.*?)\*\*/g;
                        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
                        let match;
                        let lastIndex = 0;
                        const parts = [];

                        while ((match = boldRegex.exec(paragraph)) !== null) {
                          if (match.index > lastIndex) {
                            parts.push(paragraph.substring(lastIndex, match.index));
                          }
                          parts.push(<strong key={`${paraIndex}-${parts.length}`}>{match[1]}</strong>);
                          lastIndex = boldRegex.lastIndex;
                        }

                        if (lastIndex < paragraph.length) {
                          parts.push(paragraph.substring(lastIndex));
                        }

                        const contentWithLinks = parts.map((part, partIndex) => {
                          if (typeof part === 'string') {
                            const subParts = [];
                            let emailMatch;
                            let subLastIndex = 0;

                            while ((emailMatch = emailRegex.exec(part)) !== null) {
                              if (emailMatch.index > subLastIndex) {
                                subParts.push(part.substring(subLastIndex, emailMatch.index));
                              }
                              subParts.push(
                                <a
                                  key={`${paraIndex}-${partIndex}-${subParts.length}`}
                                  href={`mailto:${emailMatch[1]}`}
                                  className="text-blue-300 hover:underline"
                                >
                                  {emailMatch[1]}
                                </a>
                              );
                              subLastIndex = emailRegex.lastIndex;
                            }

                            if (subLastIndex < part.length) {
                              subParts.push(part.substring(subLastIndex));
                            }

                            return subParts;
                          }
                          return part;
                        }).flat();

                        return <p key={paraIndex} className="text-sm">{contentWithLinks}</p>;
                      })}
                    </div>
                  ))
                ) : (
                  term.content.split('\n').map((paragraph, paraIndex) => {
                    const boldRegex = /\*\*(.*?)\*\*/g;
                    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
                    let match;
                    let lastIndex = 0;
                    const parts = [];

                    while ((match = boldRegex.exec(paragraph)) !== null) {
                      if (match.index > lastIndex) {
                        parts.push(paragraph.substring(lastIndex, match.index));
                      }
                      parts.push(<strong key={`${paraIndex}-${parts.length}`}>{match[1]}</strong>);
                      lastIndex = boldRegex.lastIndex;
                    }

                    if (lastIndex < paragraph.length) {
                      parts.push(paragraph.substring(lastIndex));
                    }

                    const contentWithLinks = parts.map((part, partIndex) => {
                      if (typeof part === 'string') {
                        const subParts = [];
                        let emailMatch;
                        let subLastIndex = 0;

                        while ((emailMatch = emailRegex.exec(part)) !== null) {
                          if (emailMatch.index > subLastIndex) {
                            subParts.push(part.substring(subLastIndex, emailMatch.index));
                          }
                          subParts.push(
                            <a
                              key={`${paraIndex}-${partIndex}-${subParts.length}`}
                              href={`mailto:${emailMatch[1]}`}
                              className="text-blue-300 hover:underline"
                            >
                              {emailMatch[1]}
                            </a>
                          );
                          subLastIndex = emailRegex.lastIndex;
                        }

                        if (subLastIndex < part.length) {
                          subParts.push(part.substring(subLastIndex));
                        }

                        return subParts;
                      }
                      return part;
                    }).flat();

                    return <p key={paraIndex} className="text-sm">{contentWithLinks}</p>;
                  })
                )}
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-bold text-lg">
              CONTACT US
            </h4>

            <p>
              In order to resolve a complaint regarding the Services or to
              receive further information regarding use of the Services, please
              contact us at:
            </p>

            <div className="font-bold mt-2">
              <p>Hiaido Cloud Automation Pvt. Ltd</p>
              <p>24, Ranganathan Street, OMR, Karapakkam</p>
              <p>Chennai, Tamil Nadu 600097</p>
              <p>India</p>
              <div className="flex items-start flex-row gap-1">
                <div>
                  Phone:</div> <div>
                  <a href="tel:+918939979393">+91 8939 979 393</a><br />
                  <a href="tel:+919911195555">+91 9911 195 555</a>
                </div>
              </div>
              <p>Email: <a href="mailto:contact@hiaido.com"> contact@hiaido.com</a></p>
            </div>

          </div>
        </div>
    </>
  );
};

export default Terms;
