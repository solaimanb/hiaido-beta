
const AnimatedCheckmark = () => {
    return (
        <svg
            className="animate-checkmark h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
        >
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path
                className="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
        </svg>
    );
};

export default AnimatedCheckmark;
