# 🧠 MeroGuru AI - Intelligent Educational Platform

A sophisticated AI-powered educational platform that provides personalized learning assistance using advanced hybrid search capabilities combining Supabase and Pinecone vector databases.

## 🌟 Project Overview

MeroGuru AI is a comprehensive educational platform designed to help students learn through intelligent AI tutoring. The system combines structured knowledge storage with semantic search to provide contextually relevant, accurate educational content.

## ✨ Key Features

### 🎓 **Educational Content Management**
- **Grade-based Navigation** - Class 10, 11, 12 selection
- **Subject-specific Learning** - Science, Mathematics, Social Studies, English
- **Rich Content Support** - Markdown + LaTeX equations
- **Comprehensive Syllabus** - Complete educational coverage

### 🤖 **AI-Powered Learning**
- **Dual AI Agents** - Title Agent + Chat Agent architecture
- **Context-Aware Responses** - Uses knowledge base for accurate answers
- **Semantic Understanding** - Advanced language processing
- **Source Citations** - References to educational materials

### 🔍 **Hybrid Search System**
- **Pinecone Vector Search** - Semantic similarity matching
- **Supabase Structured Data** - Metadata filtering and organization
- **Intelligent Ranking** - Combines similarity + metadata relevance
- **Automatic Fallback** - Graceful degradation if services fail

### 🎨 **Modern User Interface**
- **Responsive Design** - Works on all devices
- **Professional Branding** - Custom logo integration
- **Markdown Rendering** - Beautiful content display
- **LaTeX Equations** - Professional mathematical notation
- **Conversation Threads** - Organized learning sessions

### 🔐 **User Authentication**
- **Google Sign-in** - Secure user management
- **Profile Management** - User preferences and history
- **Session Persistence** - Seamless user experience

## 🏗️ Architecture

```
MeroGuru AI/
├── frontend/                 # React 18 + Tailwind CSS
│   ├── src/
│   │   ├── App.js           # Main application
│   │   ├── GradeSelector.js # Grade/subject navigation
│   │   ├── ChatInterface.js # AI chat interface
│   │   └── firebase.js      # Authentication
│   └── public/
│       └── logo.png         # Your custom logo
├── backend/                  # Node.js + Express.js
│   ├── services/
│   │   ├── hybridSearchService.js # Hybrid search engine
│   │   ├── knowledgeBase.js      # Knowledge management
│   │   ├── titleAgent.js         # AI title generation
│   │   └── chatAgent.js          # AI chat responses
│   ├── config/
│   │   ├── openai.js             # OpenAI integration
│   │   ├── supabase.js           # Supabase client
│   │   └── pinecone.js           # Pinecone client
│   └── routes/
│       ├── chats.js              # Chat API endpoints
│       └── threads.js            # Thread management
└── database/                 # Database schemas
    └── supabase-setup.sql   # Initial setup
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- Supabase account
- OpenAI API key
- Pinecone account

### **1. Clone & Setup**
```bash
git clone https://github.com/yourusername/meroguru-ai.git
cd meroguru-ai
```

### **2. Backend Setup**
```bash
cd backend
npm install
cp env.example .env
# Fill in your API keys
npm run dev
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### **4. Add Your Logo**
```bash
# Place your logo in frontend/public/logo.png
# It will automatically appear in header and homepage
```

## 🔧 Environment Variables

### **Backend (.env)**
```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_environment
PINECONE_INDEX_NAME=your_index_name
PINECONE_PROJECT_ID=your_project_id

# Server
PORT=3001
```

### **Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## 📚 Content Management

### **Ingest Educational Content**
```bash
cd backend
npm run ingest      # Add comprehensive Science content
npm run migrate     # Migrate to Pinecone for semantic search
```

### **Current Content Coverage**
- **Class 10 Science** - Complete syllabus + 4 units
  - Unit 1: Force (Gravitation, Newton's Laws)
  - Unit 2: Pressure (Fluid pressure, Surface tension)
  - Unit 3: Energy (Hydroelectricity, Biofuels, Biogas)
  - Unit 4: Heat (Latent heat, Calorimetry)

## 🧪 Testing

### **Test Hybrid Search**
```bash
cd backend
npm run test:search    # Test search functionality
npm run test:pinecone  # Test Pinecone integration
npm run test:all       # Run all tests
```

### **Test Frontend**
```bash
cd frontend
npm start              # Start development server
# Open http://localhost:3000
```

## 🎨 Customization

### **Logo Integration**
- **Header Logo** - Top-left corner, clickable
- **Homepage Logo** - Center display, prominent
- **Automatic Styling** - Responsive and professional

### **Branding**
- **Project Name** - MeroGuru (easily changeable)
- **Color Scheme** - Indigo/purple gradient (customizable)
- **Typography** - Modern, readable fonts

## 📱 Features in Detail

### **AI Chat System**
- **Context-Aware** - Uses selected grade/subject
- **Knowledge Base Integration** - Accurate, sourced responses
- **Markdown Support** - Rich text formatting
- **LaTeX Equations** - Mathematical notation
- **Conversation History** - Persistent threads

### **Search Capabilities**
- **Semantic Search** - Understands meaning, not just keywords
- **Hybrid Approach** - Combines vector + structured search
- **Intelligent Filtering** - Grade and subject-specific results
- **Relevance Ranking** - Best matches first

### **User Experience**
- **Grade Selection** - Intuitive navigation
- **Subject Filtering** - Focused learning
- **Responsive Design** - Mobile-friendly interface
- **Smooth Animations** - Professional feel

## 🔍 Troubleshooting

### **Common Issues**
1. **Logo Not Showing** - Check file path in `public/` folder
2. **Pinecone Connection** - Verify environment variables
3. **API Errors** - Check OpenAI billing and API keys
4. **Content Not Loading** - Run ingestion scripts

### **Debug Commands**
```bash
# Test Pinecone connection
cd backend
node tests/test-pinecone-rest.js

# Test hybrid search
node tests/test-hybrid-search.js

# Check content
node scripts/ingest-all-content.js
```

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### **Backend (Railway/Render)**
```bash
cd backend
npm start
# Set environment variables
```

## 📈 Performance

- **Fast Retrieval** - Vector similarity search
- **Scalable Architecture** - Handles large knowledge bases
- **Efficient Caching** - Optimized response times
- **Fallback Systems** - Reliable service delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the established directory structure
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

## 📄 License

This project is part of the MeroGuru AI educational platform.

## 🙏 Acknowledgments

- **OpenAI** - Advanced language models
- **Pinecone** - Vector database technology
- **Supabase** - Backend-as-a-Service
- **React Team** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework

---

**MeroGuru AI - Empowering Education Through Intelligent Technology** 🎓✨