
import { useState } from "react";
import axios from "axios";

import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import ATSCard from "./components/ATSCard";
import SkillsCard from "./components/SkillsCard";
import AnalysisCard from "./components/AnalysisCard";
import HistoryCard from "./components/HistoryCard";

interface HistoryItem {
  _id: string;
  atsScore: number;
  summary: string;
  createdAt: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);

  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [atsScore, setAtsScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState("");

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "https://ai-resume-builder-hmxo.onrender.com/api/resume/upload",
        formData
      );

      setResumeText(res.data.text || "");
      setSkills(res.data.skills || []);
      setMissingSkills(res.data.missingSkills || []);
      setSummary(res.data.summary || "");
      setAtsScore(res.data.atsScore || 0);
      setSuggestions(res.data.suggestions || []);
      setAiAnalysis(res.data.aiAnalysis || "");
    } catch (error) {
      console.error(error);
      alert("Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "https://ai-resume-builder-hmxo.onrender.com/api/resume/history"
      );

      setHistory(res.data || []);
      setShowHistory(true);
    } catch (error) {
      console.error(error);
      alert("Failed to load history");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <div className="w-full max-w-[1700px] mx-auto px-10 lg:px-16 py-8">

        <Hero />

        <div className="max-w-6xl mx-auto mb-10">
          <UploadCard
            onFileChange={setFile}
            onAnalyze={uploadResume}
            onHistory={fetchHistory}
            loading={loading}
            selectedFileName={file?.name}
          />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-10">

          <ATSCard score={atsScore} />

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 hover:shadow-cyan-500/20 transition-all duration-300">
            <h3 className="text-slate-400 mb-2">
              Detected Skills
            </h3>

            <div className="text-6xl font-black text-cyan-400">
              {skills.length}
            </div>

            <p className="text-slate-500 mt-3">
              Skills Found
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-105 hover:shadow-red-500/20 transition-all duration-300">
            <h3 className="text-slate-400 mb-2">
              Missing Skills
            </h3>

            <div className="text-6xl font-black text-red-400">
              {missingSkills.length}
            </div>

            <p className="text-slate-500 mt-3">
              Skills To Improve
            </p>
          </div>

        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10 shadow-xl max-w-6xl mx-auto">

          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            Professional Summary
          </h2>

          <p className="text-slate-300 leading-relaxed text-lg">
            {summary}
          </p>

        </div>

        <AnalysisCard aiAnalysis={aiAnalysis} />

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <SkillsCard
            title="Detected Skills"
            skills={skills}
            positive={true}
          />

          <SkillsCard
            title="Missing Skills"
            skills={missingSkills}
            positive={false}
          />

        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10 shadow-xl">

          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            💡 AI Suggestions
          </h2>

          <div className="grid gap-4">

            {suggestions.map((item, index) => (
              <div
                key={index}
                className="
                  bg-slate-900/70
                  border
                  border-slate-700
                  rounded-2xl
                  p-5
                  hover:border-yellow-500
                  hover:translate-x-2
                  transition-all
                "
              >
                {item}
              </div>
            ))}

          </div>

        </div>

        {showHistory && (
          <HistoryCard history={history} />
        )}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            Extracted Resume Text
          </h2>

          <div
            className="
              h-96
              overflow-y-auto
              bg-slate-900
              border
              border-slate-700
              rounded-xl
              p-4
              text-slate-300
              whitespace-pre-wrap
            "
          >
            {resumeText || "Upload a resume to view extracted text"}
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
