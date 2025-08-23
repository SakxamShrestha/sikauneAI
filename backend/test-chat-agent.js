require('dotenv').config();

console.log('🧪 Testing Chat Agent Specifically...\n');

try {
  console.log('📥 Loading Chat Agent...');
  const chatAgent = require('./services/chatAgent');
  console.log('✅ Chat Agent loaded successfully');
  
  console.log('\n📥 Loading Knowledge Base Service...');
  const knowledgeBase = require('./services/knowledgeBase');
  console.log('✅ Knowledge Base Service loaded successfully');
  
  console.log('\n🤖 Testing Chat Agent with sample context...');
  
  // Test with sample context
  const sampleContext = [
    {
      question: "What is photosynthesis?",
      answer_markdown: "Photosynthesis is the process by which plants make their own food using sunlight, carbon dioxide, and water.",
      subject: "Science",
      grade_level: "Class 10"
    }
  ];
  
  chatAgent.generateResponse('What is photosynthesis?', sampleContext, 'Class 10', 'Science')
    .then(result => {
      console.log('✅ Chat Agent test successful!');
      console.log('Response:', result.response);
      console.log('Success:', result.success);
      if (result.error) {
        console.log('Error:', result.error);
      }
    })
    .catch(error => {
      console.log('❌ Chat Agent test failed:', error.message);
      console.log('Stack trace:', error.stack);
    });
    
} catch (error) {
  console.error('❌ Error loading services:', error.message);
  console.error('Stack trace:', error.stack);
}
