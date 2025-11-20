@echo off
echo 🔧 Forçando novo deploy no Vercel com cache limpo...
echo.

:: Instala a CLI do Vercel se não existir
echo 📦 Verificando Vercel CLI...
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📥 Instalando Vercel CLI...
    npm install -g vercel
)

:: Força deploy com rebuild completo
echo 🚀 Iniciando deploy com cache limpo...
echo.
echo ⚠️  Isso vai:
echo    - Limpar o cache de build
echo    - Refazer todo o build do zero
echo    - Revalidar todas as variáveis de ambiente
echo.

:: Opções para forçar rebuild completo
vercel --force --prod

echo.
echo ✅ Deploy forçado concluído!
echo 🌐 Verifique o console do Vercel para mais detalhes
echo.
pause