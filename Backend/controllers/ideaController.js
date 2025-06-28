import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateIdeas = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      tags, 
      category, 
      targetAudience, 
      techPreference, 
      budgetLevel, 
      duration,
      includeAI,
      hardwareBased,
      researchOriented,
      surprise
    } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    You are an expert product strategist and innovation consultant.
    Generate 2 detailed and creative project/startup ideas based on:
    
    Title: ${title || "Not provided"}
    Description: ${description}
    Tags: ${tags?.join(', ') || "None"}
    Category: ${category || "Not specified"}
    Target Audience: ${targetAudience || "Not specified"}
    Tech Preference: ${techPreference || "None"}
    Budget Level: ${budgetLevel || "Not specified"}
    Duration: ${duration || "Not specified"}
    
    Special Requirements:
    ${includeAI ? "- Must include AI/ML" : ""}
    ${hardwareBased ? "- Hardware-based solution" : ""}
    ${researchOriented ? "- Research-oriented approach" : ""}
    ${surprise ? "- Surprise me with opposite domain idea" : ""}
    
    For EACH idea, provide structured markdown with:
    1. **Title** 
    2. **Pitch** (one-line description)
    3. **Key Features** (3-5 bullet points)
    4. **Why It's Good** (market need/innovation)
    5. **Tech Stack**
    6. **Monetization/Use-case**
    7. **Bonus Tips** (if applicable)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ ideas: text });
  } catch (error) {
    console.error("Error generating ideas:", error);
    res.status(500).json({ 
      message: "Failed to generate ideas",
      error: error.message 
    });
  }
};