"use client";
import React from "react";
import Link from "next/link";
import { useDashboard } from "./useDashboard";
import { BookOpen, LogOut, Settings, Library } from "lucide-react"; // Ajout de Library
import { motion } from "framer-motion";
import { FullScreenLoader, Spinner } from "../components";

export default function DashboardPage() {
  const { user, handleLogout, isLoading } = useDashboard();
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const dashboardItems = [
    {
      title: "Ma Bibliothèque",
      description: "Accédez à vos livres sauvegardés.",
      icon: <Library className="h-6 w-6 text-indigo-400" />,
      link: "/my-library",
    },
    {
      title: "Découvrir",
      description: "Trouvez de nouvelles lectures.",
      icon: <BookOpen className="h-6 w-6 text-indigo-400" />,
      link: "#",
    }, // Mettre un lien pertinent plus tard
    {
      title: "Statistiques",
      description: "Suivez votre progression de lecture.",
      icon: <BookOpen className="h-6 w-6 text-indigo-400" />,
      link: "#",
    }, // Mettre un lien pertinent plus tard
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white p-4 md:p-8">
      {isLoading && (
        <FullScreenLoader loadingText={"Déconnexion en cours..."} />
      )}
      <header className="container mx-auto flex justify-between items-center py-6 mb-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-indigo-400" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            LivresPlus
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-indigo-200 hidden md:block">
            Bonjour, {user?.username} !
          </span>
          <button className="text-indigo-300 hover:text-indigo-100 hover:bg-indigo-900/50">
            <Settings className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className=" flex px-4 py-2 rounded-md text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" /> Déconnexion
            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="bg-slate-800/50 border border-indigo-800/50 text-white mb-8 p-6 rounded-xl shadow-md">
            <h1 className="text-3xl flex items-center mb-2">
              <svg
                className="mr-3 h-8 w-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Tableau de Bord
            </h1>
            <p className="text-indigo-300/70 mb-6">
              Bienvenue sur votre espace personnel, {user?.username}.
            </p>
            <p className="text-indigo-100 mb-6">
              C&apos;est ici que vous pouvez gérer votre bibliothèque, découvrir
              de nouveaux livres et bien plus encore.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="bg-slate-700/60 border border-indigo-700/60 rounded-xl p-4 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-900/30 transition-all duration-300 block text-white"
                >
                  <div className="text-xl flex items-center mb-2 text-indigo-200">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </div>
                  <p className="text-sm text-indigo-100/80">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
