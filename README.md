# SortLater

Une application web minimaliste pour sauvegarder des liens à traiter plus tard — et vraiment les traiter.

**Pas une bibliothèque. Pas un gestionnaire de favoris. Une file d'attente qu'on vide.**

---

## L'idée

On tombe sur un lien intéressant au mauvais moment. On le sauvegarde. Il s'accumule avec des centaines d'autres et on ne le lit jamais.

SortLater part d'un principe différent : la liste est courte par nature (20 liens par défaut), visible d'un coup d'œil, et conçue pour être vidée — pas archivée.

---

## Fonctionnement

### Ajouter un lien
Cliquer sur **ajouter** en bas de la liste, coller l'URL, valider. Le lien apparaît en haut de la liste avec la date du jour.

### Lire un lien
Cliquer sur le titre ouvre le lien dans un nouvel onglet et le retire automatiquement de la liste. Il reste accessible dans l'historique pendant 24h.

**Astuce — traiter plusieurs liens sans quitter SortLater :**
Faire un clic droit sur un lien → "Ouvrir dans un nouvel onglet" ouvre la page en arrière-plan sans quitter SortLater. Répéter pour chaque lien souhaité, puis cliquer sur le **✕** de chaque lien pour les retirer de la liste. Les onglets sont prêts à lire, la liste est déjà vidée.

### Supprimer sans lire
Cliquer sur le **✕** à gauche du lien le supprime immédiatement. Un message "Lien supprimé — Annuler" apparaît en haut pendant 4 secondes pour annuler si besoin.

### Rechercher
La barre de recherche en haut filtre les liens par titre en temps réel.

### Importer des liens
Cliquer sur **importer** affiche une zone de texte. Coller des URLs (une par ligne) ou un fichier exporté depuis SortLater (format `titre\nURL`).

### Exporter des liens
Cliquer sur **exporter** affiche des cases à cocher sur chaque lien. Sélectionner les liens à exporter, cliquer sur "Exporter .txt". Les liens sélectionnés disparaissent de la liste.

### Historique
Les liens ouverts sont conservés 24h dans un historique discret en bas de page, accessible via un bouton replié.

### Limite de liens
Le compteur en haut à droite (`X / 20 liens`) indique le nombre de liens actifs. La limite est modifiable via le menu déroulant (10, 20, 50, 100).

### Thème
Le bouton ☀/☾ en haut à droite bascule entre le mode clair et sombre. Le choix est mémorisé.

---

## Installation

### Prérequis

- Node.js 16+
- npm

### Lancer en local

```bash
git clone https://github.com/Fl0rent/sortlater.git
cd sortlater
npm install
npm run dev
```

Ouvrir `http://localhost:5173` dans le navigateur.

### Compiler pour la production

```bash
npm run build
```

Les fichiers compilés se trouvent dans le dossier `dist/`.

---

## Stack technique

- React 18 + TypeScript
- Vite
- CSS custom (variables, pas de framework)
- Stockage : `localStorage` (pas de backend, pas de compte)

---

## Feuille de route

Les prochaines étapes dans l'ordre logique :

**Étape 2 — PWA + partage mobile**
Transformer l'app en Progressive Web App pour l'installer sur iOS/Android. Elle apparaîtra dans la feuille de partage native : voir un lien sur Safari ou Chrome mobile → partager → il arrive dans SortLater.

**Étape 3 — Backend + hébergement**
Mettre en place un petit serveur (Flask + SQLite, déjà en place dans le repo) hébergé sur un VPS. Nécessaire pour avoir une URL publique et faire fonctionner la synchronisation.

**Étape 4 — Synchronisation**
Une fois le backend hébergé, la liste est identique sur tous les appareils. Un lien ajouté depuis le téléphone apparaît sur l'ordinateur, et vice versa.

**Étape 1 — Extension navigateur**
Un bouton dans Chrome/Firefox pour ajouter la page courante à la liste en un clic. L'extension envoie le lien au backend — nécessite donc l'étape 3 au préalable. Règle également la récupération automatique du titre de la page.

---

## Licence

MIT
