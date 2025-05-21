import React from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="container mx-auto px-4 py-12 border-t border-indigo-900/50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-indigo-400" />
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              LivresPlus
            </span>
          </div>
          <p className="text-indigo-300/70 text-sm">
            Votre bibliothèque numérique personnelle, accessible partout et à
            tout moment.
          </p>
        </div>

        <div>
          <p className="font-medium mb-4">Produit</p>
          <ul className="space-y-2">
            <li>
              <Link href="#features"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Fonctionnalités
              </Link>
            </li>
            <li>
              <Link href="#pricing"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Tarifs
              </Link>
            </li>
            {/* <li>
              <a
                href="#testimonials"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Témoignages
              </a>
            </li> */}
            <li>
              <Link
                href="#"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
{/* 
        <div>
          <p className="font-medium mb-4">Ressources</p>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Guides
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Événements
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Communauté
              </a>
            </li>
          </ul>
        </div> */}

        <div>
          <p className="font-medium mb-4">Entreprise</p>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                À propos
              </a>
            </li>
            <li>
              {/* <a
                href="#"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Carrières
              </a> */}
            </li>
            <li>
              <a
                href="#"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Contact
              </a>
            </li>
            <li>
              {/* <a
                href="#"
                className="text-indigo-300/70 hover:text-indigo-300 text-sm"
              >
                Presse
              </a> */}
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-indigo-900/50 flex flex-col md:flex-row justify-between items-center">
        <p className="text-indigo-300/70 text-sm mb-4 md:mb-0">
          © 2025 LivresPlus. Tous droits réservés.
        </p>
        <div className="flex space-x-6">
          <a
            href="#"
            className="text-indigo-300/70 hover:text-indigo-300 text-sm"
          >
            Conditions d&apos;utilisation
          </a>
          <a
            href="#"
            className="text-indigo-300/70 hover:text-indigo-300 text-sm"
          >
            Politique de confidentialité
          </a>
          <a
            href="#"
            className="text-indigo-300/70 hover:text-indigo-300 text-sm"
          >
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
};
