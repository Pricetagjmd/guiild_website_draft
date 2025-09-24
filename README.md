# University Guild Web Platform (MVP)

This repository contains the first iteration of the University Guild’s public web presence. It includes a React front end and a FastAPI backend with a PostgreSQL data store to highlight services, promote events, and preserve institutional memory.

## At a glance

- **Frontend**: React (Vite, TypeScript) single-page application with routes for Home, Events, Vault, and placeholder sections.
- **Backend**: FastAPI service exposing `/api/events` for listing and creating events backed by PostgreSQL.
- **Styling**: Custom red-and-white guild theme with accent palette, responsive layout, animated footer, and accessible “Back to top” control.
- **Content**: Hero carousel, service highlights, latest updates, historical Vault timeline, and an MVP chat assistant that guides visitors using scripted replies.
- **Events experience**: Calendar and list views with an overlay detail modal plus clear separation of upcoming and past programs.

## Project structure

```
├── backend
│   ├── app
│   │   ├── config.py          # Environment & configuration helpers
│   │   ├── crud.py            # Event persistence helpers
│   │   ├── database.py        # Async SQLAlchemy engine/session
│   │   ├── main.py            # FastAPI application entrypoint
│   │   ├── models.py          # SQLAlchemy ORM models
│   │   └── schemas.py         # Pydantic request/response schemas
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
├── frontend
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── src
│   │   ├── api                # API client helpers
│   │   ├── components         # Reusable UI components
│   │   ├── data               # Seed data (e.g., Vault timeline)
│   │   ├── pages              # Route-level components
│   │   ├── styles             # Theme & global styles
│   │   └── utils              # Shared utility helpers
│   └── tsconfig*.json, vite config
├── docker-compose.yml         # Local dev orchestration (frontend, backend, Postgres)
└── README.md
```

## Getting started locally

### Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL 15+ (or Docker Compose)

### Run with Docker Compose (recommended for parity)

```bash
# Build the services
docker compose build

# Start the stack (frontend at http://localhost:5173, backend at http://localhost:8000)
docker compose up
```

The compose file provisions Postgres for local development. In production you will point the backend to DigitalOcean Managed PostgreSQL and omit the bundled database container.

### Run manually (without Docker)

1. **Backend**

   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt

   # Configure the database connection
   cp .env.example .env  # update DATABASE_URL as needed

   uvicorn app.main:app --reload
   ```

2. **Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev -- --host 0.0.0.0 --port 5173
   ```

The Vite dev server will proxy API calls directly to the backend (`/api/*`).

## API reference (MVP)

| Method | Path         | Description                      |
| ------ | ------------ | -------------------------------- |
| GET    | `/health`    | Health check for monitoring      |
| GET    | `/api/events`| List events ordered by date      |
| POST   | `/api/events`| Create a new event (JSON body)   |

Event schema

```json
{
  "title": "Guild Strategy Summit",
  "date": "2024-02-19T17:00:00Z",
  "location": "Guild Hall East Wing",
  "description": "An open planning session...",
  "price": "Free"
}
```

`created_at` is assigned automatically by the backend when the record is stored.

## Deployment on DigitalOcean (cost-aware path)

1. **Provision infrastructure**
   - Create a **Basic Droplet** (Ubuntu) with the smallest plan (currently $4/month) to host both the frontend and backend containers.
   - Provision a **Managed PostgreSQL** instance (choose the smallest plan, enable standby for resilience as budget allows).

2. **Configure environment**
   - Add networking rules to allow the Droplet to reach the managed database’s private connection string.
   - On the Droplet, install Docker and Docker Compose.
   - Set the backend environment variables:
     - `DATABASE_URL` using the managed database URL (e.g. `postgresql+asyncpg://doadmin:...@private-db-host:25060/defaultdb`).
     - `CORS_ORIGINS` listing the public frontend origin(s).

3. **Build and run**
   - Copy the repository to the Droplet.
   - Build containers: `docker compose build frontend backend`.
   - Run with only the frontend and backend services, pointing to the managed database (omit the local `db` service or override the compose file).
   - Optionally configure a reverse proxy (NGINX) or leverage DigitalOcean App Platform for the frontend static build while keeping the backend on the Droplet.

4. **Scale-ready considerations**
   - Because the backend relies on SQLAlchemy async sessions and environment-driven configuration, migrating to App Platform or Kubernetes later only requires updating environment variables.
   - Frontend is compiled to static assets; serving via DigitalOcean Spaces CDN or App Platform Static Site keeps hosting costs low while remaining portable.

## Next steps

- Implement authenticated event management (edit/delete) and calendar filters by month/year.
- Expand the Vault with database-backed collections, search, and media storage.
- Integrate a true chat assistant (e.g., Azure OpenAI) once budget permits.
- Add CI checks, automated tests, and observability tooling as the product matures.
