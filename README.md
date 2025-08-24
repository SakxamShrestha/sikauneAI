# 🧠 MeroGuru AI - Intelligent Educational Platform

## 📖 Introduction

**MeroGuru AI** is a sophisticated AI-powered educational platform designed to revolutionize how students learn through intelligent tutoring. The system provides personalized learning assistance by combining advanced natural language processing with comprehensive knowledge base management.

### **What It Does**
- **Personalized Learning** - AI tutor adapts to student's grade and subject
- **Intelligent Q&A** - Context-aware responses using educational content
- **Knowledge Management** - Comprehensive syllabus and unit-wise content
- **Semantic Search** - Finds relevant information by understanding meaning, not just keywords

### **Who It's For**
- **Students** - Class 10, 11, 12 seeking personalized learning
- **Educators** - Teachers looking for AI-assisted content delivery
- **Institutions** - Schools wanting to implement AI-powered education
- **Developers** - Those interested in building educational AI systems

### **Key Benefits**
- 🎯 **Context-Aware** - Responses tailored to specific grade and subject
- 📚 **Rich Content** - Markdown + LaTeX equations for professional display
- 🔍 **Smart Search** - Hybrid approach combining vector and structured search
- 📱 **Responsive** - Works seamlessly on all devices
- 🔐 **Secure** - Google authentication with user management

---

## 📚 Sources Used

### **Students Data from Slide 2:**
- [Flash 1 Report 2081 (2024)](https://giwmscdntwo.gov.np/media/pdf_upload/Flash%201%20Report%202081%20%282024%29_hzq1zgz.pdf)
- [Nepal's persistent digital divide: From high penetration to inclusion](https://thehimalayantimes.com/opinion/nepals-persistent-digital-divide-from-high-penetration-to-inclusion?utm_source=chatgpt.com)
- [Shadow Education: A Role of Private Tutoring in Learning](https://www.researchgate.net/publication/339123325_Shadow_Education_A_Role_of_Private_Tutoring_in_Learning)

### **Educational Materials used for Knowledge base:**
- [Ministry of Education CDC Library](http://lib.moecdc.gov.np/catalog/opac_css/index.php?lvl=cmspage&pageid=6&id_rubrique=105)

---

## �� Technical Details

### **Architecture Overview**
```
MeroGuru AI/
├── frontend/                 # React 18 + Tailwind CSS
│   ├── src/
│   │   ├── App.js           # Main application with routing
│   │   ├── GradeSelector.js # Grade/subject navigation
│   │   ├── ChatInterface.js # AI chat with markdown rendering
│   │   └── firebase.js      # Google authentication
│   └── public/
│       └── logo.png         # Custom branding
├── backend/                  # Node.js + Express.js
│   ├── services/
│   │   ├── hybridSearchService.js # Pinecone + Supabase search
│   │   ├── knowledgeBase.js      # Content management
│   │   ├── titleAgent.js         # AI title generation
│   │   └── chatAgent.js          # AI chat responses
│   ├── config/
│   │   ├── openai.js             # GPT-3.5-turbo integration
│   │   ├── supabase.js           # PostgreSQL database
│   │   └── pinecone.js           # Vector embeddings
│   └── routes/
│       ├── chats.js              # Chat API endpoints
│       └── threads.js            # Conversation management
└── database/                 # Schema and setup
    └── supabase-setup.sql   # Database initialization
```

### **Technology Stack**

#### **Frontend**
- **React 18** - Modern component-based UI
- **Tailwind CSS** - Utility-first styling framework
- **Lucide React** - Beautiful icon library
- **React Markdown** - Rich content rendering
- **KaTeX** - LaTeX equation rendering
- **Firebase Auth** - Google Sign-in integration

#### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **OpenAI API** - GPT-3.5-turbo for AI responses
- **Supabase** - PostgreSQL database with real-time features
- **Pinecone** - Vector database for semantic search

#### **AI & Search**
- **Hybrid Search Engine** - Combines Pinecone vector similarity with Supabase metadata filtering
- **Dual AI Agents** - Specialized agents for title generation and chat responses
- **Semantic Understanding** - OpenAI embeddings for context-aware search
- **Intelligent Ranking** - Combines similarity scores with content relevance

### **Data Flow**
1. **User Input** → Grade/Subject selection
2. **Query Processing** → AI generates embedding
3. **Hybrid Search** → Pinecone (semantic) + Supabase (metadata)
4. **Result Ranking** → Intelligent combination of both sources
5. **AI Response** → Context-aware answer with sources
6. **Content Rendering** → Markdown + LaTeX display

### **Performance Features**
- **Vector Embeddings** - 1536-dimensional OpenAI embeddings
- **Caching Strategy** - Intelligent result caching
- **Fallback Systems** - Graceful degradation if services fail
- **Scalable Architecture** - Handles large knowledge bases

---

## 🚀 Future Improvements (AWS Integration)

### **Phase 1: AWS Infrastructure Migration**
- **Amazon RDS** - Replace Supabase with managed PostgreSQL
- **Amazon ElastiCache** - Redis for session and search caching
- **AWS Lambda** - Serverless AI processing functions
- **Amazon API Gateway** - Scalable API management

### **Phase 2: Advanced AI Services**
- **Amazon Bedrock** - Access to multiple AI models (Claude, Llama)
- **Amazon OpenSearch** - Advanced vector search capabilities
- **Amazon SageMaker** - Custom model training and deployment
- **Amazon Comprehend** - Enhanced text analysis and understanding

### **Phase 3: Scalability & Monitoring**
- **Amazon ECS/Fargate** - Containerized backend deployment
- **Amazon CloudFront** - Global content delivery network
- **Amazon CloudWatch** - Comprehensive monitoring and alerting
- **AWS X-Ray** - Distributed tracing for performance optimization

### **Phase 4: Advanced Features**
- **Multi-language Support** - Internationalization with AWS Translate
- **Voice Integration** - Amazon Polly for text-to-speech
- **Analytics Dashboard** - Amazon QuickSight for learning insights
- **Machine Learning** - Personalized learning recommendations

### **Benefits of AWS Migration**
- **Global Scale** - Multi-region deployment
- **Cost Optimization** - Pay-per-use pricing model
- **Enterprise Security** - SOC, PCI, HIPAA compliance
- **Advanced AI** - Access to cutting-edge models
- **Managed Services** - Reduced operational overhead

---

## 📥 How to Download and Use

### **Prerequisites**
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **API Keys** - Supabase, OpenAI, Pinecone accounts

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/yourusername/meroguru-ai.git
cd meroguru-ai
```

### **Step 2: Backend Setup**
```bash
cd backend
npm install
cp env.example .env
```

**Fill in your `.env` file:**
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

**Start the backend:**
```bash
npm run dev
```

### **Step 3: Frontend Setup**
```bash
cd frontend
npm install
```

**Create `.env` file:**
```env
REACT_APP_API_URL=http://localhost:3001/api
```

**Start the frontend:**
```bash
npm start
```

### **Step 4: Add Your Logo**
```bash
# Place your logo in frontend/public/logo.png
# It will automatically appear in header and homepage
```

### **Step 5: Add Educational Content**
```bash
cd backend
npm run ingest      # Add comprehensive Science content
npm run migrate     # Migrate to Pinecone for semantic search
```

### **Step 6: Test the System**
```bash
# Test hybrid search
npm run test:search

# Test Pinecone integration
npm run test:pinecone

# Open http://localhost:3000 in your browser
```

### **Usage Instructions**

#### **For Students:**
1. **Select Grade** - Choose Class 10, 11, or 12
2. **Choose Subject** - Pick Science, Math, Social Studies, or English
3. **Start Chatting** - Ask questions about your subject
4. **Get Contextual Answers** - AI uses grade-appropriate content

#### **For Educators:**
1. **Add Content** - Use ingestion scripts to add educational materials
2. **Customize Subjects** - Modify grade and subject configurations
3. **Monitor Usage** - Track student interactions and learning progress

#### **For Developers:**
1. **Extend Features** - Add new AI capabilities or search algorithms
2. **Integrate APIs** - Connect with external educational services
3. **Scale Infrastructure** - Deploy to cloud platforms like AWS

### **Troubleshooting**

#### **Common Issues:**
- **Logo Not Showing** - Check file path in `public/` folder
- **API Errors** - Verify environment variables and API keys
- **Search Not Working** - Ensure Pinecone index is properly configured
- **Content Missing** - Run ingestion and migration scripts

#### **Debug Commands:**
```bash
# Test Pinecone connection
cd backend
node tests/test-pinecone-rest.js

# Test hybrid search
node tests/test-hybrid-search.js

# Check content
node scripts/ingest-all-content.js
```

### **Deployment**

#### **Frontend (Vercel/Netlify):**
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

#### **Backend (Railway/Render):**
```bash
cd backend
npm start
# Set environment variables
```

---

## 📄 License

This project is part of the MeroGuru AI educational platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the established directory structure
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

---

**MeroGuru AI - Empowering Education Through Intelligent Technology** 🎓✨