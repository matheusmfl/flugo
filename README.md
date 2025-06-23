# Sistema de Colaboradores - Flugo

Sistema de gerenciamento de colaboradores feito sob demanda em processo seletivo, desenvolvido com Next.js, TypeScript, Material-UI e Firebase.

## 🚀 Funcionalidades

### ✅ **Gestão de Colaboradores**
- **Cadastro Multi-step**: Formulário em 3 etapas (Informações Básicas, Profissionais e Avatar)
- **Listagem Avançada**: Tabela com ordenação por colunas e busca
- **Visualização Detalhada**: Dialog com informações completas do colaborador
- **Edição Completa**: Formulário de edição com pré-preenchimento dos dados
- **Exclusão Segura**: Dialog de confirmação antes da exclusão
- **Seleção de Avatares**: 8 avatares pré-definidos para escolha

### ✅ **Interface e Experiência**
- **Layout Responsivo**: Sidebar fixa e conteúdo adaptável
- **Design Moderno**: Interface limpa com Material-UI
- **Estados de Loading**: Indicadores visuais durante operações
- **Tratamento de Erros**: Mensagens claras para o usuário
- **Navegação Intuitiva**: Breadcrumbs e botões de ação bem posicionados

### ✅ **Tecnologias e Arquitetura**
- **Validação Robusta**: Schemas Zod para validação de dados
- **Gerenciamento de Estado**: React Query para cache e sincronização
- **Tipagem Completa**: TypeScript em toda aplicação
- **Padrão POO**: Estrutura orientada a objetos para APIs
- **Firebase Integration**: Firestore para persistência de dados

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Material-UI v5** - Biblioteca de componentes
- **React Hook Form** - Gerenciamento de formulários
- **React Query** - Gerenciamento de estado servidor
- **Firebase Firestore** - Banco de dados NoSQL
- **Zod** - Validação de schemas

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Firebase

## 🔧 Instalação

1. **Clone o repositório**
\`\`\`bash
git clone https://github.com/matheusmfl/flugo
cd flugo
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

3. **Configure o Firebase**


4. **Configure as variáveis de ambiente**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edite o arquivo `.env.local` com suas configurações do Firebase:
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
\`\`\`

5. **Execute o projeto**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

6. **Acesse a aplicação**
   - Abra [http://localhost:3000](http://localhost:3000) no seu navegador


## 🧪 Scripts Disponíveis

\`\`\`bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
npm run lint     # Executa linter
\`\`\`

## 🔐 Segurança Firebase

### **Regras de Firestore**
\`\`\`javascript
// Desenvolvimento
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /collaborators/{document} {
      allow read, write: if true;
    }
  }
}

// Produção (com validações)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /collaborators/{collaboratorId} {
      allow read: if true;
      allow create: if isValidCollaborator(resource.data);
      allow update: if isValidCollaborator(resource.data);
      allow delete: if true;
    }
  }
  
  function isValidCollaborator(data) {
    return data.keys().hasAll(['name', 'email', 'status', 'department', 'avatar']) &&
           data.name is string && data.name.size() >= 2 &&
           data.email is string && data.email.matches('.*@.*\\..*') &&
           data.status in ['ACTIVE', 'INACTIVE'] &&
           data.department in ['TI', 'DESIGN', 'PRODUTO', 'MARKETING', 'VENDAS', 'RH', 'FINANCEIRO'] &&
           data.avatar in ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4', 'avatar-5', 'avatar-6', 'avatar-7', 'avatar-8'];
  }
}
\`\`\`

## 📊 Funcionalidades Técnicas

### **Gerenciamento de Estado**
- **React Query**: Cache inteligente e sincronização automática
- **Invalidação**: Atualizações automáticas após operações CRUD
- **Loading States**: Estados de carregamento em todas as operações
- **Error Handling**: Tratamento robusto de erros

### **Formulários**
- **React Hook Form**: Performance otimizada
- **Validação em Tempo Real**: Feedback imediato ao usuário
- **Multi-step**: Formulários divididos em etapas
- **Pre-fill**: Dados carregados automaticamente na edição

### **Interface**
- **Material-UI**: Componentes consistentes e acessíveis
- **Responsive Design**: Adaptável a diferentes telas
- **Loading Skeletons**: Indicadores visuais durante carregamento
- **Toast Notifications**: Feedback visual das operações
