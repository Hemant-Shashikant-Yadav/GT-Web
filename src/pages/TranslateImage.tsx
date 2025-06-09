import React from "react";

function TranslateImage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="http://localhost:8000"
        className="w-full h-full border-0"
        title="Sign Language Translator"
      />
    </div>
  );
}

export default TranslateImage;
