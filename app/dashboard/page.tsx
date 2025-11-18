"use client";

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace('/login')
      else setUser(user)
    })
  }, [router])

  if (!user) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 flex items-center justify-center px-8">
      <div className="text-center">
        <SparklesIcon className="w-40 h-40 text-yellow-400 mx-auto mb-12 animate-pulse" />
        <h1 className="text-7xl font-black text-white mb-6 tracking-tighter">WELCOME BACK</h1>
        <h2 className="text-6xl font-bold text-emerald-400 mb-8">
          {user.email?.split('@')[0] || user.user_metadata.full_name || 'LEGEND'}
        </h2>
        <p className="text-4xl text-cyan-300 font-mono">CHRONOS.ENGINE3.5 — 100% LOCKED & GREEN</p>
      </div>
    </main>
  )
}
