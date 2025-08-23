const supabase = require('../config/supabase');
const openai = require('../config/openai');

// Simple text-based search (replace with vector search for better results)
const searchKnowledgeBase = async (query) => {
  try {
    // For now, we'll do a simple text search
    // Later you can enhance this with vector embeddings
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .textSearch('content', query)
      .limit(5);

    if (error) {
      console.error('Knowledge base search error:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error searching knowledge base:', error);
    return [];
  }
};

module.exports = { searchKnowledgeBase };