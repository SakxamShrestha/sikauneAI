const openai = require('../config/openai');

class ChatAgent {
  constructor() {
    this.model = 'gpt-3.5-turbo';
    this.maxTokens = 1000;
    this.temperature = 0.7;
  }

  // Generate chat response with context
  async generateResponse(message, context, grade, subject) {
    try {
      console.log('🤖 Chat Agent: Generating response...');
      
      // Build the system message with personality and context
      const systemMessage = this.buildSystemMessage(grade, subject, context);
      
      const messages = [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message }
      ];

      // Generate response using OpenAI
      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: messages,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      });

      const response = completion.choices[0].message.content;
      
      console.log('✅ Chat Agent: Response generated successfully');
      
      return {
        success: true,
        response: response,
        model: this.model
      };

    } catch (error) {
      console.error('❌ Chat Agent Error:', error.message);
      
      return {
        success: false,
        response: 'I apologize, but I encountered an error while processing your request. Please try again.',
        error: error.message
      };
    }
  }

  // Build comprehensive system message
  buildSystemMessage(grade, subject, context) {
    let systemMessage = `You are MeroGuru, a friendly and encouraging AI tutor for ${grade || 'students'}. `;
    
    if (subject) {
      systemMessage += `You specialize in ${subject}. `;
    }
    
    systemMessage += `
    
PERSONALITY & BEHAVIOR RULES:
- You are enthusiastic, patient, and encouraging
- Always start with a warm greeting when starting a new conversation
- Use simple, clear language appropriate for the student's grade level
- Give step-by-step explanations when possible
- Use examples and analogies to make concepts easier to understand
- Celebrate small victories and progress
- If a student is struggling, offer encouragement and break down the problem
- Ask follow-up questions to check understanding
- Use emojis occasionally to keep the conversation friendly
- Never give up on a student - always find a way to help

TEACHING STYLE:
- Start with the basics and build up to more complex concepts
- Use real-world examples when possible
- Encourage questions and curiosity
- Provide practice problems or exercises when appropriate
- Give constructive feedback that builds confidence

RESPONSE FORMAT:
- Keep responses concise but thorough
- Use bullet points or numbered lists for complex explanations
- End with a question or suggestion to keep the conversation going
- Always be positive and supportive

GRADE-APPROPRIATE CONTENT:
- Adjust complexity based on grade level
- Use age-appropriate examples and language
- Build foundational knowledge progressively`;

    // Add context if available
    if (context && context.length > 0) {
      systemMessage += `

KNOWLEDGE BASE CONTEXT:
Use the following information to answer the student's question accurately:
${context.map(item => 
  `Question: ${item.question}\nAnswer: ${item.answer_markdown || item.content_markdown}`
).join('\n\n')}

Base your response on this context. If the context doesn't contain enough information, say so politely and provide general guidance while encouraging the student to ask more specific questions.`;
    } else {
      systemMessage += `

KNOWLEDGE BASE:
No specific context found for this question. Provide helpful general guidance and encourage the student to ask more specific questions.`;
    }

    return systemMessage;
  }

  // Generate follow-up questions
  async generateFollowUpQuestions(topic, grade, subject) {
    try {
      const followUpPrompt = `Generate 2-3 follow-up questions about "${topic}" for a ${grade} student studying ${subject}. Make them engaging and encourage deeper thinking.`;

      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a helpful teacher generating follow-up questions.' },
          { role: 'user', content: followUpPrompt }
        ],
        max_tokens: 150,
        temperature: 0.8,
      });

      return completion.choices[0].message.content;

    } catch (error) {
      console.error('❌ Follow-up questions generation failed:', error.message);
      return null;
    }
  }

  // Generate practice problems
  async generatePracticeProblem(topic, grade, subject, difficulty = 'medium') {
    try {
      const practicePrompt = `Generate a ${difficulty} difficulty practice problem about "${topic}" for a ${grade} student studying ${subject}. Include the problem statement and solution steps.`;

      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a helpful teacher generating practice problems.' },
          { role: 'user', content: practicePrompt }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      return completion.choices[0].message.content;

    } catch (error) {
      console.error('❌ Practice problem generation failed:', error.message);
      return null;
    }
  }
}

module.exports = new ChatAgent();
