import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [atsScore, setAtsScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState("");

  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData
      );

      setResumeText(res.data.text);
      setSkills(res.data.skills);
      setMissingSkills(res.data.missingSkills);
      setSummary(res.data.summary);
      setAtsScore(res.data.atsScore);
      setSuggestions(res.data.suggestions);
      setAiAnalysis(res.data.aiAnalysis || "No AI analysis available");
    } catch (error) {
      console.error(error);
      alert("Analysis Failed");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/resume/history"
      );

      setHistory(res.data);
      setShowHistory(true);
    } catch (error) {
      console.error(error);
      alert("Failed to load history");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-8">
          AI Resume Builder & Analyzer
        </h1>

        <div className="flex flex-col items-center gap-4 mb-8">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
            className="border p-2 rounded"
          />

          <div className="flex gap-4">
            <button
              onClick={uploadResume}
              className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Analyze Resume
            </button>

            <button
              onClick={fetchHistory}
              className="bg-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              View History
            </button>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-3">
              ATS Score
            </h2>

            <div className="text-5xl font-bold text-green-400">
              {atsScore}
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg md:col-span-2">
            <h2 className="text-xl font-bold mb-3">
              Professional Summary
            </h2>

            <p>{summary}</p>
          </div>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">
            AI Analysis
          </h2>

          <div className="whitespace-pre-wrap text-gray-200">
            {aiAnalysis}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Detected Skills
            </h2>

            <ul className="space-y-2">
              {skills.map((skill, index) => (
                <li key={index}>✅ {skill}</li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Missing Skills
            </h2>

            <ul className="space-y-2">
              {missingSkills.map((skill, index) => (
                <li key={index}>❌ {skill}</li>
              ))}
            </ul>
          </div>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">
            Suggestions
          </h2>

          <ul className="space-y-2">
            {suggestions.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        {showHistory && (
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-8">

            <h2 className="text-2xl font-bold mb-6">
              Resume Analysis History
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {history.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-900 p-4 rounded-lg border border-slate-700"
                >
                  <h3 className="font-bold text-green-400 mb-2">
                    ATS Score: {item.atsScore}
                  </h3>

                  <p className="mb-2">
                    {item.summary}
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}

            </div>

          </div>
        )}

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            Extracted Resume Text
          </h2>

          <textarea
            value={resumeText}
            readOnly
            className="w-full h-96 bg-slate-900 p-4 rounded"
          />
        </div>

      </div>
    </div>
  );
}

export default App;