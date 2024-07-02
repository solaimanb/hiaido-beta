
const Dialog = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-auto z-50 p-4 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[768px] min-h-screen md:min-h-fit">
                <div className="p-4 border-b">
                    <h2 className="text-xl text-black font-semibold">{title}</h2>
                </div>
                <div className="p-4 w-full">
                    {children}
                </div>
                <div className="p-4 border-t flex justify-end">
                    <button
                        className="p-3 border border-orange-400 rounded-3xl bg-orange-300 hover:bg-orange-400 mt-3 font-bold"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog