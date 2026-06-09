const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const analyzeResumeWithAI = require("../services/aiService");
const Resume = require("../models/Resume");

const router = express.Router();

const upload = multer({
  dest: "uploads/"
});

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    // AI Analysis
    let aiAnalysis = "AI analysis unavailable";

    try {
      aiAnalysis = await analyzeResumeWithAI(resumeText);
    } catch (err) {
      console.log("AI ERROR:", err.message);
    }

    const skills = [
      "Java",
      "Python",
      "JavaScript",
      "React",
      "Spring Boot",
      "MongoDB",
      "MySQL",
      "Node.js",
      "Express",
      "Django",
      "Laravel",
      "Git",
      "HTML",
      "CSS",
      "Docker",
      "AWS",
      "Kubernetes",
      "REST API",
      "TypeScript"
    ];

    const detectedSkills = skills.filter((skill) =>
      resumeText.toLowerCase().includes(skill.toLowerCase())
    );

    const missingSkills = skills.filter(
      (skill) => !detectedSkills.includes(skill)
    );

    let atsScore = 50;

    atsScore += detectedSkills.length * 3;

    if (resumeText.includes("Project")) atsScore += 5;
    if (resumeText.includes("Experience")) atsScore += 5;
    if (resumeText.includes("GitHub")) atsScore += 5;
    if (resumeText.includes("LinkedIn")) atsScore += 5;

    if (atsScore > 100) atsScore = 100;

    const suggestions = [];

    if (!resumeText.includes("GitHub")) {
      suggestions.push("Add GitHub profile link");
    }

    if (!resumeText.includes("LinkedIn")) {
      suggestions.push("Add LinkedIn profile link");
    }

    if (missingSkills.includes("Docker")) {
      suggestions.push("Add Docker skills if applicable");
    }

    if (missingSkills.includes("AWS")) {
      suggestions.push("Add Cloud/AWS experience");
    }

    if (missingSkills.includes("TypeScript")) {
      suggestions.push("Learn and mention TypeScript");
    }

    const summary =
      "Software Developer with experience in Java, Python, Web Development, APIs and Full Stack technologies.";

    // SAVE TO MONGODB
    const savedResume = await Resume.create({
      atsScore,
      summary,
      skills: detectedSkills,
      missingSkills: missingSkills.slice(0, 8),
      suggestions,
      resumeText
    });

    res.json({
      success: true,
      atsScore,
      summary,
      skills: detectedSkills,
      missingSkills: missingSkills.slice(0, 8),
      suggestions,
      aiAnalysis,
      text: resumeText,
      resumeId: savedResume._id
    });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET HISTORY
router.get("/history", async (req, res) => {
  try {
    const history = await Resume.find()
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;