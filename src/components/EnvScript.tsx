// Componente para injetar variáveis de ambiente no HTML
// Isso garante que as variáveis estejam disponíveis no cliente

export function EnvScript() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  // Filtra apenas variáveis que existem
  const validEnvVars = Object.fromEntries(
    Object.entries(envVars).filter(([, value]) => value !== undefined)
  )

  if (Object.keys(validEnvVars).length === 0) {
    console.warn('⚠️ Nenhuma variável de ambiente NEXT_PUBLIC encontrada para injetar')
    return null
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Injetar variáveis de ambiente no cliente
          window.__ENV__ = ${JSON.stringify(validEnvVars)};
          console.log('📍 Variáveis de ambiente injetadas:', Object.keys(window.__ENV__));
        `
      }}
    />
  )
}