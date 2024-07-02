
const termsSections = [
    {
        title: "1. Definitions",
        content:
            "**Company:** Refers to Hiaido Cloud Automation Pvt. Ltd, located at 24, Ranganathan St., OMR, Chennai - 600097.\n**User:** Refers to the individual accessing or using the Service, or the company or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.\n Refers to the website and related services provided by the Company, including cloud automation and AI workforce solutions.\n**Subscription:** Refers to the monthly payment plan provided by the Company.\n**Content:** Refers to any text, images, multimedia content, software, or other information or material submitted to or on the Service.",
    },
    {
        title: "2. Use of the Service",
        content:
            "HIAIDO's cloud automation platform is open to users of all backgrounds and ages. We welcome individuals from diverse communities and cultures to utilize our services. Our platform is inclusive and aims to empower users worldwide to harness the power of cloud automation without discrimination based on age, race, religion, or any other factors.\nThe Service is designed for users and customers from cloud-driven businesses such as AWS, Azure, and GCP.",
    },
    {
        title: "3. Intellectual Property Rights",
        content:
            "Unless otherwise stated, Hiaido Cloud Automation Pvt. Ltd and/or its licensors own the intellectual property rights for all material on hiaido.com. All rights are reserved. You may access this from hiaido.com for your personal use subject to restrictions set in these terms and conditions.\nYou must not:\nRepublish material from hiaido.com.\nSell, rent, or sub-license material from hiaido.com.\nReproduce, duplicate, or copy material from hiaido.com.\nRedistribute content from hiaido.com (unless content is specifically made for redistribution).",
    },
    {
        title: "4. User-Generated Content",
        content:
            "You may be able to post, upload, or otherwise make available content on the Service. You retain ownership of any intellectual property rights in that content.\nBy making content available on the Service, you grant the Company a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, store, display, reproduce, save, modify, create derivative works, perform, and distribute your content on the Service solely for the purposes of operating, developing, providing, and using the Service.\nThe Company reserves the right to remove or modify any content submitted by users without prior notice if it violates these Terms or is otherwise deemed inappropriate.",
    },
    {
        title: "5. Subscription and Payment Terms",
        content:
            "The Service is billed on a subscription basis ('Subscription(s)'). You will be billed in advance on a recurring and periodic basis ('Billing Cycle'). Billing cycles are set on a monthly basis.\nA valid payment method, including credit card or PayPal, is required to process the payment for your Subscription. You shall provide the Company with accurate and complete billing information including full name, address, state, zip code, telephone number, and valid payment method information.\nBy submitting such payment information, you automatically authorize the Company to charge all Subscription fees incurred through your account to any such payment instruments.",
    },
    {
        title: "6. Cancellation and Refund Policy",
        content:
            "You can cancel your Subscription at any time by contacting customer support at contact@hiaido.com or through your account settings on the web portal.\nIf you cancel your Subscription, you will not receive a refund for the current Billing Cycle. You will continue to have access to the Service until the end of your current Billing Cycle.\nThe Company reserves the right to refuse or cancel your Subscription if fraud or an unauthorized or illegal transaction is suspected.",
    },
    {
        title: "7. Prohibited Activities",
        content:
            "Users are prohibited from engaging in the following activities:\nViolating any laws or regulations.\nInfringing upon any third party’s intellectual property rights.\nPosting content that is harmful, obscene, abusive, defamatory, or otherwise objectionable.\nAttempting to interfere with or compromise the integrity or security of the Service.\nMisusing the Service in a manner that could disrupt its normal operation, such as excessive API calls or server overload.",
    },
    {
        title: "8. Data Privacy and Security",
        content:
            "The Company takes the privacy and security of its users seriously. Please refer to our Privacy Policy at [Privacy Policy URL] for information on how we collect, use, and disclose personal information.\nThe User is responsible for maintaining the confidentiality of their account and password and for restricting access to their computer or device to prevent unauthorized access to the Service.",
    },
    {
        title: "9. Third-Party Services",
        content:
            "The Service may contain links to third-party websites or services that are not owned or controlled by the Company.\nThe Company has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.",
    },
    {
        title: "10. Limitation of Liability",
        content:
            "To the maximum extent permitted by applicable law, in no event shall Hiaido Cloud Automation Pvt. Ltd be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Service; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein.",
    },
    {
        title: "11. Indemnification",
        content:
            "You agree to defend, indemnify, and hold harmless Hiaido Cloud Automation Pvt. Ltd and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of (i) your use and access of the Service, or (ii) a breach of these Terms.",
    },
    {
        title: "12. Service Availability and Modifications",
        content:
            "The Company will make reasonable efforts to keep the Service operational. However, certain technical difficulties, maintenance, or updates required for the operation and quality of the Service may result in temporary interruptions. The Company reserves the right to modify or discontinue, temporarily or permanently, functions and features of the Service with or without notice.",
    },
    {
        title: "13. Service Level Agreement (SLA)",
        content:
            "The Company provides a Service Level Agreement (SLA) that defines the expected level of service. This includes uptime guarantees, response times for support requests, and other key performance indicators. Details of the SLA can be found at [SLA URL].",
    },
    {
        title: "14. Beta Services",
        content:
            "From time to time, the Company may offer new services or features in a pre-release version. These services or features are provided on an 'as-is' and 'as-available' basis and may contain bugs or errors. Your use of Beta Services is at your sole risk.",
    },
    {
        title: "15. Account Suspension and Termination",
        content:
            "The Company reserves the right to suspend or terminate your account and access to the Service at any time for any reason, including but not limited to inactivity, violation of these Terms, or failure to pay fees. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may do so by contacting customer support at contact@hiaido.com.",
    },
    {
        title: "16. Compliance with Laws",
        content:
            "You agree to comply with all applicable local, state, national, and international laws and regulations in connection with your use of the Service.",
    },
    {
        title: "18. No Waiver",
        content:
            "The failure of the Company to enforce any right or provision of these Terms will not constitute a waiver of such right or provision.",
    },
    {
        title: "19. Severability",
        content:
            "If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue to be valid and enforceable.",
    },
    {
        title: "21. Feedback and Suggestions",
        content:
            "Any feedback, comments, or suggestions you may provide regarding the Service are entirely voluntary, and we will be free to use such feedback, comments, or suggestions as we see fit without any obligation to you.",
    },
    {
        title: "22. Changes to These Terms",
        content:
            "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
    },
    {
        title: "23. Contact Us",
        content:
            "If you have any questions about these Terms, please contact us at contact@hiaido.com",
        link: "mailto:contact@hiaido.com",
    },
];


const processContent = (content) => {
    const htmlContent = content
        .replace(/\n/g, "<br/>")
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    return { __html: htmlContent };
};

const TermsConditions = ({ setactiveTab }) => {
    return (
        <div>
            <div>
                <h2 className="bold-title text-5xl font-bold bg-gradient-to-r from-orange-600 via-pink-500 to-yellow-400 inline-block text-transparent bg-clip-text">Terms and Conditions</h2>
                <p className="font-semibold text-lg">Effective Date: January 1, 2024</p>
            </div>
            <div className=" h-[calc(100dvh_-_96px_-_48dvh)] md:h-[calc(100dvh_-_96px_-_20dvh)] overflow-auto">
                <div className="space-y-4">
                    <p>Welcome to <span className="inline-block text-white">Hiaido Cloud Automation Pvt. Ltd</span>!</p>

                    <div className="horizon-bar opacity-30 container h-[1px] mt-4 bg-orange-400" />

                    <div className="space-y-4">

                        <p className="text-sm">These terms and conditions outline the rules
                            and regulations for the use of Hiaido Cloud
                            Automation Pvt. Ltd&apos;s website, located at
                            hiaido.com. By accessing this website and
                            the customer web portal, you accept these
                            terms and conditions.
                        </p>
                    </div>
                    {termsSections.map((section, index) => (
                        <div key={index}>
                            <h1 className="text-lg mt-3 text-white bold-title">{section.title}</h1>
                            <p
                                className="mt-1 text-slate-300"
                                dangerouslySetInnerHTML={processContent(section.content)}
                            ></p>

                            {section.link && (
                                <a href={section.link} className="text-blue-300 underline">
                                    {section.link.replace("mailto:", "")}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full flex gap-4 items-center justify-between border-t pt-3 md:pr-4 border-orange-400">
                <div className='flex gap-2 justify-center md:justify-start w-full items-center'>
                    <input type="radio" name="terms" id="terms" className='' />
                    <label htmlFor="terms">I agree with the terms & Conditions</label>
                </div>
                <div className='flex gap-4 items-center'>
                    <button type="button" className="bg-white text-black py-2 px-4 rounded text-md font-bold">Decline</button>
                    {/* <AnimatedBtn type="button" onClick={() => setactiveTab(e => e + 1)} >Accept</AnimatedBtn> */}
                    <button className={`bg-orange-400 px-4 py-2 rounded font-bold`} onClick={() => setactiveTab(e => e + 1)} >Accept</button>
                </div>
            </div>
        </div>
    )
}

export default TermsConditions