(function() {
  // Configuration
  const SORTLATER_URL = 'http://localhost:5173'; // Change this to your SortLater app URL
  
  // Get current page information
  const currentUrl = window.location.href;
  const currentTitle = document.title || currentUrl;
  
  // Check if SortLater modal already exists
  if (document.getElementById('sortlater-modal')) {
    document.getElementById('sortlater-modal').remove();
    return;
  }
  
  // Create modal HTML
  const modalHTML = `
    <div id="sortlater-modal" style="
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
    ">
      <div style="
        background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 16px;
        padding: 24px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        position: relative;
      ">
        <!-- Header -->
        <div style="
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(16, 185, 129, 0.2);
        ">
          <div style="
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            font-size: 20px;
          ">📚</div>
          <h2 style="
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #10b981, #34d399);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ">SortLater</h2>
          <p style="
            margin: 4px 0 0 0;
            font-size: 13px;
            color: #6b7280;
          ">Save for later reading</p>
        </div>
        
        <!-- Close button -->
        <button id="sortlater-close" style="
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: #10b981;
          font-size: 24px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        " onmouseover="this.style.background='rgba(16, 185, 129, 0.1)'" onmouseout="this.style.background='none'">×</button>
        
        <!-- Form -->
        <form id="sortlater-form">
          <div style="margin-bottom: 16px;">
            <label style="
              display: block;
              font-size: 13px;
              font-weight: 600;
              margin-bottom: 8px;
              color: #10b981;
            ">URL</label>
            <input type="url" id="sortlater-url" value="${currentUrl}" style="
              width: 100%;
              padding: 12px 16px;
              border: 1px solid rgba(16, 185, 129, 0.3);
              border-radius: 8px;
              background: rgba(16, 185, 129, 0.05);
              color: #10b981;
              font-size: 14px;
              box-sizing: border-box;
              transition: all 0.2s ease;
            " readonly>
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="
              display: block;
              font-size: 13px;
              font-weight: 600;
              margin-bottom: 8px;
              color: #10b981;
            ">Title</label>
            <input type="text" id="sortlater-title" value="${currentTitle}" style="
              width: 100%;
              padding: 12px 16px;
              border: 1px solid rgba(16, 185, 129, 0.3);
              border-radius: 8px;
              background: rgba(16, 185, 129, 0.05);
              color: #10b981;
              font-size: 14px;
              box-sizing: border-box;
              transition: all 0.2s ease;
            ">
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="
              display: block;
              font-size: 13px;
              font-weight: 600;
              margin-bottom: 8px;
              color: #10b981;
            ">Category</label>
            <select id="sortlater-category" style="
              width: 100%;
              padding: 12px 16px;
              border: 1px solid rgba(16, 185, 129, 0.3);
              border-radius: 8px;
              background: rgba(16, 185, 129, 0.05);
              color: #10b981;
              font-size: 14px;
              box-sizing: border-box;
              transition: all 0.2s ease;
            ">
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
          
          <div style="margin-bottom: 24px;">
            <label style="
              display: block;
              font-size: 13px;
              font-weight: 600;
              margin-bottom: 8px;
              color: #10b981;
            ">Tags (comma separated)</label>
            <input type="text" id="sortlater-tags" placeholder="javascript, tutorial, react" style="
              width: 100%;
              padding: 12px 16px;
              border: 1px solid rgba(16, 185, 129, 0.3);
              border-radius: 8px;
              background: rgba(16, 185, 129, 0.05);
              color: #10b981;
              font-size: 14px;
              box-sizing: border-box;
              transition: all 0.2s ease;
            ">
          </div>
          
          <!-- Buttons -->
          <div style="display: flex; gap: 12px;">
            <button type="submit" id="sortlater-save" style="
              flex: 1;
              padding: 14px 20px;
              border: none;
              border-radius: 8px;
              background: linear-gradient(135deg, #10b981, #059669);
              color: #000000;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
            " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              💾 Save Link
            </button>
            <button type="button" id="sortlater-open" style="
              flex: 1;
              padding: 14px 20px;
              border: 1px solid rgba(16, 185, 129, 0.3);
              border-radius: 8px;
              background: rgba(16, 185, 129, 0.1);
              color: #10b981;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
            " onmouseover="this.style.background='rgba(16, 185, 129, 0.2)'" onmouseout="this.style.background='rgba(16, 185, 129, 0.1)'">
              🚀 Open App
            </button>
          </div>
        </form>
        
        <!-- Status message -->
        <div id="sortlater-message" style="
          margin-top: 16px;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          font-size: 13px;
          display: none;
        "></div>
      </div>
    </div>
  `;
  
  // Add modal to page
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Get modal elements
  const modal = document.getElementById('sortlater-modal');
  const closeBtn = document.getElementById('sortlater-close');
  const form = document.getElementById('sortlater-form');
  const saveBtn = document.getElementById('sortlater-save');
  const openBtn = document.getElementById('sortlater-open');
  const messageDiv = document.getElementById('sortlater-message');
  
  // Auto-categorize based on URL
  const autoCategory = () => {
    const url = currentUrl.toLowerCase();
    const domain = new URL(currentUrl).hostname.toLowerCase();
    
    if (domain.includes('github') || domain.includes('stackoverflow') || domain.includes('dev.to') || url.includes('programming') || url.includes('coding')) {
      return 'Technology';
    } else if (domain.includes('news') || domain.includes('bbc') || domain.includes('cnn') || domain.includes('reuters')) {
      return 'News';
    } else if (domain.includes('edu') || url.includes('tutorial') || url.includes('course') || url.includes('learn')) {
      return 'Education';
    } else if (domain.includes('youtube') || domain.includes('netflix') || do