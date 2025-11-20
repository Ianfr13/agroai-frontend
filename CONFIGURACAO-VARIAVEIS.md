# 📋 Configuração de Variáveis de Ambiente

## 🔐 Segurança Primeiro!

**IMPORTANTE:** Nunca commite arquivos `.env` com chaves reais. Use apenas nos ambientes de deploy.

## 📦 Variáveis Necessárias

### Frontend (Next.js) - Seguras para o cliente:
- `NEXT_PUBLIC_SUPABASE_URL` - URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave anônima do Supabase

### Backend/Ambiente de Build - NUNCA exponha no frontend:
- `SUPABASE_SERVICE_ROLE_KEY` - Chave de service role (usada apenas no servidor)

## 🚀 GitHub Actions (CI/CD)

### 1. Acesse as Configurações do Repositório
1. Vá para seu repositório no GitHub
2. Clique em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**

### 2. Adicione as Secrets:

```bash
# Frontend (seguras)
NEXT_PUBLIC_SUPABASE_URL=seu_valor_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_valor_aqui

# Backend (privadas)
SUPABASE_SERVICE_ROLE_KEY=seu_valor_aqui
```

### 3. Nomes das Secrets no GitHub:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🌐 Vercel (Deploy)

### Opção 1: Via Dashboard Vercel
1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto (ou importe do GitHub)
3. Vá para **Settings** → **Environment Variables**
4. Adicione as variáveis:

```
# Ambiente de Produção
NEXT_PUBLIC_SUPABASE_URL=seu_valor
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_valor
SUPABASE_SERVICE_ROLE_KEY=seu_valor

# Ambiente de Preview (opcional)
NEXT_PUBLIC_SUPABASE_URL=seu_valor_preview
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_valor_preview
SUPABASE_SERVICE_ROLE_KEY=seu_valor_preview

# Ambiente de Development (opcional)
NEXT_PUBLIC_SUPABASE_URL=seu_valor_dev
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_valor_dev
SUPABASE_SERVICE_ROLE_KEY=seu_valor_dev
```

### Opção 2: Via CLI Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Adicionar variáveis
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

## 🔑 Onde Encontrar as Chaves do Supabase

### 1. Acesse seu Projeto Supabase
1. Vá para: https://app.supabase.com
2. Selecione seu projeto
3. Vá para **Settings** → **API**

### 2. Copie as Chaves:
- **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
- **anon public**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role**: `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Mantenha segura!)

## ⚠️ Importante: Segurança

### ❌ NUNCA FAÇA:
- Commite `.env` com chaves reais
- Use SERVICE_ROLE_KEY no frontend
- Compartilhe chaves em código
- Deixe chaves em código público

### ✅ SEMPRE FAÇA:
- Use variáveis de ambiente
- Configure RLS no Supabase
- Use ANON_KEY no frontend
- Mantenha SERVICE_ROLE_KEY apenas no servidor

## 🧪 Teste as Configurações

### Teste Local:
```bash
# Crie um .env.local
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key

# Rode o projeto
npm run dev
```

### Teste Deploy:
1. Faça push para GitHub
2. Verifique se o GitHub Actions roda sem erros
3. Acesse o deploy na Vercel
4. Teste as funcionalidades

## 🆘 Problemas Comuns

### "Missing environment variable"
- Verifique se todas as variáveis estão configuradas
- Certifique-se de usar os nomes exatos

### "Permission denied" no Supabase
- Verifique as RLS policies no Supabase
- Certifique-se de que ANON_KEY tem as permissões corretas

### Deploy falha
- Verifique os logs no GitHub Actions
- Verifique os logs na Vercel
- Certifique-se de que as secrets estão configuradas

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs de build/deploy
2. Confirme que as chaves estão corretas
3. Teste localmente primeiro
4. Verifique as configurações de RLS no Supabase