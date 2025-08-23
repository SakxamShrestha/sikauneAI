const express = require('express');
const supabase = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');
const knowledgeBaseService = require('../services/knowledgeBase');
const titleAgent = require('../services/titleAgent');
const chatAgent = require('../services/chatAgent');

const router = express.Router();

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, thread_id, grade, subject, title_prompt } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`🚀 New message received: Grade ${grade}, Subject ${subject}`);

    // Search knowledge base with grade and subject context
    let searchQuery = message;
    let contextFilter = {};
    
    if (grade && subject) {
      contextFilter = {
        grade_level: grade,
        subject: subject
      };
      console.log(`🔍 Searching knowledge base with context: Grade ${grade}, Subject ${subject}`);
    }

    // Search knowledge base for relevant content
    const searchResults = await knowledgeBaseService.searchContent(searchQuery, contextFilter);
    
    // Build context from search results
    let context = '';
    let sources = [];
    
    if (searchResults && searchResults.length > 0) {
      context = searchResults.map(result => 
        `Question: ${result.question}\nAnswer: ${result.answer_markdown || result.content_markdown}\n`
      ).join('\n');
      
      sources = searchResults.map(result => ({
        title: result.title,
        excerpt: result.question,
        subject: result.subject,
        grade_level: result.grade_level
      }));
      
      console.log(`📚 Found ${searchResults.length} relevant sources in knowledge base`);
    } else {
      console.log('📚 No relevant content found in knowledge base');
    }

    // Create or update thread
    let threadId = thread_id;
    let threadTitle = null;
    
    if (!threadId) {
      console.log('🎯 First message - Title Agent will generate conversation title...');
      
      // Use Title Agent to generate title for new conversation
      const titleResult = await titleAgent.generateTitle(message, grade, subject, title_prompt);
      
      if (titleResult.success) {
        threadTitle = titleResult.title;
        console.log(`✅ Title Agent generated: "${threadTitle}"`);
      } else {
        threadTitle = titleResult.title; // Fallback title
        console.log(`⚠️ Title Agent used fallback: "${threadTitle}"`);
      }
      
      // Create new thread with generated title
      const { data: threadData, error: threadError } = await supabase
        .from('chat_threads')
        .insert([{
          id: uuidv4(),
          title: threadTitle,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();

      if (threadError) {
        console.error('Error creating thread:', threadError);
        return res.status(500).json({ error: 'Failed to create thread' });
      }

      threadId = threadData[0].id;
      console.log(`✅ New thread created with ID: ${threadId}`);
    }

    // Use Chat Agent to generate response
    console.log('🤖 Chat Agent generating response...');
    const chatResult = await chatAgent.generateResponse(message, searchResults, grade, subject);
    
    if (!chatResult.success) {
      console.error('Chat Agent failed:', chatResult.error);
      return res.status(500).json({ error: 'Failed to generate response' });
    }

    const aiResponse = chatResult.response;
    console.log('✅ Chat Agent response generated successfully');

    // Update thread timestamp if it's an existing thread
    if (threadId) {
      await supabase
        .from('chat_threads')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', threadId);
    }

    // Save user message
    const { error: userMsgError } = await supabase
      .from('chat_messages')
      .insert([{
        id: uuidv4(),
        thread_id: threadId,
        sender: 'user',
        content: message,
        timestamp: new Date().toISOString()
      }]);

    if (userMsgError) {
      console.error('Error saving user message:', userMsgError);
    }

    // Save AI response
    const { error: aiMsgError } = await supabase
      .from('chat_messages')
      .insert([{
        id: uuidv4(),
        thread_id: threadId,
        sender: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      }]);

    if (aiMsgError) {
      console.error('Error saving AI message:', aiMsgError);
    }

    // Update thread timestamp
    await supabase
      .from('chat_threads')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', threadId);

    res.json({
      response: aiResponse,
      thread_id: threadId,
      sources: sources,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Chat error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;