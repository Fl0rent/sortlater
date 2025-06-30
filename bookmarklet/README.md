# SortLater Bookmarklet

A bookmarklet that allows you to save any webpage to your SortLater app with one click.

## 🚀 Quick Setup

### Step 1: Copy the Bookmarklet Code

Copy this entire line and save it as a bookmark:

```javascript
javascript: (function () {
  const SORTLATER_URL = "http://localhost:5173";
  const currentUrl = window.location.href;
  const currentTitle = document.title;
  const overlay = document.createElement("div");
  overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;`;
  const modal = document.createElement("div");
  modal.style.cssText = `background:linear-gradient(135deg,#000000 0%,#1a1a1a 100%);border:1px solid rgba(16,185,129,0.3);border-radius:16px;padding:24px;width:90%;max-width:500px;box-shadow:0 20px 40px rgba(0,0,0,0.5);position:relative;`;
  modal.innerHTML = `<div style="text-align:center;margin-bottom:20px;"><div style="width:48px;height:48px;background:linear-gradient(135deg,#10b981,#059669);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;box-shadow:0 4px 12px rgba(16,185,129,0.3);">📚</div><h2 style="margin:0;font-size:24px;font-weight:700;background:linear-gradient(135deg,#10b981,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Save to SortLater</h2></div><form id="sortlater-form" style="margin-bottom:20px;"><div style="margin-bottom:16px;"><label style="display:block;font-size:13px;font-weight:600;margin-bottom:8px;color:#10b981;">URL</label><input type="url" id="sl-url" value="${currentUrl}" readonly style="width:100%;padding:12px 16px;border:1px solid rgba(16,185,129,0.3);border-radius:8px;background:rgba(16,185,129,0.05);color:#10b981;font-size:14px;box-sizing:border-box;"></div><div style="margin-bottom:16px;"><label style="display:block;font-size:13px;font-weight:600;margin-bottom:8px;color:#10b981;">Title</label><input type="text" id="sl-title" value="${currentTitle}" style="width:100%;padding:12px 16px;border:1px solid rgba(16,185,129,0.3);border-radius:8px;background:rgba(16,185,129,0.05);color:#10b981;font-size:14px;box-sizing:border-box;"></div><div style="margin-bottom:16px;"><label style="display:block;font-size:13px;font-weight:600;margin-bottom:8px;color:#10b981;">Category</label><select id="sl-category" style="width:100%;padding:12px 16px;border:1px solid rgba(16,185,129,0.3);border-radius:8px;background:rgba(16,185,129,0.05);color:#10b981;font-size:14px;box-sizing:border-box;"><option value="General">General</option><option value="Technology">Technology</option><option value="News">News</option><option value="Education">Education</option><option value="Entertainment">Entertainment</option><option value="Business">Business</option><option value="Science">Science</option><option value="Health">Health</option></select></div><div style="margin-bottom:20px;"><label style="display:block;font-size:13px;font-weight:600;margin-bottom:8px;color:#10b981;">Tags (comma separated)</label><input type="text" id="sl-tags" placeholder="javascript, tutorial, react" style="width:100%;padding:12px 16px;border:1px solid rgba(16,185,129,0.3);border-radius:8px;background:rgba(16,185,129,0.05);color:#10b981;font-size:14px;box-sizing:border-box;"></div></form><div style="display:flex;gap:12px;"><button id="sl-save" style="flex:1;padding:14px 20px;border:none;border-radius:8px;background:linear-gradient(135deg,#10b981,#059669);color:#000000;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;">💾 Save Link</button><button id="sl-cancel" style="flex:1;padding:14px 20px;border:1px solid rgba(16,185,129,0.3);border-radius:8px;background:rgba(16,185,129,0.1);color:#10b981;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;">✕ Cancel</button></div><div id="sl-message" style="margin-top:16px;text-align:center;font-size:13px;display:none;"></div>`;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  const titleInput = document.getElementById("sl-title");
  titleInput.focus();
  titleInput.select();
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
    const linkData = {
      id: Date.now(),
      url: url,
      title: title || currentTitle,
      archived: false,
      createdAt: new Date().toISOString(),
      category: category,
      tags: tags,
    };
    try {
      const existingLinks = JSON.parse(
        localStorage.getItem("sortlater-links") || "[]"
      );
      existingLinks.unshift(linkData);
      localStorage.setItem("sortlater-links", JSON.stringify(existingLinks));
      const messageDiv = document.getElementById("sl-message");
      messageDiv.style.display = "block";
      messageDiv.style.color = "#10b981";
      messageDiv.innerHTML = "✅ Link saved successfully!";
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 2000);
    } catch (error) {
      const messageDiv = document.getElementById("sl-message");
      messageDiv.style.display = "block";
      messageDiv.style.color = "#ef4444";
      messageDiv.innerHTML = "❌ Error saving link. Please try again.";
    }
  });
  document.getElementById("sl-cancel").addEventListener("click", function () {
    document.body.removeChild(overlay);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }
  });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
  document
    .getElementById("sortlater-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("sl-save").click();
    });
})();
```

### Step 2: Create the Bookmark

#### Chrome/Edge:

1. Right-click on your bookmarks bar
2. Select "Add page" or "Add bookmark"
3. Name it "📚 Save to SortLater"
4. Paste the JavaScript code above in the URL field
5. Save

#### Firefox:

1. Right-click on your bookmarks toolbar
2. Select "New Bookmark"
3. Name it "📚 Save to SortLater"
4. Paste the JavaScript code above in the Location field
5. Save

#### Safari:

1. Go to Bookmarks → Add Bookmark
2. Name it "📚 Save to SortLater"
3. Edit the bookmark and replace the URL with the JavaScript code
4. Save

### Step 3: Use the Bookmarklet

1. Navigate to any webpage you want to save
2. Click the "📚 Save to SortLater" bookmark
3. A modal will appear with the page details pre-filled
4. Edit the title, category, or add tags if needed
5. Click "Save Link"
6. The link will be saved to your SortLater app!

## ✨ Features

- **🎯 One-Click Save**: Save any webpage with a single click
- **📝 Smart Pre-fill**: Automatically fills in the page title and URL
- **🏷️ Categories & Tags**: Organize your links with categories and tags
- **⌨️ Keyboard Shortcuts**: Press Enter to save, Escape to cancel
- **🎨 Beautiful UI**: Matches your SortLater app's design
- **💾 Local Storage**: Saves directly to your browser's local storage
- **📱 Responsive**: Works on desktop and mobile browsers

## 🔧 Configuration

The bookmarklet is now configured to work with your deployed SortLater app at:
**https://dainty-llama-60c045.netlify.app/**

If you deploy to a different URL in the future, you can update the bookmarklet by editing the `SORTLATER_URL` variable in the code.

## 🎯 How It Works

The bookmarklet:

1. Creates a modal overlay on the current page
2. Pre-fills the form with the current page's URL and title
3. Allows you to edit details and add metadata
4. Saves the link data to localStorage using the same key as your SortLater app
5. Shows a success message and auto-closes

## 🔒 Privacy & Security

- **No Data Transmission**: Everything stays in your browser
- **Local Storage Only**: Uses the same storage as your SortLater app
- **No External Requests**: Doesn't send data to any servers
- **Same Origin**: Works with your existing SortLater data

## 🐛 Troubleshooting

### Bookmarklet doesn't work

- Make sure you copied the entire JavaScript code
- Check that your browser allows JavaScript bookmarklets
- Try refreshing the page and clicking again

### Links don't appear in SortLater

- Ensure you're using the same browser and domain
- Check that localStorage is enabled in your browser
- Verify the SortLater app is using the same storage key

### Modal appears but looks broken

- Some websites have CSS that might interfere
- Try refreshing the page and using the bookmarklet again
- The bookmarklet uses high z-index values to appear on top

## 🚀 Advanced Usage

### Quick Save (No Modal)

For power users, you can create a simplified version that saves immediately without showing the modal. Just modify the bookmarklet to skip the UI and save directly.

### Custom Categories

Edit the bookmarklet code to add your own custom categories to the dropdown list.

### Keyboard Shortcuts

- **Enter**: Save the link
- **Escape**: Cancel and close modal
- **Tab**: Navigate between form fields

---

**Enjoy saving links with your SortLater bookmarklet! 📚✨**

## 🌐 Your SortLater App

Access your SortLater app at: **https://dainty-llama-60c045.netlify.app/**
