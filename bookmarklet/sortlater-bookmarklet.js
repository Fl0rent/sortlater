(function () {
  // Configuration - Updated to use your deployed URL
  const SORTLATER_URL = "https://dainty-llama-60c045.netlify.app/";

  // Get current page information
  const currentUrl = window.location.href;
  const currentTitle = document.title;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  // Create modal
  const modal = document.createElement("div");
  modal.style.cssText = `
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 16px;
    padding: 24px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    position: relative;
  `;

  modal.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
        📚
      </div>
      <h2 style="margin: 0; font-size: 24px; font-weight: 700; background: linear-gradient(135deg, #10b981, #34d399); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        Save to SortLater
      </h2>
    </div>
    
    <form id="sortlater-form" style="margin-bottom: 20px;">
      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #10b981;">
          URL
        </label>
        <input type="url" id="sl-url" value="${currentUrl}" readonly style="width: 100%; padding: 12px 16px; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; background: rgba(16, 185, 129, 0.05); color: #10b981; font-size: 14px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #10b981;">
          Title
        </label>
        <input type="text" id="sl-title" value="${currentTitle}" style="width: 100%; padding: 12px 16px; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; background: rgba(16, 185, 129, 0.05); color: #10b981; font-size: 14px; box-sizing: border-box;">
      </div>
      
      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #10b981;">
          Category
        </label>
        <select id="sl-category" style="width: 100%; padding: 12px 16px; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; background: rgba(16, 185, 129, 0.05); color: #10b981; font-size: 14px; box-sizing: border-box;">
          <option value="General">General</option>
          <option value="Technology">Technology</option>
          <option value="News">News</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Business">Business</option>
          <option value="Science">Science</option>
          <option value="Health">Health</option>
        </select>
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #10b981;">
          Tags (comma separated)
        </label>
        <input type="text" id="sl-tags" placeholder="javascript, tutorial, react" style="width: 100%; padding: 12px 16px; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; background: rgba(16, 185, 129, 0.05); color: #10b981; font-size: 14px; box-sizing: border-box;">
      </div>
    </form>
    
    <div style="display: flex; gap: 12px;">
      <button id="sl-save" style="flex: 1; padding: 14px 20px; border: none; border-radius: 8px; background: linear-gradient(135deg, #10b981, #059669); color: #000000; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
        💾 Save Link
      </button>
      <button id="sl-cancel" style="flex: 1; padding: 14px 20px; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: #10b981; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
        ✕ Cancel
      </button>
    </div>
    
    <div id="sl-message" style="margin-top: 16px; text-align: center; font-size: 13px; display: none;"></div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Focus on title input
  const titleInput = document.getElementById("sl-title");
  titleInput.focus();
  titleInput.select();

  // Handle save
  document.getElementById("sl-save").addEventListener("click", function () {
    const url = document.getElementById("sl-url").value;
    const title = document.getElementById("sl-title").value;
    const category = document.getElementById("sl-category").value;
    const tagsInput = document.getElementById("sl-tags").value;
    const tags = tagsInput
      ? tagsInput
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : [];

    // Create link object
    const linkData = {
      id: Date.now(),
      url: url,
      title: title || currentTitle,
      archived: false,
      createdAt: new Date().toISOString(),
      category: category,
      tags: tags,
    };

    // Save to localStorage (same key as the main app)
    try {
      const existingLinks = JSON.parse(
        localStorage.getItem("sortlater-links") || "[]"
      );
      existingLinks.unshift(linkData);
      localStorage.setItem("sortlater-links", JSON.stringify(existingLinks));

      // Show success message
      const messageDiv = document.getElementById("sl-message");
      messageDiv.style.display = "block";
      messageDiv.style.color = "#10b981";
      messageDiv.innerHTML = "✅ Link saved successfully!";

      // Auto-close after 2 seconds
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 2000);
    } catch (error) {
      // Show error message
      const messageDiv = document.getElementById("sl-message");
      messageDiv.style.display = "block";
      messageDiv.style.color = "#ef4444";
      messageDiv.innerHTML = "❌ Error saving link. Please try again.";
    }
  });

  // Handle cancel
  document.getElementById("sl-cancel").addEventListener("click", function () {
    document.body.removeChild(overlay);
  });

  // Handle escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }
  });

  // Handle click outside modal
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  // Handle form submission
  document
    .getElementById("sortlater-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("sl-save").click();
    });
})();
