"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-sky-400 mb-2">AI Code & Text Reviewer</h1>
      <p className="text-slate-400 mb-6">Paste your code or text to get instant AI suggestions & bug fixes.</p>

      <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-40 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-sky-500 font-mono text-sm"
        />

        <button
          onClick={handleReview}
          disabled={loading}
          className="w-full mt-4 py-3 bg-sky-400 hover:bg-sky-500 text-slate-900 font-semibold rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Review Code / Text"}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-sky-400 mb-2">AI Analysis & Suggestions:</h3>
            <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans">{result}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
