// import SectionSvg from "../assets/svg/SectionSvg";

const Section = ({
  className,
  id,
  crosses,
  // eslint-disable-next-line no-unused-vars
  crossesOffset,
  customPaddings,
  children,
}) => {
  return (
    <div
      id={id}
      className={`
      relative
      ${
        customPaddings ||
        `py-2 lg:py-16 xl:py-2 ${crosses ? "lg:py-8 xl:py-2" : ""}`
      }
      ${className || ""}`}
    >
      {children}

      <div className="hidden absolute top-0 left-5 w-0.25 h-full  pointer-events-none md:block lg:left-7.5 xl:left-10" />
      <div className="hidden absolute top-0 right-5 w-0.25 h-full  pointer-events-none md:block lg:right-7.5 xl:right-10" />
    </div>
  );
};
export default Section;
