# Kwak - Application de Chat en Temps Réel

## 🎯 Description
Kwak est une application de chat en temps réel moderne avec un design violet pastel et noir. L'application permet aux utilisateurs de communiquer instantanément avec authentification sécurisée.

## 🚀 Fonctionnalités
- ✅ Inscription et connexion sécurisées avec JWT
- ✅ Chat en temps réel avec Socket.io
- ✅ Interface utilisateur moderne et responsive
- ✅ Liste des utilisateurs connectés
- ✅ Messages persistants en base de données
- ✅ Design violet pastel/noir élégant

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Socket.io** - Communication temps réel
- **Prisma** - ORM pour la base de données
- **SQLite** - Base de données
- **JWT** - Authentification sécurisée
- **bcryptjs** - Hachage des mots de passe

### Frontend
- **React** - Framework JavaScript
- **React Router** - Navigation
- **Socket.io Client** - Communication temps réel
- **Axios** - Requêtes HTTP
- **CSS3** - Styles avec design moderne

## 📁 Structure du Projet

```
kwak/
├── kwak-backend/          # Serveur Node.js
│   ├── prisma/
│   │   └── schema.prisma  # Modèle de données
│   ├── server.js          # Serveur principal
│   ├── package.json       # Dépendances backend
│   └── env.example        # Variables d'environnement
├── kwak-frontend/         # Application React
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Chat.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json       # Dépendances frontend
└── README.md              # Documentation
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### 1. Installation Backend

```bash
cd kwak-backend
npm install
```

Créer le fichier `.env` :
```bash
cp env.example .env
```

Initialiser la base de données :
```bash
npx prisma generate
npx prisma db push
```

Démarrer le serveur :
```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:5000`

### 2. Installation Frontend

```bash
cd kwak-frontend
npm install
```

Démarrer l'application :
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🎨 Design

L'application utilise une palette de couleurs violet pastel et noir :
- **Violet principal** : #8b5cf6
- **Violet foncé** : #7c3aed
- **Arrière-plan** : Dégradé violet/bleu
- **Sidebar** : Noir semi-transparent
- **Interface** : Blanc avec transparence

## 🔐 Sécurité

- Authentification JWT avec expiration 24h
- Mots de passe hachés avec bcryptjs
- Middleware de protection des routes
- Validation des données côté serveur
- Protection CORS configurée

## 📊 Modèle de Données

### Utilisateur
- `id` : Identifiant unique
- `username` : Nom d'utilisateur (unique)
- `email` : Email (unique)
- `password` : Mot de passe haché
- `createdAt` : Date de création
- `updatedAt` : Date de modification

### Message
- `id` : Identifiant unique
- `content` : Contenu du message
- `userId` : Référence vers l'utilisateur
- `createdAt` : Date de création
- `updatedAt` : Date de modification

## 🚀 Déploiement

### Backend
1. Configurer les variables d'environnement de production
2. Changer la base de données pour PostgreSQL/MySQL
3. Déployer sur Heroku, Vercel, ou serveur VPS

### Frontend
1. Build de production : `npm run build`
2. Déployer sur Netlify, Vercel, ou serveur web

## 📝 API Endpoints

### Authentification
- `POST /api/register` - Inscription
- `POST /api/login` - Connexion

### Messages
- `GET /api/messages` - Récupérer les messages (authentifié)

### WebSocket Events
- `authenticate` - Authentification Socket
- `sendMessage` - Envoyer un message
- `newMessage` - Nouveau message reçu
- `userJoined` - Utilisateur connecté
- `userLeft` - Utilisateur déconnecté
- `connectedUsers` - Liste des utilisateurs connectés

## 🐛 Dépannage

### Erreurs courantes
1. **Port déjà utilisé** : Changer le port dans `.env`
2. **Base de données** : Vérifier la configuration Prisma
3. **CORS** : Vérifier la configuration Socket.io
4. **Token expiré** : Se reconnecter

### Logs
- Backend : Logs dans la console
- Frontend : Console du navigateur

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Développé avec ❤️ pour l'application Kwak
