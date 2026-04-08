const payload = { command: "setBackgroundColor", color: "red" };

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

document.getElementById("resetBtn")?.addEventListener("click", resetStyles);