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

  const router = useRouter();

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      !registerUsername ||
      !registerEmail ||
      !registerPassword ||
      !PasswordConfirm ||
      PasswordConfirm !== registerPassword
    )
      console.log("Register attempt:", {
        name: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });
    localStorage.setItem(
      "user",
      JSON.stringify({ email: registerEmail, name: registerUsername })
    );
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
    }
    console.log("Login attempt:", {
      email: loginEmail,
      password: loginPassword,
    });

    localStorage.setItem(
      "user",
      JSON.stringify({ email: loginEmail, name: "Utilisateur Test" })
    );
    router.push("/dashboard");
  };

  return {
    activeTab,
    loginEmail,
    loginPassword,
    registerUsername,
    registerEmail,
    registerPassword,
    PasswordConfirm,
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
