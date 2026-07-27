# PetSitters Connect

Plataforma que conecta donos de pets a cuidadores de pets (pet sitters).

## Tecnologias

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, Prisma (ORM), PostgreSQL, JWT

## Como Rodar

### Pré-requisitos
- Node.js (v18+)
- Docker e Docker Compose

### Passos

1. Inicie o banco de dados:
```bash
docker compose up -d
```

2. Backend:
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

3. Frontend:
```bash
cd frontend
npm install
npm run dev
```

Acesse o frontend em `http://localhost:5173`.
