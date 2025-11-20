# 🔍 VALIDADOR DE CHAVES SUPABASE

## FORMATO ESPERADO DAS CHAVES:

### NEXT_PUBLIC_SUPABASE_URL:
```
https://[id-do-projeto].supabase.co
```
✅ **Exemplo correto:**
```
https://ceudqpzqzfzvrbjnhjki.supabase.co
```

❌ **Exemplos incorretos:**
```
ceudqpzqzfzvrbjnhjki.supabase.co        # Falta https://
https://supabase.co                       # Falta o ID do projeto
supabase.io                              # Domínio errado
```

### NEXT_PUBLIC_SUPABASE_ANON_KEY:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...[muito longo]
```
✅ **Exemplo correto:**
- Começa com: `eyJ`
- Tem pontos (.) separando partes
- Tem mais de 100 caracteres
- Termina com algo como: `...IifQ.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTI4NjAwNCwiZXhwIjoxOTMwODYyMDA0fQ.[hash final]`

❌ **Exemplos incorretos:**
```
sua-chave-anon-aqui                          # Placeholder errado
sk_anon_1234567890abcdef                    # Formato de service key
anon_key_abcdef1234567890                   # Formato inventado
```

### SUPABASE_SERVICE_ROLE_KEY:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...[muito longo]
```
✅ **Exemplo correto:**
- Começa com: `eyJ`
- Tem pontos (.) separando partes  
- Tem mais de 100 caracteres
- Geralmente começa com a mesma parte da anon key

❌ **Exemplos incorretos:**
```
sua-service-role-key-aqui                   # Placeholder errado
sk_service_1234567890abcdef                 # Formato antigo
token_abcdef1234567890                      # Formato inventado
```

## 🎯 COMO VERIFICAR SEUS VALORES:

### No Vercel:
1. Vá para seu projeto no Vercel
2. Settings → Environment Variables
3. Clique no ícone de olho 👁️ ao lado de cada valor
4. Compare com os formatos acima

### No Supabase:
1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em: Settings → API
4. Copie exatamente como aparece:
   - **Project URL** → NEXT_PUBLIC_SUPABASE_URL
   - **anon public** → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - **service_role** → SUPABASE_SERVICE_ROLE_KEY

## 🚨 SE ESTIVER ERRADO:

1. **Clique para editar** no Vercel
2. **Copie novamente** do Supabase
3. **Cole exatamente** como aparece
4. **Salve** as alterações
5. **Refaça o deploy**