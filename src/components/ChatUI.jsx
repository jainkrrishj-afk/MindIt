import React, { useState } from 'react';

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage.text })
      });
      const data = await response.json();

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: data.response || 'I am having trouble connecting right now.', 
        sender: 'bot' 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  return (
    <div className="component-box" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h2>Support Chat</h2>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            style={{ 
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '5px 0',
              color: msg.sender === 'user' ? '#1565c0' : '#333'
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  );
}