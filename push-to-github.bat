@echo off
echo ========================================
echo Script para Push do AgroAI para GitHub
echo ========================================
echo.

REM Verifica se o remote já existe
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    echo Remote origin já configurado. Fazendo push...
    C:\Program` Files\Git\bin\git.exe push -u origin main
) else (
    echo.
    echo ========================================
    echo ATENÇÃO: Remote não configurado!
    echo ========================================
    echo.
    echo Você precisa criar o repositório no GitHub primeiro.
    echo.
    echo 1. Acesse: https://github.com/new
    echo 2. Crie um repositório com o nome: agroai-frontend
    echo 3. NÃO inicialize com README
    echo 4. Depois de criar, execute este comando:
    echo.
    echo C:\Program` Files\Git\bin\git.exe remote add origin https://github.com/SEU_USERNAME/agroai-frontend.git
    echo.
    echo Substitua SEU_USERNAME pelo seu username do GitHub
    echo.
    echo Depois execute este script novamente.
)

echo.
echo Pressione qualquer tecla para sair...
pause >nul