@echo off
echo ========================================
echo CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE
echo ========================================
echo.
echo 📋 CHAVES NECESSÁRIAS:
echo.
echo 🔑 Frontend (seguras para cliente):
echo    - NEXT_PUBLIC_SUPABASE_URL
echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo.
echo 🔒 Backend (apenas servidor):
echo    - SUPABASE_SERVICE_ROLE_KEY
echo.
echo ========================================
echo 🎯 ONDE OBTER AS CHAVES:
echo ========================================
echo 1. Acesse: https://app.supabase.com
echo 2. Selecione seu projeto
echo 3. Vá para: Settings → API
echo 4. Copie as chaves:
echo    - Project URL ^(NEXT_PUBLIC_SUPABASE_URL^)
echo    - anon public ^(NEXT_PUBLIC_SUPABASE_ANON_KEY^)^
echo    - service_role ^(SUPABASE_SERVICE_ROLE_KEY^)
echo.
echo ========================================
echo 🚀 CONFIGURAÇÃO NO GITHUB:
echo ========================================
echo 1. Acesse seu repositório no GitHub
echo 2. Vá para: Settings → Secrets and variables → Actions
echo 3. Clique em "New repository secret"
echo 4. Adicione cada chave:
echo.
echo    Nome: NEXT_PUBLIC_SUPABASE_URL
echo    Valor: [cole o URL aqui]
echo.
echo    Nome: NEXT_PUBLIC_SUPABASE_ANON_KEY
echo    Valor: [cole a anon key aqui]
echo.
echo    Nome: SUPABASE_SERVICE_ROLE_KEY
echo    Valor: [cole a service role key aqui]
echo.
echo ========================================
echo 🌐 CONFIGURAÇÃO NO VERCEL:
echo ========================================
echo 1. Acesse: https://vercel.com/dashboard
echo 2. Selecione seu projeto
echo 3. Vá para: Settings → Environment Variables
echo 4. Adicione as variáveis para cada ambiente:
echo.
echo    NEXT_PUBLIC_SUPABASE_URL=seu_valor
echo    NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_valor
echo    SUPABASE_SERVICE_ROLE_KEY=seu_valor
echo.
echo ========================================
echo ⚠️  IMPORTANTE - SEGURANÇA:
echo ========================================
echo ❌ NUNCA use SERVICE_ROLE_KEY no frontend!
echo ✅ Use apenas ANON_KEY no cliente!
echo ✅ Configure RLS no Supabase!
echo ❌ Nunca commite .env com chaves reais!
echo.
echo ========================================
echo 📚 DOCUMENTAÇÃO COMPLETA:
echo ========================================
echo Leia: CONFIGURACAO-VARIAVEIS.md
echo.
echo Pressione qualquer tecla para sair...
pause >nul