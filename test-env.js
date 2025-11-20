// Script para testar variáveis de ambiente do Supabase
// Execute no console do navegador (F12 → Console)

console.log('🔍 TESTANDO VARIÁVEIS DE AMBIENTE');
console.log('=====================================');

// Testar se as variáveis estão disponíveis
const supabaseUrl = process?.env?.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('📍 NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl || '❌ NÃO ENCONTRADO');
console.log('📍 NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ ENCONTRADO' : '❌ NÃO ENCONTRADO');

if (supabaseUrl && supabaseAnonKey) {
    console.log('✅ SUCESSO: Ambas as variáveis estão disponíveis!');
    
    // Testar formato das chaves
    console.log('🔍 Verificando formato das chaves:');
    console.log('- URL começa com "https://"?', supabaseUrl.startsWith('https://'));
    console.log('- URL contém ".supabase.co"?', supabaseUrl.includes('.supabase.co'));
    console.log('- Anon Key tem mais de 50 caracteres?', supabaseAnonKey.length > 50);
    
} else {
    console.log('❌ ERRO: Variáveis não encontradas!');
    console.log('💡 SOLUÇÃO: Verifique se configurou corretamente no Vercel');
}

console.log('=====================================');