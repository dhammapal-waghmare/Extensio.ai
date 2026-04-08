import {
  buildFallbackFiles,
  generateFilesFromGemini,
} from "../services/geminiService.js";
import { createZip } from "../services/zipService.js";
import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const ALLOWED_FILES = new Set([
  "manifest.json",
  "content.js",
  "popup.html",
  "popup.js",
  "background.js",
  "styles.css",
]);

export const generateExtension = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ msg: "Prompt is required" });
    }

    let files;

    try {
      files = await generateFilesFromGemini(prompt);
    } catch (_error) {
      files = buildFallbackFiles(prompt);
    }

    const id = uuidv4();
    const folderPath = path.join("temp", id);

    await fs.ensureDir(folderPath);

    const fallbackFiles = buildFallbackFiles(prompt);
    const finalFiles = { ...fallbackFiles };

    for (const file in files) {
      if (!ALLOWED_FILES.has(file)) {
        continue;
      }

      if (typeof files[file] === "string" && files[file].trim()) {
        finalFiles[file] = files[file];
      }
    }

    for (const file of Object.keys(finalFiles)) {
      await fs.writeFile(path.join(folderPath, file), finalFiles[file]);
    }

    await createZip(folderPath, id);

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    res.json({
      success: true,
      files: finalFiles,
      downloadUrl: `${baseUrl}/download/${id}.zip`,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};