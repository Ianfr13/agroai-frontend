import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

// Função para obter variáveis de ambiente de forma segura
function getEnvVar(key: string): string {
  // Tenta diferentes métodos para obter a variável
  
  // 1. Tenta process.env (funciona em build time)
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key]!
  }
  
  // 2. Tenta window (para browser)
  if (typeof window !== 'undefined') {
    // @ts-ignore
    const windowEnv = window.__NEXT_DATA__?.props?.pageProps?.env
    if (windowEnv?.[key]) {
      return windowEnv[key]
    }
  }
  
  // 3. Tenta global (algumas configurações de Vercel)
  // @ts-ignore
  if (typeof global !== 'undefined' && global[key]) {
    // @ts-ignore
    return global[key]
  }
  
  // 4. Validação final - se não encontrou, tenta pelo menos retornar algo
  console.error(`❌ Environment variable ${key} not found`)
  
  // Em último caso, tenta process.env mesmo que undefined
  // Isso vai falhar gracefulmente com mensagem clara
  return process.env[key] || ''
}

// Obtém as variáveis de forma segura
const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')

// Validação explícita
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase configuration error:', {
    url: supabaseUrl ? '✅ Present' : '❌ Missing',
    key: supabaseAnonKey ? '✅ Present' : '❌ Missing'
  })
  
  throw new Error(
    `supabaseKey is required.\n` +
    `Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are configured.\n` +
    `Check your Vercel environment variables at: https://vercel.com/dashboard`
  )
}

// Log para debug (apenas em desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  console.log('📍 Supabase configuration:', {
    url: supabaseUrl.substring(0, 30) + '...',
    key: supabaseAnonKey ? '✅ Present' : '❌ Missing'
  })
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})