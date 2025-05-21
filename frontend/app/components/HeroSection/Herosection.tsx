import React from "react";
import * as motion from "motion/react-client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const Herosection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-4xl mx-auto"
      >
        <span className="px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-800 text-indigo-400 text-sm font-medium mb-6 inline-block">
          Découvrez notre nouvelle plateforme de livres
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
          Votre bibliothèque numérique personnelle
        </h1>
        <p className="text-lg md:text-xl text-indigo-200/80 mb-8 max-w-2xl mx-auto">
          Accédez à des milliers de livres, organisez votre collection et
          découvrez de nouveaux titres adaptés à vos goûts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-12 px-6 text-base rounded-md transition">
              Commencer dès maintenant
              <ChevronRight className="h-4 w-4" />
            </button>
          </Link>
          {/* <button className="flex items-center justify-center border border-indigo-500/30 text-white hover:bg-indigo-900/30 h-12 px-6 text-base rounded-md transition">
            Voir la démo
          </button> */}
        </div>
      </motion.div>
    </section>
  );
};
