import TagLine from "./Tagline";

const Heading = ({ className, title, text, tag }) => {
  return (
    <div className={`${className} max-w-[50rem] mx-auto  md:text-center`}>
      {tag && <TagLine className="md:justify-center mb-4">{tag}</TagLine>}
      {title && (
        <h2 className="h2 text-xl font-semibold text-green-600">{title}</h2>
      )}
      {text && <p className="body-2 text-n-2 mt-4">{text}</p>}
    </div>
  );
};

export default Heading;
