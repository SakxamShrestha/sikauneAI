const supabase = require('../config/supabase');

class KnowledgeBaseService {
  // Search content with optional filters
  async searchContent(query, filters = {}) {
    try {
      let queryBuilder = supabase
        .from('knowledge_base')
        .select('*');

      // Apply filters if provided
      if (filters.grade_level) {
        queryBuilder = queryBuilder.eq('grade_level', filters.grade_level);
      }
      
      if (filters.subject) {
        queryBuilder = queryBuilder.eq('subject', filters.subject);
      }

      // Apply text search across multiple fields
      const { data, error } = await queryBuilder
        .or(`question.ilike.%${query}%,answer_markdown.ilike.%${query}%,content_markdown.ilike.%${query}%,tags.cs.{${query}}`)
        .order('priority', { ascending: false })
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
  }

  // Get all content with optional filters
  async getAllContent(filters = {}) {
    try {
      let queryBuilder = supabase
        .from('knowledge_base')
        .select('*');

      // Apply filters if provided
      if (filters.grade_level) {
        queryBuilder = queryBuilder.eq('grade_level', filters.grade_level);
      }
      
      if (filters.subject) {
        queryBuilder = queryBuilder.eq('subject', filters.subject);
      }

      const { data, error } = await queryBuilder
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching knowledge base content:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching knowledge base content:', error);
      return [];
    }
  }

  // Get content by ID
  async getContentById(id) {
    try {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching content by ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching content by ID:', error);
      return null;
    }
  }

  // Add new content
  async addContent(content) {
    try {
      const { data, error } = await supabase
        .from('knowledge_base')
        .insert([content])
        .select();

      if (error) {
        console.error('Error adding content:', error);
        return null;
      }

      return data[0];
    } catch (error) {
      console.error('Error adding content:', error);
      return null;
    }
  }

  // Update content
  async updateContent(id, updates) {
    try {
      const { data, error } = await supabase
        .from('knowledge_base')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating content:', error);
        return null;
      }

      return data[0];
    } catch (error) {
      console.error('Error updating content:', error);
      return null;
    }
  }

  // Delete content
  async deleteContent(id) {
    try {
      const { error } = await supabase
        .from('knowledge_base')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting content:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      return false;
    }
  }

  // Get subjects by grade
  async getSubjectsByGrade(grade) {
    try {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('subject')
        .eq('grade_level', grade)
        .not('subject', 'is', null);

      if (error) {
        console.error('Error fetching subjects by grade:', error);
        return [];
      }

      // Get unique subjects
      const uniqueSubjects = [...new Set(data.map(item => item.subject))];
      return uniqueSubjects;
    } catch (error) {
      console.error('Error fetching subjects by grade:', error);
      return [];
    }
  }

  // Get grades
  async getGrades() {
    try {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('grade_level')
        .not('grade_level', 'is', null);

      if (error) {
        console.error('Error fetching grades:', error);
        return [];
      }

      // Get unique grades
      const uniqueGrades = [...new Set(data.map(item => item.grade_level))];
      return uniqueGrades;
    } catch (error) {
      console.error('Error fetching grades:', error);
      return [];
    }
  }
}

module.exports = new KnowledgeBaseService();