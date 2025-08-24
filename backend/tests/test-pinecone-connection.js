require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');

const testConnection = async () => {
  try {
    console.log('🔍 Testing Pinecone connection...');
    console.log('API Key:', process.env.PINECONE_API_KEY ? '✅ Found' : '❌ Missing');
    console.log('Environment:', process.env.PINECONE_ENVIRONMENT ? '✅ Found' : '❌ Missing');
    console.log('Index Name:', process.env.PINECONE_INDEX_NAME ? '✅ Found' : '❌ Missing');
    
    // Initialize Pinecone
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    
    console.log('✅ Pinecone client created successfully');
    
    // List existing indexes
    console.log('📋 Listing existing indexes...');
    const indexes = await pinecone.listIndexes();
    console.log('Available indexes:', indexes.map(idx => idx.name));
    
    // Try to connect to your specific index
    const indexName = process.env.PINECONE_INDEX_NAME;
    if (indexName) {
      console.log(`🔗 Trying to connect to index: ${indexName}`);
      const index = pinecone.index(indexName);
      
      // Get index stats
      const stats = await index.describeIndexStats();
      console.log(`✅ Successfully connected to index: ${indexName}`);
      console.log(`📊 Index status: ${stats.status?.state}`);
      console.log(`📈 Total vector count: ${stats.totalVectorCount}`);
    }
    
    console.log('🎉 Pinecone connection test successful!');
    
  } catch (error) {
    console.error('❌ Pinecone connection test failed:', error.message);
    if (error.message.includes('not found')) {
      console.log('💡 Tip: Make sure your index name matches exactly what you created in Pinecone');
    }
  }
};

// Run the test
testConnection();
