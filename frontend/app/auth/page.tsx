"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "./useAuth";
import { FullScreenLoader, Spinner } from "../components";

const AuthPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const {
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
  } = useAuth();

  return (
    <>
      {isLoading && <FullScreenLoader loadingText={loadingText} />}

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors"
            >
              <BookOpen className="h-10 w-10 text-indigo-400" />
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                LivresPlus
              </span>
            </Link>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 bg-indigo-900/30 border border-indigo-800/50 rounded-md overflow-hidden">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex items-center justify-center gap-2 py-3 font-semibold text-sm transition-colors ${
                activeTab === "login"
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-300 hover:bg-indigo-800"
              }`}
              aria-selected={activeTab === "login"}
              role="tab"
              id="tab-login"
              type="button"
            >
              <LogIn className="h-4 w-4" /> Se connecter
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex items-center justify-center gap-2 py-3 font-semibold text-sm transition-colors ${
                activeTab === "register"
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-300 hover:bg-indigo-800"
              }`}
              aria-selected={activeTab === "register"}
              role="tab"
              id="tab-register"
              type="button"
            >
              <UserPlus className="h-4 w-4" /> S&apos;inscrire
            </button>
          </div>

          {/* Login Tab Content */}
          {activeTab === "login" && (
            <div className="bg-slate-800/50 border border-indigo-800/50 text-white rounded-md mt-4 shadow-lg">
              <header className="p-6 border-b border-indigo-700">
                <h2 className="text-2xl font-semibold">Connexion</h2>
                <p className="text-indigo-300/70 mt-1">
                  Accédez à votre compte LivresPlus.
                </p>
              </header>
              <form className="p-6 space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="login-username"
                    className="block mb-2 text-sm font-medium text-indigo-300"
                  >
                    Nom d&apos;utilisateur
                  </label>
                  <input
                    id="login-username"
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full rounded-md bg-slate-700/50 border border-indigo-700/50 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="login-password"
                    className="block mb-2 text-sm font-medium text-indigo-300"
                  >
                    Mot de passe
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="********"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full rounded-md bg-slate-700/50 border border-indigo-700/50 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 rounded-md transition-colors border-0"
                >
                  {isLoading && loginUsername && loginPassword ? (
                    <Spinner className="mr-2 h-4 w-4" />
                  ) : null}
                  Se connecter
                </button>
                {loginError && (
                  <span className="text-red-400 text-sm block text-center">
                    {loginError}
                  </span>
                )}
              </form>
              <footer className="p-4 border-t border-indigo-700 text-xs text-indigo-300/70 text-center">
                En vous connectant, vous acceptez nos{" "}
                <a href="#" className="underline hover:text-indigo-400">
                  Conditions d&apos;utilisation
                </a>
                .
              </footer>
            </div>
          )}

          {/* Register Tab Content */}
          {activeTab === "register" && (
            <div className="bg-slate-800/50 border border-indigo-800/50 text-white rounded-md mt-4 shadow-lg">
              <header className="p-6 border-b border-indigo-700">
                <h2 className="text-2xl font-semibold">Inscription</h2>
                <p className="text-indigo-300/70 mt-1">
                  Créez votre compte LivresPlus gratuitement.
                </p>
              </header>
              {registered === "true" && (
                <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                  Inscription réussie ! Vous pouvez maintenant vous connecter.
                </div>
              )}
              <form className="p-6 space-y-6">
                <div>
                  <label
                    htmlFor="register-name"
                    className="block mb-2 text-sm font-medium text-indigo-300"
                  >
                    Nom d&apos;utilisateur
                  </label>
                  <input
                    id="register-name"
                    type="text"
                    placeholder="Votre nom d'utilisateur"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    onFocus={() => setUsernameError("")}
                    className="w-full rounded-md bg-slate-700/50 border border-indigo-700/50 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                  />
                  {usernameError && (
                    <p className="text-red-500 text-sm mt-1">{usernameError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="register-email"
                    className="block mb-2 text-sm font-medium text-indigo-300"
                  >
                    Email
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    placeholder="exemple@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    onFocus={() => setEmailError("")}
                    className="w-full rounded-md bg-slate-700/50 border border-indigo-700/50 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="register-password"
                    className="block mb-2 text-sm font-medium text-indigo-300"
                  >
                    Mot de passe
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    placeholder="********"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    onFocus={() => setPasswordError("")}
                    className="w-full rounded-md bg-slate-700/50 border border-indigo-700/50 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="register-password"
                    className="block mb-2 text-sm font-medium text-indigo-300"
                  >
                    Confirmez votre mot de passe
                  </label>
                  <input
                    id="register-password-confirmation"
                    type="password"
                    placeholder="********"
                    value={PasswordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-full rounded-md bg-slate-700/50 border border-indigo-700/50 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 rounded-md transition-colors border-0"
                >
                  S&apos;inscrire
                </button>
                {registerError && (
                  <span className="text-red-400 text-sm block text-center">
                    {registerError}
                  </span>
                )}
              </form>
              <footer className="p-4 border-t border-indigo-700 text-xs text-indigo-300/70 text-center">
                En vous inscrivant, vous acceptez nos{" "}
                <a href="#" className="underline hover:text-indigo-400">
                  Conditions d&apos;utilisation
                </a>{" "}
                et notre{" "}
                <a href="#" className="underline hover:text-indigo-400">
                  Politique de confidentialité
                </a>
                .
              </footer>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-indigo-300/70">
            <Link href="/" className="underline hover:text-indigo-400">
              Retour à l&apos;accueil
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;
