# Guide de Déploiement Docker sur Plesk

Ce guide explique comment déployer Flowise en utilisant Docker sur un serveur Plesk.

## 📋 Prérequis

1. **Plesk avec Docker** installé et configuré
2. **Accès SSH** au serveur
3. **Docker Compose** installé
4. **Port 3000** disponible

## 🚀 Instructions de Déploiement Docker

### Étape 1 : Préparation

1. **Connectez-vous en SSH** à votre serveur Plesk
2. **Créez un dossier** pour votre application :
   ```bash
   mkdir -p /var/www/vhosts/votre-domaine.com/flowise-docker
   cd /var/www/vhosts/votre-domaine.com/flowise-docker
   ```

### Étape 2 : Configuration

1. **Copiez les fichiers Docker** :
   ```bash
   # Copiez docker-compose.yml et Dockerfile dans le dossier
   cp /path/to/plesk-deployment/docker-compose.yml .
   cp /path/to/plesk-deployment/Dockerfile .
   ```

2. **Modifiez docker-compose.yml** :
   - Remplacez `yourdomain.com` par votre domaine réel
   - Changez les clés secrètes par des valeurs sécurisées
   - Ajustez le port si nécessaire

### Étape 3 : Déploiement

1. **Démarrez le conteneur** :
   ```bash
   docker-compose up -d
   ```

2. **Vérifiez le statut** :
   ```bash
   docker-compose ps
   docker-compose logs -f flowise
   ```

### Étape 4 : Configuration Plesk

1. **Dans Plesk**, allez dans **Sites Web & Domaines**
2. **Sélectionnez votre domaine**
3. **Cliquez sur "Hébergement et DNS"**
4. **Configurez un proxy reverse** :
   - **Source** : `/`
   - **Destination** : `http://localhost:3000`

### Étape 5 : Gestion des Données

Les données sont persistées dans un volume Docker :
```bash
# Localiser le volume
docker volume ls | grep flowise

# Sauvegarder les données
docker run --rm -v flowise_data:/data -v $(pwd):/backup alpine tar czf /backup/flowise-backup.tar.gz -C /data .
```

## 🔧 Configuration Avancée

### Variables d'Environnement

Modifiez les variables dans `docker-compose.yml` :

```yaml
environment:
  - PORT=3000
  - DATABASE_PATH=/root/.flowise/database.sqlite
  - FLOWISE_SECRETKEY_OVERWRITE=your-secret-key
  - APP_URL=https://yourdomain.com
  - STORAGE_TYPE=local
  - BLOB_STORAGE_PATH=/root/.flowise/uploads
```

### Sauvegarde Automatique

Créez un script de sauvegarde :

```bash
#!/bin/bash
# backup-flowise.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/flowise"
CONTAINER_NAME="flowise-plesk"

mkdir -p $BACKUP_DIR

# Sauvegarder les données
docker exec $CONTAINER_NAME tar czf /tmp/flowise-backup-$DATE.tar.gz -C /root/.flowise .
docker cp $CONTAINER_NAME:/tmp/flowise-backup-$DATE.tar.gz $BACKUP_DIR/
docker exec $CONTAINER_NAME rm /tmp/flowise-backup-$DATE.tar.gz

# Nettoyer les anciennes sauvegardes (garder 7 jours)
find $BACKUP_DIR -name "flowise-backup-*.tar.gz" -mtime +7 -delete

echo "Sauvegarde terminée : flowise-backup-$DATE.tar.gz"
```

### Mise à Jour

Pour mettre à jour Flowise :

```bash
# Arrêter le conteneur
docker-compose down

# Télécharger la nouvelle image
docker-compose pull

# Redémarrer
docker-compose up -d
```

## 🛠️ Dépannage

### Problèmes Courants

1. **Conteneur ne démarre pas** :
   ```bash
   docker-compose logs flowise
   ```

2. **Port déjà utilisé** :
   ```bash
   # Vérifier les ports utilisés
   netstat -tulpn | grep :3000
   
   # Changer le port dans docker-compose.yml
   ```

3. **Problèmes de permissions** :
   ```bash
   # Vérifier les permissions du volume
   docker volume inspect flowise_data
   ```

### Logs et Monitoring

```bash
# Voir les logs en temps réel
docker-compose logs -f flowise

# Vérifier l'état du conteneur
docker-compose ps

# Accéder au conteneur
docker exec -it flowise-plesk /bin/sh
```

## 🔒 Sécurité

### Recommandations

1. **Changez toutes les clés secrètes** par défaut
2. **Utilisez HTTPS** avec un certificat SSL
3. **Configurez un firewall** pour limiter l'accès
4. **Sauvegardez régulièrement** les données
5. **Mettez à jour** régulièrement l'image Docker

### Configuration SSL

Dans Plesk :
1. **Allez dans "Certificats SSL/TLS"**
2. **Activez "Let's Encrypt"**
3. **Forcez HTTPS** dans les paramètres du domaine

## 📊 Monitoring

### Health Check

Le conteneur inclut un health check automatique :
```bash
# Vérifier l'état de santé
docker inspect flowise-plesk | grep -A 10 "Health"
```

### Métriques

Flowise expose des métriques sur `/api/v1/metrics` (si activé).

## 🆘 Support

Pour plus d'aide :
- [Documentation Flowise](https://docs.flowiseai.com/)
- [Documentation Docker](https://docs.docker.com/)
- [Documentation Plesk](https://docs.plesk.com/)