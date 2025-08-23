# AI Assistant with Knowledge Base

A modern AI assistant built with React, Node.js, Supabase, and OpenAI.

## Features

- 💬 Interactive chat interface
- 📚 Knowledge base integration
- 🧵 Conversation threads
- 🔍 Source citations
- 📱 Responsive design

## Setup

### Prerequisites

- Node.js 16+
- Supabase account
- OpenAI API key

### Backend Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your credentials
4. Run the SQL setup script in your Supabase dashboard
5. Start the server: `npm run dev`

### Frontend Setup

1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and set your API URL
4. Start the development server: `npm start`

### Environment Variables

**Backend (.env):**
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon key
- `OPENAI_API_KEY`: Your OpenAI API key

**Frontend (.env):**
- `REACT_APP_API_URL`: Backend API URL (usually http://localhost:3001/api)

## Usage

1. Add your knowledge base documents to the `knowledge_base` table in Supabase
2. Start both frontend and backend servers
3. Open http://localhost:3000 in your browser
4. Start chatting with your AI assistant!

## Deployment

- Frontend: Deploy to Vercel, Netlify, or any static hosting
- Backend: Deploy to Railway, Render, or any Node.js hosting

## License

MIT