import React, { useEffect, useState } from 'react';

const ComplianceBot = () => {
  const [files, setFiles] = useState(null);

  // Load Dialogflow Messenger script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const uploadFiles = async () => {
    if (!files || files.length === 0) {
      alert('Please select at least one PDF file.');
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed.');
        return;
      }
      formData.append('pdffiles[]', file);
    }

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Files uploaded successfully!');
    } else {
      alert('Error uploading files.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-500 to-green-500 text-white p-10">
      <h1 className="text-4xl font-bold text-orange-500 shadow-lg">
        Welcome to DFCC Compliance Bot
      </h1>
      <p className="text-2xl text-yellow-300 shadow-md mt-4">
        Interact with the bot in the bottom-right corner.
      </p>

      <div className="upload-container mt-8 p-8 bg-white bg-opacity-30 rounded-lg">
        <h2 className="text-2xl font-semibold">Upload PDF Documents</h2>
        <input
          type="file"
          id="fileInput"
          accept=".pdf"
          multiple
          className="block mt-4 p-2 rounded bg-yellow-300 text-black"
          onChange={handleFileChange}
        />
        <button
          onClick={uploadFiles}
          className="mt-4 py-2 px-4 bg-orange-500 text-white rounded hover:bg-yellow-300 hover:text-black"
        >
          Upload PDFs
        </button>
      </div>

      {/* Chatbot Integration */}
      <div>
        <df-messenger
          intent="WELCOME"
          chat-title="DFCC Compliance Bot101"
          agent-id="e593549a-ca6e-4b0b-b2b9-b09c0bd7430f"
          language-code="en"
          project-id="tokyo-analyst-431809-n3"
        />
        
      </div>
    </div>
  );
};

export default ComplianceBot;
