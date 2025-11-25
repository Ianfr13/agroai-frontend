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
      const results: any = {
        methods: {},
        error: null
      }

      try {
        // Método 1: process.env
        // @ts-ignore
        results.methods.process_env = {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_FOUND',
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'NOT_FOUND'
        }
      } catch (e) {
        results.methods.process_env = { error: e }
      }

      try {
        // Método 2: window
        // @ts-ignore
        const windowEnv = window.__NEXT_DATA__?.props?.pageProps?.env
        results.methods.window = {
          url: windowEnv?.NEXT_PUBLIC_SUPABASE_URL || 'NOT_FOUND',
          key: windowEnv?.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'NOT_FOUND'
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
      const workingMethod = Object.entries(results.methods).find(([_, value]: any) => 
        value?.url && value?.url !== 'NOT_FOUND' && value?.url !== 'undefined'
      )

      if (workingMethod) {
        const [method, data]: any = workingMethod
        setEnvVars({
          url: data.url,
          key: data.key,
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