import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const REQUIRED_FILES = [
  "manifest.json",
  "content.js",
  "popup.html",
  "popup.js",
  "background.js",
  "styles.css",
];

const JS_FILES = ["content.js", "popup.js", "background.js"];

const COLOR_KEYWORDS = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "pink",
  "black",
  "white",
  "gray",
  "grey",
  "purple",
  "brown",
  "cyan",
  "magenta",
  "teal",
  "indigo",
  "violet",
  "gold",
  "silver",
];

const extractJsonObject = (text) => {
  const cleaned = String(text || "").replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model output does not contain a JSON object");
  }

  return cleaned.slice(start, end + 1);
};

const parsePromptColor = (prompt) => {
  const raw = String(prompt || "").toLowerCase();

  const hex = raw.match(/#(?:[0-9a-f]{3}|[0-9a-f]{6})\b/i);
  if (hex) {
    return hex[0];
  }

  for (const color of COLOR_KEYWORDS) {
    if (raw.includes(color)) {
      return color === "grey" ? "gray" : color;
    }
  }

  return "red";
};

const buildActionSpec = (prompt) => {
  const input = String(prompt || "").toLowerCase();
  const color = parsePromptColor(prompt);

  if (input.includes("background")) {
    return {
      command: "setBackgroundColor",
      color,
      buttonText: `Apply Background (${color})`,
      summary: `Change page background color to ${color}`,
    };
  }

  if (input.includes("dark mode") || input.includes("dark theme")) {
    return {
      command: "enableDarkMode",
      color,
      buttonText: "Enable Dark Mode",
      summary: "Apply a dark reading theme to the current page",
    };
  }

  if (input.includes("hide images") || input.includes("remove images")) {
    return {
      command: "hideImages",
      color,
      buttonText: "Hide Images",
      summary: "Hide all images on the current page",
    };
  }

  if (input.includes("focus") || input.includes("reading mode")) {
    return {
      command: "focusMode",
      color,
      buttonText: "Enable Focus Mode",
      summary: "Reduce page distractions for focused reading",
    };
  }

  return {
    command: "setTextColor",
    color,
    buttonText: `Apply Text Color (${color})`,
    summary: `Change visible text color to ${color}`,
  };
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeJs = (value) =>
  String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");

const isValidJavaScript = (code) => {
  try {
    new Function(String(code));
    return true;
  } catch (_error) {
    return false;
  }
};

const hasMinimumInteractionFlow = (files) => {
  const popupJs = String(files["popup.js"] || "");
  const contentJs = String(files["content.js"] || "");

  if (popupJs.includes("alert(") || popupJs.includes("Extension action executed")) {
    return false;
  }

  const hasTabsQuery = popupJs.includes("chrome.tabs.query");
  const hasMessagePath = popupJs.includes("chrome.tabs.sendMessage") && contentJs.includes("chrome.runtime.onMessage");
  const hasExecutePath = popupJs.includes("chrome.scripting.executeScript");

  return hasTabsQuery && (hasMessagePath || hasExecutePath);
};

const normalizeManifest = (manifestText, fallbackManifestText) => {
  try {
    const parsed = JSON.parse(manifestText);

    parsed.manifest_version = 3;
    parsed.name = String(parsed.name || "Generated Extension");
    parsed.version = String(parsed.version || "1.0.0");
    parsed.description = String(parsed.description || "Generated from prompt");

    const permissions = Array.isArray(parsed.permissions) ? parsed.permissions : [];
    parsed.permissions = Array.from(new Set([...permissions, "storage", "activeTab", "scripting"]));

    const hostPermissions = Array.isArray(parsed.host_permissions) ? parsed.host_permissions : [];
    parsed.host_permissions = Array.from(new Set([...hostPermissions, "<all_urls>"]));

    parsed.action = {
      ...(parsed.action || {}),
      default_popup: "popup.html",
      default_title: parsed.action?.default_title || "Generated Extension",
    };

    parsed.background = { service_worker: "background.js" };

    parsed.content_scripts = [
      {
        matches: ["<all_urls>"],
        js: ["content.js"],
        run_at: "document_idle",
      },
    ];

    return JSON.stringify(parsed, null, 2);
  } catch (_error) {
    return fallbackManifestText;
  }
};

const normalizeGeneratedFiles = (candidateFiles, prompt) => {
  const fallback = buildFallbackFiles(prompt);

  if (!candidateFiles || typeof candidateFiles !== "object") {
    return fallback;
  }

  const normalized = {};

  for (const file of REQUIRED_FILES) {
    const value = candidateFiles[file];
    normalized[file] = typeof value === "string" && value.trim() ? value : fallback[file];
  }

  normalized["manifest.json"] = normalizeManifest(
    normalized["manifest.json"],
    fallback["manifest.json"]
  );

  for (const jsFile of JS_FILES) {
    if (!isValidJavaScript(normalized[jsFile])) {
      normalized[jsFile] = fallback[jsFile];
    }
  }

  const popupHtml = String(normalized["popup.html"] || "");
  if (!popupHtml.includes("popup.js") || !popupHtml.includes("styles.css")) {
    normalized["popup.html"] = fallback["popup.html"];
  }

  if (!hasMinimumInteractionFlow(normalized)) {
    normalized["content.js"] = fallback["content.js"];
    normalized["popup.js"] = fallback["popup.js"];
  }

  return normalized;
};

export const buildFallbackFiles = (userPrompt) => {
  const action = buildActionSpec(userPrompt);

  const safePrompt = escapeHtml(userPrompt || "Create a useful browser extension");
  const safeSummary = escapeHtml(action.summary);
  const safeButtonText = escapeHtml(action.buttonText);
  const safeCommand = escapeJs(action.command);
  const safeColor = escapeJs(action.color);

  return {
    "manifest.json": JSON.stringify(
      {
        manifest_version: 3,
        name: "Generated Extension",
        version: "1.0.0",
        description: `Generated from prompt: ${String(userPrompt || "")}`,
        permissions: ["storage", "activeTab", "scripting"],
        host_permissions: ["<all_urls>"],
        action: {
          default_title: "Generated Extension",
          default_popup: "popup.html",
        },
        background: {
          service_worker: "background.js",
        },
        content_scripts: [
          {
            matches: ["<all_urls>"],
            js: ["content.js"],
            run_at: "document_idle",
          },
        ],
      },
      null,
      2
    ),

    "content.js": `const EXTENSIO_STYLE_ID = "extensio-generated-style";

const removeExistingStyle = () => {
  const existing = document.getElementById(EXTENSIO_STYLE_ID);
  if (existing) existing.remove();
};

const applyCommand = (payload = {}) => {
  const command = payload.command;
  const color = payload.color || "red";

  removeExistingStyle();

  const style = document.createElement("style");
  style.id = EXTENSIO_STYLE_ID;

  if (command === "setBackgroundColor") {
    style.textContent = "body { background-color: " + color + " !important; }";
+  } else if (command === "enableDarkMode") {
+    style.textContent = "html, body { background: #111827 !important; color: #f9fafb !important; } body * { color: #f9fafb !important; background-color: transparent !important; } a { color: #93c5fd !important; }";
+  } else if (command === "hideImages") {
+    style.textContent = "img, picture, svg { visibility: hidden !important; }";
+  } else if (command === "focusMode") {
+    style.textContent = "aside, nav, footer, [role='complementary'], [aria-label*='sidebar' i], .ad, .ads, [id*='ad' i] { display: none !important; } main, article, .content { max-width: 900px !important; margin: 0 auto !important; line-height: 1.65 !important; }";
   } else {
     style.textContent = "html, body, body * { color: " + color + " !important; }";
   }

   document.documentElement.appendChild(style);
   return { ok: true };
 };

 chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
   if (message?.type !== "APPLY_COMMAND") return;

   try {
     const result = applyCommand(message.payload || {});
     sendResponse(result);
   } catch (error) {
     sendResponse({ ok: false, error: error?.message || "Failed to apply command" });
   }
 });`,

    "popup.html": `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>Generated Extension</title>
  </head>
  <body>
    <main class="card">
      <h1>Generated Extension</h1>
      <p class="prompt"><strong>Prompt:</strong> ${safePrompt}</p>
      <p class="summary">${safeSummary}</p>
      <div class="actions">
        <button id="runBtn">${safeButtonText}</button>
        <button id="resetBtn" class="secondary">Reset</button>
      </div>
      <p id="status" aria-live="polite"></p>
    </main>
    <script src="popup.js"></script>
  </body>
</html>`,

    "popup.js": `const payload = { command: "${safeCommand}", color: "${safeColor}" };

const statusEl = document.getElementById("status");
const setStatus = (text, isError = false) => {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.className = isError ? "error" : "ok";
};

const withActiveTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error("No active tab found");
  return tab.id;
};

const applyViaMessaging = async (tabId) => {
  return chrome.tabs.sendMessage(tabId, { type: "APPLY_COMMAND", payload });
};

const applyViaScriptingFallback = async (tabId) => {
  await chrome.scripting.executeScript({
    target: { tabId },
    args: [payload],
    func: (input) => {
      const styleId = "extensio-generated-style";
      const oldStyle = document.getElementById(styleId);
      if (oldStyle) oldStyle.remove();

      const style = document.createElement("style");
      style.id = styleId;

      if (input.command === "setBackgroundColor") {
        style.textContent = "body { background-color: " + input.color + " !important; }";
      } else if (input.command === "enableDarkMode") {
        style.textContent = "html, body { background: #111827 !important; color: #f9fafb !important; } body * { color: #f9fafb !important; background-color: transparent !important; } a { color: #93c5fd !important; }";
      } else if (input.command === "hideImages") {
        style.textContent = "img, picture, svg { visibility: hidden !important; }";
      } else if (input.command === "focusMode") {
        style.textContent = "aside, nav, footer, [role='complementary'], [aria-label*='sidebar' i], .ad, .ads, [id*='ad' i] { display: none !important; } main, article, .content { max-width: 900px !important; margin: 0 auto !important; line-height: 1.65 !important; }";
      } else {
        style.textContent = "html, body, body * { color: " + input.color + " !important; }";
      }

      document.documentElement.appendChild(style);
    },
  });
  return { ok: true };
};

const resetStyles = async () => {
  try {
    const tabId = await withActiveTab();
    await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const style = document.getElementById("extensio-generated-style");
        if (style) style.remove();
      },
    });
    setStatus("Reset complete");
  } catch (error) {
    setStatus(error?.message || "Reset failed", true);
  }
};

document.getElementById("runBtn")?.addEventListener("click", async () => {
  try {
    const tabId = await withActiveTab();

    try {
      const response = await applyViaMessaging(tabId);
      if (response?.ok) {
        setStatus("Applied successfully");
        return;
      }
      setStatus(response?.error || "Apply failed", true);
    } catch (_error) {
      const fallback = await applyViaScriptingFallback(tabId);
      if (fallback?.ok) {
        setStatus("Applied with fallback");
      } else {
        setStatus("Cannot run on this page", true);
      }
    }
  } catch (error) {
    setStatus(error?.message || "Failed to run", true);
  }
});

document.getElementById("resetBtn")?.addEventListener("click", resetStyles);`,

    "background.js": `chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ generatedAt: Date.now() });
  console.log("Generated extension installed");
});`,

    "styles.css": `:root {
  color-scheme: light;
  --bg: #f8fafc;
  --text: #0f172a;
  --muted: #475569;
  --primary: #0f172a;
  --primaryText: #ffffff;
  --secondary: #e2e8f0;
  --secondaryText: #0f172a;
  --success: #166534;
  --error: #b91c1c;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background: radial-gradient(circle at top right, #e2e8f0, #f8fafc 50%);
  color: var(--text);
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  padding: 14px;
}

.card {
  background: #ffffff;
  border: 1px solid #dbeafe;
  border-radius: 14px;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
  padding: 14px;
}

h1 {
  margin: 0 0 8px;
  font-size: 20px;
}

.prompt {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.45;
}

.summary {
  margin: 8px 0 14px;
  color: #1e293b;
  font-size: 13px;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

button {
  border: 0;
  border-radius: 10px;
  padding: 9px 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

#runBtn {
  background: var(--primary);
  color: var(--primaryText);
}

.secondary {
  background: var(--secondary);
  color: var(--secondaryText);
}

#status {
  min-height: 20px;
  margin: 10px 0 0;
  font-size: 12px;
  font-weight: 700;
}

#status.ok {
  color: var(--success);
}

#status.error {
  color: var(--error);
}`,
  };
};

export const generateFilesFromGemini = async (prompt) => {
  if (!process.env.GEMINI_API_KEY) {
    return buildFallbackFiles(prompt);
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const geminiPrompt = `You are an expert Chrome extension code generator.

Return ONLY one valid JSON object with EXACTLY these six keys:
- manifest.json
- content.js
- popup.html
- popup.js
- background.js
- styles.css

Rules:
1) Manifest must be Manifest V3.
2) popup.html must include both styles.css and popup.js.
3) popup.js must act on the active tab using either chrome.tabs.sendMessage or chrome.scripting.executeScript.
4) content.js must implement the requested behavior and listen to runtime messages when messaging is used.
5) Do not return markdown code fences.
6) Do not return explanations.
7) Ensure JavaScript is syntax-valid.
8) Build a real popup UI (title, action button, status text).

User request: ${prompt}`;

  try {
    const result = await model.generateContent(geminiPrompt);
    const text = result.response.text();
    const jsonText = extractJsonObject(text);
    const parsed = JSON.parse(jsonText);
    return normalizeGeneratedFiles(parsed, prompt);
  } catch (_error) {
    return buildFallbackFiles(prompt);
  }
};
