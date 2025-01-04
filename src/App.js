import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OpenAI from "openai";
import { ResComp } from './resComp';

// Styled components for layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
`;

const Card = styled.div`
  background-color: white;
  height: 90vh;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 40vw;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 18px;
  outline: none;
  min-height: 50px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

const ReadOnlyTextArea = styled.textarea`
  background-color: #f7f7f7;
  color: #555;
  cursor: not-allowed;
  font-style: italic;
  min-height: 40vh;
  word-wrap: break-word; /* Ensure long words break */
  white-space: normal;   /* Allow text to wrap */
  width: 100%;           /* Ensure it takes full width */
  border: none;         /* Optionally remove the border for a cleaner look */
  resize: none;         /* Optionally disable resizing the textarea */
`;


const apiKey1 = 'your key'

const Button = styled.button`
  padding: 15px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  cursor: pointer;
  border: none;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

let allMessages = [
  { role: 'system', content: 'You are a helpful assistant.' },
]
const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle API call to OpenAI
  const sendToAPI = async () => {
    if (!inputValue.trim()) return;

    setLoading(true);

    const url = 'https://api.openai.com/v1/chat/completions';

    try {
      console.log(allMessages)
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey1}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // or use 'gpt-4' if you have access
          messages: [...allMessages
            ,
            { role: 'user', content: `${inputValue}` },
          ],
        }),
      });

      const data = await res.json();
      setResponse(data.choices[0].message.content); // Set response from OpenAI
      allMessages = [...allMessages, 
        { role: 'user', content: `${inputValue}` },
        {role: "assistant", content: data.choices[0].message.content},
      ]
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      console.log(error)
      setResponse('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };


  const ReturnComp = () => {
    const [bgColor, setBgColor] = useState('#ff0000'); // Initial background color

    // Change background color every 2 seconds
    useEffect(() => {
      const intervalId = setInterval(() => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff'];
        setBgColor(colors[Math.floor(Math.random() * colors.length)]);
      }, 2000);

      return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, []);

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: bgColor,
          backgroundSize: 'cover',
          animation: 'sparkleAnimation 1.5s infinite alternate',
        }}
      >
        <div
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            animation: 'wave 2s ease-in-out infinite',
          }}
        >
          hello baby
        </div>

        {/* CSS Animation directly injected for the background and text */}
        <style>
          {`
            @keyframes sparkleAnimation {
              0% {
                opacity: 0.8;
              }
              100% {
                opacity: 1;
              }
            }
  
            @keyframes wave {
              0% {
                transform: translateY(0);
              }
              25% {
                transform: translateY(-10px);
              }
              50% {
                transform: translateY(0);
              }
              75% {
                transform: translateY(10px);
              }
              100% {
                transform: translateY(0);
              }
            }
          `}
        </style>
      </div>
    );
  };

  return (
    <Container>
      <Card>
        <Title>ChatGPT Input</Title>

        {/* Read-only input */}
        <InputWrapper>
          <label>Answer:</label>
          <ReadOnlyTextArea
            type="text"
            value={response}
            placeholder="Answer..."
          />
        </InputWrapper>

        {/* Editable input */}
        <InputWrapper>
          <label>Ask me anything:</label>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask something..."
          />
        </InputWrapper>

        {/* Send button */}
        <Button onClick={sendToAPI} disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </Button>
      </Card>
    </Container>
  );
};

export default App;
