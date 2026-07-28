<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/dog.svg" alt="PetSitters Connect Logo" width="80" />
  <h1>🐾 PetSitters Connect</h1>
  <p><strong>A plataforma ideal que conecta donos de pets com cuidadores de confiança.</strong></p>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

<br />

## 📖 Sobre o Projeto

O **PetSitters Connect** é uma aplicação Full-Stack projetada para facilitar a vida de tutores de animais que precisam de cuidadores temporários. A plataforma conta com perfis dedicados para **Donos** (que buscam serviços) e **Sitters** (que oferecem serviços), permitindo agendamento, aprovação de pedidos e gerenciamento de perfis com uma interface premium, amigável e acessível.

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação Segura:** Login e Registro blindados com JWT e encriptação de senhas (bcrypt).
- 🎨 **Design Moderno e UX:** Interface de alta qualidade com suporte a **Dark/Light Mode**, focada na fluidez e usabilidade.
- 🐶 **Dois Tipos de Usuários:**
  - **Donos:** Podem buscar sitters, checar preferências de animais, ver os preços/hora e enviar solicitações de agendamento de forma simplificada.
  - **Sitters:** Podem criar e editar seus perfis profissionais (bio, preferências, valor da hora, disponibilidade) e aceitar/recusar as propostas recebidas.
- 📱 **Responsividade Total:** Adaptado perfeitamente para dispositivos móveis, tablets e desktops.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React (Vite)**
- **Tailwind CSS v4** (Com Custom Variants para temas)
- **React Router Dom**
- **Axios** (para consumo da API REST)
- **Lucide React** (para iconografia vetorial)

### Backend
- **Node.js** com **Express**
- **Prisma ORM** (Modelagem e migrações do banco de dados)
- **PostgreSQL** (Rodando localmente via Docker)
- **Zod** (Validação rigorosa de Payload nos endpoints)
- **JSON Web Tokens (JWT)** (Gestão de Sessões e proteção de rotas)

---

## 🚀 Como Executar Localmente

### Pré-requisitos
Antes de começar, certifique-se de que sua máquina possui:
- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

### Passo a passo

1. **Clone o repositório e inicie o banco de dados:**
   ```bash
   git clone https://github.com/JoaoVBRodrigues/petsitter.git
   cd petsitter
   docker compose up -d
   ```

2. **Configure e inicie o Backend:**
   ```bash
   cd backend
   npm install
   
   # Rode as migrações do Prisma para criar as tabelas (se for a primeira vez)
   npx prisma migrate dev --name init
   npx prisma generate
   
   # Inicie o servidor
   npm run dev
   ```
   *O backend estará escutando requisições em `http://localhost:3000`*

3. **Configure e inicie o Frontend:**
   Abra um novo terminal na raiz do projeto e execute:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Acesse o frontend no navegador via `http://localhost:5173`*

---

## 🤝 Contribuindo

Sinta-se à vontade para realizar *forks*, abrir *issues* ou enviar *pull requests*. Toda ajuda é bem-vinda para melhorar a experiência dos pets e de seus donos!

<br />

<div align="center">
  <sub>Feito por <a href="https://github.com/JoaoVBRodrigues">João</a></sub>
</div>
