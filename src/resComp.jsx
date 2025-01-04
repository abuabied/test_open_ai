import React, { useState, useEffect } from 'react';

// Exporting the component as requested
export const ResComp = ({text}) => {
  // State to handle background color (gradient)
  const [bgColor, setBgColor] = useState(getRandomColor());

  // State to handle wavy text position and other random styles
  const [waveOffsets, setWaveOffsets] = useState(getRandomOffsets());
  const [randomScales, setRandomScales] = useState(getRandomScales());
  const [randomRotations, setRandomRotations] = useState(getRandomRotations());

  // Function to generate a random color gradient
  function getRandomColor() {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = Math.floor(Math.random() * 360);
    return `linear-gradient(45deg, hsl(${hue1}, 100%, 50%), hsl(${hue2}, 100%, 50%))`;
  }

  // Function to generate random offsets for the wavy effect
  function getRandomOffsets() {
    return Array.from({ length: 10 }, () => Math.random() * 20 - 10); // Larger range for more wave
  }

  // Function to generate random scaling values for each letter
  function getRandomScales() {
    return Array.from({ length: 10 }, () => Math.random() * 1.5 + 0.5); // Random scale between 0.5 and 2
  }

  // Function to generate random rotations for each letter
  function getRandomRotations() {
    return Array.from({ length: 10 }, () => Math.random() * 360); // Random rotation between 0 and 360 degrees
  }

  // Change background gradient every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor(getRandomColor());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Change text wave offsets, scales, and rotations every 100 milliseconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffsets(getRandomOffsets());
      setRandomScales(getRandomScales());
      setRandomRotations(getRandomRotations());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        background: bgColor, // Use gradient as background
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'cursive',
        boxSizing: 'border-box',
        margin: 0,
      }}
    >
      {/* <div style="max-width: 100%; overflow-y: auto;"> */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Centering text
          flexWrap: 'wrap', // Allowing text to wrap if necessary
        maxWidth: '100%',
        overflowY: 'auto'
        }}
      >
        <h1
          style={{
            fontSize: '2vw', // Relative font size to container width
            color: 'white',
            position: 'relative',
            margin: 0,
            letterSpacing: '5px',
            textAlign: 'center',
            animation: 'pulse 1s infinite',
          }}
        >
          {Array.from(text ?? "nothing yet").map((letter, idx) => (
            <span
              key={idx}
              style={{
                position: 'relative',
                animation: `wave 1s infinite`,
                animationDelay: `${Math.random() * 2}s`, // Random delay for a more chaotic wave
                transform: `translateY(${waveOffsets[idx]}px) rotate(${randomRotations[idx]}deg) scale(${randomScales[idx]})`,
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

// Adding keyframes to handle the wavy effect smoothly
const styleSheet = document.styleSheets[0];

styleSheet.insertRule(`
  @keyframes wave {
    0% { transform: translateY(0) rotate(0) scale(1); }
    50% { transform: translateY(-20px) rotate(15deg) scale(1.5); }
    100% { transform: translateY(20px) rotate(-15deg) scale(0.8); }
  }
`, styleSheet.cssRules.length);
