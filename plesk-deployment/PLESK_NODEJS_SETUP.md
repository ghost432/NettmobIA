# 🔧 Configuration Node.js dans Plesk pour NettmobIA

## 📋 Guide Étape par Étape

### Étape 1 : Vérifier l'Extension Node.js

1. **Allez dans Plesk Dashboard**
2. **Extensions** → **Catalogue des extensions**
3. **Recherchez "Node.js"**
4. **Installez l'extension** si elle n'est pas déjà installée

### Étape 2 : Accéder à la Configuration

1. **Sites Web & Domaines** → **france.nettmobinfotech.fr**
2. **Cliquez sur l'onglet "Node.js"**

### Étape 3 : Configuration des Paramètres

#### Paramètres de Base
```
Version de Node.js: 18.15.0+ (ou la version détectée)
Racine de l'application: /var/www/vhosts/france.nettmobinfotech.fr/NettmobIA
Fichier de démarrage: app.js
Mode de l'application: Production
```

#### Variables d'Environnement
```bash
NODE_ENV=production
PORT=3000
DATABASE_TYPE=sqlite
DATABASE_PATH=/var/www/vhosts/france.nettmobinfotech.fr/flowise_data/database.sqlite
FLOWISE_SECRETKEY_OVERWRITE=your-secret-key-here
JWT_AUTH_TOKEN_SECRET=your-jwt-secret-here
JWT_REFRESH_TOKEN_SECRET=your-refresh-secret-here
APP_URL=https://france.nettmobinfotech.fr
STORAGE_TYPE=local
BLOB_STORAGE_PATH=/var/www/vhosts/france.nettmobinfotech.fr/flowise_data/uploads
LOG_LEVEL=info
LOG_PATH=/var/www/vhosts/france.nettmobinfotech.fr/flowise_data/logs
CORS_ORIGINS=https://france.nettmobinfotech.fr
DISABLE_FLOWISE_TELEMETRY=true
FLOWISE_FILE_SIZE_LIMIT=10
NODE_OPTIONS=--max-old-space-size=1024
```

### Étape 4 : Activation

1. **Cliquez sur "Activer Node.js"**
2. **Attendez le démarrage** (1-2 minutes)
3. **Vérifiez le statut** : doit être "Actif"

### Étape 5 : Vérification

1. **Allez sur** `https://france.nettmobinfotech.fr`
2. **Vous devriez voir** l'interface Flowise
3. **Testez l'API** : `https://france.nettmobinfotech.fr/api/v1/ping`

---

## 🛠️ Dépannage

### Problème : "Node.js non activé"
**Solution** :
1. Vérifiez que l'extension Node.js est installée
2. Redémarrez l'application Node.js

### Problème : "Port déjà utilisé"
**Solution** :
1. Changez le port dans les variables d'environnement
2. Redémarrez l'application

### Problème : "Permissions refusées"
**Solution** :
```bash
chown -R psacln:psaserv /var/www/vhosts/france.nettmobinfotech.fr/NettmobIA
chown -R psacln:psaserv /var/www/vhosts/france.nettmobinfotech.fr/flowise_data
```

---

## ✅ Checklist de Vérification

- [ ] Extension Node.js installée
- [ ] Version Node.js 18.15.0+
- [ ] Racine de l'application correcte
- [ ] Fichier de démarrage : app.js
- [ ] Mode : Production
- [ ] Toutes les variables d'environnement définies
- [ ] Node.js activé
- [ ] Application accessible sur le domaine
- [ ] API de santé fonctionnelle

**Une fois tous ces points vérifiés, votre Flowise devrait fonctionner ! 🚀**
