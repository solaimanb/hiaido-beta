import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface QueryTemplatesProps {
  askQuery: (item: string) => {};
}

const QueryTemplates: React.FC<QueryTemplatesProps> = ({ askQuery }) => {
  const data = [
    "How to create an S3 bucket?",
    "How to create an ETL pipeline using AWS Glue?",
    "How to monitor a Lambda function?",
    "How to setup a Elastic Load Balancer for EC2?",
  ];

  return (
    <div className="relative h-full">
      <div className="absolute bottom-72 flex w-full justify-center space-x-4">
        {data.map((item, i) => {
          return (
            <AnimatePresence key={i}>
              <motion.button
                onClick={() => askQuery(item)}
                key={item}
                className="p-4 w-40 rounded-2xl shadow-md dark:shadow-neutral-950 dark:bg-neutral-700/50 border-[1px] flex justify-start border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 text-left dark:hover:bg-neutral-700/75 hover:bg-neutral-200/60 hover:border-neutral-300 dark:hover:border-neutral-500 duration-300"
              >
                <span>{item}</span>
              </motion.button>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};

export default QueryTemplates;
