# GovAid Assistance

## App Summary
GovAid Assistance is a web app prototype for people who need help finding government aid programs, especially housing-related support. The primary user is a client/applicant who may be overwhelmed and unsure where to start. The frontend provides a guided chat-like experience and informational pages to make navigation easier. This sprint adds the backend foundation so the app is no longer purely static. A PostgreSQL database now stores core system data using the ERD-based schema in `/db/schema.sql`, with realistic demo records in `/db/seed.sql`. The vertical slice implemented here is persistent chat messaging: when a user sends a message in Search Results, it is saved to the database through the backend API and rendered in the UI. Reloading the page confirms the message persists.

## Tech Stack
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express, CORS, dotenv
- **Database:** PostgreSQL (`pg` driver)
- **Authentication:** Not implemented yet (planned future work)
- **External APIs/Services:** None required for the vertical slice in this iteration

## Architecture Diagram
```mermaid
flowchart LR
    U[User] -->|Clicks Send, types message| FE[Frontend React App\n(Vite on :5173)]
    FE -->|HTTP GET/POST /api/sessions/:id/messages| BE[Backend Express API\n(Node on :3001)]
    BE -->|SQL queries| DB[(PostgreSQL aiddb)]
    DB -->|Rows returned| BE
    BE -->|JSON response| FE
    FE -->|Updated thread shown| U
```

## Prerequisites
Install the following tools:

1. **Node.js (LTS)** + npm  
   Install: https://nodejs.org/
2. **PostgreSQL** (server + `psql` client)  
   Install: https://www.postgresql.org/download/
3. **Git**  
   Install: https://git-scm.com/downloads

Verify installations:

```bash
node -v
npm -v
psql --version
git --version
```

## Installation and Setup

1. **Clone the repository**
```bash
git clone <YOUR_REPO_URL>
cd GovAidAssistance
```

2. **Install frontend + backend dependencies**
```bash
npm run install-deps
```

3. **Create database** (example using default user)
```bash
createdb aiddb
```

4. **Run schema and seed scripts**
```bash
psql -d aiddb -f db/schema.sql
psql -d aiddb -f db/seed.sql
```

5. **Configure backend environment variables**
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` as needed for your local PostgreSQL credentials.

6. **(Optional) Configure frontend API base URL**  
If your backend runs somewhere other than `http://localhost:3001`, create `frontend/.env`:
```bash
VITE_API_BASE_URL=http://localhost:3001
```

## Running the Application

Start backend (Terminal 1):
```bash
npm run dev:backend
```

Start frontend (Terminal 2):
```bash
npm run dev:frontend
```

Open in browser:
- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:3001/health`

## Verifying the Vertical Slice (Persistent Chat Message)

### Feature behavior
The **Send** button on the Search Results page now performs a full stack flow:
1. Frontend sends `POST /api/sessions/1/messages`
2. Backend inserts into `chat_message`
3. Backend returns inserted message JSON
4. Frontend appends/render the message immediately
5. Refresh still shows the message because it reloads from DB (`GET /api/sessions/1/messages`)

### Manual verification steps
1. Start backend + frontend.
2. Navigate to **Search Results** (`/results`).
3. Type a message and click the **Send** button.
4. Confirm the message appears in the chat thread.
5. Refresh the browser page.
6. Confirm the same message is still visible.

### Database verification (SQL)
Run this query to verify persisted messages for the demo session:

```bash
psql -d aiddb -c "SELECT message_id, session_id, sender_type, message_text, timestamp FROM chat_message WHERE session_id = 1 ORDER BY message_id DESC LIMIT 10;"
```

## Repository and Submission Notes
- Keep all frontend, backend, and `/db` scripts in this one team repository.
- Share this GitHub repository with: **taforlauracutler**
- Submit your README link in assignment comments.
