require('dotenv').config();

console.log('🧪 Testing Agent Services...\n');

try {
  console.log('📥 Loading Title Agent...');
  const titleAgent = require('./services/titleAgent');
  console.log('✅ Title Agent loaded successfully');
  
  console.log('\n📥 Loading Chat Agent...');
  const chatAgent = require('./services/chatAgent');
  console.log('✅ Chat Agent loaded successfully');
  
  console.log('\n📥 Loading Knowledge Base Service...');
  const knowledgeBase = require('./services/knowledgeBase');
  console.log('✅ Knowledge Base Service loaded successfully');
  
  console.log('\n🎯 Testing Title Agent...');
  titleAgent.generateTitle('What is photosynthesis?', 'Class 10', 'Science')
    .then(result => {
      console.log('✅ Title Agent test successful:', result);
    })
    .catch(error => {
      console.log('❌ Title Agent test failed:', error.message);
    });
    
} catch (error) {
  console.error('❌ Error loading services:', error.message);
  console.error('Stack trace:', error.stack);
}
