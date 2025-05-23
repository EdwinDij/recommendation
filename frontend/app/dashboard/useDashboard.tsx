import { useState } from "react";
import { useAuth as useAuthContext } from "../contexts";

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { logout, user } = useAuthContext();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout(); // ta fonction logout
    } catch (err) {
      console.error(err);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // effet visuel

      setIsLoading(false);
    }
  };

  //     const fadeIn = {
  //     hidden: { opacity: 0, y: 20 },
  //     visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  //   };
  //     const dashboardItems = [
  //       { title: "Ma Bibliothèque", description: "Accédez à vos livres sauvegardés.", icon: <Library className="h-6 w-6 text-indigo-400" />, link: "/my-library" },
  //       { title: "Découvrir", description: "Trouvez de nouvelles lectures.", icon: <BookOpen className="h-6 w-6 text-indigo-400" />, link: "#" }, // Mettre un lien pertinent plus tard
  //       { title: "Statistiques", description: "Suivez votre progression de lecture.", icon: <BookOpen className="h-6 w-6 text-indigo-400" />, link: "#" }, // Mettre un lien pertinent plus tard
  //     ];

  return {
    user,
    handleLogout,
    isLoading,
  };
};
