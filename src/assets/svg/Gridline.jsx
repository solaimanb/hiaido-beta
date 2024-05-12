const Gridline = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="orange"
            strokeWidth="0.5"
          />
          <path
            d="M 5 0 L 5 10"
            fill="none"
            stroke="orange"
            strokeWidth="0.5"
          />
          <path
            d="M 0 5 L 10 5"
            fill="none"
            stroke="orange"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
};

export default Gridline;
