require('dotenv').config();
const { supabase } = require('./config/supabase');

const sampleContent = [
  {
    title: "Basic Math: Addition",
    question: "What is 2 + 2?",
    answer_markdown: "**2 + 2 equals 4.**\n\nThis is a fundamental addition fact in mathematics. When you combine two groups of two objects, you get four objects total.",
    subject: "Mathematics",
    grade_level: "Elementary",
    difficulty: "Beginner",
    category: "Arithmetic",
    tags: ["addition", "basic math", "elementary"],
    priority: 1
  },
  {
    title: "Basic Math: Subtraction",
    question: "What is 5 - 3?",
    answer_markdown: "**5 - 3 equals 2.**\n\nSubtraction means taking away. If you have 5 apples and eat 3, you have 2 apples left.",
    subject: "Mathematics",
    grade_level: "Elementary",
    difficulty: "Beginner",
    category: "Arithmetic",
    tags: ["subtraction", "basic math", "elementary"],
    priority: 1
  },
  {
    title: "Science: Photosynthesis",
    question: "What is photosynthesis?",
    answer_markdown: "**Photosynthesis** is the process by which plants make their own food.\n\nPlants use:\n- Sunlight\n- Carbon dioxide (CO₂)\n- Water (H₂O)\n\nTo produce:\n- Glucose (sugar)\n- Oxygen (O₂)\n\nThis process is essential for life on Earth!",
    subject: "Science",
    grade_level: "Middle School",
    difficulty: "Intermediate",
    category: "Biology",
    tags: ["photosynthesis", "plants", "biology", "science"],
    priority: 2
  },
  {
    title: "English: Parts of Speech",
    question: "What are the main parts of speech?",
    answer_markdown: "The **8 main parts of speech** in English are:\n\n1. **Nouns** - people, places, things, ideas\n2. **Pronouns** - he, she, it, they\n3. **Verbs** - actions or states of being\n4. **Adjectives** - describe nouns\n5. **Adverbs** - describe verbs, adjectives, or other adverbs\n6. **Prepositions** - in, on, at, under\n7. **Conjunctions** - and, but, or, because\n8. **Interjections** - wow, oh, hey",
    subject: "English",
    grade_level: "Middle School",
    difficulty: "Intermediate",
    category: "Grammar",
    tags: ["grammar", "parts of speech", "english", "language"],
    priority: 2
  },
  {
    title: "History: Ancient Egypt",
    question: "Who built the pyramids?",
    answer_markdown: "The **ancient Egyptians** built the pyramids around 4,500 years ago.\n\n**Key facts:**\n- Built as tombs for pharaohs\n- Most famous: Great Pyramid of Giza\n- Built by skilled workers, not slaves\n- Used advanced mathematics and engineering\n- Still standing today as one of the Seven Wonders of the Ancient World",
    subject: "History",
    grade_level: "Middle School",
    difficulty: "Intermediate",
    category: "Ancient Civilizations",
    tags: ["ancient egypt", "pyramids", "history", "pharaohs"],
    priority: 3
  }
];

const addSampleContent = async () => {
  try {
    console.log('🚀 Adding sample content to Supabase...');
    
    for (const content of sampleContent) {
      const { data, error } = await supabase
        .from('knowledge_base')
        .insert([content])
        .select();
      
      if (error) {
        console.error(`❌ Error adding "${content.title}":`, error.message);
      } else {
        console.log(`✅ Added: "${content.title}"`);
      }
    }
    
    console.log('🎉 Sample content added successfully!');
    console.log('📚 Your knowledge base now has sample Q&A content!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

// Run the script
addSampleContent();
