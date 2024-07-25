import { useSearchParams } from "react-router-dom";
import terms from "@/constants/terms.json";
import { tableContent } from "./constants";
import CaliforniaUserResidents from "./contents/CaliforniaUserResidents";
import ContactUs from "./contents/ContactUs";
import ContributionLicense from "./contents/ContributionLicense";
import Corrections from "./contents/Corrections";
import Disclamer from "./contents/Disclamer";
import DistputeResolution from "./contents/DistputeResolution";
import ElectronicCommunicationTransaction from "./contents/ElectronicCommunicationTransaction";
import GoverningLaw from "./contents/GoverningLaw";
import GuideLinesReviews from "./contents/GuideLinesReviews";
import Indemnification from "./contents/Indemnification";
import IntellectualPropertyRights from "./contents/IntellectualPropertyRights";
import LimitationOfLiability from "./contents/LimitationOfLiability";
import Miscellaneous from "./contents/Miscellaneous";
import ModificationAndInteraptions from "./contents/ModificationAndInteraptions";
import OurServices from "./contents/OurServices";
import PrivacyPolicy from "./contents/PrivacyPolicy";
import ProhebitedActivies from "./contents/ProhebitedActivies";
import PurchasePayment from "./contents/PurchasePayment";
import ServiceManagement from "./contents/ServiceManagement";
import SmsTextMessaging from "./contents/SmsTextMessaging";
import SocialMedia from "./contents/SocialMedia";
import SubScriptions from "./contents/SubScriptions";
import TermsAndTermination from "./contents/TermsAndTermination";
import ThirdPartyWebsiteContents from "./contents/ThirdPartyWebsiteContents";
import UserData from "./contents/UserData";
import UserGeneratedContributions from "./contents/UserGeneratedContributions";
import UserRegistrastion from "./contents/UserRegistrastion";
import UserRepresentation from "./contents/UserRepresentation";
import TableOfContents from "../page-components/terms/TableOfContents";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const NewTermsConditions = ({}) => {
  const [params, setSearchParams] = useSearchParams();
  const [termsAccepted, setTermsAccepted] = useState(false);
  console.log(termsAccepted);

  // const divRef = useRef(null);

  // const scrollToElement = () => {
  //   divRef.current.scrollIntoView();
  // };
  // useEffect(scrollToElement, []);

  return (
    <div className="max-w-4xl px-4 mx-auto space-y-4 term-conditions-page">
      <div className="sticky top-0 bg-black pb-5 pt-3">
        <h2 className="text-4xl font-bold bg-gradient-to-r via-orange-500 to-pink-500  from-yellow-300 text-transparent bg-clip-text inline-block">
          TERMS AND CONDITIONS
        </h2>
        <p className="font-semibold text-lg opacity-80">
          Last Updated: July 01, 2024
        </p>
      </div>

      <div className="overflow-auto h-[calc(100%_-_64px)]  md:h-[calc(100dvh_-_96px_-_20dvh)] ">
        <div className="space-y-4">
          <h4 className="font-bold text-lg">AGREEMENT TO OUR LEGAL TERMS</h4>

          <p className="text-sm">
            Welcome! We are Hiaido Cloud Automation Pvt. Ltd
            (&apos;Company&apos;, &apos;we&apos;, &apos;us&apos;, or
            &apos;our&apos;), operating the website https://hiaido.com (the
            &apos;Site&apos;), as well as other related products and services
            that refer or link to these legal terms (the &apos;Legal
            Terms&apos;) (collectively, the &apos;Services&apos;).
            <br />
            <br />
            We provide access to cloud engineer AI agents to help users fully
            automate their tasks, especially in cloud technologies like AWS,
            Azure, and GCP, through our cloud automation platform.
            <br />
            <br />
            For inquiries, please contact us via email at
            <a
              href="mailto:contact@hiaido.com"
              className="text-blue-300 hover:underline"
            >
              {" "}
              contact@hiaido.com
            </a>
            .
            <br />
            <br />
            These Legal Terms constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity
            (&apos;you&apos;), and Hiaido Cloud Automation Pvt. Ltd, concerning
            your access to and use of the Services. By accessing the Services,
            you agree that you have read, understood, and agreed to be bound by
            all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE
            LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE
            SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            <br />
            <br />
            We will provide you with prior notice of any scheduled changes to
            the Services you are using. Changes to Legal Terms will become
            effective thirty (30) days after the notice is given, except if the
            changes apply to new functionality, security updates, and bug fixes,
            in which case the changes will be effective immediately. By
            continuing to use the Services after the effective date of any
            changes, you agree to be bound by the modified terms. If you
            disagree with such changes, you may terminate Services as per the
            section &apos;{" "}
            <a href="#terms" className="text-blue-300">
              TERM AND TERMINATION
            </a>
            &apos;.
            <br />
            <br />
            We recommend that you print a copy of these Legal Terms for your
            records.
          </p>
        </div>

        <TableOfContents />

        <div>
          {terms.map((term, index) => (
            <div key={index} id={term.id} className="my-4">
              <h4 className="font-bold text-lg">{term.title}</h4>
              {Array.isArray(term.content)
                ? term.content.map((subTerm, subIndex) => (
                    <div key={subIndex} className="my-2 ml-1">
                      <h5 className="font-semibold">{subTerm["sub-title"]}</h5>
                      {subTerm["sub-content"]
                        .split("\n")
                        .map((paragraph, paraIndex) => {
                          const boldRegex = /\*\*(.*?)\*\*/g;
                          const emailRegex =
                            /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
                          let match;
                          let lastIndex = 0;
                          const parts = [];

                          while ((match = boldRegex.exec(paragraph)) !== null) {
                            if (match.index > lastIndex) {
                              parts.push(
                                paragraph.substring(lastIndex, match.index)
                              );
                            }
                            parts.push(
                              <strong key={`${paraIndex}-${parts.length}`}>
                                {match[1]}
                              </strong>
                            );
                            lastIndex = boldRegex.lastIndex;
                          }

                          if (lastIndex < paragraph.length) {
                            parts.push(paragraph.substring(lastIndex));
                          }

                          const contentWithLinks = parts
                            .map((part, partIndex) => {
                              if (typeof part === "string") {
                                const subParts = [];
                                let emailMatch;
                                let subLastIndex = 0;

                                while (
                                  (emailMatch = emailRegex.exec(part)) !== null
                                ) {
                                  if (emailMatch.index > subLastIndex) {
                                    subParts.push(
                                      part.substring(
                                        subLastIndex,
                                        emailMatch.index
                                      )
                                    );
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
                            })
                            .flat();

                          return (
                            <p key={paraIndex} className="text-sm">
                              {contentWithLinks}
                            </p>
                          );
                        })}
                    </div>
                  ))
                : term.content.split("\n").map((paragraph, paraIndex) => {
                    const boldRegex = /\*\*(.*?)\*\*/g;
                    const emailRegex =
                      /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
                    let match;
                    let lastIndex = 0;
                    const parts = [];

                    while ((match = boldRegex.exec(paragraph)) !== null) {
                      if (match.index > lastIndex) {
                        parts.push(paragraph.substring(lastIndex, match.index));
                      }
                      parts.push(
                        <strong key={`${paraIndex}-${parts.length}`}>
                          {match[1]}
                        </strong>
                      );
                      lastIndex = boldRegex.lastIndex;
                    }

                    if (lastIndex < paragraph.length) {
                      parts.push(paragraph.substring(lastIndex));
                    }

                    const contentWithLinks = parts
                      .map((part, partIndex) => {
                        if (typeof part === "string") {
                          const subParts = [];
                          let emailMatch;
                          let subLastIndex = 0;

                          while (
                            (emailMatch = emailRegex.exec(part)) !== null
                          ) {
                            if (emailMatch.index > subLastIndex) {
                              subParts.push(
                                part.substring(subLastIndex, emailMatch.index)
                              );
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
                      })
                      .flat();

                    return (
                      <p key={paraIndex} className="text-sm">
                        {contentWithLinks}
                      </p>
                    );
                  })}
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-bold text-lg">CONTACT US</h4>

          <p>
            In order to resolve a complaint regarding the Services or to receive
            further information regarding use of the Services, please contact us
            at:
          </p>

          <div className="mt-2">
            <p>Hiaido Cloud Automation Pvt. Ltd</p>
            <p>24, Ranganathan Street, OMR, Karapakkam</p>
            <p>Chennai, Tamil Nadu 600097</p>
            <p>India</p>
            <div className="">
              <p>Phone:</p>
              <div>
                <a href="tel:+918939979393" className="text-[12px]">
                  +91 8939 979 393
                </a>
                <br />
                <a href="tel:+919911195555" className="text-[12px]">
                  +91 9911 195 555
                </a>
              </div>
            </div>
            <p>
              Email: <a href="mailto:contact@hiaido.com"> contact@hiaido.com</a>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full sticky bottom-0 bg-black h-16 md:h-auto flex gap-4 items-center justify-between border-t pt-3 md:pr-4 border-orange-400">
        <div className="flex flex-1 gap-2 justify-center md:justify-start w-full items-center">
          <div className="flex space-x-2 justify-center w-full">
            <input
              type="radio"
              name="terms"
              id="terms"
              className="block"
              onChange={(e) => setTermsAccepted(termsAccepted ? false : true)}
              checked={termsAccepted}
            />
            <label htmlFor="terms" className="text-sm">
              I agree with the terms & conditions
            </label>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {/* <button
            type="button"
            className="bg-white text-black py-2 px-4 rounded text-md font-bold"
          >
            Decline
          </button> */}
          {/* <AnimatedBtn type="button" onClick={() => setactiveTab(e => e + 1)} >Accept</AnimatedBtn> */}
          <button
            className={`bg-orange-400 px-4 py-2 rounded font-bold`}
            onClick={() => {
              if (termsAccepted) {
                setSearchParams({ step: "1" });
              } else {
                toast.error(
                  "Please accept the terms and conditions to proceed"
                );
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <h2 className="bold-title text-5xl font-bold bg-gradient-to-r from-orange-600 via-pink-500 to-yellow-400 inline-block text-transparent bg-clip-text">
          Terms and Conditions
        </h2>
        <p className="font-semibold text-lg">Effective Date: January 1, 2024</p>
      </div>
      <div className=" h-[calc(100dvh_-_96px_-_48dvh)] md:h-[calc(100dvh_-_96px_-_20dvh)] overflow-auto">
        <div className="space-y-4">
          <p>
            Welcome to{" "}
            <span className="inline-block text-white">
              Hiaido Cloud Automation Pvt. Ltd
            </span>
            !
          </p>

          <div className="horizon-bar opacity-30 container h-[1px] mt-4 bg-orange-400" />

          <div className="space-y-4">
            <h1 className="font-bold">AGREEMENT TO OUR LEGAL TERMS</h1>
            <p>
              We are Hiaido cloud automation pvt. ltd ('Company', 'we', 'us', or
              'our'), a company registered in India at 9, Rama building,
              Chennai, Tamilnadu 600032. We operate the website{" "}
              <a href="https://hiaido.com">https://hiaido.com</a> (the 'Site'),
              as well as any other related products and services that refer or
              link to these legal terms (the 'Legal Terms') (collectively, the
              'Services').
            </p>

            <p>
              We provide access to cloud engineer AI agents so users can fully
              automate their tasks, especially in cloud technologies like AWS,
              Azure, and GCP. It's a cloud automation platform.
            </p>

            <p>
              You can contact us by phone at +91 8939979393, email at{" "}
              <a href="mailto:contact@hiaido.com">contact@hiaido.com</a>, or by
              mail to Ranganathan street, Chennai, Tamilnadu 600097, India.
            </p>

            <p>
              These Legal Terms constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity ('you'),
              and Hiaido cloud automation pvt. ltd, concerning your access to
              and use of the Services. You agree that by accessing the Services,
              you have read, understood, and agreed to be bound by all of these
              Legal Terms.{" "}
              <strong>
                IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE
                EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST
                DISCONTINUE USE IMMEDIATELY.
              </strong>
            </p>

            <p>
              We will provide you with prior notice of any scheduled changes to
              the Services you are using. Changes to Legal Terms will become
              effective thirty (30) days after the notice is given, except if
              the changes apply to new functionality, security updates, and bug
              fixes, in which case the changes will be effective immediately. By
              continuing to use the Services after the effective date of any
              changes, you agree to be bound by the modified terms. If you
              disagree with such changes, you may terminate Services as per the
              section 'TERM AND TERMINATION'.
            </p>
            <p>
              We recommend that you print a copy of these Legal Terms for your
              records.
            </p>

            <p className="text-sm">
              These terms and conditions outline the rules and regulations for
              the use of Hiaido Cloud Automation Pvt. Ltd&apos;s website,
              located at hiaido.com. By accessing this website and the customer
              web portal, you accept these terms and conditions.
            </p>
          </div>
          <div className="space-y-4">
            <h1 className="font-bold">TABLE OF CONTENTS</h1>
            <ol>
              {tableContent.map((content, ind) => {
                return (
                  <li key={ind}>
                    <a href={content.link} className={content.classes}>
                      {content.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>

          <div>
            <OurServices />
            <IntellectualPropertyRights />
            <UserRepresentation />
            <UserRegistrastion />
            <PurchasePayment />
            <SubScriptions />
            <ProhebitedActivies />
            <UserGeneratedContributions />
            <ContributionLicense />
            <GuideLinesReviews />
            <SocialMedia />
            <ThirdPartyWebsiteContents />
            <ServiceManagement />
            <PrivacyPolicy />
            <TermsAndTermination />
            <ModificationAndInteraptions />
            <GoverningLaw />
            <DistputeResolution />
            <Corrections />
            <Disclamer />
            <LimitationOfLiability />
            <Indemnification />
            <UserData />
            <ElectronicCommunicationTransaction />
            <SmsTextMessaging />
            <CaliforniaUserResidents />
            <Miscellaneous />
            <ContactUs />
          </div>
        </div>
      </div>
      <div className="w-full flex gap-4 items-center justify-between border-t pt-3 md:pr-4 border-orange-400">
        <div className="flex gap-2 justify-center md:justify-start w-full items-center">
          <input type="radio" name="terms" id="terms" className="" />
          <label htmlFor="terms">I agree with the terms & Conditions</label>
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="button"
            className="bg-white text-black py-2 px-4 rounded text-md font-bold"
          >
            Decline
          </button>
          {/* <AnimatedBtn type="button" onClick={() => setactiveTab(e => e + 1)} >Accept</AnimatedBtn> */}
          <button
            className={`bg-orange-400 px-4 py-2 rounded font-bold`}
            onClick={() => setSearchParams({ step: "1" })}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTermsConditions;
