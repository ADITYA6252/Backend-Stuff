const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let model;
try {
  model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });
} catch {
  model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });
}

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;
