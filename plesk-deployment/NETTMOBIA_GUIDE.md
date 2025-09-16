# 🚀 Guide de Déploiement Flowise pour NettmobIA sur Plesk

## 📋 Vue d'ensemble

Ce guide vous explique comment déployer Flowise dans votre projet **NettmobIA** sur Plesk en utilisant la méthode Node.js.

## 🎯 Prérequis

- ✅ **Plesk** avec extension Node.js installée
- ✅ **Node.js 18.15.0+** 
- ✅ **PNPM** (installé automatiquement)
- ✅ **Accès SSH** ou **Terminal Plesk**
- ✅ **Projet dans le répertoire** `/var/www/vhosts/votre-domaine/NettmobIA`

---

## ⚡ Déploiement Express (5 minutes)

### Étape 1 : Lancez le Script de Déploiement

Dans votre terminal SSH Plesk :

```bash
# Allez dans le répertoire Flowise
cd /path/to/Flowise

# Lancez le script de déploiement pour NettmobIA
./plesk-deployment/deploy-nettmobia.sh france.nettmobinfotech.fr
```

### Étape 2 : Suivez les Instructions

Le script va :
- ✅ Vérifier les prérequis
- ✅ Créer les dossiers nécessaires
- ✅ Copier les fichiers de configuration
- ✅ Installer les dépendances
- ✅ Construire l'application
- ✅ Corriger les permissions

---

## 🔧 Configuration dans Plesk

### 1. Accédez à la Configuration Node.js

1. **Allez dans Plesk Dashboard**
2. **Sites Web & Domaines** → **france.nettmobinfotech.fr**
3. **Cliquez sur l'onglet "Node.js"**

### 2. Configurez les Paramètres

```
Version de Node.js: 18.15.0+ (ou la version détectée)
Racine de l'application: /var/www/vhosts/france.nettmobinfotech.fr/NettmobIA
Fichier de démarrage: app.js
Mode de l'application: Production
```

### 3. Variables d'Environnement

Le script a créé un fichier `.env` avec toutes les variables nécessaires. Vous pouvez les ajouter manuellement dans Plesk ou laisser le fichier `.env` faire le travail.

**Variables importantes** :
```bash
NODE_ENV=production
PORT=3000
DATABASE_PATH=/var/www/vhosts/france.nettmobinfotech.fr/flowise_data/database.sqlite
BLOB_STORAGE_PATH=/var/www/vhosts/france.nettmobinfotech.fr/flowise_data/uploads
LOG_PATH=/var/www/vhosts/france.nettmobinfotech.fr/flowise_data/logs
APP_URL=https://france.nettmobinfotech.fr
```

### 4. Activez Node.js

1. **Cliquez sur "Activer Node.js"**
2. **Attendez le démarrage** (1-2 minutes)
3. **Vérifiez le statut** : doit être "Actif"

---

## 🎯 Accès à l'Application

Une fois configuré, votre Flowise sera accessible sur :
```
https://france.nettmobinfotech.fr
```

---

## 📁 Structure des Fichiers

Après le déploiement, vous aurez :

```
/var/www/vhosts/france.nettmobinfotech.fr/
├── NettmobIA/                    # Votre projet Flowise
│   ├── app.js                   # Point d'entrée
│   ├── package.json             # Configuration NPM
│   ├── .env                     # Variables d'environnement
│   ├── packages/                # Code source Flowise
│   └── node_modules/            # Dépendances
└── flowise_data/                # Données de l'application
    ├── database.sqlite          # Base de données
    ├── uploads/                 # Fichiers uploadés
    └── logs/                    # Fichiers de log
```

---

## 🔍 Vérification du Déploiement

### 1. Test de l'Interface
- Allez sur `https://france.nettmobinfotech.fr`
- Vous devriez voir l'interface Flowise

### 2. Test de l'API
- Testez l'endpoint de santé : `https://france.nettmobinfotech.fr/api/v1/ping`
- Devrait retourner `{"status": "ok"}`

### 3. Vérification des Logs
- Dans Plesk → Node.js → Logs
- Recherchez les erreurs éventuelles

---

## 🛠️ Dépannage

### Problème : "Node.js non activé"
**Solution** :
1. Vérifiez que l'extension Node.js est installée
2. Allez dans Extensions → Catalogue des extensions → Node.js

### Problème : "Port déjà utilisé"
**Solution** :
1. Changez le port dans le fichier `.env`
2. Redémarrez l'application Node.js

### Problème : "Permissions refusées"
**Solution** :
```bash
chown -R psacln:psaserv /var/www/vhosts/france.nettmobinfotech.fr/NettmobIA
chown -R psacln:psaserv /var/www/vhosts/france.nettmobinfotech.fr/flowise_data
```

### Problème : "Application ne démarre pas"
**Solution** :
1. Vérifiez les logs dans Plesk
2. Assurez-vous que toutes les dépendances sont installées
3. Vérifiez les variables d'environnement

---

## 🔄 Mise à Jour

Pour mettre à jour Flowise :

```bash
# Allez dans le répertoire NettmobIA
cd /var/www/vhosts/france.nettmobinfotech.fr/NettmobIA

# Mettez à jour les dépendances
pnpm update

# Reconstruisez l'application
pnpm build

# Redémarrez dans Plesk
```

---

## 💾 Sauvegarde

### Sauvegarde des Données

```bash
# Créer une sauvegarde
tar -czf flowise-backup-$(date +%Y%m%d).tar.gz /var/www/vhosts/france.nettmobinfotech.fr/flowise_data/

# Restaurer une sauvegarde
tar -xzf flowise-backup-YYYYMMDD.tar.gz -C /
```

### Sauvegarde Automatique

Créez un script de sauvegarde quotidienne :

```bash
#!/bin/bash
# /var/www/vhosts/france.nettmobinfotech.fr/backup-flowise.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/www/vhosts/france.nettmobinfotech.fr/backups"
DATA_DIR="/var/www/vhosts/france.nettmobinfotech.fr/flowise_data"

mkdir -p $BACKUP_DIR

# Sauvegarder les données
tar -czf "$BACKUP_DIR/flowise-backup-$DATE.tar.gz" -C $DATA_DIR .

# Nettoyer les anciennes sauvegardes (garder 7 jours)
find $BACKUP_DIR -name "flowise-backup-*.tar.gz" -mtime +7 -delete

echo "Sauvegarde terminée : flowise-backup-$DATE.tar.gz"
```

---

## 🔒 Sécurité

### Recommandations

1. **Changez les clés secrètes** par défaut
2. **Configurez HTTPS** (automatique avec Plesk)
3. **Limitez les accès** aux fichiers sensibles
4. **Sauvegardez régulièrement** les données
5. **Surveillez les logs** pour détecter les activités suspectes

### Configuration SSL

Dans Plesk :
1. **Allez dans "Certificats SSL/TLS"**
2. **Activez "Let's Encrypt"**
3. **Forcez HTTPS** dans les paramètres du domaine

---

## 📊 Monitoring

### Logs

- **Logs d'application** : `/var/www/vhosts/france.nettmobinfotech.fr/flowise_data/logs`
- **Logs Plesk** : Plesk Dashboard → Node.js → Logs

### Métriques

Flowise expose des métriques sur `/api/v1/metrics` (si activé).

---

## 🆘 Support

### Ressources

- **Documentation Flowise** : [docs.flowiseai.com](https://docs.flowiseai.com/)
- **Documentation Plesk** : [docs.plesk.com](https://docs.plesk.com/)
- **Support Plesk** : Votre hébergeur

### Informations de Débogage

En cas de problème, collectez :
1. **Logs Plesk** (Node.js → Logs)
2. **Logs Flowise** (dans flowise_data/logs)
3. **Configuration** (fichier .env)
4. **Statut du service** (Actif/Inactif)

---

## 🎯 Prochaines Étapes

1. **Déployez Flowise** avec le script
2. **Configurez Node.js** dans Plesk
3. **Testez l'application** sur votre domaine
4. **Configurez SSL/HTTPS** pour la sécurité
5. **Créez vos premiers chatbots** !

**Bon déploiement ! 🚀**
