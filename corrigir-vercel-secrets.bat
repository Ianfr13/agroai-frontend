@echo off
echo ========================================
echo CORRIGINDO CONFIGURAÇÃO DO VERCEL
echo ========================================
echo.
echo 🚨 PROBLEMA DETECTADO:
echo    As variáveis estão como "Secrets" mas o código espera valores diretos
echo.
echo ✅ SOLUÇÃO:
echo    Recriar como "Environment Variables" com valores reais
echo.
echo ========================================
echo 📋 PASSO A PASSO:
echo ========================================
echo.
echo 1. APAGUE AS VARIÁVEIS ATUAIS:
echo    - Acesse: https://vercel.com/dashboard
echo    - Selecione seu projeto
echo    - Settings → Environment Variables
echo    - Clique na lixeira 🗑️ para cada uma
echo    - Delete: NEXT_PUBLIC_SUPABASE_URL
echo    - Delete: NEXT_PUBLIC_SUPABASE_ANON_KEY
echo    - Delete: SUPABASE_SERVICE_ROLE_KEY
echo.
echo 2. OBTEENHA AS CHAVES REAIS:
echo    - Acesse: https://app.supabase.com
echo    - Seu projeto → Settings → API
echo    - Copie os valores REAIS (não placeholders)
echo.
echo 3. RECRIE COMO ENVIRONMENT VARIABLES:
echo    - Clique em "Add Environment Variable"
echo    - Nome: NEXT_PUBLIC_SUPABASE_URL
echo    - Valor: Cole o URL real do Supabase
echo    - Environments: Marque as 3 opções
echo    - Save
echo.
echo    - Repita para NEXT_PUBLIC_SUPABASE_ANON_KEY
echo    - Repita para SUPABASE_SERVICE_ROLE_KEY
echo.
echo 4. FORÇE REDEPLOY:
echo    - Vá para "Deployments"
echo    - Clique na seta circular (Redeploy)
echo    - Desmarque "Use existing Build Cache"
echo    - Redeploy
echo.
echo ========================================
echo 🎯 VIA CLI (ALTERNATIVA):
echo ========================================
echo Execute os comandos:
echo.
echo vercel env rm NEXT_PUBLIC_SUPABASE_URL production
echo vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo vercel env rm SUPABASE_SERVICE_ROLE_KEY production
echo.
echo vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo.
echo vercel --prod -f
echo.
echo ========================================
echo ✅ APÓS ISSO:
echo ========================================
echo O erro "supabaseKey is required" deve desaparecer!
echo.
echo Pressione qualquer tecla para abrir o Vercel...
pause >nul
start https://vercel.com/dashboard