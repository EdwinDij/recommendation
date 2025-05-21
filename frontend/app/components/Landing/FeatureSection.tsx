import React from "react";
import { Library, BookText} from "lucide-react";
import * as motion from "motion/react-client";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const featuresData = [
  {
    icon: <Library className="h-10 w-10 text-indigo-400" />,
    title: "Bibliothèque illimitée",
    description:
      "Stockez et organisez tous vos livres dans un seul endroit accessible depuis n'importe quel appareil.",
  },
  {
    icon: <BookText className="h-10 w-10 text-indigo-400" />,
    title: "Recommandations personnalisées",
    description:
      "Découvrez de nouveaux livres basés sur vos préférences et habitudes de lecture.",
  },
  // {
  //   icon: <Users className="h-10 w-10 text-indigo-400" />,
  //   title: "Clubs de lecture",
  //   description:
  //     "Rejoignez des communautés de lecteurs et partagez vos impressions sur vos livres préférés.",
  // },
];
export const FeatureSection = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Fonctionnalités exceptionnelles
        </h2>
        <p className="text-indigo-200/70 max-w-2xl mx-auto">
          Notre plateforme offre tout ce dont vous avez besoin pour gérer et
          profiter de votre collection de livres.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-gradient-to-br from-slate-800/50 to-indigo-900/50 backdrop-blur-sm border border-indigo-800/30 rounded-xl p-8 hover:shadow-indigo-900/20 hover:shadow-lg transition-all"
          >
            <div className="bg-indigo-900/30 p-3 rounded-lg w-fit mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-indigo-200/70">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
