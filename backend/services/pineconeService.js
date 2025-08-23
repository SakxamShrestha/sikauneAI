const { index } = require('../config/pinecone');
const openai = require('../config/openai');

// Generate embeddings for text using OpenAI
const generateEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
};

// Upsert content to Pinecone
const upsertContent = async (id, content, metadata) => {
  try {
    const embedding = await generateEmbedding(content);
    
    await index.upsert([{
      id: id.toString(),
      values: embedding,
      metadata: {
        ...metadata,
        content: content.substring(0, 1000), // Store truncated content for reference
        timestamp: new Date().toISOString()
      }
    }]);
    
    return true;
  } catch (error) {
    console.error('Error upserting to Pinecone:', error);
    throw error;
  }
};

// Search for similar content
const searchSimilarContent = async (query, topK = 5, filter = {}) => {
  try {
    const queryEmbedding = await generateEmbedding(query);
    
    const searchResponse = await index.query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true,
      filter: filter
    });
    
    return searchResponse.matches.map(match => ({
      id: match.id,
      score: match.score,
      metadata: match.metadata
    }));
  } catch (error) {
    console.error('Error searching Pinecone:', error);
    throw error;
  }
};

// Delete content from Pinecone
const deleteContent = async (id) => {
  try {
    await index.deleteOne(id.toString());
    return true;
  } catch (error) {
    console.error('Error deleting from Pinecone:', error);
    throw error;
  }
};

// Update content in Pinecone
const updateContent = async (id, content, metadata) => {
  try {
    // Delete old content and upsert new
    await deleteContent(id);
    await upsertContent(id, content, metadata);
    return true;
  } catch (error) {
    console.error('Error updating Pinecone content:', error);
    throw error;
  }
};

module.exports = {
  generateEmbedding,
  upsertContent,
  searchSimilarContent,
  deleteContent,
  updateContent
};
