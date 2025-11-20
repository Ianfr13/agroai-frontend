# 🎯 GUIA RÁPIDO - ONDE COLOCAR CADA COISA

## 📂 .env.local (SEU COMPUTADOR)
```
C:\Users\Ian Francio\Documents\trae_projects\agroai\.env.local
```
✅ **Fica só aí no seu PC**
✅ **Nunca commita esse arquivo**
✅ **Só para desenvolvimento local**

## 🚀 GITHUB (Secrets)
1. Acesse: https://github.com/SEU_USERNAME/agroai-frontend/settings/secrets/actions
2. Clique em "New repository secret"
3. Adicione cada uma:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 🌐 VERCEL (Environment Variables)
1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Settings → Environment Variables
4. Adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 📋 PASSO A PASSO AGORA:

### 1. Preencha seu .env.local:
```bash
# Copie do .env.example e preencha com seus valores do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-key
```

### 2. Teste localmente:
```bash
npm run dev
```

### 3. Configure no GitHub & Vercel:
- Use os MESMOS valores do .env.local
- Mas coloque nas SECRETS/Environment Variables

### 4. Faça push (sem o .env.local):
```bash
git add .
git commit -m "Configure environment variables"
git push
```

## ⚠️ IMPORTANTE:
- ❌ **NUNCA** commit `.env.local`
- ✅ **SEMPRE** configure nas secrets dos serviços
- ✅ **SEMPRE** teste local primeiro