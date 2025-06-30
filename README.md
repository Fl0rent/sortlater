# SortLater - Read It Later App

English version [here](/READMEen.md)

# SortLater - Application de Lecture Différée

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

1.  **Clonez le dépôt**

    ```bash
    git clone https://github.com/yourusername/sortlater-app.git
    cd sortlater-app
    ```

2.  **Installez les dépendances**

    ```bash
    npm install
    ```

3.  **Démarrez le serveur de développement**

    ```bash
    npm run dev
    ```

4.  **Ouvrez votre navigateur** et accédez à `http://localhost:5173`

### Compiler pour la Production

```bash
npm run build
```

Les fichiers compilés se trouveront dans le répertoire `dist`.

## ⌨️ Raccourcis Clavier

| Raccourci      | Action                          |
| -------------- | ------------------------------- |
| `Ctrl/Cmd + K` | Ajouter un nouveau lien         |
| `Ctrl/Cmd + D` | Changer de thème                |
| `Tab`          | Basculer entre Actifs/Archivés  |
| `Ctrl/Cmd + F` | Focus sur la recherche          |
| `Ctrl/Cmd + E` | Exporter les liens              |
| `?`            | Afficher les raccourcis clavier |

## 🛠️ Stack Technique

- **Frontend :** React 18 avec TypeScript
- **Style :** Tailwind CSS
- **Outil de Build :** Vite
- **Icônes :** Lucide React
- **Stockage :** localStorage du navigateur

## 📱 Utilisation

### Ajouter des Liens

1.  Collez n'importe quelle URL dans le formulaire "Ajouter un nouveau lien".
2.  Ajoutez optionnellement un titre personnalisé, une catégorie et des tags.
3.  Cliquez sur "Ajouter un lien" ou appuyez sur Entrée.

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

```json
{
  "id": 1640995200000,
  "url": "https://example.com",
  "title": "Titre de l'Exemple",
  "archived": false,
  "createdAt": "2023-12-31T12:00:00.000Z",
  "category": "Technologie",
  "tags": ["react", "javascript"]
}
```

## 🤝 Contribution

Les contributions sont les bienvenues \! N'hésitez pas à soumettre une Pull Request.

1.  Forkez le projet
2.  Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3.  Commitez vos changements (`git commit -m 'Add some AmazingFeature'`)
4.  Pushez vers la branche (`git push origin feature/AmazingFeature`)
5.  Ouvrez une Pull Request

## 📝 Licence

Ce projet est open source et disponible sous la [Licence MIT](https://www.google.com/search?q=LICENSE).

## 🙏 Remerciements

- Icônes par [Lucide](https://www.google.com/search?q=https.lucide.dev/)
- Images de [Pexels](https://pexels.com/)
- Construit avec [Vite](https://vitejs.dev/) et [React](https://reactjs.org/)

---

**Fait avec ❤️ pour de meilleures habitudes de lecture**
