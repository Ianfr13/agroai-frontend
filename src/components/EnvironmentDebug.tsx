'use client'

import { useEffect, useState } from 'react'

export function EnvironmentDebug() {
  const [envVars, setEnvVars] = useState<{
    url: string
    key: string
    error: string | null
  }>({ url: '', key: '', error: null })

  useEffect(() => {
    // Testar diferentes métodos de obter as variáveis
    const testEnvVars = () => {
      type MethodResult = { url?: string; key?: string; error?: unknown }
      const results: { methods: Record<string, MethodResult> } = {
        methods: {}
      }

      try {
        results.methods.process_env = {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'NOT_FOUND',
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'NOT_FOUND'
        }
      } catch (e) {
        results.methods.process_env = { error: e }
      }

      try {
        const w = window as unknown as { __NEXT_DATA__?: { props?: { pageProps?: { env?: Record<string, string> } } } }
        const windowEnv = w.__NEXT_DATA__?.props?.pageProps?.env
        results.methods.window = {
          url: windowEnv?.NEXT_PUBLIC_SUPABASE_URL ?? 'NOT_FOUND',
          key: windowEnv?.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'NOT_FOUND'
        }
      } catch (e) {
        results.methods.window = { error: e }
      }

      try {
        // Método 3: Verificar se está no HTML
        const metaUrl = document.querySelector('meta[name="next-public-supabase-url"]')?.getAttribute('content')
        const metaKey = document.querySelector('meta[name="next-public-supabase-anon-key"]')?.getAttribute('content')
        results.methods.meta = {
          url: metaUrl || 'NOT_FOUND',
          key: metaKey || 'NOT_FOUND'
        }
      } catch (e) {
        results.methods.meta = { error: e }
      }

      // Verificar qual método funcionou
      const workingMethod = Object.entries(results.methods).find(([, value]) => 
        value?.url && value.url !== 'NOT_FOUND' && value.url !== 'undefined'
      )

      if (workingMethod) {
        const [, data] = workingMethod
        setEnvVars({
          url: data.url ?? 'NOT_FOUND',
          key: data.key ?? 'NOT_FOUND',
          error: null
        })
      } else {
        setEnvVars({
          url: 'NOT_FOUND',
          key: 'NOT_FOUND',
          error: 'Nenhuma variável encontrada em nenhum método'
        })
      }
    }

    testEnvVars()
  }, [])

  return (
    <div className="fixed top-4 right-4 bg-black text-green-400 p-4 rounded-lg font-mono text-xs max-w-md z-50">
      <h3 className="font-bold mb-2">🔍 ENV Debug</h3>
      <div className="space-y-1">
        <div>URL: {envVars.url === 'NOT_FOUND' ? '❌' : '✅'} {envVars.url?.substring(0, 30)}...</div>
        <div>Key: {envVars.key === 'NOT_FOUND' ? '❌' : '✅'} {envVars.key ? 'Present' : 'Missing'}</div>
        {envVars.error && (
          <div className="text-red-400 mt-2">Error: {envVars.error}</div>
        )}
      </div>
    </div>
  )
}