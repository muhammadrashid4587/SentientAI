// import { useState } from "react";
// import { recallMemory } from "../api/client.js";

// export default function MemoryRecaller() {
//   const [prompt, setPrompt] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleRecall = async () => {
//     if (!prompt.trim()) return;
//     setLoading(true);
//     setError("");
//     setResults([]);

//     try {
//       const data = await recallMemory(prompt);
//       if (data.results) {
//         setResults(data.results);
//       } else {
//         setError("No memories found.");
//       }
//     } catch {
//       setError("Failed to fetch. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
//       <h2 className="text-xl font-semibold text-center mb-4">
//         Recall Memories
//       </h2>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Enter a keyword or phrase..."
//           disabled={loading}
//         />
//         <button
//           onClick={handleRecall}
//           disabled={loading}
//           className={`px-4 py-2 rounded-md text-white font-medium transition ${
//             loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Searching..." : "Recall"}
//         </button>
//       </div>

//       {error && (
//         <p className="text-center text-red-600 mb-4">{error}</p>
//       )}

//       {results.length > 0 && (
//         <ul className="space-y-3">
//           {results.map((item, idx) => (
//             <li
//               key={idx}
//               className="p-3 border border-gray-200 rounded-md bg-gray-50"
//             >
//               <p className="text-gray-800">{item.text}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Distance: {item.distance.toFixed(3)}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


// src/components/MemoryRecaller.jsx
import React, { useState } from 'react';
import { recallMemories } from '../api/client';
import './MemoryRecaller.css';

export default function MemoryRecaller() {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleRecall = async e => {
    e.preventDefault();
    try {
      const data = await recallMemories(prompt, 5);
      setResults(data.results || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResults(null);
    }
  };

  return (
    <section className="memory-recaller">
      <h2>Recall Memories</h2>
      <form onSubmit={handleRecall}>
        <input
          type="text"
          placeholder="Enter a keyword or phrase..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button type="submit">Recall</button>
      </form>
      {error && <p className="status error">❌ {error}</p>}
      {results && results.length === 0 && <p>No memories found.</p>}
      {results && results.length > 0 && (
        <ul className="results">
          {results.map((m, i) => (
            <li key={i}>
              {m.text} <span className="distance">({m.distance.toFixed(3)})</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
