import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai.css";

import { useEffect, useRef } from "react";

hljs.registerLanguage("javascript", javascript);

const CodeSnippet = () => {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre>
      <code className="javascript" ref={codeRef}>
        {`export function useWeb3AnalyticsReporter() {
  const { pathname, search } = useLocation(); //depends on project routes manager 
  const { provider } = useWeb3React(); //depends on project web3 providers handling

  //track page-views
  useEffect(() => {
    Web3Analytics.trackPageView(pathname, search);
  }, [pathname, search]);

  //track web3 activity



  12345677890-
  useEffect(() => {
    if (provider) {
      Web3Analytics.walletProvider(provider);
    }
  }, [provider]);
}`}
      </code>
    </pre>
  );
};

export default CodeSnippet;
