import React from "react";
import { CheckCircle } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";

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

const pricingPlans = [
  {
    name: "Lecteur",
    price: "Gratuit",
    description: "Parfait pour découvrir la plateforme",
    features: [
      "Accès à des milliers de livres",
      "Recommandations personnalisées",
      "Support par email",
    ],
    cta: "Commencer maintenant",
    highlighted: true,
  },
  //   {
  //     name: "Premium",
  //     price: "9,99€/mois",
  //     description: "Notre offre la plus populaire",
  //     features: ["Accès à 10 000 livres", "3 appareils", "Recommandations avancées", "Support prioritaire", "Clubs de lecture"],
  //     cta: "Essai gratuit de 14 jours",
  //     highlighted: true
  //   },
  //   {
  //     name: "Illimité",
  //     price: "19,99€/mois",
  //     description: "Pour les lecteurs passionnés",
  //     features: ["Accès illimité", "Appareils illimités", "Recommandations personnalisées", "Support VIP 24/7", "Clubs de lecture premium", "Livres audio inclus"],
  //     cta: "Essai gratuit de 14 jours",
  //     highlighted: false
  //   }
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="container mx-auto px-4 py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="text-center mb-16 relative"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Tarifs simples et transparents
        </h2>
        <p className="text-indigo-200/70 max-w-2xl mx-auto">
          Choisissez le plan qui correspond à vos besoins de lecture.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className={`flex justify-center ${
          pricingPlans.length > 1 ? "md:grid md:grid-cols-3" : ""
        } gap-8 relative`}
      >
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className={`
              bg-gradient-to-br from-slate-800/80 to-indigo-900/80 backdrop-blur-sm 
              border rounded-xl p-8 relative
              ${
                plan.highlighted
                  ? "border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105 z-10"
                  : "border-indigo-800/30"
              }
            `}
          >
            {plan.highlighted && (
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                Recommandé
              </span>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold">{plan.price}</span>
            </div>
            <p className="text-indigo-200/70 mb-6">{plan.description}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-400 mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-indigo-100">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/auth" className="w-full block">
              <button
                className={`w-full py-2 px-4 rounded-md font-semibold transition duration-200 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    : "bg-indigo-900/50 hover:bg-indigo-800/50 text-white border border-indigo-700/50"
                }`}
              >
                {plan.cta}
              </button>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
