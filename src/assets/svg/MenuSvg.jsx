const MenuSvg = ({ openNavigation }) => {
  return (
    <svg
      className="overflow-visible"
      width="22"
      height="20"
      viewBox="0 0 22 12"
    >
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="24"
        height="2"
        rx="1"
        fill="white"
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className={`transition-all origin-center ${
          openNavigation ? "hidden" : ""
        }`}
        y={openNavigation ? "5" : "7"}
        width="24"
        height="2"
        rx="1"
        fill="white"
        transform={`rotate(${openNavigation ? "0" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "14"}
        width="24"
        height="2"
        rx="1"
        fill="white"
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};

export default MenuSvg;
