const EXTENSIO_STYLE_ID = "extensio-generated-style";

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
 });