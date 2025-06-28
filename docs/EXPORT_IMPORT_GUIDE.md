# SortLater Export & Import Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Export Functionality](#export-functionality)
3. [Import Functionality](#import-functionality)
4. [Data Format Specification](#data-format-specification)
5. [Use Cases](#use-cases)
6. [Troubleshooting](#troubleshooting)
7. [Technical Implementation](#technical-implementation)
8. [Best Practices](#best-practices)

---

## 🔍 Overview

SortLater provides robust export and import capabilities that allow users to:

- **Backup** their entire link collection
- **Transfer** data between devices or browsers
- **Share** curated link collections
- **Migrate** from other read-it-later services
- **Archive** historical data

### Key Features

- ✅ **JSON Format** - Human-readable and widely compatible
- ✅ **Complete Data** - Exports all metadata (tags, categories, timestamps)
- ✅ **Merge Support** - Import without overwriting existing data
- ✅ **Validation** - Automatic data integrity checks
- ✅ **Error Handling** - Clear feedback for invalid files

---

## 📤 Export Functionality

### How to Export Your Data

#### Method 1: Using the Settings Panel

1. **Open SortLater** in your web browser
2. **Click the Settings icon** (⚙️) in the top-right corner
3. **Click "Export"** button in the Backup & Restore section
4. **Choose save location** when the download dialog appears
5. **File will be saved** as `sortlater-backup-YYYY-MM-DD.json`

#### Method 2: Using Keyboard Shortcut

1. **Press `Ctrl+E`** (or `Cmd+E` on Mac) from anywhere in the app
2. **Download will start automatically**

### Export File Details

**File Name Format:**

```
sortlater-backup-2025-01-15.json
```

**File Size:** Typically 1-50KB depending on number of links

**Content:** Complete backup including:

- All active and archived links
- Categories and tags
- Creation timestamps
- Full metadata

### What Gets Exported

| Data Type      | Included | Notes                           |
| -------------- | -------- | ------------------------------- |
| Link URLs      | ✅       | Complete URLs with protocols    |
| Titles         | ✅       | Custom titles or auto-generated |
| Categories     | ✅       | All assigned categories         |
| Tags           | ✅       | All tag arrays                  |
| Archive Status | ✅       | Active/archived state           |
| Creation Date  | ✅       | ISO 8601 timestamp              |
| Unique IDs     | ✅       | For data integrity              |

### Export Limitations

- **Settings not included** (theme preferences, default categories)
- **No file attachments** (links only, not downloaded content)
- **Browser-specific** (each browser maintains separate data)

---

## 📥 Import Functionality

### How to Import Data

#### Step-by-Step Process

1. **Open SortLater** in your web browser
2. **Click the Settings icon** (⚙️) in the top-right corner
3. **Click "Import"** button in the Backup & Restore section
4. **Select your JSON file** from the file picker
5. **Wait for confirmation** message
6. **Review imported links** in your collection

### Import Behavior

#### Data Merging

- **Existing links are preserved** - no data loss
- **New links are added** to your collection
- **Duplicates are allowed** (based on different IDs)
- **No automatic deduplication** (by design for flexibility)

#### Success Indicators

- ✅ **Confirmation message** shows number of imported links
- ✅ **Links appear immediately** in your collection
- ✅ **All metadata preserved** (categories, tags, dates)

### Supported File Formats

| Format  | Support | Notes                   |
| ------- | ------- | ----------------------- |
| `.json` | ✅ Full | Native SortLater format |
| `.txt`  | ❌      | Not supported           |
| `.csv`  | ❌      | Not supported           |
| `.html` | ❌      | Not supported           |

---

## 📊 Data Format Specification

### JSON Structure

The export file contains an array of link objects with the following structure:

```json
[
  {
    "id": 1640995200000,
    "url": "https://example.com/article",
    "title": "How to Build Better Web Apps",
    "archived": false,
    "createdAt": "2023-12-31T12:00:00.000Z",
    "category": "Development",
    "tags": ["javascript", "react", "tutorial"]
  },
  {
    "id": 1640995260000,
    "url": "https://news.example.com/tech-trends",
    "title": "Tech Trends 2024",
    "archived": true,
    "createdAt": "2023-12-31T12:01:00.000Z",
    "category": "News",
    "tags": ["technology", "trends", "2024"]
  }
]
```

### Field Specifications

| Field       | Type    | Required | Description                       | Example                      |
| ----------- | ------- | -------- | --------------------------------- | ---------------------------- |
| `id`        | number  | ✅       | Unique timestamp-based identifier | `1640995200000`              |
| `url`       | string  | ✅       | Complete URL with protocol        | `"https://example.com"`      |
| `title`     | string  | ✅       | Display title for the link        | `"Article Title"`            |
| `archived`  | boolean | ✅       | Whether link is archived          | `false`                      |
| `createdAt` | string  | ✅       | ISO 8601 timestamp                | `"2023-12-31T12:00:00.000Z"` |
| `category`  | string  | ❌       | Category assignment               | `"Technology"`               |
| `tags`      | array   | ❌       | Array of tag strings              | `["react", "tutorial"]`      |

### Data Validation Rules

#### URL Validation

- Must include protocol (`http://` or `https://`)
- Must be valid URL format
- No length restrictions

#### Title Validation

- Cannot be empty string
- Auto-generated from URL if not provided
- Maximum recommended length: 200 characters

#### Category Validation

- Optional field
- Defaults to "General" if not specified
- Case-sensitive

#### Tags Validation

- Must be array format (even if empty)
- Individual tags should be strings
- No duplicate tags within same link
- Case-sensitive

---

## 🎯 Use Cases

### 1. Regular Backup

**Scenario:** Weekly backup of reading list
**Process:**

1. Export data every Sunday
2. Save to cloud storage (Google Drive, Dropbox)
3. Keep multiple versions for history

### 2. Device Migration

**Scenario:** Moving from laptop to desktop
**Process:**

1. Export from old device
2. Transfer file via email/USB/cloud
3. Import on new device
4. Verify all links transferred

### 3. Browser Switching

**Scenario:** Changing from Chrome to Firefox
**Process:**

1. Export from Chrome version
2. Open SortLater in Firefox
3. Import the backup file
4. Continue with same data

### 4. Data Sharing

**Scenario:** Sharing curated links with team
**Process:**

1. Export specific category/tags
2. Manually edit JSON to include only relevant links
3. Share file with team members
4. Team imports shared collection

### 5. Service Migration

**Scenario:** Moving from another read-it-later service
**Process:**

1. Export from other service
2. Convert to SortLater JSON format
3. Import converted data
4. Verify and organize

---

## 🔧 Troubleshooting

### Common Import Errors

#### "Error importing file. Please check the file format."

**Causes:**

- Invalid JSON syntax
- Wrong file format (not JSON)
- Corrupted file

**Solutions:**

1. **Verify file extension** is `.json`
2. **Open file in text editor** to check content
3. **Validate JSON** using online JSON validator
4. **Re-export** from source if corrupted

#### "No links found in file"

**Causes:**

- Empty JSON array `[]`
- File contains different data structure
- All links filtered out during validation

**Solutions:**

1. **Check file content** - should contain array of objects
2. **Verify data structure** matches specification
3. **Try smaller test file** first

#### Import Appears Successful but No Links Visible

**Causes:**

- All imported links are archived
- Filters hiding imported links
- Category/tag filters active

**Solutions:**

1. **Switch to "Archived" view** to check for archived links
2. **Clear all filters** in search/filter panel
3. **Check total count** in header statistics

### File Size Issues

#### Large Export Files

**If export file is unexpectedly large:**

1. **Check link count** - may have more links than expected
2. **Review for very long URLs** or titles
3. **Consider splitting** into multiple exports

#### Import Performance

**If import is slow:**

1. **Large files** (>1000 links) may take several seconds
2. **Browser may freeze** temporarily - this is normal
3. **Wait for confirmation** message before continuing

### Browser Compatibility

| Browser | Export | Import | Notes                           |
| ------- | ------ | ------ | ------------------------------- |
| Chrome  | ✅     | ✅     | Full support                    |
| Firefox | ✅     | ✅     | Full support                    |
| Safari  | ✅     | ✅     | Full support                    |
| Edge    | ✅     | ✅     | Full support                    |
| Mobile  | ✅     | ⚠️     | Import may require file manager |

---

## ⚙️ Technical Implementation

### Export Implementation

```typescript
// Export function in utils/storage.ts
export const exportLinks = (links: Link[]): string => {
  return JSON.stringify(links, null, 2);
};

// Usage in component
const handleExport = () => {
  const jsonData = exportLinks(links);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `sortlater-backup-${
    new Date().toISOString().split("T")[0]
  }.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
```

### Import Implementation

```typescript
// Import function in utils/storage.ts
export const importLinks = (jsonData: string): Link[] => {
  try {
    const parsed = JSON.parse(jsonData);
    if (Array.isArray(parsed)) {
      return parsed.map((link) => ({
        ...link,
        tags: link.tags || [],
        category: link.category || "General",
      }));
    }
    throw new Error("Invalid format");
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
};

// Usage in component
const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const jsonData = e.target?.result as string;
      const importedLinks = importLinks(jsonData);
      onImport(importedLinks);
      alert(`Successfully imported ${importedLinks.length} links!`);
    } catch (error) {
      alert("Error importing file. Please check the file format.");
    }
  };
  reader.readAsText(file);
};
```

### Data Flow

```
Export Flow:
localStorage → loadLinks() → exportLinks() → JSON string → Blob → Download

Import Flow:
File Upload → FileReader → JSON.parse() → importLinks() → Merge with existing → saveLinks() → localStorage
```

---

## 📋 Best Practices

### For Users

#### Regular Backups

- **Export weekly** or after major additions
- **Store in multiple locations** (local + cloud)
- **Test imports** periodically to verify backups work
- **Keep dated backups** for version history

#### File Management

- **Use descriptive names** for shared exports
- **Include date** in filename for organization
- **Compress large files** if sharing via email
- **Document any manual edits** made to JSON

#### Data Hygiene

- **Clean up duplicates** before major exports
- **Organize categories** and tags consistently
- **Archive old links** to reduce export size
- **Review and update** link titles periodically

### For Developers

#### Error Handling

- **Validate JSON** before processing
- **Provide clear error messages** to users
- **Handle edge cases** (empty arrays, missing fields)
- **Log errors** for debugging

#### Performance

- **Stream large files** if implementing server-side processing
- **Show progress indicators** for large imports
- **Implement chunked processing** for very large datasets
- **Optimize JSON parsing** for better performance

#### Security

- **Validate file types** before processing
- **Sanitize URLs** during import
- **Limit file sizes** to prevent abuse
- **Never execute** imported content

---

## 📞 Support

### Getting Help

If you encounter issues with export/import:

1. **Check this documentation** first
2. **Verify file format** using JSON validator
3. **Try with smaller test file**
4. **Open browser developer tools** for error messages
5. **Create GitHub issue** with:
   - Browser and version
   - File size and link count
   - Error messages
   - Steps to reproduce

### Contributing

Help improve the export/import functionality:

- **Report bugs** with detailed reproduction steps
- **Suggest improvements** for user experience
- **Submit pull requests** for bug fixes
- **Update documentation** for clarity

---

**Last Updated:** January 2025  
**Version:** 1.0  
**Compatibility:** SortLater v1.0+
