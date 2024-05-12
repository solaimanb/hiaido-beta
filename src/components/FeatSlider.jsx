import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeatSlider = () => {
  let tl = gsap.timeline({
    trigger: ".anim",
    start: "top center",
    end: "bottom center",
    scrub: true,
    markers: true,
  });

  tl.to(".anim", {
    x: 300,
  });

  return (
    <div>
      <div className="min-h-screen border">slide</div>

      <div className="anim min-h-screen border">
        <div className="rounded-xl w-fit p-20 border border-orange-400">
          slide
        </div>
      </div>

      <div className="min-h-screen border">slide</div>
    </div>
  );
};

export default FeatSlider;
