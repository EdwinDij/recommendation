import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterErrorData } from "../Types/authType";
import { useAuth as useAuthContext } from "../contexts";

export function useAuthentification() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Chargement...");

  const router = useRouter();

  const { login } = useAuthContext();

  function translateRegisterErrors(errorData: RegisterErrorData) {
    const errors: {
      email?: string;
      username?: string;
      password?: string;
    } = {};

    if (errorData.email?.length) {
      if (
        errorData.email[0].includes("already exists") ||
        errorData.email[0].includes("objet")
      ) {
        errors.email = "Cet email est déjà utilisé.";
      } else {
        errors.email = errorData.email[0];
      }
    }

    if (errorData.username?.length) {
      if (errorData.username[0].includes("already exists")) {
        errors.username = "Ce nom d'utilisateur est déjà pris.";
      } else {
        errors.username = errorData.username[0];
      }
    }

    if (errorData.password?.length) {
      const messages = errorData.password.map((msg: string) => {
        if (msg.includes("too short")) return "Le mot de passe est trop court.";
        if (msg.includes("too common"))
          return "Le mot de passe est trop courant.";
        return msg;
      });
      errors.password = messages.join(" ");
    }

    return errors;
  }

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

        const { email, username, password } =
          translateRegisterErrors(errorData);

        setEmailError(email || "");
        setUsernameError(username || "");
        setPasswordError(password || "");

        await new Promise((resolve) => setTimeout(resolve, 2500));

        setIsLoading(false);
        setRegisterError("Erreur lors de l'inscription.");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1800)); // effet visuel

      setIsLoading(false);
      router.push("/auth?registered=true");
    } catch (error) {
      console.error("Erreur réseau :", error);
      setIsLoading(false);
      setRegisterError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!loginUsername || !loginPassword) {
      setLoginError("Veuillez remplir tous les champs.");
      return;
    }

    setLoginError(""); // reset l'erreur si tout est bon
    setIsLoading(true); // démarrer le loader
    setLoadingText("Connexion à votre dashboard...");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_URL}api/auth/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginUsername,
            password: loginPassword,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        await new Promise((resolve) => setTimeout(resolve, 2500)); // effet visuel

        setIsLoading(false);
        setLoginError(errorData.message || "Erreur lors de la connexion.");
        console.log(loginPassword, loginUsername);
        return;
      }

      const data = await res.json();

      login({
        email: data.email,
        username: data.username,
        token: data.token,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500)); // effet visuel

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
    emailError,
    isLoading,
    loadingText,
    loginUsername,
    loginPassword,
    registerUsername,
    registerEmail,
    registerPassword,
    PasswordConfirm,
    registerError,
    passwordError,
    loginError,
    usernameError,
    handleRegister,
    handleLogin,
    setActiveTab,
    setLoginUsername,
    setLoginPassword,
    setRegisterUsername,
    setRegisterEmail,
    setRegisterPassword,
    setPasswordConfirm,
    setEmailError,
    setPasswordError,
    setUsernameError,
  };
}
