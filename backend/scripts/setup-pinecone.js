require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');
const supabase = require('./config/supabase');
const { upsertContent } = require('./services/pineconeService');

const setupPinecone = async () => {
  try {
    console.log('🚀 Setting up Pinecone for Student Q&A System...');
    
    // Initialize Pinecone
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    
    const indexName = process.env.PINECONE_INDEX_NAME || 'student-qa-index';
    
    // Check if index exists, create if not
    const indexes = await pinecone.listIndexes();
    const indexExists = indexes.some(index => index.name === indexName);
    
    if (!indexExists) {
      console.log(`📝 Creating Pinecone index: ${indexName}`);
      await pinecone.createIndex({
        name: indexName,
        dimension: 1536, // OpenAI text-embedding-3-small dimension
        metric: 'cosine'
      });
      
      console.log('⏳ Waiting for index to be ready...');
      await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute
    } else {
      console.log(`✅ Index ${indexName} already exists`);
    }
    
    // Get the index
    const index = pinecone.index(indexName);
    
    // Check if index is ready
    const indexStats = await index.describeIndexStats();
    console.log(`📊 Index status: ${indexStats.status?.state}`);
    
    // Migrate existing content from Supabase to Pinecone
    console.log('🔄 Migrating existing content to Pinecone...');
    const { data: existingContent, error } = await supabase
      .from('knowledge_base')
      .select('*');
    
    if (error) {
      console.error('Error fetching existing content:', error);
      return;
    }
    
    if (existingContent && existingContent.length > 0) {
      console.log(`📚 Found ${existingContent.length} existing entries to migrate`);
      
      for (const entry of existingContent) {
        try {
          const searchContent = `${entry.title} ${entry.question || ''} ${entry.answer_markdown || ''} ${entry.content_markdown || ''}`.trim();
          
          if (searchContent) {
            await upsertContent(entry.id, searchContent, {
              title: entry.title,
              question: entry.question,
              answer: entry.answer_markdown,
              subject: entry.subject,
              grade_level: entry.grade_level,
              difficulty: entry.difficulty,
              category: entry.category,
              tags: entry.tags,
              priority: entry.priority
            });
            console.log(`✅ Migrated: ${entry.title}`);
          }
        } catch (migrationError) {
          console.error(`❌ Failed to migrate ${entry.title}:`, migrationError.message);
        }
      }
      
      console.log('🎉 Migration completed!');
    } else {
      console.log('📝 No existing content to migrate');
    }
    
    console.log('🚀 Pinecone setup completed successfully!');
    console.log(`🔍 Your AI assistant now uses semantic search via index: ${indexName}`);
    
  } catch (error) {
    console.error('❌ Pinecone setup failed:', error);
    process.exit(1);
  }
};

// Run setup if called directly
if (require.main === module) {
  setupPinecone();
}

module.exports = setupPinecone;
