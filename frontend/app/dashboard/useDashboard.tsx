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

  return {
    user,
    handleLogout,
    isLoading,
  };
};
