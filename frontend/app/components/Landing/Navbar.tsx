import { BookOpen } from 'lucide-react';
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-indigo-400" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          LivresPlus
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="/#features"
          className="text-sm font-medium hover:text-indigo-400 transition-colors"
        >
          Fonctionnalités
        </Link>
        <Link
          href="/#pricing"
          className="text-sm font-medium hover:text-indigo-400 transition-colors"
        >
          Tarifs
        </Link>
        {/* <Link
          href="/#testimonials"
          className="text-sm font-medium hover:text-indigo-400 transition-colors"
        >
          Témoignages
        </Link> */}
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/auth"
          className="hidden md:inline-flex px-4 py-2 rounded-md text-sm text-white hover:text-indigo-400 hover:bg-indigo-950/50 transition-colors"
        >
          Se connecter
        </Link>

        <Link
          href="/auth"
          className="px-4 py-2 rounded-md text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors"
        >
          Découvrir des livres
        </Link>
      </div>
    </header>
  );
};
