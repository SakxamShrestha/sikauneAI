require('dotenv').config();
const supabase = require('./config/supabase');
const openai = require('./config/openai');

const debugSystem = async () => {
  console.log('🔍 Debugging SikauneAI System...\n');
  
  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Found' : '❌ Missing');
  console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Found' : '❌ Missing');
  console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Found' : '❌ Missing');
  console.log('PORT:', process.env.PORT || '3001 (default)');
  console.log('');
  
  // Test Supabase connection
  console.log('🗄️ Testing Supabase Connection:');
  try {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log('❌ Supabase Error:', error.message);
    } else {
      console.log('✅ Supabase Connected Successfully');
    }
  } catch (error) {
    console.log('❌ Supabase Connection Failed:', error.message);
  }
  console.log('');
  
  // Test OpenAI connection
  console.log('🤖 Testing OpenAI Connection:');
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Say 'Hello World' if you can hear me." }
      ],
      max_tokens: 20,
    });
    
    console.log('✅ OpenAI Working:', completion.choices[0].message.content);
  } catch (error) {
    console.log('❌ OpenAI Error:', error.message);
    
    if (error.message.includes('insufficient_quota')) {
      console.log('💡 Tip: Check OpenAI billing - you may need more credits');
    } else if (error.message.includes('invalid_api_key')) {
      console.log('💡 Tip: Check your OpenAI API key in .env file');
    } else if (error.message.includes('rate_limit')) {
      console.log('💡 Tip: You may be hitting rate limits - wait a moment');
    }
  }
  console.log('');
  
  // Test knowledge base content
  console.log('📚 Testing Knowledge Base:');
  try {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .limit(3);
    
    if (error) {
      console.log('❌ Knowledge Base Error:', error.message);
    } else {
      console.log(`✅ Knowledge Base has ${data.length} entries`);
      if (data.length > 0) {
        console.log('Sample entry:', data[0].title);
      }
    }
  } catch (error) {
    console.log('❌ Knowledge Base Test Failed:', error.message);
  }
  console.log('');
  
  console.log('🎯 Debug Complete! Check the results above.');
};

debugSystem();
