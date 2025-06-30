// import { useState } from "react";
// import { logMemory } from "../api/client.js";

// export default function MemoryLogger() {
//   const [text, setText] = useState("");
//   const [resp, setResp] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSave = async () => {
//     if (!text.trim()) return;
//     setLoading(true);
//     setResp(null);
//     try {
//       const data = await logMemory(text);
//       setResp(data);
//       setText("");
//     } catch {
//       setResp({ error: "Unable to save memory." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">
//         Log a Memory
//       </h2>

//       <textarea
//         rows={4}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="What do you want to remember?"
//         disabled={loading}
//       />

//       <div className="flex justify-center">
//         <button
//           onClick={handleSave}
//           disabled={loading}
//           className={`px-4 py-2 rounded-md text-white font-medium transition ${
//             loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Saving..." : "Save Memory"}
//         </button>
//       </div>

//       {resp && (
//         <div
//           className={`mt-4 p-3 text-center rounded-md ${
//             resp.error
//               ? "bg-red-100 text-red-700"
//               : "bg-green-100 text-green-700"
//           }`}
//         >
//           {resp.error
//             ? resp.error
//             : `✅ Memory saved: “${resp.text}”`}
//         </div>
//       )}
//     </div>
//   );
// }


// src/components/MemoryLogger.jsx
import React, { useState } from 'react';
import { logMemory } from '../api/client';
import './MemoryLogger.css';

export default function MemoryLogger() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await logMemory(text);
      setStatus({ ok: true, message: `Memory saved: “${data.text}”` });
      setText('');
    } catch (err) {
      setStatus({ ok: false, message: err.message });
    }
  };

  return (
    <section className="memory-logger">
      <h2>Log a Memory</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          placeholder="What do you want to save?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Save Memory</button>
      </form>
      {status && (
        <p className={`status ${status.ok ? 'ok' : 'error'}`}>
          {status.ok ? '✅' : '❌'} {status.message}
        </p>
      )}
    </section>
  );
}
