const express = require('express');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../config/supabase');
const openai = require('../config/openai');
const { searchKnowledgeBase } = require('../services/knowledgeBase');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, thread_id } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Generate thread ID if not provided
    const threadId = thread_id || uuidv4();

    // Create or update thread
    if (!thread_id) {
      await supabase
        .from('chat_threads')
        .insert({
          id: threadId,
          title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
    } else {
      await supabase
        .from('chat_threads')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', threadId);
    }

    // Store user message
    await supabase
      .from('chat_messages')
      .insert({
        id: uuidv4(),
        thread_id: threadId,
        sender: 'user',
        content: message,
        timestamp: new Date().toISOString()
      });

    // Search knowledge base
    const relevantContent = await searchKnowledgeBase(message);

    // Generate AI response
    const systemPrompt = `You are a helpful AI assistant. Use the following knowledge base content to answer the user's question. If the information isn't in the knowledge base, say so politely and provide a general helpful response.

Knowledge Base Content:
${relevantContent.map(item => `- ${item.content}`).join('\n')}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // Store AI response
    await supabase
      .from('chat_messages')
      .insert({
        id: uuidv4(),
        thread_id: threadId,
        sender: 'assistant',
        content: aiResponse,
        sources: relevantContent.map(item => ({
          title: item.title,
          excerpt: item.content.substring(0, 200) + '...'
        })),
        timestamp: new Date().toISOString()
      });

    res.json({
      thread_id: threadId,
      response: aiResponse,
      sources: relevantContent.map(item => ({
        title: item.title,
        excerpt: item.content.substring(0, 200) + '...'
      })),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;