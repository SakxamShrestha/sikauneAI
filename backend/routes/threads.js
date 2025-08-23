const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

// Get all threads
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('chat_threads')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching threads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get messages for a specific thread
router.get('/:threadId', async (req, res) => {
  try {
    const { threadId } = req.params;

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('timestamp', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a thread
router.delete('/:threadId', async (req, res) => {
  try {
    const { threadId } = req.params;

    // Delete all messages in the thread
    await supabase
      .from('chat_messages')
      .delete()
      .eq('thread_id', threadId);

    // Delete the thread
    await supabase
      .from('chat_threads')
      .delete()
      .eq('id', threadId);

    res.json({ message: 'Thread deleted successfully' });
  } catch (error) {
    console.error('Error deleting thread:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;