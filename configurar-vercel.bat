@echo off
echo ========================================
echo CONFIGURANDO VARIÁVEIS NO VERCEL
echo ========================================
echo.
echo ⚠️  ANTES DE COMEÇAR:
echo    1. Obtenha suas chaves do Supabase
echo    2. Acesse: https://app.supabase.com → Settings → API
echo    3. Copie as 3 chaves necessárias
echo.
echo ========================================
echo 🎯 PASSO A PASSO:
echo ========================================
echo.
echo 1. INSTALE O VERCEL CLI:
echo    npm i -g vercel
echo.
echo 2. FAÇA LOGIN:
echo    vercel login
echo.
echo 3. NAVEGUE PARA O PROJETO:
echo    cd C:\Users\Ian Francio\Documents\trae_projects\agroai
echo.
echo 4. CONFIGURE AS VARIÁVEIS:
echo    vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo    vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo    vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo.
echo ========================================
echo 📋 O QUE VAI ACONTECER:
echo ========================================
echo O Vercel CLI vai pedir para você colar cada valor.
echo Quando aparecer:
echo "What's the value of NEXT_PUBLIC_SUPABASE_URL?"
echo → Cole sua URL do Supabase e aperte Enter
echo.
echo Quando aparecer:
echo "What's the value of NEXT_PUBLIC_SUPABASE_ANON_KEY?"
echo → Cole sua anon key e aperte Enter
echo.
echo Quando aparecer:
echo "What's the value of SUPABASE_SERVICE_ROLE_KEY?"
echo → Cole sua service role key e aperte Enter
echo.
echo ========================================
echo 🚀 DEPOIS DE CONFIGURAR:
echo ========================================
echo 1. Faça deploy: vercel --prod
echo 2. Ou via Git: git push origin main
echo 3. Acesse: https://vercel.com/dashboard
echo 4. Verifique se o deploy foi bem sucedido
echo.
echo ========================================
echo 🆘 SE DER ERRO:
echo ========================================
echo - Verifique se as chaves estão corretas
echo - Verifique se o projeto está correto
echo - Use: vercel env ls (para listar variáveis)
echo - Use: vercel env rm NOME_VARIAVEL (para remover)
echo - Use: vercel env add NOME_VARIAVEL production (para adicionar)
echo.
echo Pressione qualquer tecla para ver os comandos...
pause >nul