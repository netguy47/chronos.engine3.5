import { SparklesIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center px-8">
      <SparklesIcon className="w-32 h-32 text-yellow-400 mb-10 animate-pulse" />
      <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
        chronos.engine3.5
      </h1>
      <p className="text-3xl md:text-4xl text-emerald-400 font-mono mb-6">
        FRONTEND LOCKED & GREEN
      </p>
      <p className="text-xl text-slate-400 mb-12 max-w-2xl">
        AI-powered cinematic scenario generator • Real-time collaboration • Unlimited creativity
      </p>

      <Link href="/login">
        <button className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-2xl font-bold rounded-3xl hover:from-emerald-400 hover:to-cyan-500 transition-all transform hover:scale-110 shadow-2xl">
          Get Started Now
          <ChevronRightIcon className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </button>
      </Link>

      <p className="mt-12 text-slate-500 text-sm">
        Sign in with GitHub • No credit card required
      </p>
    </main>
  )
}
