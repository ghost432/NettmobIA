# Flowise Deployment sur Plesk

Ce dossier contient les fichiers nécessaires pour déployer Flowise sur un serveur Plesk.

## 📋 Prérequis

1. **Plesk avec extension Node.js** installée
2. **Node.js version 18.15.0+** ou **20.x**
3. **PNPM** installé globalement
4. **Accès SSH** au serveur (recommandé)

## 🚀 Instructions de Déploiement

### Étape 1 : Préparation des Fichiers

1. **Téléchargez Flowise** :
   ```bash
   git clone https://github.com/FlowiseAI/Flowise.git
   cd Flowise
   ```

2. **Copiez les fichiers de déploiement** :
   ```bash
   cp -r plesk-deployment/* /var/www/vhosts/votre-domaine.com/httpdocs/
   ```

### Étape 2 : Configuration Plesk

1. **Connectez-vous à Plesk**
2. **Allez dans Sites Web & Domaines**
3. **Sélectionnez votre domaine**
4. **Cliquez sur l'onglet Node.js**

### Étape 3 : Configuration Node.js

Configurez les paramètres suivants :

- **Version de Node.js** : 18.15.0+ ou 20.x
- **Racine de l'application** : `/var/www/vhosts/votre-domaine.com/httpdocs`
- **Fichier de démarrage** : `app.js`
- **Mode de l'application** : Production

### Étape 4 : Variables d'Environnement

1. **Copiez le fichier d'environnement** :
   ```bash
   cp env.example .env
   ```

2. **Modifiez les valeurs** dans `.env` :
   - Remplacez `yourdomain.com` par votre domaine
   - Générez des clés secrètes sécurisées
   - Ajustez les chemins selon votre configuration

### Étape 5 : Installation des Dépendances

1. **Dans Plesk**, cliquez sur **NPM Install**
2. **Ou via SSH** :
   ```bash
   cd /var/www/vhosts/votre-domaine.com/httpdocs
   npm install
   ```

### Étape 6 : Création des Dossiers

Créez les dossiers nécessaires :

```bash
mkdir -p /var/www/vhosts/votre-domaine.com/flowise_data/{uploads,logs}
chmod 755 /var/www/vhosts/votre-domaine.com/flowise_data
chmod 755 /var/www/vhosts/votre-domaine.com/flowise_data/uploads
chmod 755 /var/www/vhosts/votre-domaine.com/flowise_data/logs
```

### Étape 7 : Démarrage

1. **Dans Plesk**, cliquez sur **Activer Node.js**
2. **Vérifiez** que l'application fonctionne sur `https://votre-domaine.com`

## 🔧 Configuration Avancée

### Base de Données

Flowise utilise SQLite par défaut, parfait pour Plesk. Les données sont stockées dans :
```
/var/www/vhosts/votre-domaine.com/flowise_data/database.sqlite
```

### Stockage des Fichiers

Les fichiers uploadés sont stockés dans :
```
/var/www/vhosts/votre-domaine.com/flowise_data/uploads
```

### Logs

Les logs sont disponibles dans :
```
/var/www/vhosts/votre-domaine.com/flowise_data/logs
```

## 🛠️ Dépannage

### Problèmes Courants

1. **Erreur de permissions** :
   ```bash
   chown -R psacln:psaserv /var/www/vhosts/votre-domaine.com/httpdocs
   ```

2. **Erreur de mémoire** :
   - Augmentez la limite de mémoire Node.js dans Plesk
   - Ou ajoutez `NODE_OPTIONS=--max-old-space-size=4096` dans les variables d'environnement

3. **Port déjà utilisé** :
   - Changez le PORT dans le fichier `.env`
   - Ou configurez un proxy reverse dans Plesk

### Logs de Débogage

Activez les logs détaillés en ajoutant dans `.env` :
```
DEBUG=true
LOG_LEVEL=debug
```

## 📞 Support

Pour plus d'aide :
- [Documentation Flowise](https://docs.flowiseai.com/)
- [Documentation Plesk Node.js](https://docs.plesk.com/fr-FR/obsidian/administrator-guide/gérer-des-sites-web/hosting-nodejs-applications.76652/)
