import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "../../components"; 
import { BookOpen } from "lucide-react";

export const FullScreenLoader = ({ loadingText = "Chargement..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-10 w-10 text-indigo-400 animate-pulse" />
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          LivresPlus
        </span>
      </div>
      <Spinner className="h-12 w-12 text-indigo-400 mb-4" />
      <p className="text-lg text-indigo-200">{loadingText}</p>
    </motion.div>
  );
};