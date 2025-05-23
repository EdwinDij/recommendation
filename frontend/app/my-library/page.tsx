"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
// import Image from "next/image";
import { Book } from "../Types/bookType";

const initialBooksData = [
  {
    id: 1,
    title: "L'Étranger",
    author: "Albert Camus",
    coverSeed: "EtrangerCamus",
    genre: "Philosophique",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverSeed: "1984Orwell",
    genre: "Dystopie",
  },
  {
    id: 3,
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    coverSeed: "PetitPrince",
    genre: "Conte",
  },
  {
    id: 4,
    title: "Orgueil et Préjugés",
    author: "Jane Austen",
    coverSeed: "OrgueilPrejuges",
    genre: "Romance",
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    coverSeed: "DuneHerbert",
    genre: "Science-Fiction",
  },
  {
    id: 6,
    title: "Le Seigneur des Anneaux",
    author: "J.R.R. Tolkien",
    coverSeed: "LOTRTolkien",
    genre: "Fantasy",
  },
  {
    id: 7,
    title: "Crime et Châtiment",
    author: "Fiodor Dostoïevski",
    coverSeed: "CrimeChatiment",
    genre: "Classique",
  },
  {
    id: 8,
    title: "Les Misérables",
    author: "Victor Hugo",
    coverSeed: "MiserablesHugo",
    genre: "Historique",
  },
];

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  const [books, setBooks] = useState(initialBooksData);

  const user = { name: "Utilisateur" };
  const handleLogout = () => alert("Déconnexion");

  const handleAddBook = (book: Book) => {
    setBooks((prev) => [...prev, { ...book, id: Date.now() }]);
    setIsAddBookDialogOpen(false);
  };

  const filteredAndSortedBooks = books
    .filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGenre = genreFilter ? book.genre === genreFilter : true;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

  const allGenres = [...new Set(books.map((book) => book.genre))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ma bibliothèque</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-indigo-300">
            Bienvenue, {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-sm"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Filtres */}
          <div className="mb-6 flex flex-wrap gap-4 items-end">
            <input
              type="text"
              placeholder="Rechercher un livre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded w-full sm:w-64"
            />
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded"
            >
              <option value="">Tous les genres</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <button
              onClick={() => setIsAddBookDialogOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
            >
              Ajouter un livre
            </button>
          </div>

          {/* Faux formulaire d'ajout */}
          {isAddBookDialogOpen && (
            <div className="bg-slate-800 p-4 rounded shadow mb-6">
              <h2 className="text-xl font-semibold mb-2">Ajouter un livre</h2>
              <p className="text-sm text-indigo-300 mb-4">
                Fonction à implémenter plus tard.
              </p>
              <button
                onClick={() =>
                  handleAddBook({
                    title: "Titre exemple",
                    author: "Auteur exemple",
                    genre: "Genre test",
                    coverSeed: "NouvelAjout",
                  })
                }
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
              >
                Ajouter un livre fictif
              </button>
            </div>
          )}

          {/* Affichage des livres */}
          {filteredAndSortedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredAndSortedBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-slate-800 p-4 rounded shadow hover:bg-slate-700 transition"
                >
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-indigo-300">{book.author}</p>
                  <p className="text-xs text-indigo-400 italic">{book.genre}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-20 w-20 text-indigo-500 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-2">
                Aucun livre trouvé
              </h2>
              <p className="text-indigo-300/70">
                Essayez d&apos;ajuster vos filtres ou ajoutez de nouveaux livres
                à votre bibliothèque.
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
