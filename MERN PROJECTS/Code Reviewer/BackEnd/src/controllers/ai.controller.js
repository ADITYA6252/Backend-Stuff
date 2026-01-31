const generateContent = require("../services/ai.service");

module.exports.getResponse = async (req, res) => {
  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await generateContent(prompt);
    res.send(response);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
