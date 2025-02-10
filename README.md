# 📌 Taskly - Gestionnaire de Tâches

Taskly est une application mobile de gestion de tâches développée en React Native. Elle permet aux utilisateurs d'ajouter, organiser et gérer leurs tâches facilement, avec une gestion des catégories et un mode sombre.

## 🚀 Fonctionnalités

- 📋 Ajout de tâches via un formulaire modal
- 🎯 Classement par catégorie
- 🔥 Priorisation des tâches urgentes (toujours en haut de la liste)
- 🌙 Mode sombre / Mode clair
- 🗑 Marquer et supprimer des tâches
- 📊 Page des statistiques pour suivre l'évolution des tâches

## 📱 Interface

- 🏠 **Accueil** : Affichage des tâches par catégories
- ➕ **Ajout de tâche** : Accès via un bouton flottant en bas à droite
- 📊 **Statistiques** : Accès via un bouton flottant en bas à gauche
- 🌙 **Changement de thème** : Bouton dans le header

## 🛠️ Installation et Exécution

### Cloner le projet :

```bash
git clone https://github.com/LeYapson/ToDoList
cd taskly

```

## Installer les dépendances :

```bash
npm install
```

## Lancer l'application :

```bash
npx expo start
```

## 📂 Structure du projet

```
Taskly/
│── src/
│   ├── components/
│   │   ├── TaskInput.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── StatsScreen.jsx
│   ├── theme.js
│── App.js
│── package.json
```

## 📌 Technologies utilisées
React Native (Expo)
AsyncStorage (Stockage local des tâches et du thème)
React Navigation (Gestion de la navigation)
✨ Améliorations futures
🔔 Notifications pour les tâches urgentes
📅 Intégration d’un calendrier pour planifier les tâches
🔄 Synchronisation cloud pour sauvegarder les tâches

🚀 Taskly est conçu pour améliorer la productivité de manière simple et efficace. Contribuez ou signalez des bugs sur le dépôt GitHub ! 🎉