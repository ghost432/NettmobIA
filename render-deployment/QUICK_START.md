# 🚀 Déploiement Express Flowise sur Render

## ⚡ Installation en 5 Minutes

### Méthode 1 : Script Automatique (Recommandé)

```bash
# 1. Clonez Flowise
git clone https://github.com/FlowiseAI/Flowise.git
cd Flowise

# 2. Lancez le script de déploiement
./render-deployment/deploy-to-render.sh votre-app-name nodejs

# 3. Suivez les instructions affichées
```

### Méthode 2 : Déploiement Manuel

#### Étape 1 : Préparation
1. **Forkez** le repository Flowise sur GitHub
2. **Connectez-vous** à [render.com](https://render.com/)
3. **Cliquez** sur "New" → "Web Service"

#### Étape 2 : Configuration
1. **Connectez** votre repository Flowise
2. **Configurez** :
   ```
   Name: flowise-ai
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   Instance Type: Free
   ```

#### Étape 3 : Variables d'Environnement
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
LOG_PATH=/opt/render/project/src/logs
CORS_ORIGINS=https://your-app-name.onrender.com
DISABLE_FLOWISE_TELEMETRY=true
FLOWISE_FILE_SIZE_LIMIT=10
NODE_OPTIONS=--max-old-space-size=512
```

#### Étape 4 : Déploiement
1. **Cliquez** sur "Create Web Service"
2. **Attendez** le déploiement (5-10 minutes)
3. **Accédez** à votre application : `https://your-app-name.onrender.com`

---

## 🎯 Avantages de Render

- ✅ **Gratuit** : 750 heures par mois
- ✅ **Déploiement automatique** depuis Git
- ✅ **HTTPS automatique**
- ✅ **Logs en temps réel**
- ✅ **Redémarrage automatique**

## ⚠️ Limitations du Plan Gratuit

- **Mise en veille** : Après 15 minutes d'inactivité
- **Temps de démarrage** : 30-60 secondes
- **Ressources** : 512MB RAM, 0.1 CPU
- **Bande passante** : 100GB/mois

---

## 🔧 Configuration Avancée

### Fichier render.yaml
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
      # ... autres variables
```

### Docker (Alternative)
```bash
# Pour utiliser Docker au lieu de Node.js
./render-deployment/deploy-to-render.sh votre-app-name docker
```

---

## 🛠️ Dépannage

### Problèmes Courants

1. **Build échoue** :
   - Vérifiez les logs de build
   - Assurez-vous que `package.json` est correct

2. **Application ne démarre pas** :
   - Vérifiez les logs de démarrage
   - Assurez-vous que le port est `10000`

3. **Mise en veille fréquente** :
   - C'est normal avec le plan gratuit
   - Utilisez un service de ping

### Service de Ping (Optionnel)
```javascript
// Ping automatique pour éviter la mise en veille
setInterval(() => {
  fetch('https://your-app.onrender.com/api/v1/ping')
    .catch(console.error);
}, 14 * 60 * 1000); // Toutes les 14 minutes
```

---

## 📚 Documentation Complète

- **Guide détaillé** : `README.md`
- **Variables d'environnement** : `RENDER_VARIABLES.md`
- **Script de déploiement** : `deploy-to-render.sh`

---

## 🆘 Support

- **Documentation Render** : [render.com/docs](https://render.com/docs)
- **Documentation Flowise** : [docs.flowiseai.com](https://docs.flowiseai.com/)
- **Support Render** : [render.com/support](https://render.com/support)

**Bon déploiement ! 🚀**
