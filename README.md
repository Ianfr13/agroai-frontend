# 🌱 AgroAI - Sistema Inteligente para Agricultura

Uma plataforma moderna de inteligência artificial para agricultura, oferecendo análises inteligentes de plantações, previsões meteorológicas e recomendações personalizadas para maximizar a produtividade agrícola.

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Supabase (Banco de Dados, Autenticação, Storage)
- **Estado**: Context API, Hooks Personalizados
- **UI/UX**: Lucide React, Sonner (Notificações)
- **Deploy**: Vercel
- **CI/CD**: GitHub Actions

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase
- Conta no Vercel (para deploy)

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/agroai.git
cd agroai
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.local.example` para `.env.local` e configure suas variáveis:

```bash
cp .env.local.example .env.local
```

Configure as seguintes variáveis no arquivo `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_do_supabase

# JWT Configuration
JWT_SECRET=sua_chave_secreta_jwt

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AgroAI

# Security
ENCRYPTION_KEY=sua_chave_de_criptografia
```

### 4. Configure o Supabase

#### Criar projeto no Supabase

1. Acesse [Supabase](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Copie as credenciais (URL e chaves) para o arquivo `.env.local`

#### Configurar banco de dados

Execute o seguinte SQL no SQL Editor do Supabase para criar as tabelas necessárias:

```sql
-- Tabela de usuários (estende a tabela auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  farm_name TEXT NOT NULL,
  farm_size DECIMAL NOT NULL,
  farm_location TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'farmer', 'technician')) DEFAULT 'farmer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de plantios
CREATE TABLE public.crops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  variety TEXT NOT NULL,
  planting_date DATE NOT NULL,
  harvest_date DATE NOT NULL,
  area DECIMAL NOT NULL,
  expected_yield DECIMAL NOT NULL,
  status TEXT CHECK (status IN ('planted', 'growing', 'harvested', 'cancelled')) DEFAULT 'planted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de análises
CREATE TABLE public.analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('soil', 'plant', 'disease', 'pest')) NOT NULL,
  image_url TEXT NOT NULL,
  analysis_result JSONB,
  recommendations TEXT[],
  confidence DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de dados meteorológicos
CREATE TABLE public.weather_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  location TEXT NOT NULL,
  temperature DECIMAL NOT NULL,
  humidity DECIMAL NOT NULL,
  precipitation DECIMAL NOT NULL,
  wind_speed DECIMAL NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Configurar RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para usuários autenticados
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own crops" ON public.crops
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own crops" ON public.crops
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own crops" ON public.crops
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own crops" ON public.crops
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own analyses" ON public.analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analyses" ON public.analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own weather data" ON public.weather_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own weather data" ON public.weather_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Configurar Storage para imagens
INSERT INTO storage.buckets (id, name, public) VALUES ('analyses', 'analyses', true);

-- Políticas de storage
CREATE POLICY "Users can upload own analysis images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'analyses' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view analysis images" ON storage.objects
  FOR SELECT USING (bucket_id = 'analyses');

CREATE POLICY "Users can update own analysis images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'analyses' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own analysis images" ON storage.objects
  FOR DELETE USING (bucket_id = 'analyses' AND auth.uid()::text = (storage.foldername(name))[1]);
```

#### Configurar autenticação

1. No painel do Supabase, vá para Authentication > Providers
2. Configure os providers desejados (Email, Google, etc.)
3. Configure os templates de email em Authentication > Templates

### 5. Execute o projeto localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o aplicativo.

## 🗂️ Estrutura do Projeto

```
agroai/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── auth/              # Páginas de autenticação
│   │   │   ├── login/         # Página de login
│   │   │   ├── register/      # Página de registro
│   │   │   └── forgot-password/ # Recuperação de senha
│   │   ├── dashboard/         # Dashboard principal
│   │   │   ├── crops/         # Gerenciamento de plantios
│   │   │   ├── analyses/      # Análises de imagens
│   │   │   └── settings/      # Configurações
│   │   ├── layout.tsx         # Layout root
│   │   ├── page.tsx           # Página inicial
│   │   └── globals.css        # Estilos globais
│   ├── components/            # Componentes React
│   │   ├── Navigation.tsx     # Navegação principal
│   │   ├── ProtectedRoute.tsx # Proteção de rotas
│   │   └── Providers.tsx      # Context providers
│   ├── hooks/                 # Hooks personalizados
│   │   ├── useAuth.tsx       # Autenticação
│   │   └── useTheme.tsx      # Gerenciamento de tema
│   ├── lib/                   # Utilitários e configurações
│   │   ├── supabase.ts       # Cliente Supabase
│   │   └── utils.ts          # Funções utilitárias
│   └── types/                 # Tipos TypeScript
│       └── supabase.ts       # Tipos do banco de dados
├── public/                    # Arquivos estáticos
├── .github/workflows/         # CI/CD
├── vercel.json               # Configuração do Vercel
└── package.json              # Dependências
```

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. Push seu código para o GitHub
2. Acesse [Vercel](https://vercel.com) e conecte sua conta do GitHub
3. Importe o repositório do AgroAI
4. Configure as variáveis de ambiente no Vercel
5. Faça o deploy!

### Configurar CI/CD

O projeto já vem com GitHub Actions configurado. Para ativar:

1. Vá para Settings > Secrets and variables > Actions no seu repositório
2. Adicione os seguintes secrets:
   - `VERCEL_TOKEN`: Seu token do Vercel
   - `VERCEL_ORG_ID`: ID da organização no Vercel
   - `VERCEL_PROJECT_ID`: ID do projeto no Vercel
   - `SUPABASE_URL`: URL do Supabase
   - `SUPABASE_ANON_KEY`: Chave anon do Supabase
   - `SUPABASE_SERVICE_ROLE_KEY`: Service role key do Supabase

## 🔒 Segurança

- **Autenticação JWT**: Implementada com Supabase Auth
- **Validação de Inputs**: Todas as entradas são validadas
- **Proteção de Rotas**: Rotas autenticadas protegidas
- **Criptografia**: Dados sensíveis são criptografados
- **HTTPS**: Sempre use HTTPS em produção
- **Rate Limiting**: Implemente rate limiting para APIs
- **Validação de Arquivos**: Upload de imagens validado (tipo e tamanho)

## 🎨 Design e Acessibilidade

- **Design Responsivo**: Funciona em todos os dispositivos
- **Tema Claro/Escuro**: Suporte completo a temas
- **WCAG AA**: Segue diretrizes de acessibilidade
- **Navegação por Teclado**: Totalmente navegável por teclado
- **Screen Readers**: Compatível com leitores de tela
- **Contraste de Cores**: Cores com contraste adequado

## 📊 Funcionalidades Principais

### Autenticação
- ✅ Login/Registro de usuários
- ✅ Recuperação de senha
- ✅ Proteção de rotas
- ✅ Sessões seguras

### Dashboard
- ✅ Visão geral com estatísticas
- ✅ Cards informativos
- ✅ Gráficos e métricas
- ✅ Alertas meteorológicos

### Gerenciamento de Plantios
- ✅ CRUD de plantios
- ✅ Filtros e busca
- ✅ Status de progresso
- ✅ Informações detalhadas

### Análises de Imagens
- ✅ Upload de imagens
- ✅ Análise por IA (mock)
- ✅ Recomendações personalizadas
- ✅ Histórico de análises

### Configurações
- ✅ Gerenciamento de perfil
- ✅ Preferências de notificação
- ✅ Troca de tema
- ✅ Configurações de segurança

## 🧪 Testes

Execute os testes com:

```bash
npm test
```

Para testes em modo watch:

```bash
npm run test:watch
```

## 📝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@agroai.com ou entre em nosso canal do Discord.

## 🌟 Status do Projeto

✅ **Em Desenvolvimento Ativo**

- Frontend: Completo
- Autenticação: Completa
- Dashboard: Completo
- Plantios: Completo
- Análises: Completo (com mock de IA)
- Configurações: Completo
- Deploy: Configurado
- Documentação: Completa

---

Desenvolvido com ❤️ pela equipe AgroAI
