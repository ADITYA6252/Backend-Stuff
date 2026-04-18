import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import History from "./models/History.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Groq setup
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ================= AUTH =================

// 🔐 SIGNUP (DB)
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashed,
    });

    res.json({ message: "Signup successful ✅" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔑 LOGIN (DB)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign({ email }, "secret123", {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

// 🔒 AUTH MIDDLEWARE
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Login required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ================= AI ROUTE =================

app.post("/generate", verifyToken, async (req, res) => {
  const { name, tone, category } = req.body;

  console.log("🔥 /generate by:", req.user.email);

  try {
    const prompt = `
You are an e-commerce copywriter.

STRICT RULES:
- Input is ALWAYS a PRODUCT (not a company)

Product Name: ${name}
Category: ${category || "general"}
Tone: ${tone}

Format:

Description: 2-3 lines
Caption: short line
Hashtags: 5 tags
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    const output = completion.choices[0]?.message?.content || "";

    // 🔥 PARSE OUTPUT
    let description = "";
    let caption = "";
    let hashtags = "";

    try {
      if (output.includes("Description:")) {
        const descPart = output.split("Description:")[1];

        if (descPart.includes("Caption:")) {
          description = descPart.split("Caption:")[0].trim();
          const capPart = descPart.split("Caption:")[1];

          if (capPart.includes("Hashtags:")) {
            caption = capPart.split("Hashtags:")[0].trim();
            hashtags = capPart.split("Hashtags:")[1].trim();
          } else {
            caption = capPart.trim();
          }
        }
      }
    } catch (e) {
      console.log("Parsing error");
    }

    // 🔥 SAVE TO DB
    await History.create({
      email: req.user.email,
      description,
      caption,
      hashtags,
    });

    res.json({
      result: `
Description: ${description}
Caption: ${caption}
Hashtags: ${hashtags}
      `,
    });

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

// ================= HISTORY =================

app.get("/history", verifyToken, async (req, res) => {
  try {
    const data = await History.find({ email: req.user.email })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.delete("/history/:id", verifyToken, async (req, res) => {
  try {
    await History.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted ✅" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

app.delete("/history", verifyToken, async (req, res) => {
  try {
    await History.deleteMany({ email: req.user.email });
    res.json({ message: "All history deleted ✅" });
  } catch {
    res.status(500).json({ error: "Clear all failed" });
  }
});
// ================= SERVER =================

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});