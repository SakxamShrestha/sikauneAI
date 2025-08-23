const openai = require('../config/openai');

class TitleAgent {
  constructor() {
    this.model = 'gpt-3.5-turbo';
    this.maxTokens = 30;
    this.temperature = 0.7;
  }

  // Generate title for a new conversation
  async generateTitle(message, grade, subject, customPrompt = null) {
    try {
      console.log('🎯 Title Agent: Generating title for new conversation...');
      
      // Build the title generation prompt
      const systemPrompt = customPrompt || this.getDefaultTitlePrompt(grade, subject);
      
      const messages = [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Generate a title for this message: "${message}"`
        }
      ];

      // Generate title using OpenAI
      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: messages,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      });

      const generatedTitle = completion.choices[0].message.content.trim();
      
      // Clean up the title (remove quotes, extra formatting)
      const cleanTitle = generatedTitle.replace(/^["']|["']$/g, '');
      
      console.log(`✅ Title Agent: Generated title: "${cleanTitle}"`);
      
      return {
        success: true,
        title: cleanTitle,
        originalMessage: message
      };

    } catch (error) {
      console.error('❌ Title Agent Error:', error.message);
      
      // Fallback to simple title generation
      const fallbackTitle = this.generateFallbackTitle(message, grade, subject);
      
      return {
        success: false,
        title: fallbackTitle,
        originalMessage: message,
        error: error.message,
        usedFallback: true
      };
    }
  }

  // Default title prompt based on grade and subject
  getDefaultTitlePrompt(grade, subject) {
    return `You are a specialized title generator for educational conversations. Create a concise, descriptive title (max 8 words) based on the user's first message.

CONTEXT:
- Grade Level: ${grade || 'General'}
- Subject: ${subject || 'General Education'}

TITLE REQUIREMENTS:
- Clear and specific to the topic
- Educational and academic in nature
- Easy to understand for ${grade || 'students'}
- Relevant to ${subject || 'the subject being discussed'}
- Professional but friendly tone
- Include subject prefix when relevant (e.g., "Math:", "Science:")

EXAMPLES:
- "Math: Solving Quadratic Equations"
- "Science: Photosynthesis Process"
- "English: Grammar Rules Review"
- "History: Ancient Egypt Pyramids"
- "Physics: Newton's Laws Explained"

Generate only the title, nothing else. No quotes, no extra text.`;
  }

  // Fallback title generation if AI fails
  generateFallbackTitle(message, grade, subject) {
    let prefix = '';
    
    if (subject) {
      // Create subject prefix
      const subjectPrefix = subject.split(' ')[0]; // Take first word
      prefix = `${subjectPrefix}: `;
    }
    
    // Create simple title from message
    let title = message.trim();
    
    // Limit length and add ellipsis if needed
    if (title.length > 40) {
      title = title.substring(0, 40) + '...';
    }
    
    // Capitalize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1);
    
    return prefix + title;
  }

  // Custom title prompt handler
  async generateTitleWithCustomPrompt(message, customPrompt, grade, subject) {
    try {
      console.log('🎯 Title Agent: Using custom prompt for title generation...');
      
      const messages = [
        {
          role: 'system',
          content: customPrompt
        },
        {
          role: 'user',
          content: `Generate a title for this message: "${message}"`
        }
      ];

      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: messages,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      });

      const generatedTitle = completion.choices[0].message.content.trim();
      const cleanTitle = generatedTitle.replace(/^["']|["']$/g, '');
      
      console.log(`✅ Title Agent: Generated custom title: "${cleanTitle}"`);
      
      return {
        success: true,
        title: cleanTitle,
        originalMessage: message,
        usedCustomPrompt: true
      };

    } catch (error) {
      console.error('❌ Title Agent Custom Prompt Error:', error.message);
      
      // Fall back to default title generation
      return await this.generateTitle(message, grade, subject);
    }
  }
}

module.exports = new TitleAgent();
