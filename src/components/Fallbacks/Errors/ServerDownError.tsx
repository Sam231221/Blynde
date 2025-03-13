import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { RefreshCw, Server, WifiOff } from "lucide-react";

interface ServerDownErrorProps {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
}

export function ServerDownError({ refetch }: ServerDownErrorProps) {
  return (
    <motion.div
      className="w-full  mx-auto rounded-lg bg-white p-6 shadow-lg border border-red-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-red-100 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{ opacity: 0.5 }}
          />
          <div className="relative bg-red-50 p-4 rounded-full">
            <Server className="h-10 w-10 text-red-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Server Unavailable
          </h2>
          <p className="text-gray-600 mb-6">
            We're having trouble connecting to our servers. This might be due to
            maintenance or high traffic.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <WifiOff className="h-4 w-4" />
            <span>Connection lost</span>
          </div>

          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
