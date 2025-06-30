# SortLater - Read It Later App

## 🤖 About This Prototype

**This project is a prototype of my personal need, realized by an AI assistant.**

The aim is to start from scratch, by hand, to properly understand and build what I actually need. By doing so, I'll be able to test my idea and see if anyone else is interested in this approach.

**This is NOT intended to be yet another application for reading articles, nor to arrange them in bookmarks.** Instead, the goal is to create a **catch-all that's quick to open and empty** - a temporary holding space for links that you want to process later, then clear out.

### 🎯 The Vision

Unlike traditional read-it-later apps that encourage hoarding articles, SortLater is designed around the concept of **flow and emptiness**:

- **Quick capture** - Save links instantly without friction
- **Process and clear** - Read, archive, or delete to keep the active list empty
- **Temporary storage** - Not a permanent library, but a processing queue
- **Minimal friction** - Fast to add, fast to clear, fast to find what you need

This prototype helps validate whether this "empty inbox" approach to link management resonates with others who feel overwhelmed by traditional bookmark systems.

---

![SortLater App](https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

- 📚 **Save Links** - Quickly save articles, videos, and web pages for later
- 🏷️ **Smart Organization** - Categorize and tag your links for easy retrieval
- 🔍 **Powerful Search** - Find your saved content with advanced filtering
- 🌙 **Theme Toggle** - Beautiful dark and light themes
- ⌨️ **Keyboard Shortcuts** - Navigate efficiently with hotkeys
- 📤 **Export/Import** - Backup and restore your data as JSON
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast & Lightweight** - Built with modern web technologies

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/sortlater-app.git
   cd sortlater-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## ⌨️ Keyboard Shortcuts

| Shortcut       | Action                         |
| -------------- | ------------------------------ |
| `Ctrl/Cmd + K` | Add new link                   |
| `Ctrl/Cmd + D` | Toggle theme                   |
| `Tab`          | Switch between Active/Archived |
| `Ctrl/Cmd + F` | Focus search                   |
| `Ctrl/Cmd + E` | Export links                   |
| `?`            | Show keyboard shortcuts        |

## 🛠️ Tech Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Storage:** Browser localStorage

## 📱 Usage

### Adding Links

1. Paste any URL in the "Add New Link" form
2. Optionally add a custom title, category, and tags
3. Click "Add Link" or press Enter

### Reading Links

- Click "Read" on any active link to open it and automatically archive it
- Or click the link title to open without archiving

### Organization

- **Categories:** Group related links together
- **Tags:** Add multiple tags for flexible organization
- **Search:** Find links by title, URL, or tags
- **Filters:** Filter by category or tags

### Data Management

- **Export:** Download all your links as a JSON file
- **Import:** Upload a JSON file to restore or merge links
- **Archive:** Keep your reading list clean by archiving read items

## 🎨 Customization

The app supports both light and dark themes with beautiful gradients and smooth transitions. The theme preference is automatically saved and restored.

## 📄 Data Format

Links are stored in this format:

```json
{
  "id": 1640995200000,
  "url": "https://example.com",
  "title": "Example Article",
  "archived": false,
  "createdAt": "2023-12-31T12:00:00.000Z",
  "category": "Technology",
  "tags": ["react", "javascript"]
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Images from [Pexels](https://pexels.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

---

**Made with ❤️ for better reading habits**
