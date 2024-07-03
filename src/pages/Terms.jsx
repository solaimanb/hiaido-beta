import TableOfContents from "@/components/page-components/terms/TableOfContents";
import { Helmet } from "react-helmet-async";
import terms from "@/constants/terms.json";


// const processContent = (content) => {
//   const htmlContent = content
//     .replace(/\n/g, "<br/>")
//     .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
//   return { __html: htmlContent };
// };

const Terms = () => {
  // window.scrollTo(0, 0);

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
            <a href="mailto:contact@hiaido.com" className="font-bold"> contact@hiaido.com</a>.
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
            The Services are intended for users who are at least 13 years of
            age. All users who are minors in the jurisdiction in which they
            reside (generally under the age of 18) must have the permission
            of, and be directly supervised by, their parent or guardian to use
            the Services. If you are a minor, you must have your parent or
            guardian read and agree to these Legal Terms prior to you
            using the Services.
            <br />
            <br />
            We recommend that you print a copy of these Legal Terms for
            your records.
          </p>
        </div>


        <TableOfContents />

        {/* <div>
          {terms.map((term, index) => (
            <div key={index} className="my-4">
              <h4 className="font-bold text-">{term.title}</h4>
              {Array.isArray(term.content) ? (
                term.content.map((subTerm, subIndex) => (
                  <div key={subIndex} className="my-2 ml-1">
                    <h5 className="font-semibold">{subTerm["sub-title"]}</h5>
                    <p className="text-sm">{subTerm["sub-content"]}</p>
                  </div>
                ))
              ) : (
                  <p className="text-sm">{term.content}</p>
              )}
            </div>
          ))}
        </div> */}

        {/* <div>
          {terms.map((term, index) => (
            <div key={index} className="my-4">
              <h4 className="font-bold text-lg">{term.title}</h4>
              {Array.isArray(term.content) ? (
                term.content.map((subTerm, subIndex) => (
                  <div key={subIndex} className="my-2 ml-1 space-y-1">
                    <h5 className="font-semibold">{subTerm["sub-title"]}</h5>
                    {subTerm["sub-content"].split('\n').map((paragraph, paraIndex) => (
                      <p key={paraIndex} className="text-sm">{paragraph}</p>
                    ))}
                  </div>
                ))
              ) : (

                term.content.split('\n').map((paragraph, paraIndex) => (
                  <p key={paraIndex} className="text-sm">{paragraph}</p>
                ))
              )}
            </div>
          ))}
        </div> */}

        <div>
          {terms.map((term, index) => (
            <div key={index} className="my-4">
              <h4 className="font-bold text-lg">{term.title}</h4>
              {Array.isArray(term.content) ? (
                term.content.map((subTerm, subIndex) => (
                  <div key={subIndex} className="my-2 ml-1">
                    <h5 className="font-semibold">{subTerm["sub-title"]}</h5>
                    {/* Split sub-content by '\n' and map each segment to a <p> element */}
                    {subTerm["sub-content"].split('\n').map((paragraph, paraIndex) => {
                      // Regular expression to find text wrapped in ** **
                      const boldRegex = /\*\*(.*?)\*\*/g;
                      let match;
                      let lastIndex = 0;
                      const parts = [];

                      while ((match = boldRegex.exec(paragraph)) !== null) {
                        // Push non-bold text before the match
                        if (match.index > lastIndex) {
                          parts.push(paragraph.substring(lastIndex, match.index));
                        }
                        // Push bold text with '**' removed
                        parts.push(<strong key={`${paraIndex}-${parts.length}`}>{match[1]}</strong>);
                        lastIndex = boldRegex.lastIndex;
                      }

                      // Push remaining non-bold text after the last match
                      if (lastIndex < paragraph.length) {
                        parts.push(paragraph.substring(lastIndex));
                      }

                      return <p key={paraIndex} className="text-sm">{parts}</p>;
                    })}
                  </div>
                ))
              ) : (
                term.content.split('\n').map((paragraph, paraIndex) => {
                  // Regular expression to find text wrapped in ** **
                  const boldRegex = /\*\*(.*?)\*\*/g;
                  let match;
                  let lastIndex = 0;
                  const parts = [];

                  while ((match = boldRegex.exec(paragraph)) !== null) {
                    // Push non-bold text before the match
                    if (match.index > lastIndex) {
                      parts.push(paragraph.substring(lastIndex, match.index));
                    }
                    // Push bold text with '**' removed
                    parts.push(<strong key={`${paraIndex}-${parts.length}`}>{match[1]}</strong>);
                    lastIndex = boldRegex.lastIndex;
                  }

                  // Push remaining non-bold text after the last match
                  if (lastIndex < paragraph.length) {
                    parts.push(paragraph.substring(lastIndex));
                  }

                  return <p key={paraIndex} className="text-sm">{parts}</p>;
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
