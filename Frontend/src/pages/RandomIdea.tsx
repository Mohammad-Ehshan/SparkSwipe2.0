import { useState } from 'react';
import axios from 'axios';
import IdeaForm from '@/components/IdeaGenerator/IdeaForm';
import IdeaCard from '@/components/IdeaGenerator/IdeaCard';

export default function RandomIdea() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (formData: any) => {
    setLoading(true);
    setError('');
    setIdeas([]);
    
    try {
      // Use environment variable for API URL
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log('API URL:', apiUrl);
      if (!apiUrl) {
  console.error("VITE_API_URL is not defined. Check your .env file.");
}
      
      const response = await axios.post(
        `${apiUrl}/api/ideas/generate`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000 
        }
      );
      
      // Split the response into individual ideas
      const ideaBlocks = response.data.ideas.split(/(?=\d+\.\s+\*\*)/g);
      setIdeas(ideaBlocks.filter((block: string) => block.trim()));
    } catch (err: any) {
      let errorMessage = 'Failed to generate ideas. ';
      
      if (err.response) {
       
        if (err.response.status === 404) {
          errorMessage += 'Endpoint not found. Please check:';
          errorMessage += '\n• Backend is running on port 5000';
          errorMessage += '\n• Route is mounted at /api/ideas/generate';
        } else {
          errorMessage += `Server error: ${err.response.status} - ${err.response.data?.message || 'No additional info'}`;
        }
      } else if (err.request) {
        // agr respon recv n hua to
        errorMessage += 'No response from server. Check:';
        errorMessage += '\n• Backend server is running (npm run dev)';
        errorMessage += '\n• No firewall blocking port 5000';
        errorMessage += '\n• Network connectivity';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out. Gemini API might be slow.';
      } else {
       
        errorMessage += `Error: ${err.message}`;
      }
      
      errorMessage += '\n\nTroubleshooting:';
      errorMessage += '\n1. Check backend console for errors';
      errorMessage += '\n2. Verify .env files in both frontend/backend';
      errorMessage += '\n3. Test with curl command (see instructions)';
      
      setError(errorMessage);
      console.error('Full error details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Smart Idea Generator</h1>
        <p className="text-gray-600">
          Fill out the form and let AI generate innovative project ideas
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <IdeaForm onSubmit={handleGenerate} />
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Generated Ideas</h2>
          
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-700 font-medium">Generating ideas...</p>
              <p className="text-gray-500 text-sm mt-2">
                This might take 10-30 seconds depending on Gemini API response
              </p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 whitespace-pre-wrap">{error}</p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium text-red-800">How to troubleshoot:</h3>
                <ol className="list-decimal list-inside text-red-700 text-sm mt-2 space-y-1">
                  <li>Check backend terminal for errors</li>
                  <li>Verify backend is running on port 5000</li>
                  <li>Test endpoint with curl command</li>
                  <li>Confirm Gemini API key is valid</li>
                </ol>
              </div>
            </div>
          )}
          
          {!loading && ideas.length > 0 && (
            <div className="space-y-6">
              {ideas.map((idea, index) => (
                <IdeaCard key={index} content={idea} />
              ))}
            </div>
          )}
          
          {!loading && ideas.length === 0 && !error && (
            <div className="text-center py-12 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="mt-4">Fill the form and click "Generate Ideas" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}