import Benefits from './Benefits';
import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';
const Landing = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits/>
        <Footer />
    </div>
  )
}
export default Landing