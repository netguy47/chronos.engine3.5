"use client";

import { useCallback } from "react";
import { supabase } from "../../../lib/supabaseClient";

type GithubSignInButtonProps = {
  className?: string;
};

export function GithubSignInButton({ className = "" }: GithubSignInButtonProps) {
  const handleLogin = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  }, []);

  return (
    <button
      type="button"
      onClick={handleLogin}
      className={`px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-xl font-bold rounded-2xl transition-all transform hover:scale-105 shadow-2xl ${className}`.trim()}
    >
      Sign in with GitHub
    </button>
  );
}
