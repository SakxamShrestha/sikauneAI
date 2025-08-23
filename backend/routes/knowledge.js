const express = require('express');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../config/supabase');
const { upsertContent, deleteContent, updateContent } = require('../services/pineconeService');

const router = express.Router();

// Get all knowledge base entries
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching knowledge base:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new knowledge base entry
router.post('/', async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const entryId = uuidv4();
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('knowledge_base')
      .insert({
        id: entryId,
        title,
        content_markdown: content,
        question,
        answer_markdown: answer,
        subject,
        grade_level,
        difficulty,
        category: category || 'Concept',
        tags: tags || [],
        priority: priority || 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();

    // Also insert into Pinecone for vector search
    const searchContent = `${title} ${question} ${answer} ${content}`.trim();
    await upsertContent(entryId, searchContent, {
      title,
      question,
      answer,
      subject,
      grade_level,
      difficulty,
      category,
      tags,
      priority
    });

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error adding knowledge base entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update knowledge base entry
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const { data, error } = await supabase
      .from('knowledge_base')
      .update({
        title,
        content,
        category: category || 'general',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(data[0]);
  } catch (error) {
    console.error('Error updating knowledge base entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete knowledge base entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('knowledge_base')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting knowledge base entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
