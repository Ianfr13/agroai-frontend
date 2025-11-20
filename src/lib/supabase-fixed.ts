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
  
  // 4. Tenta import.meta.env (Vite/some Vercel configs)
  // @ts-ignore
  if (typeof import !== 'undefined' && import.meta?.env?.[key]) {
    // @ts-ignore
    return import.meta.env[key]
  }
  
  throw new Error(`Environment variable ${key} is not defined`)
}

// Obtém as variáveis de forma segura
let supabaseUrl: string
let supabaseAnonKey: string

try {
  supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
  supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')
} catch (error) {
  console.error('❌ Erro ao carregar variáveis do Supabase:', error)
  
  // Fallback para desenvolvimento - NUNCA use em produção
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️  Usando valores de fallback para desenvolvimento')
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  } else {
    throw new Error('Supabase environment variables are required in production')
  }
}

// Validação básica
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabaseUrl and supabaseAnonKey are required')
}

// Log para debug (remove em produção)
if (process.env.NODE_ENV === 'development') {
  console.log('📍 Supabase URL:', supabaseUrl.substring(0, 30) + '...')
  console.log('📍 Supabase Anon Key:', supabaseAnonKey ? '✅ Presente' : '❌ Ausente')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})