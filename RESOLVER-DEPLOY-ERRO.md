# 🚨 GUIA RÁPIDO: Resolver Erro "supabaseKey is required" no Vercel

## ✅ Passo 1: Verificar Variáveis no Vercel
1. Acesse: https://vercel.com/dashboard
2. Vá para seu projeto AgroAI
3. Clique em "Settings" → "Environment Variables"
4. **VERIFIQUE SE EXISTEM**:
   - `NEXT_PUBLIC_SUPABASE_URL` ✅
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅

## ✅ Passo 2: Forçar Rebuild Completo
Execute este comando na pasta do projeto:
```bash
npm run build
```

Se der erro, execute:
```bash
npx vercel --force --prod
```

## ✅ Passo 3: Testar Variáveis em Produção
Depois do deploy, teste estas URLs:
- `https://seu-projeto.vercel.app/test-env` (verifica server-side)
- `https://seu-projeto.vercel.app` (abre console do navegador)

## ✅ Passo 4: Debug em Tempo Real
Abra o console do navegador (F12) e procure por:
```
🔍 [EnvironmentDebug] Variáveis encontradas:
```

## 🔄 Se Ainda Der Erro

### Opção A: Reinstalar Vercel CLI
```bash
npm uninstall -g vercel
npm install -g vercel
vercel --force --prod
```

### Opção B: Limpar Cache Manualmente
```bash
rm -rf .next
rm -rf node_modules/.cache
npm run build
vercel --prod
```

### Opção C: Verificar Logs Detalhados
```bash
vercel logs --follow
```

## 📋 Checklist Final
- [ ] Variáveis configuradas no Vercel
- [ ] Deploy forçado com --force
- [ ] Página /test-env funcionando
- [ ] Console mostrando variáveis
- [ ] Sem erros no build

## 🆘 Ainda com Problemas?
1. Copie o erro completo do console
2. Verifique os logs do Vercel
3. Teste localmente: `npm run build && npm start`
4. Me envie os logs completos