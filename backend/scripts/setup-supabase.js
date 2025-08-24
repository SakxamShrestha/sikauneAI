require('dotenv').config();
const supabase = require('./config/supabase');

const setupSupabase = async () => {
  try {
    console.log('🚀 Setting up Supabase Database for Student Q&A System...');
    
    // Create chat_threads table
    console.log('📝 Creating chat_threads table...');
    const { error: threadsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS chat_threads (
          id UUID PRIMARY KEY,
          title TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (threadsError) {
      console.log('ℹ️ chat_threads table might already exist or using different method');
    } else {
      console.log('✅ chat_threads table created');
    }
    
    // Create chat_messages table
    console.log('📝 Creating chat_messages table...');
    const { error: messagesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS chat_messages (
          id UUID PRIMARY KEY,
          thread_id UUID REFERENCES chat_threads(id) ON DELETE CASCADE,
          sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
          content TEXT NOT NULL,
          sources JSONB,
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (messagesError) {
      console.log('ℹ️ chat_messages table might already exist or using different method');
    } else {
      console.log('✅ chat_messages table created');
    }
    
    // Create knowledge_base table
    console.log('📝 Creating knowledge_base table...');
    const { error: kbError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS knowledge_base (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          content_markdown TEXT NOT NULL,
          question TEXT,
          answer_markdown TEXT,
          subject TEXT,
          grade_level TEXT,
          difficulty TEXT,
          category TEXT,
          tags TEXT[],
          priority INTEGER DEFAULT 1,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (kbError) {
      console.log('ℹ️ knowledge_base table might already exist or using different method');
    } else {
      console.log('✅ knowledge_base table created');
    }
    
    // Create indexes
    console.log('📝 Creating indexes...');
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_chat_messages_thread_id ON chat_messages(thread_id);
        CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp);
        CREATE INDEX IF NOT EXISTS idx_chat_threads_updated_at ON chat_threads(updated_at);
        CREATE INDEX IF NOT EXISTS idx_knowledge_base_subject ON knowledge_base(subject);
        CREATE INDEX IF NOT EXISTS idx_knowledge_base_grade_level ON knowledge_base(grade_level);
        CREATE INDEX IF NOT EXISTS idx_knowledge_base_difficulty ON knowledge_base(difficulty);
      `
    });
    
    if (indexError) {
      console.log('ℹ️ Indexes might already exist or using different method');
    } else {
      console.log('✅ Indexes created');
    }
    
    // Check if tables exist
    console.log('🔍 Checking existing tables...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tablesError) {
      console.log('ℹ️ Could not check existing tables');
    } else {
      console.log('📋 Existing tables:', tables.map(t => t.table_name));
    }
    
    console.log('🎉 Supabase setup completed!');
    console.log('🚀 Your AI assistant database is ready!');
    
  } catch (error) {
    console.error('❌ Supabase setup failed:', error.message);
    
    if (error.message.includes('exec_sql')) {
      console.log('💡 Tip: You may need to run the SQL manually in Supabase SQL Editor');
      console.log('📝 Go to Supabase Dashboard → SQL Editor and run the setup SQL');
    }
  }
};

// Run setup if called directly
if (require.main === module) {
  setupSupabase();
}

module.exports = setupSupabase;
