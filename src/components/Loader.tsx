import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
