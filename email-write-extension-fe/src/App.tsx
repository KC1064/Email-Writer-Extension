import axios from 'axios';
import React, { useState } from 'react';

const tones = ['Professional', 'Friendly', 'Casual', 'Urgent', 'Formal'];

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState<string>('Professional');
  const [emailContent, setEmailContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a topic or prompt for your email.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setEmailContent("");

    try {
      const response = await axios.post("http://localhost:8080/api/mail/generate", {
        emailContent: prompt,          // send prompt
        tone: selectedTone       // send tone
      });

      // Adjust this depending on how your backend returns data
      setEmailContent(response.data.generatedEmail || response.data);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to generate email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center font-sans relative overflow-hidden p-4">
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: `
          radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
          radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
          radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
        `,
        }}
      />

      <div className="relative z-10 w-full max-w-4xl p-8 bg-[#1a1a1a] rounded-3xl shadow-2xl backdrop-blur-sm border border-gray-800 transition-all duration-300">
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
          Email Generator
        </h1>

        {/* Input Area */}
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-gray-400 mb-2 text-sm font-medium">
            Describe the email you want to write:
          </label>
          <textarea
            id="prompt"
            className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-300"
            placeholder="e.g., An email to my team about the upcoming project deadline."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {/* Tone Options */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tones.map((tone) => (
            <button
              key={tone}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
              ${selectedTone === tone
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              onClick={() => setSelectedTone(tone)}
            >
              {tone}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full h-12 mb-6 rounded-xl font-bold text-lg transition-all duration-300
          bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg
          hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500
          disabled:from-gray-600 disabled:to-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Email'}
        </button>

        {/* Output Area */}
        {emailContent && (
          <div className="bg-gray-900 p-6 rounded-xl shadow-inner border border-gray-700 relative">
            <h2 className="text-lg font-bold mb-4 text-gray-300">Generated Email</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-200 leading-relaxed font-mono">
              {emailContent}
            </pre>
            <button
              className="absolute top-4 right-4 px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-200"
            >
              Copy
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 text-sm text-red-400 bg-red-900 bg-opacity-30 rounded-lg border border-red-800">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
