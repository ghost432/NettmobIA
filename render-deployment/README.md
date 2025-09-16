# 🚀 Déploiement Flowise sur Render

Ce guide vous explique comment déployer Flowise sur [Render.com](https://render.com/), une plateforme de déploiement cloud gratuite.

## 📋 Avantages de Render

- ✅ **Gratuit** : 750 heures par mois
- ✅ **Déploiement automatique** depuis Git
- ✅ **Support Docker** natif
- ✅ **Variables d'environnement** sécurisées
- ✅ **HTTPS automatique**
- ✅ **Logs en temps réel**
- ✅ **Redémarrage automatique**

## ⚠️ Limitations du Plan Gratuit

- **Mise en veille** : L'application s'endort après 15 minutes d'inactivité
- **Temps de démarrage** : 30-60 secondes pour redémarrer
- **Ressources limitées** : 512MB RAM, 0.1 CPU
- **Bande passante** : 100GB/mois

## 🎯 Méthodes de Déploiement

### Méthode 1 : Node.js (Recommandé)
- Plus rapide à déployer
- Moins de ressources
- Configuration simple

### Méthode 2 : Docker
- Isolation complète
- Environnement reproductible
- Plus de contrôle

---

## 🚀 Déploiement Express (5 minutes)

### Étape 1 : Préparation

1. **Forkez le repository Flowise** sur GitHub
2. **Connectez-vous à Render** : [render.com](https://render.com/)
3. **Cliquez sur "New"** → **"Web Service"**

### Étape 2 : Configuration

1. **Connectez votre repository** Flowise
2. **Configurez les paramètres** :

#### Configuration Node.js
```
Name: flowise-app
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
Instance Type: Free
```

#### Configuration Docker
```
Name: flowise-app
Environment: Docker
Dockerfile Path: ./Dockerfile
Instance Type: Free
```

### Étape 3 : Variables d'Environnement

Ajoutez ces variables dans Render :

```bash
NODE_ENV=production
PORT=10000
DATABASE_TYPE=sqlite
DATABASE_PATH=/opt/render/project/src/database.sqlite
FLOWISE_SECRETKEY_OVERWRITE=your-secret-key-here
JWT_AUTH_TOKEN_SECRET=your-jwt-secret-here
JWT_REFRESH_TOKEN_SECRET=your-refresh-secret-here
APP_URL=https://your-app-name.onrender.com
STORAGE_TYPE=local
BLOB_STORAGE_PATH=/opt/render/project/src/uploads
LOG_LEVEL=info
DISABLE_FLOWISE_TELEMETRY=true
```

### Étape 4 : Déploiement

1. **Cliquez sur "Create Web Service"**
2. **Attendez le déploiement** (5-10 minutes)
3. **Accédez à votre application** : `https://your-app-name.onrender.com`

---

## 🔧 Configuration Détaillée

### Fichiers de Configuration

#### render.yaml (Configuration automatique)
```yaml
services:
  - type: web
    name: flowise
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: DATABASE_TYPE
        value: sqlite
      - key: FLOWISE_SECRETKEY_OVERWRITE
        generateValue: true
      - key: JWT_AUTH_TOKEN_SECRET
        generateValue: true
      - key: JWT_REFRESH_TOKEN_SECRET
        generateValue: true
```

#### Dockerfile pour Render
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 10000

# Start the application
CMD ["npm", "start"]
```

### Variables d'Environnement Essentielles

| Variable | Description | Valeur |
|----------|-------------|---------|
| `NODE_ENV` | Environnement | `production` |
| `PORT` | Port d'écoute | `10000` |
| `DATABASE_TYPE` | Type de base | `sqlite` |
| `DATABASE_PATH` | Chemin base | `/opt/render/project/src/database.sqlite` |
| `FLOWISE_SECRETKEY_OVERWRITE` | Clé secrète | Générée automatiquement |
| `JWT_AUTH_TOKEN_SECRET` | Secret JWT | Généré automatiquement |
| `JWT_REFRESH_TOKEN_SECRET` | Secret refresh | Généré automatiquement |
| `APP_URL` | URL de l'app | `https://your-app.onrender.com` |
| `STORAGE_TYPE` | Type stockage | `local` |
| `BLOB_STORAGE_PATH` | Chemin stockage | `/opt/render/project/src/uploads` |
| `LOG_LEVEL` | Niveau de log | `info` |
| `DISABLE_FLOWISE_TELEMETRY` | Désactiver télémétrie | `true` |

---

## 🛠️ Optimisations pour Render

### 1. Réduction de la Taille

```dockerfile
# Dockerfile optimisé
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS production

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/packages/server/dist ./packages/server/dist
COPY --from=builder /app/packages/ui/build ./packages/ui/build

EXPOSE 10000
CMD ["npm", "start"]
```

### 2. Configuration Package.json

```json
{
  "scripts": {
    "start": "cd packages/server && node dist/index.js",
    "build": "npm run build:server && npm run build:ui",
    "build:server": "cd packages/server && npm run build",
    "build:ui": "cd packages/ui && npm run build",
    "postinstall": "npm run build"
  },
  "engines": {
    "node": ">=18.15.0",
    "npm": ">=9.0.0"
  }
}
```

### 3. Gestion de la Mémoire

```javascript
// Dans votre application
process.env.NODE_OPTIONS = '--max-old-space-size=512';
```

---

## 🔄 Déploiement Automatique

### GitHub Actions

Créez `.github/workflows/render.yml` :

```yaml
name: Deploy to Render

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### Configuration des Secrets

1. **Dans GitHub** : Settings → Secrets → Actions
2. **Ajoutez** :
   - `RENDER_SERVICE_ID` : ID de votre service Render
   - `RENDER_API_KEY` : Clé API Render

---

## 📊 Monitoring et Logs

### Accès aux Logs

1. **Dans Render Dashboard** → Votre service → **"Logs"**
2. **Logs en temps réel** disponibles
3. **Historique des déploiements**

### Health Check

```javascript
// Endpoint de santé
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});
```

---

## 🔒 Sécurité

### Variables Sensibles

- ✅ **Utilisez les variables d'environnement** Render
- ✅ **Générez des clés secrètes** uniques
- ✅ **Activez HTTPS** (automatique sur Render)
- ✅ **Limitez les origines CORS**

### Configuration CORS

```javascript
// Dans votre configuration
CORS_ORIGINS=https://your-app.onrender.com
```

---

## 🆘 Dépannage

### Problèmes Courants

1. **Build échoue** :
   - Vérifiez les logs de build
   - Assurez-vous que `package.json` est correct
   - Vérifiez la version Node.js

2. **Application ne démarre pas** :
   - Vérifiez les logs de démarrage
   - Assurez-vous que le port est `10000`
   - Vérifiez les variables d'environnement

3. **Mise en veille fréquente** :
   - C'est normal avec le plan gratuit
   - Utilisez un service de ping pour maintenir l'app active

### Service de Ping (Optionnel)

```javascript
// Ping automatique pour éviter la mise en veille
setInterval(() => {
  fetch('https://your-app.onrender.com/api/v1/ping')
    .catch(console.error);
}, 14 * 60 * 1000); // Toutes les 14 minutes
```

---

## 📈 Mise à Niveau

### Plan Payant

Si vous avez besoin de plus de ressources :

- **Starter** : $7/mois - Pas de mise en veille
- **Standard** : $25/mois - Plus de ressources
- **Pro** : $85/mois - Haute disponibilité

### Migration

1. **Sauvegardez vos données** :
   ```bash
   # Export de la base de données
   cp /opt/render/project/src/database.sqlite ./backup.sqlite
   ```

2. **Mettez à niveau** dans Render Dashboard
3. **Redéployez** si nécessaire

---

## 🎯 Prochaines Étapes

1. **Déployez votre application** sur Render
2. **Configurez un domaine personnalisé** (optionnel)
3. **Configurez les sauvegardes** automatiques
4. **Monitorez les performances**
5. **Créez vos premiers chatbots** !

---

## 📚 Ressources

- **Documentation Render** : [render.com/docs](https://render.com/docs)
- **Documentation Flowise** : [docs.flowiseai.com](https://docs.flowiseai.com/)
- **Support Render** : [render.com/support](https://render.com/support)

**Bon déploiement sur Render ! 🚀**
