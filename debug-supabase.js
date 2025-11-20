// Script de debug para verificar variáveis no navegador
// Cole isso no console do navegador (F12 → Console)

console.log('🔍 DEBUG DAS VARIÁVEIS SUPABASE');
console.log('=====================================');

// Verificar se as variáveis estão disponíveis globalmente
console.log('📍 Verificando window.env:');
console.log('window.env:', window.env);

console.log('📍 Verificando process.env:');
console.log('process.env.NEXT_PUBLIC_SUPABASE_URL:', process?.env?.NEXT_PUBLIC_SUPABASE_URL);
console.log('process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY:', process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Verificar se estão no HTML
console.log('📍 Verificando meta tags:');
const metaTags = document.querySelectorAll('meta[name^="next-"]');
metaTags.forEach(tag => {
    console.log(`${tag.name}: ${tag.content}`);
});

// Verificar se estão no script __NEXT_DATA__
console.log('📍 Verificando __NEXT_DATA__:');
const nextData = document.getElementById('__NEXT_DATA__');
if (nextData) {
    try {
        const data = JSON.parse(nextData.textContent);
        console.log('ENV variables in __NEXT_DATA__:', data.props?.pageProps?.env);
    } catch (e) {
        console.log('Erro ao parsear __NEXT_DATA__:', e);
    }
}

console.log('=====================================');

// Teste alternativo - verificar se o erro vem do Supabase
if (typeof window !== 'undefined') {
    console.log('📍 Testando inicialização do Supabase:');
    try {
        // Verificar se podemos importar o Supabase
        import('/_next/static/chunks/[supabase-chunk]').then(module => {
            console.log('Supabase module loaded:', module);
        }).catch(err => {
            console.log('Erro ao carregar Supabase:', err);
        });
    } catch (e) {
        console.log('Erro no teste do Supabase:', e);
    }
}