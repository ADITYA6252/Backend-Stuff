const generateContent = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const {code} = req.body;

    if (!code) {
      return res.status(400).json({ error: "code is required" });
    }

    const response = await generateContent(code);
    res.send(response);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
