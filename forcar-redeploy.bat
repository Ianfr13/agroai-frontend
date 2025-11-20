@echo off
echo ========================================
echo FORÇANDO REDEPLOY NO VERCEL
echo ========================================
echo.
echo ⚠️  ISSO VAI:
echo    - Limpar o cache de build
echo    - Refazer o deploy completo
echo    - Aplicar as novas variáveis
echo.
echo ========================================
echo 📋 PASSO A PASSO:
echo ========================================
echo.
echo 1. VERIFIQUE AS CHAVES:
echo    - Acesse: https://app.supabase.com
echo    - Settings → API
echo    - Copie as 3 chaves NOVAMENTE
echo.
echo 2. ATUALIZE NO VERCEL:
echo    - Acesse: https://vercel.com/dashboard
echo    - Selecione seu projeto
echo    - Settings → Environment Variables
echo    - Clique no lápis para editar cada uma
echo    - Cole as chaves CORRETAS
echo    - Salve
echo.
echo 3. FORÇAR REDEPLOY:
echo    - Vá para: Deployments
echo    - Clique na seta circular (Redeploy)
echo    - Marque: "Use existing Build Cache" (DESMARCHE)
echo    - Clique: Redeploy
echo.
echo ========================================
echo 🎯 ALTERNATIVA - CLI:
echo ========================================
echo Se quiser usar CLI, execute:
echo.
echo vercel --prod -f
echo.
echo O -f força sem cache
echo.
echo ========================================
echo ⏰ AGUARDE:
echo ========================================
echo O deploy vai demorar alguns minutos.
echo Verifique os logs para ver se funcionou.
echo.
echo Pressione qualquer tecla para abrir o Vercel...
pause >nul
start https://vercel.com/dashboard