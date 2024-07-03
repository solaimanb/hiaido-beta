const tableOfContentsItems = [
  { id: 'services', title: 'OUR SERVICES' },
  { id: 'ip', title: 'INTELLECTUAL PROPERTY RIGHTS' },
  { id: 'userreps', title: 'USER REPRESENTATIONS' },
  { id: 'userreg', title: 'USER REGISTRATION' },
  { id: 'purchases', title: 'PURCHASES AND PAYMENT' },
  { id: 'subscriptions', title: 'SUBSCRIPTIONS' },
  { id: 'prohibited', title: 'PROHIBITED ACTIVITIES' },
  { id: 'ugc', title: 'USER GENERATED CONTRIBUTIONS' },
  { id: 'license', title: 'CONTRIBUTION LICENCE' },
  { id: 'reviews', title: 'GUIDELINES FOR REVIEWS' },
  { id: 'mobile', title: 'MOBILE APPLICATION LICENSING' },
  { id: 'BetaServices', title: 'BETA SERVICES' },
  { id: 'thirdparty', title: 'THIRD-PARTY WEBSITES AND CONTENT' },
  { id: 'sitemanage', title: 'SERVICES MANAGEMENT' },
  { id: 'ppyes', title: 'PRIVACY POLICY' },
  { id: 'dmca', title: 'DMCA NOTICE AND PROCEDURE FOR MAKING CLAIMS OF COPYRIGHT INFRINGEMENT' },
  { id: 'terms', title: 'TERM AND TERMINATION' },
  { id: 'modifications', title: 'MODIFICATIONS AND INTERRUPTIONS' },
  { id: 'law', title: 'GOVERNING LAW' },
  { id: 'disputes', title: 'DISPUTE RESOLUTION' },
  { id: 'corrections', title: 'CORRECTIONS' },
  { id: 'disclaimer', title: 'DISCLAIMER' },
  { id: 'liability', title: 'LIMITATIONS OF LIABILITY' },
  { id: 'indemnification', title: 'INDEMNIFICATION' },
  { id: 'userdata', title: 'USER DATA' },
  { id: 'electronic', title: 'ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES' },
  { id: 'sms', title: 'SMS TEXT MESSAGING' },
  { id: 'misc', title: 'MISCELLANEOUS' },
  { id: 'contact', title: 'CONTACT US' }
];

const TableOfContents = () => {
  return (
    <div>
      <h4 className="font-bold text-lg">TABLE OF CONTENTS</h4>

      <ul className="px-0">
        {tableOfContentsItems.map((item, index) => (
          <li key={item.id}>
        <a href={`#${item.id}`} className="text-xs font-semibold text-blue-300">{index + 1}. {item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
