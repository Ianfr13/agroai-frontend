# 🎯 GUIA VERCEL - CONFIGURAÇÃO DAS CHAVES

## 📋 PASSO A PASSO VISUAL

### 1. OBTER AS CHAVES DO SUPABASE
```bash
# Acesse: https://app.supabase.com
# Selecione: Seu Projeto AgroAI
# Vá para: Settings → API
# Copie esses 3 valores:
```

**📄 Você precisa de 3 chaves:**
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### 2. ACESSAR O VERCEL
```bash
# Acesse: https://vercel.com/dashboard
# Clique em: New Project
# Importe do GitHub: agroai-frontend
```

### 3. CONFIGURAR VARIÁVEIS NO VERCEL

#### Via Dashboard Web:

**Passo 1:** Na página do projeto, clique em **"Settings"**

**Passo 2:** No menu lateral, clique em **"Environment Variables"**

**Passo 3:** Adicione as 3 variáveis:

**Variável 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Cole o Project URL do Supabase
- **Environments:** Marque Production, Preview, Development

**Variável 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Cole a anon key do Supabase
- **Environments:** Marque Production, Preview, Development

**Variável 3:**
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** Cole a service role key do Supabase
- **Environments:** Marque Production, Preview, Development

**Passo 4:** Clique em **"Save"**

### 4. REDEPLOYAR

**Passo 5:** Vá para a aba **"Deployments"**

**Passo 6:** Clique em **"Redeploy"** (seta circular)

**Passo 7:** Aguarde o deploy terminar

### 5. VERIFICAR

**Passo 8:** Acesse a URL do deploy

**Passo 9:** Verifique se o erro desapareceu

## 🖥️ VIA CLI (ALTERNATIVA)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Navegar para o projeto
cd C:\Users\Ian Francio\Documents\trae_projects\agroai

# Adicionar variáveis (vai pedir para colar os valores)
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Deploy
vercel --prod
```

## 📱 VISUAL: Como fica no dashboard

```
Vercel Dashboard → Seu Projeto → Settings → Environment Variables

┌─────────────────────────────────────────────────────────┐
│ Environment Variables                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [+] Add Environment Variable                           │
│                                                         │
│  Name: NEXT_PUBLIC_SUPABASE_URL                       │
│  Value: https://seu-projeto.supabase.co               │
│  Environments: ☑ Production ☑ Preview ☑ Development   │
│                                                         │
│  Name: NEXT_PUBLIC_SUPABASE_ANON_KEY                  │
│  Value: sua-anon-key-aqui                             │
│  Environments: ☑ Production ☑ Preview ☑ Development   │
│                                                         │
│  Name: SUPABASE_SERVICE_ROLE_KEY                      │
│  Value: sua-service-key-aqui                          │
│  Environments: ☑ Production ☑ Preview ☑ Development   │
│                                                         │
│                    [Save]                              │
└─────────────────────────────────────────────────────────┘
```

## ⚠️ IMPORTANTE

- **NEXT_PUBLIC_** → Variáveis que vão para o frontend
- **SUPABASE_SERVICE_ROLE_KEY** → Mantenha segura, não exponha no cliente
- **Sempre** marque as 3 environments (Production, Preview, Development)

## 🆘 SE CONTINUAR DANDO ERRO

1. **Verifique as chaves:** Estão corretas? Copiou tudo?
2. **Verifique o nome:** Está exatamente igual? (case-sensitive)
3. **Verifique o deploy:** Deu redeploy após adicionar?
4. **Verifique os logs:** Vercel → Project → View Function Logs
5. **Limpe o cache:** Vercel → Settings → General → Clear Build Cache

## ✅ SUCESSO!

Após configurar corretamente, o erro `supabaseKey is required` deve desaparecer!