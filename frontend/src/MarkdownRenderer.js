import React from 'react';

// Simple markdown renderer for basic formatting
const MarkdownRenderer = ({ content }) => {
  if (!content) return null;

  // Convert markdown to HTML-like JSX
  const renderMarkdown = (text) => {
    // Headers
    text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Code blocks
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Lists
    text = text.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    text = text.replace(/^- (.*$)/gim, '<li>$1</li>');
    
    // Wrap lists in ul/ol
    text = text.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    
    // Line breaks
    text = text.replace(/\n/g, '<br />');
    
    return text;
  };

  const processedContent = renderMarkdown(content);

  return (
    <div 
      className="markdown-content prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default MarkdownRenderer;
