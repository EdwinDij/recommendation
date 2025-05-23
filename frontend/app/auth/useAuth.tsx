import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Chargement...");

  const router = useRouter();

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      !registerUsername ||
      !registerEmail ||
      !registerPassword ||
      !PasswordConfirm
    ) {
      setRegisterError("Tous les champs sont requis.");
      return;
    }

    if (registerPassword !== PasswordConfirm) {
      setRegisterError("Les mots de passe ne correspondent pas.");
      return;
    }

    setRegisterError(""); // reset l'erreur
    setIsLoading(true);
    setLoadingText("Création de votre compte...");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_URL}api/auth/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: registerUsername,
            email: registerEmail,
            password: registerPassword,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        setIsLoading(false); // stop loader
        setRegisterError(errorData.message || "Erreur lors de l'inscription.");
        return;
      }

      const data = await res.json();

      console.log("Register success:", data);

      localStorage.setItem(
        "user",
        JSON.stringify({ email: registerEmail, name: registerUsername })
      );

      await new Promise((resolve) => setTimeout(resolve, 1500)); // effet visuel

      router.push("/dashboard");
    } catch (error) {
      console.error("Erreur réseau :", error);
      setIsLoading(false);
      setRegisterError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

 const handleLogin = async (e: { preventDefault: () => void }) => {
  e.preventDefault();

  if (!loginEmail || !loginPassword) {
    setLoginError("Veuillez remplir tous les champs.");
    return;
  }

  setLoginError(""); // reset l'erreur si tout est bon
  setIsLoading(true); // démarrer le loader
  setLoadingText("Connexion à votre dashboard...")
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/auth/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,          // 👈 bonne variable ici
          password: loginPassword,    // 👈 bonne variable ici
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      setIsLoading(false);
      setLoginError(errorData.message || "Erreur lors de la connexion.");
      return;
    }

    const data = await res.json();

    localStorage.setItem(
      "user",
      JSON.stringify({ email: loginEmail, name: data.name, token: data.token || "Utilisateur Test" })
    );

    router.push("/dashboard");
  } catch (error) {
    console.error("Erreur réseau :", error);
    setLoginError("Une erreur est survenue. Veuillez réessayer.");
  } finally {
    setIsLoading(false); // s'assurer de toujours désactiver le loader
  }
};

  return {
    activeTab,
    isLoading,
    loadingText,
    loginEmail,
    loginPassword,
    registerUsername,
    registerEmail,
    registerPassword,
    PasswordConfirm,
    registerError,
    loginError,
    handleRegister,
    handleLogin,
    setActiveTab,
    setLoginEmail,
    setLoginPassword,
    setRegisterUsername,
    setRegisterEmail,
    setRegisterPassword,
    setPasswordConfirm,
  };
}
