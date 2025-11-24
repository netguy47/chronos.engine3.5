"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";
export default function Login() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 flex items-center justify-center px-8">
      <div className="text-center">
        <SparklesIcon className="w-32 h-32 text-yellow-400 mx-auto mb-12 animate-pulse" />
        <h1 className="text-5xl font-bold text-white mb-6">Chronos Engine 3.5</h1>
        <p className="text-xl text-slate-300 mb-12 max-w-md mx-auto">
          Sign in to unlock cinematic AI creation
        </p>      </div>
    </main>
  );
}
