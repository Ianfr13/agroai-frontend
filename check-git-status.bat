@echo off
echo ========================================
echo Verificando configuração do Git
echo ========================================

REM Navega para o diretório do projeto
cd /d "C:\Users\Ian Francio\Documents\trae_projects\agroai"

echo.
echo Status atual do repositório:
echo.
"C:\Program Files\Git\bin\git.exe" status

echo.
echo Remotes configurados:
echo.
"C:\Program Files\Git\bin\git.exe" remote -v

echo.
echo Log de commits:
echo.
"C:\Program Files\Git\bin\git.exe" log --oneline -3

echo.
echo ========================================
echo INSTRUÇÕES PARA CRIAR REPOSITÓRIO NO GITHUB:
echo ========================================
echo.
echo 1. Acesse: https://github.com/new
echo 2. Crie um repositório com o nome: agroai-frontend
echo 3. NÃO inicialize com README, .gitignore ou license
echo 4. Após criar, execute os comandos abaixo:
echo.
echo C:\Program Files\Git\bin\git.exe remote add origin https://github.com/SEU_USERNAME/agroai-frontend.git
echo C:\Program Files\Git\bin\git.exe push -u origin main
echo.
echo Pressione qualquer tecla para sair...
pause >nul