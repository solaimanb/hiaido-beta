import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../index.css";

const FeaturedHighlight = () => {
  return (
    <div className="">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef();
  const { scrollY } = useScroll();
  const [reachedEnd, setReachedEnd] = useState(false);

  const x = useTransform(scrollY, (value) => {
    if (!targetRef.current || reachedEnd) return 0;
    const rect = targetRef.current.getBoundingClientRect();
    return (-value / rect.height) * rect.width;
  });

  useEffect(() => {
    const updateLayout = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        if (rect.bottom <= window.innerHeight) {
          setReachedEnd(true);
        } else {
          setReachedEnd(false);
          x.set((-scrollY.get() / rect.height) * rect.width);
        }
      }
    };

    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [x, scrollY, reachedEnd]);

  return (
    <section ref={targetRef} className="bg-black/90">
      <div className="md:min-h-screen relative flex h-[80vh] items-center">
        <motion.div
          style={{ x }}
          className="hidden md:flex flex-col md:flex-row gap-10 ml-[120%] sticky top-0"
        >
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[250px] w-[450px] overflow-hidden rounded-xl border border-orange-400/40 shadow-2xl transition-transform duration-300 hover:scale-110 backdrop-blur-sm"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="group-hover:scale-110 absolute inset-0 z-0 transition-transform duration-300"
      ></div>

      <div className="place-content-center absolute inset-0 z-10 grid">
        <p className="backdrop-blur-lg p-8 text-6xl font-black text-white uppercase">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default FeaturedHighlight;

const cards = [
  {
    url: "/imgs/abstract/1.jpg",
    title: "Orbit 1",
    id: 1,
  },
  {
    url: "/imgs/abstract/2.jpg",
    title: "Orbit 2",
    id: 2,
  },
  {
    url: "/imgs/abstract/3.jpg",
    title: "Orbit 3",
    id: 3,
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "Orbit 4",
    id: 4,
  },
];

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const HighlightStory = () => {
//   const containerRef = useRef();

//   useEffect(() => {
//     let sections = gsap.utils.toArray(".panel");

//     gsap.to(sections, {
//       xPercent: -100 * (sections.length - 1),
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".container",
//         pin: true,
//         scrub: 1,
//         snap: 1 / (sections.length - 1),
//         end: () => "+=" + containerRef.current.offsetWidth,
//       },
//     });
//   }, []);

//   return (
//     <div
//       className="flex flex-no-wrap w-full h-screen overflow-x-hidden"
//       ref={containerRef}
//     >
//       <section className="panel red border">ONE</section>
//       <section className="panel orange border">TWO</section>
//       <section className="panel purple border">THREE</section>
//     </div>
//   );
// };

// export default HighlightStory;
