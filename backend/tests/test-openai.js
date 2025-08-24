require('dotenv').config();
const openai = require('./config/openai');

const testOpenAI = async () => {
  try {
    console.log('🧪 Testing OpenAI API...');
    console.log('API Key:', process.env.OPENAI_API_KEY ? '✅ Found' : '❌ Missing');
    
    if (!process.env.OPENAI_API_KEY) {
      console.log('❌ OpenAI API key not found in .env file');
      return;
    }
    
    // Test basic completion
    console.log('📝 Testing basic completion...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful math tutor." },
        { role: "user", content: "What is 2 + 2?" }
      ],
      max_tokens: 50,
      temperature: 0.7,
    });
    
    console.log('✅ OpenAI API working!');
    console.log('🤖 AI Response:', completion.choices[0].message.content);
    
    // Test embedding generation
    console.log('🔍 Testing embedding generation...');
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: "test text for embedding",
    });
    
    console.log('✅ Embeddings working!');
    console.log('📊 Embedding dimensions:', embedding.data[0].embedding.length);
    
    console.log('🎉 All OpenAI tests passed!');
    console.log('🚀 Your AI assistant is ready to work!');
    
  } catch (error) {
    console.error('❌ OpenAI test failed:', error.message);
    
    if (error.message.includes('insufficient_quota')) {
      console.log('💡 Tip: Check your OpenAI billing and add credits');
    } else if (error.message.includes('invalid_api_key')) {
      console.log('💡 Tip: Check your OpenAI API key in .env file');
    } else {
      console.log('💡 Tip: Check your internet connection and OpenAI status');
    }
  }
};

// Run the test
testOpenAI();
