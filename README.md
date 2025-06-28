# SortLater - Read It Later App (Application de Lecture Différée)

English version

## 🤖 À Propos de ce Prototype

**Ce projet est un prototype d'un besoin personnel, réalisé par un assistant IA.**

L'objectif est de repartir de zéro, à la main, pour bien comprendre et construire ce dont j'ai réellement besoin. Ce faisant, je pourrai tester mon idée et voir si d'autres personnes sont intéressées par cette approche.

**Ce n'est PAS une énième application pour lire des articles, ni pour les organiser en favoris.** Au contraire, le but est de créer un **fourre-tout rapide à ouvrir et à vider** - un espace de stockage temporaire pour les liens que vous souhaitez traiter plus tard, puis faire le vide.

### 🎯 La Vision

Contrairement aux applications de lecture différée traditionnelles qui encouragent l'accumulation d'articles, SortLater est conçu autour du concept de **flux et de vide** :

- **Capture rapide** - Sauvegardez des liens instantanément et sans friction.
- **Traiter et vider** - Lisez, archivez ou supprimez pour garder la liste active vide.
- **Stockage temporaire** - Pas une bibliothèque permanente, mais une file d'attente de traitement.
- **Friction minimale** - Rapide à ajouter, rapide à vider, rapide à trouver ce dont vous avez besoin.

Ce prototype aide à valider si cette approche de la "boîte de réception vide" pour la gestion des liens trouve un écho auprès d'autres personnes qui se sentent dépassées par les systèmes de favoris traditionnels.

---

## ✨ Fonctionnalités

- 📚 **Sauvegarder des Liens** - Enregistrez rapidement des articles, des vidéos et des pages web pour plus tard.
- 🏷️ **Organisation Intelligente** - Catégorisez et taguez vos liens pour les retrouver facilement.
- 🔍 **Recherche Puissante** - Trouvez votre contenu sauvegardé avec un filtrage avancé.
- 🌙 **Changement de Thème** - De magnifiques thèmes clair et sombre.
- ⌨️ **Raccourcis Clavier** - Naviguez efficacement avec des raccourcis.
- 📤 **Export/Import** - Sauvegardez et restaurez vos données au format JSON.
- 📱 **Design Responsive** - Fonctionne parfaitement sur tous les appareils.
- ⚡ **Rapide & Léger** - Construit avec des technologies web modernes.

## 🚀 Démarrage Rapide

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. **Clonez le dépôt**

Bash

        git clone https://github.com/yourusername/sortlater-app.git
    cd sortlater-app

2. **Installez les dépendances**

Bash

        npm install

3. **Démarrez le serveur de développement**

Bash

        npm run dev

4. **Ouvrez votre navigateur** et accédez à `http://localhost:5173`

### Compiler pour la Production

Bash

    npm run build

Les fichiers compilés se trouveront dans le répertoire `dist`.

## ⌨️ Raccourcis Clavier

| ----- |
| Raccourci | Action |
| `Ctrl/Cmd + K` | Ajouter un nouveau lien |
| `Ctrl/Cmd + D` | Changer de thème |
| `Tab` | Basculer entre Actifs/Archivés |
| `Ctrl/Cmd + F` | Focus sur la recherche |
| `Ctrl/Cmd + E` | Exporter les liens |
| `?` | Afficher les raccourcis clavier |

Exporter vers Sheets

## 🛠️ Stack Technique

- **Frontend :** React 18 avec TypeScript
- **Style :** Tailwind CSS
- **Outil de Build :** Vite
- **Icônes :** Lucide React
- **Stockage :** localStorage du navigateur

## 📱 Utilisation

### Ajouter des Liens

1. Collez n'importe quelle URL dans le formulaire "Ajouter un nouveau lien".
2. Ajoutez optionnellement un titre personnalisé, une catégorie et des tags.
3. Cliquez sur "Ajouter un lien" ou appuyez sur Entrée.

### Lire les Liens

- Cliquez sur "Lire" sur n'importe quel lien actif pour l'ouvrir et l'archiver automatiquement.
- Ou cliquez sur le titre du lien pour l'ouvrir sans l'archiver.

### Organisation

- **Catégories :** Regroupez les liens connexes.
- **Tags :** Ajoutez plusieurs tags pour une organisation flexible.
- **Recherche :** Trouvez des liens par titre, URL ou tags.
- **Filtres :** Filtrez par catégorie ou par tags.

### Gestion des Données

- **Exporter :** Téléchargez tous vos liens dans un fichier JSON.
- **Importer :** Uploadez un fichier JSON pour restaurer ou fusionner des liens.
- **Archiver :** Gardez votre liste de lecture propre en archivant les éléments lus.

## 🎨 Personnalisation

L'application prend en charge les thèmes clair et sombre avec de superbes dégradés et des transitions fluides. La préférence de thème est automatiquement sauvegardée et restaurée.

## 📄 Format des Données

Les liens sont stockés dans ce format :

JSON

    {
      "id": 1640995200000,
      "url": "https://example.com",
      "title": "Titre de l'Exemple",
      "archived": false,
      "createdAt": "2023-12-31T12:00:00.000Z",
      "category": "Technologie",
      "tags": ["react", "javascript"]
    }

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une Pull Request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est open source et disponible sous la [Licence MIT](https://www.google.com/search?q=LICENSE).

## 🙏 Remerciements

- Icônes par [Lucide](https://www.google.com/search?q=https.lucide.dev/)
- Images de [Pexels](https://pexels.com/)
- Construit avec [Vite](https://vitejs.dev/) et [React](https://reactjs.org/)

---

**Fait avec ❤️ pour de meilleures habitudes web**

---

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
