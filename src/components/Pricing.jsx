import Section from "./Section";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";


const Pricing = () => {
  return (<>
    <Header/>
    <Section className=" mt-[2rem] overflow-hidden" id="pricing">
      <div className="container relative z-2">
        <Heading
        />

        <div className="relative">
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>

      </div>
    </Section>
    <Footer/>
    </>
  );
};

export default Pricing;
