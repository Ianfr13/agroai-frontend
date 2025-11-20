// Função assíncrona para testar variáveis no servidor
async function getEnvVars() {
  'use server'
  
  const envVars = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    nodeEnv: process.env.NODE_ENV,
    allEnv: Object.keys(process.env).filter(key => key.includes('SUPABASE'))
  }
  
  return envVars
}

export default async function TestEnvPage() {
  const envVars = await getEnvVars()
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🔍 Teste de Variáveis de Ambiente
        </h1>
        
        <div className="space-y-6">
          {/* Variáveis do Servidor */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              📋 Variáveis no Servidor (process.env)
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="font-mono text-sm">NEXT_PUBLIC_SUPABASE_URL:</span>
                <span className={`font-mono text-sm ${envVars.url ? 'text-green-600' : 'text-red-600'}`}>
                  {envVars.url ? '✅ Presente' : '❌ Ausente'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="font-mono text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                <span className={`font-mono text-sm ${envVars.key ? 'text-green-600' : 'text-red-600'}`}>
                  {envVars.key ? '✅ Presente' : '❌ Ausente'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="font-mono text-sm">NODE_ENV:</span>
                <span className="font-mono text-sm text-blue-600">
                  {envVars.nodeEnv || 'undefined'}
                </span>
              </div>
            </div>
          </div>

          {/* Variáveis Encontradas */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              🔍 Todas as Variáveis SUPABASE Encontradas
            </h2>
            
            <div className="space-y-2">
              {envVars.allEnv.length > 0 ? (
                envVars.allEnv.map(key => (
                  <div key={key} className="p-2 bg-gray-50 dark:bg-gray-700 rounded font-mono text-sm">
                    {key}
                  </div>
                ))
              ) : (
                <div className="text-red-600 dark:text-red-400">
                  ❌ Nenhuma variável SUPABASE encontrada
                </div>
              )}
            </div>
          </div>

          {/* Valores (mascarados) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              🔐 Valores (mascarados por segurança)
            </h2>
            
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  SUPABASE_URL: {envVars.url ? `${envVars.url.substring(0, 30)}...` : '❌ Não definido'}
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  SUPABASE_ANON_KEY: {envVars.key ? `✅ Presente (${envVars.key.length} caracteres)` : '❌ Não definido'}
                </div>
              </div>
            </div>
          </div>

          {/* Status Final */}
          <div className={`p-6 rounded-lg shadow ${
            envVars.url && envVars.key 
              ? 'bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700' 
              : 'bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 ${
              envVars.url && envVars.key ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
            }`}>
              {envVars.url && envVars.key ? '✅ Configuração OK' : '❌ Configuração Incompleta'}
            </h2>
            
            {envVars.url && envVars.key ? (
              <p className="text-green-700 dark:text-green-300">
                As variáveis de ambiente estão configuradas corretamente!
              </p>
            ) : (
              <div className="text-red-700 dark:text-red-300">
                <p>Variáveis de ambiente não encontradas. Verifique:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Configuração no Vercel: Settings → Environment Variables</li>
                  <li>Se as variáveis estão em &quot;All Environments&quot;</li>
                  <li>Se os valores estão corretos (não são placeholders)</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}