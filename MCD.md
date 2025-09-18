# 📊 Modèle Conceptuel de Données (MCD) - Kwak

## Diagramme des Entités


┌─────────────────────────────────┐
│           UTILISATEUR           │
├─────────────────────────────────┤
│ • id (PK) : String              │
│ • username : String (UNIQUE)    │
│ • email : String (UNIQUE)       │
│ • password : String (HASHED)    │
│ • createdAt : DateTime          │
│ • updatedAt : DateTime          │
└─────────────────────────────────┘
                 │
                 │ 1:N
                 │
                 ▼
┌─────────────────────────────────┐
│            MESSAGE              │
├─────────────────────────────────┤
│ • id (PK) : String              │
│ • content : String              │
│ • userId (FK) : String          │
│ • createdAt : DateTime          │
│ • updatedAt : DateTime          │
└─────────────────────────────────┘


## Description des Relations

### Relation Utilisateur → Message
- **Type** : Relation 1:N (Un à Plusieurs)
- **Cardinalité** : Un utilisateur peut avoir plusieurs messages
- **Contrainte** : Un message appartient à un seul utilisateur
- **Clé étrangère** : `Message.userId` → `User.id`

## Règles Métier

### Utilisateur
1. **Unicité** : Chaque email et nom d'utilisateur doit être unique
2. **Sécurité** : Les mots de passe sont hachés avec bcryptjs
3. **Audit** : Traçabilité des dates de création et modification

### Message
1. **Contenu** : Le contenu du message est obligatoire
2. **Propriétaire** : Chaque message doit avoir un utilisateur associé
3. **Chronologie** : Les messages sont triés par date de création
4. **Persistance** : Les messages sont conservés en base de données

## Contraintes d'Intégrité

### Contraintes de Clé
- **Clé Primaire** : `id` unique pour chaque entité
- **Clé Étrangère** : `Message.userId` référence `User.id`
- **Clé Unique** : `User.email` et `User.username` uniques

### Contraintes de Domaine
- **Email** : Format email valide
- **Username** : Longueur minimale et caractères autorisés
- **Password** : Longueur minimale et complexité
- **Content** : Longueur maximale pour les messages

### Modèle Étendu

User (1) ←→ (N) Room (1) ←→ (N) Message
User (1) ←→ (N) Reaction (N) ←→ (1) Message
User (1) ←→ (N) Notification
