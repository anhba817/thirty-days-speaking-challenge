# IELTS 30-Day Speaking Challenge

A web app that walks learners through a 30-day IELTS Speaking curriculum.
Users record (or type) an answer to each day's question and an AI coach
returns a band score, fluency/vocabulary/structure feedback, a sample
high-band answer, and learner-language tips. Each question also ships
with curated reference answers at bands 6, 7, and 8 (three samples per
band), and the AI can explain why a given sample reaches its band level
in the learner's native language. Progress can be saved across devices
by signing in with Google.

## Tech stack

| Layer | Tech |
| --- | --- |
| Frontend | React 19, Vite 6, TypeScript, Tailwind CSS v4, Motion, lucide-react, Google Identity Services |
| Backend | NestJS 11, Prisma 6, Passport (JWT), `google-auth-library`, `@google/genai` |
| Database | Postgres 16 |
| AI | Google Gemini (`gemini-3-flash-preview`) |
| Container | Docker Compose, nginx (frontend) |

## Project layout

```
.
├── backend/                NestJS API (auth, gemini, progress)
│   ├── prisma/             Prisma schema + migrations
│   ├── src/
│   │   ├── auth/           Google ID-token verification + JWT strategy
│   │   ├── gemini/         Three Gemini-backed endpoints
│   │   ├── progress/       Per-user progress + attempts
│   │   └── prisma/         PrismaService (global)
│   └── Dockerfile
├── frontend/               Vite SPA
│   ├── src/
│   │   ├── auth/           AuthContext + Google sign-in UI
│   │   ├── data/           Static 30-day curriculum
│   │   └── services/       fetch wrappers for the API
│   ├── Dockerfile
│   └── nginx.conf          Serves SPA, proxies /api/* to backend
├── docker-compose.yml          Production shape (backend + frontend)
├── docker-compose.override.yml Auto-loaded locally: adds Postgres
├── .env.example                Compose interpolation vars
└── MIGRATION_PLAN.md           History of the architecture migration
```

## Prerequisites

- Docker + Docker Compose v2
- Node 20+ and npm (only for the local-without-docker dev path)
- A Google OAuth 2.0 **Web client ID** — create one at
  <https://console.cloud.google.com/apis/credentials>. Add the dev URL
  (`http://localhost:8085`, or whatever `FRONTEND_PORT` you pick) to
  **Authorized JavaScript origins**. No redirect URI is needed; we use
  ID-token verification.
- A Google Gemini API key — get one at <https://aistudio.google.com/apikey>.

## Quick start: everything in Docker

The fastest way to get a running stack.

```bash
# 1. Configure compose env
cp .env.example .env
# Edit .env and fill in:
#   JWT_SECRET           (openssl rand -hex 32)
#   GOOGLE_CLIENT_ID     (from Google Cloud Console)
#   VITE_GOOGLE_CLIENT_ID (same value as GOOGLE_CLIENT_ID)
#   GEMINI_API_KEY       (from AI Studio)
# DATABASE_URL can stay blank — the override file pins it to the bundled Postgres.

# 2. Build + start (auto-merges docker-compose.override.yml → adds Postgres)
docker compose up -d --build

# 3. Open the app
open http://localhost:8085
```

Prisma applies migrations automatically on backend container start
(`prisma migrate deploy`).

To tear down:
```bash
docker compose down            # keep data
docker compose down -v         # also wipe Postgres volume
```

## Local development (hybrid: code on host, Postgres in Docker)

Best DX for active development — keeps HMR, watcher restart, IDE
debugging.

```bash
# 1. Start just Postgres
docker compose up -d postgres
#    Postgres is now reachable at localhost:5433 on the host.

# 2. Backend
cd backend
cp .env.example .env            # then fill the same secrets as above,
                                # plus:
                                #   DATABASE_URL=postgresql://ielts:ielts_dev@localhost:5433/ielts?schema=public
npm install
npx prisma migrate dev           # first time only — applies schema
npm run start:dev                # http://localhost:3001

# 3. Frontend (in a second terminal)
cd frontend
cp .env.example .env             # fill VITE_GOOGLE_CLIENT_ID
npm install
npm run dev                      # http://localhost:3000
```

The Vite dev server proxies `/api/*` to `http://localhost:3001`, so the
frontend at `:3000` and the backend at `:3001` are same-origin from the
browser's perspective.

### Useful npm scripts

| Where | Command | Purpose |
| --- | --- | --- |
| `backend` | `npm run start:dev` | NestJS with watch mode |
| `backend` | `npx prisma migrate dev` | apply pending migrations + create new ones |
| `backend` | `npx prisma studio` | GUI to inspect the DB |
| `backend` | `npx tsc --noEmit` | typecheck |
| `frontend` | `npm run dev` | Vite dev server |
| `frontend` | `npm run lint` | typecheck (`tsc --noEmit`) |
| `frontend` | `npm run build` | production bundle into `dist/` |

## Environment variables

### Backend (`backend/.env`)

Validated by Joi at boot — backend refuses to start if any required
variable is missing or malformed.

| Var | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | yes | Postgres connection string |
| `JWT_SECRET` | yes | min 32 chars; `openssl rand -hex 32` |
| `GOOGLE_CLIENT_ID` | yes | OAuth Web client ID from GCP |
| `GEMINI_API_KEY` | yes | from AI Studio |
| `GEMINI_TIMEOUT_MS` | no | default 30000, min 1000 |
| `PORT` | no | default 3001 |
| `FRONTEND_ORIGIN` | no | default `http://localhost:3000`; used by CORS |
| `AWS_REGION` | yes | S3 bucket region (e.g. `us-east-1`) |
| `AWS_S3_BUCKET` | yes | bucket name for recorded attempt audio |
| `AWS_ACCESS_KEY_ID` | yes | IAM key with `s3:PutObject` + `s3:GetObject` on the bucket |
| `AWS_SECRET_ACCESS_KEY` | yes | matching secret |
| `AWS_S3_AUDIO_PREFIX` | no | key prefix; default `attempts/` |
| `AWS_S3_PRESIGN_EXPIRES_SEC` | no | presigned URL TTL; default 900s |

### Frontend (`frontend/.env`)

Vite inlines `VITE_*` vars at build time.

| Var | Notes |
| --- | --- |
| `VITE_API_BASE_URL` | leave empty when frontend and backend share an origin (dev proxy / nginx); set to backend origin for split-origin deploys |
| `VITE_GOOGLE_CLIENT_ID` | same value as backend `GOOGLE_CLIENT_ID` |
| `BACKEND_URL` | dev only; target for Vite's `/api/*` proxy. Defaults to `http://localhost:3001` |

### Root `.env`

Used by `docker compose` to interpolate values into `docker-compose.yml`.
See `.env.example` for the full list.

## Production deployment

Use the production-shaped compose file (no override → no bundled Postgres):

```bash
DATABASE_URL=postgresql://user:pass@prod-host:5432/ielts \
JWT_SECRET=... \
GOOGLE_CLIENT_ID=... \
GEMINI_API_KEY=... \
VITE_GOOGLE_CLIENT_ID=... \
FRONTEND_ORIGIN=https://your.domain \
docker compose -f docker-compose.yml up -d --build
```

Notes:

- The backend image runs `prisma migrate deploy` at startup, so deploying
  a new image will apply any new migrations to your external Postgres.
- `VITE_GOOGLE_CLIENT_ID` is **baked into the frontend bundle at build time**.
  Rebuild the frontend image if you switch OAuth clients.
- Behind a reverse proxy / TLS terminator, set `FRONTEND_ORIGIN` to the
  public origin so backend CORS allows it.

## API surface

All non-auth routes (except `POST /api/auth/google`) require
`Authorization: Bearer <jwt>`.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/auth/google` | Exchange a Google ID token for a backend JWT |
| GET  | `/api/auth/me` | Return the current user (JWT-only sanity check) |
| POST | `/api/gemini/feedback` | IELTS-style feedback for a spoken/typed answer |
| POST | `/api/gemini/explanation` | Explain why a sample answer hits its band level (6/7/8), in the learner's language |
| POST | `/api/gemini/translate-keywords` | Translate the day's keywords into the learner's language |
| GET  | `/api/progress` | Completed days + recent attempts |
| POST | `/api/progress/days/:dayId` | Mark a day complete |
| POST | `/api/progress/attempts` | Persist a Gemini feedback attempt. Include `audioBase64` + `audioMimeType` and the backend uploads the audio to S3. |
| GET  | `/api/progress/attempts/:id/audio` | Returns a presigned `GET` URL for replaying that attempt's recording |
| POST | `/api/progress/merge` | Bulk-import anonymous completed days on first sign-in |

Rate limit: 20 req/min/IP (NestJS Throttler, global guard).

## Audio storage (S3)

When a learner submits a recorded answer, the client sends the audio (base64
in the `POST /api/progress/attempts` JSON body) and the backend uploads it
to S3 server-side using its IAM credentials. For replay, the backend issues a
short-lived presigned `GET` URL via `GET /api/progress/attempts/:id/audio` —
the client plays directly from S3 over that URL.

The JSON body limit is 15 MB (set in `src/main.ts`), and the DTO caps
`audioBase64` at ~15 MB encoded (~11 MB raw audio). Plenty for IELTS-length
speaking answers.

### Required bucket setup

1. Create a private S3 bucket in your `AWS_REGION`. Block all public access.
2. Create an IAM user / role with this minimum policy (replace `BUCKET`):

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Action": ["s3:PutObject", "s3:GetObject"],
       "Resource": "arn:aws:s3:::BUCKET/attempts/*"
     }]
   }
   ```

3. (Optional) Configure CORS only for `GET` so browsers can fetch presigned
   replay URLs:

   ```json
   [{
     "AllowedHeaders": ["*"],
     "AllowedMethods": ["GET"],
     "AllowedOrigins": [
       "http://localhost:3000",
       "https://your.production.domain"
     ],
     "MaxAgeSeconds": 3000
   }]
   ```

   Uploads go through the backend and never hit S3 from the browser, so `PUT`
   does not need a CORS allowance.

Objects are stored at `attempts/<userId>/<attemptId>.<ext>` (prefix configurable
via `AWS_S3_AUDIO_PREFIX`). Lifecycle/expiration is up to you; the backend never
deletes audio. When a user is deleted, their `Attempt` rows are cascade-removed
but their S3 objects remain — wire up a lifecycle rule if you need automatic
cleanup.
