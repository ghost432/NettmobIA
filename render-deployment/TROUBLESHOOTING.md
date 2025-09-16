# 🛠️ Dépannage Flowise sur Render

## ❌ Problème : "Not Found" après déploiement

Si vous voyez une page "Not Found" après avoir déployé Flowise sur Render, voici les solutions :

### 🔍 Diagnostic Rapide

1. **Vérifiez l'URL** : Assurez-vous d'utiliser la bonne URL
   ```
   https://votre-app-name.onrender.com
   ```

2. **Consultez les logs** dans Render Dashboard :
   - Allez dans votre service → "Logs"
   - Recherchez les erreurs de démarrage

3. **Vérifiez le statut** du service :
   - Le service doit être "Live" (vert)
   - Pas "Sleeping" (gris)

---

## 🔧 Solutions par Ordre de Priorité

### Solution 1 : Vérifier le Port (Le Plus Commun)

**Problème** : Flowise n'écoute pas sur le bon port

**Solution** :
1. Dans Render Dashboard → Votre service → "Environment"
2. Ajoutez/modifiez cette variable :
   ```
   PORT = 10000
   ```
3. Redéployez le service

### Solution 2 : Vérifier les Variables d'Environnement

**Variables obligatoires** :
```bash
NODE_ENV=production
PORT=10000
DATABASE_TYPE=sqlite
DATABASE_PATH=/opt/render/project/src/database.sqlite
FLOWISE_SECRETKEY_OVERWRITE=your-secret-key
JWT_AUTH_TOKEN_SECRET=your-jwt-secret
JWT_REFRESH_TOKEN_SECRET=your-refresh-secret
APP_URL=https://votre-app-name.onrender.com
STORAGE_TYPE=local
BLOB_STORAGE_PATH=/opt/render/project/src/uploads
LOG_LEVEL=info
LOG_PATH=/opt/render/project/src/logs
CORS_ORIGINS=https://votre-app-name.onrender.com
DISABLE_FLOWISE_TELEMETRY=true
FLOWISE_FILE_SIZE_LIMIT=10
NODE_OPTIONS=--max-old-space-size=512
```

### Solution 3 : Vérifier les Commandes de Build/Start

**Build Command** :
```bash
npm install && npm run build
```

**Start Command** :
```bash
npm start
```

### Solution 4 : Ajouter un Disque Persistant

1. Dans Render Dashboard → Votre service → "Disks"
2. Ajoutez un disque :
   - **Path** : `/opt/render/.flowise`
   - **Size** : 1GB (minimum)

3. Mettez à jour les variables d'environnement :
   ```bash
   DATABASE_PATH=/opt/render/.flowise/database.sqlite
   BLOB_STORAGE_PATH=/opt/render/.flowise/uploads
   LOG_PATH=/opt/render/.flowise/logs
   SECRETKEY_PATH=/opt/render/.flowise
   APIKEY_PATH=/opt/render/.flowise
   ```

---

## 🔍 Diagnostic Détaillé

### Étape 1 : Vérifier les Logs

1. **Allez dans Render Dashboard**
2. **Sélectionnez votre service**
3. **Cliquez sur "Logs"**
4. **Recherchez ces erreurs** :

#### Erreur : "Port already in use"
```bash
# Solution : Vérifiez que PORT=10000 est défini
```

#### Erreur : "Cannot find module"
```bash
# Solution : Vérifiez que le build s'est bien passé
```

#### Erreur : "Database connection failed"
```bash
# Solution : Vérifiez DATABASE_PATH
```

### Étape 2 : Tester l'Endpoint de Santé

Ajoutez cette variable d'environnement :
```bash
HEALTH_CHECK_PATH=/api/v1/ping
```

Puis testez : `https://votre-app.onrender.com/api/v1/ping`

### Étape 3 : Vérifier la Configuration

Créez un fichier `render.yaml` dans votre repository :

```yaml
services:
  - type: web
    name: flowise
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /api/v1/ping
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: DATABASE_TYPE
        value: sqlite
      - key: DATABASE_PATH
        value: /opt/render/project/src/database.sqlite
      - key: FLOWISE_SECRETKEY_OVERWRITE
        generateValue: true
      - key: JWT_AUTH_TOKEN_SECRET
        generateValue: true
      - key: JWT_REFRESH_TOKEN_SECRET
        generateValue: true
      - key: APP_URL
        value: https://votre-app-name.onrender.com
      - key: STORAGE_TYPE
        value: local
      - key: BLOB_STORAGE_PATH
        value: /opt/render/project/src/uploads
      - key: LOG_LEVEL
        value: info
      - key: LOG_PATH
        value: /opt/render/project/src/logs
      - key: CORS_ORIGINS
        value: https://votre-app-name.onrender.com
      - key: DISABLE_FLOWISE_TELEMETRY
        value: true
      - key: FLOWISE_FILE_SIZE_LIMIT
        value: 10
      - key: NODE_OPTIONS
        value: --max-old-space-size=512
```

---

## 🚨 Problèmes Spécifiques

### Problème : "Cannot GET /"

**Cause** : L'application ne démarre pas correctement

**Solution** :
1. Vérifiez que `npm start` fonctionne localement
2. Vérifiez les logs de démarrage
3. Assurez-vous que le port est correct

### Problème : "Application sleeping"

**Cause** : Le plan gratuit met l'app en veille après 15 min d'inactivité

**Solution** :
1. Attendez 30-60 secondes pour le redémarrage
2. Utilisez un service de ping pour maintenir l'app active
3. Passez au plan payant si nécessaire

### Problème : "Build failed"

**Cause** : Erreur lors de la construction

**Solution** :
1. Vérifiez les logs de build
2. Assurez-vous que `package.json` est correct
3. Vérifiez la version Node.js

### Problème : "Database not found"

**Cause** : Problème de base de données

**Solution** :
1. Ajoutez un disque persistant
2. Vérifiez `DATABASE_PATH`
3. Redéployez l'application

---

## 🔄 Redéploiement Complet

Si rien ne fonctionne, redéployez complètement :

1. **Supprimez le service** dans Render Dashboard
2. **Relancez le script** :
   ```bash
   ./render-deployment/deploy-to-render.sh votre-app-name nodejs
   ```
3. **Suivez les instructions** étape par étape
4. **Vérifiez chaque variable** d'environnement

---

## 📞 Support

### Logs à Partager

Si vous avez besoin d'aide, partagez :

1. **URL de votre application**
2. **Logs de build** (sans clés secrètes)
3. **Logs de démarrage** (sans clés secrètes)
4. **Variables d'environnement** (sans valeurs sensibles)

### Ressources

- **Documentation Render** : [render.com/docs](https://render.com/docs)
- **Documentation Flowise** : [docs.flowiseai.com](https://docs.flowiseai.com/)
- **GitHub Issues** : [github.com/FlowiseAI/Flowise/issues](https://github.com/FlowiseAI/Flowise/issues)

---

## ✅ Checklist de Vérification

- [ ] URL correcte
- [ ] Service "Live" (pas "Sleeping")
- [ ] PORT=10000 défini
- [ ] Toutes les variables d'environnement définies
- [ ] Build réussi
- [ ] Logs sans erreur
- [ ] Disque persistant ajouté (optionnel)
- [ ] Health check fonctionne

**Une fois tous ces points vérifiés, votre Flowise devrait fonctionner ! 🚀**
