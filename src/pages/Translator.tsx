import React from 'react';

function Translator() {
  return (
    <div className="w-full h-screen">
      <iframe 
        src="http://localhost:8501" 
        className="w-full h-full border-0"
        title="Sign Language Translator"
      />
    </div>
  );
}

export default Translator;