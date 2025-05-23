// utils/fetchWithAutoRefresh.ts
import router from "next/router";

export const fetchWithAutoRefresh = async (url: string, options: RequestInit = {}) => {
    const tokens = JSON.parse(localStorage.getItem("user") || "{}");

    if (!tokens?.access) {
        router.push("/login");
        throw new Error("Non authentifié");
    }

    // 1ère tentative avec access token
    let res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${tokens.access}`,
            "Content-Type": "application/json",
        },
    });

    // Si le token a expiré, tente un refresh
    if (res.status === 401 && tokens.refresh) {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/api/auth/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: tokens.refresh }),
        });

        if (refreshRes.ok) {
            const newData = await refreshRes.json();
            const updatedTokens = {
                ...tokens,
                access: newData.access,
            };
            localStorage.setItem("user", JSON.stringify(updatedTokens));

            // Rejoue la requête initiale avec le nouveau token
            res = await fetch(url, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${newData.access}`,
                    "Content-Type": "application/json",
                },
            });
        } else {
            // Refresh échoué → redirection login
            localStorage.removeItem("user");
            router.push("/login");
            throw new Error("Session expirée");
        }
    }

    return res;
}
