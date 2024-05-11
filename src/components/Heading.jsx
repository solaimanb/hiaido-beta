import TagLine from "./Tagline";

const Heading = ({ className, title, text, tag }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto  md:text-center`}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && <h2 className="h2 text-green-600 text-xl ">{title}</h2>}
      {text && <p className="body-2 mt-4 text-n-2">{text}</p>}
    </div>
  );
};

export default Heading;
