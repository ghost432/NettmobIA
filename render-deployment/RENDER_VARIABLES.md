# Variables d'Environnement Render pour Flowise

Ce document détaille toutes les variables d'environnement nécessaires pour déployer Flowise sur Render.

## 🔧 Variables Obligatoires

### Configuration de Base

| Variable | Description | Valeur Render | Exemple |
|----------|-------------|---------------|---------|
| `NODE_ENV` | Environnement d'exécution | `production` | `production` |
| `PORT` | Port d'écoute (fixe sur Render) | `10000` | `10000` |
| `APP_URL` | URL de votre application | `https://your-app.onrender.com` | `https://flowise-ai.onrender.com` |

### Base de Données

| Variable | Description | Valeur Render | Exemple |
|----------|-------------|---------------|---------|
| `DATABASE_TYPE` | Type de base de données | `sqlite` | `sqlite` |
| `DATABASE_PATH` | Chemin vers la base SQLite | `/opt/render/project/src/database.sqlite` | `/opt/render/project/src/database.sqlite` |

### Sécurité (Générées Automatiquement)

| Variable | Description | Valeur Render | Exemple |
|----------|-------------|---------------|---------|
| `FLOWISE_SECRETKEY_OVERWRITE` | Clé secrète principale | `generateValue: true` | `a1b2c3d4e5f6...` |
| `JWT_AUTH_TOKEN_SECRET` | Secret pour les tokens JWT | `generateValue: true` | `jwt_secret_32_chars` |
| `JWT_REFRESH_TOKEN_SECRET` | Secret pour les refresh tokens | `generateValue: true` | `refresh_secret_32_chars` |
| `EXPRESS_SESSION_SECRET` | Secret pour les sessions Express | `generateValue: true` | `session_secret_32_chars` |
| `TOKEN_HASH_SECRET` | Secret pour le hachage des tokens | `generateValue: true` | `token_hash_secret` |

## 🔧 Variables Recommandées

### Stockage et Logs

| Variable | Description | Valeur Render | Exemple |
|----------|-------------|---------------|---------|
| `STORAGE_TYPE` | Type de stockage | `local` | `local` |
| `BLOB_STORAGE_PATH` | Chemin de stockage des fichiers | `/opt/render/project/src/uploads` | `/opt/render/project/src/uploads` |
| `LOG_LEVEL` | Niveau de logging | `info` | `info`, `debug`, `warn`, `error` |
| `LOG_PATH` | Chemin des fichiers de log | `/opt/render/project/src/logs` | `/opt/render/project/src/logs` |

### Configuration CORS et Sécurité

| Variable | Description | Valeur Render | Exemple |
|----------|-------------|---------------|---------|
| `CORS_ORIGINS` | Origines autorisées pour CORS | `https://your-app.onrender.com` | `https://flowise-ai.onrender.com` |
| `DISABLE_FLOWISE_TELEMETRY` | Désactiver la télémétrie | `true` | `true` |
| `FLOWISE_FILE_SIZE_LIMIT` | Taille max des fichiers (MB) | `10` | `10` |

### Configuration Node.js

| Variable | Description | Valeur Render | Exemple |
|----------|-------------|---------------|---------|
| `NODE_OPTIONS` | Options Node.js | `--max-old-space-size=512` | `--max-old-space-size=512` |

## 🔧 Variables Optionnelles

### Configuration JWT

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `JWT_ISSUER` | Émetteur des tokens JWT | `flowise` | `your-app.onrender.com` |
| `JWT_AUDIENCE` | Audience des tokens JWT | `flowise` | `your-app.onrender.com` |
| `JWT_TOKEN_EXPIRY_IN_MINUTES` | Durée de vie des tokens (minutes) | `60` | `120` |
| `JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES` | Durée de vie des refresh tokens (minutes) | `10080` | `20160` |
| `EXPIRE_AUTH_TOKENS_ON_RESTART` | Expirer les tokens au redémarrage | `false` | `true` |
| `PASSWORD_SALT_HASH_ROUNDS` | Nombre de rounds pour le hachage | `10` | `12` |

### Configuration des Nœuds

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `SHOW_COMMUNITY_NODES` | Afficher les nœuds communautaires | `true` | `false` |
| `DISABLED_NODES` | Nœuds désactivés (séparés par virgule) | - | `OpenAI,Anthropic` |
| `MODEL_LIST_CONFIG_JSON` | Configuration des modèles (JSON) | - | `{"openai":["gpt-4","gpt-3.5-turbo"]}` |

### Configuration Email (SMTP)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SMTP_HOST` | Serveur SMTP | `smtp.gmail.com` |
| `SMTP_PORT` | Port SMTP | `587` |
| `SMTP_USER` | Utilisateur SMTP | `votre-email@gmail.com` |
| `SMTP_PASSWORD` | Mot de passe SMTP | `votre_mot_de_passe_app` |
| `SMTP_SECURE` | Utiliser SSL/TLS | `true` |
| `ALLOW_UNAUTHORIZED_CERTS` | Autoriser les certificats non autorisés | `false` |
| `SENDER_EMAIL` | Email expéditeur | `noreply@your-app.onrender.com` |

### Configuration Proxy

| Variable | Description | Exemple |
|----------|-------------|---------|
| `GLOBAL_AGENT_HTTP_PROXY` | Proxy HTTP | `http://proxy.example.com:8080` |
| `GLOBAL_AGENT_HTTPS_PROXY` | Proxy HTTPS | `https://proxy.example.com:8080` |
| `GLOBAL_AGENT_NO_PROXY` | Exclusions proxy | `localhost,127.0.0.1` |

### Configuration Queue (Redis)

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `MODE` | Mode d'exécution | `main` | `main`, `worker` |
| `QUEUE_NAME` | Nom de la queue | `flowise` | `flowise-prod` |
| `REDIS_URL` | URL Redis complète | - | `redis://localhost:6379` |
| `REDIS_HOST` | Hôte Redis | `localhost` | `redis.example.com` |
| `REDIS_PORT` | Port Redis | `6379` | `6379` |
| `REDIS_USERNAME` | Utilisateur Redis | - | `redis_user` |
| `REDIS_PASSWORD` | Mot de passe Redis | - | `redis_password` |
| `REDIS_TLS` | Utiliser TLS pour Redis | `false` | `true` |
| `WORKER_CONCURRENCY` | Nombre de workers | `1` | `4` |

### Configuration des Métriques

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `ENABLE_METRICS` | Activer les métriques | `false` | `true` |
| `METRICS_PROVIDER` | Fournisseur de métriques | `prometheus` | `prometheus`, `datadog` |
| `METRICS_SERVICE_NAME` | Nom du service pour les métriques | `flowise` | `flowise-prod` |
| `METRICS_INCLUDE_NODE_METRICS` | Inclure les métriques des nœuds | `false` | `true` |
| `METRICS_OPEN_TELEMETRY_METRIC_ENDPOINT` | Endpoint OpenTelemetry | - | `https://api.datadoghq.com/api/v1/series` |
| `METRICS_OPEN_TELEMETRY_PROTOCOL` | Protocole OpenTelemetry | `http/protobuf` | `http/json` |
| `METRICS_OPEN_TELEMETRY_DEBUG` | Debug OpenTelemetry | `false` | `true` |

## 📝 Configuration render.yaml

### Exemple Complet

```yaml
services:
  - type: web
    name: flowise
    env: node
    region: oregon
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /api/v1/ping
    envVars:
      # Configuration de base
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      
      # Base de données
      - key: DATABASE_TYPE
        value: sqlite
      - key: DATABASE_PATH
        value: /opt/render/project/src/database.sqlite
      
      # Sécurité (générées automatiquement)
      - key: FLOWISE_SECRETKEY_OVERWRITE
        generateValue: true
      - key: JWT_AUTH_TOKEN_SECRET
        generateValue: true
      - key: JWT_REFRESH_TOKEN_SECRET
        generateValue: true
      - key: EXPRESS_SESSION_SECRET
        generateValue: true
      - key: TOKEN_HASH_SECRET
        generateValue: true
      
      # Configuration de l'application
      - key: APP_URL
        value: https://flowise.onrender.com
      - key: STORAGE_TYPE
        value: local
      - key: BLOB_STORAGE_PATH
        value: /opt/render/project/src/uploads
      
      # Logging
      - key: LOG_LEVEL
        value: info
      - key: LOG_PATH
        value: /opt/render/project/src/logs
      
      # CORS et sécurité
      - key: CORS_ORIGINS
        value: https://flowise.onrender.com
      - key: DISABLE_FLOWISE_TELEMETRY
        value: true
      
      # Limites
      - key: FLOWISE_FILE_SIZE_LIMIT
        value: 10
      
      # Configuration Node.js
      - key: NODE_OPTIONS
        value: --max-old-space-size=512
```

## 🔐 Génération de Clés Secrètes

### Script de Génération

```bash
#!/bin/bash
# Générer des clés secrètes pour Render

echo "=== Clés secrètes pour Flowise sur Render ==="
echo ""
echo "FLOWISE_SECRETKEY_OVERWRITE=$(openssl rand -hex 32)"
echo "JWT_AUTH_TOKEN_SECRET=$(openssl rand -hex 32)"
echo "JWT_REFRESH_TOKEN_SECRET=$(openssl rand -hex 32)"
echo "EXPRESS_SESSION_SECRET=$(openssl rand -hex 32)"
echo "TOKEN_HASH_SECRET=$(openssl rand -hex 32)"
echo ""
echo "=== Copiez ces valeurs dans Render Dashboard ==="
```

### Génération Manuelle

```bash
# Clé secrète principale
openssl rand -hex 32

# Secret JWT
openssl rand -base64 32

# Secret de session
openssl rand -base64 32
```

## ⚠️ Limitations Render

### Plan Gratuit

- **Mémoire** : 512MB RAM
- **CPU** : 0.1 CPU
- **Stockage** : Éphémère (perdu au redémarrage)
- **Mise en veille** : Après 15 minutes d'inactivité
- **Bande passante** : 100GB/mois

### Recommandations

1. **Utilisez SQLite** pour la base de données (stockage local)
2. **Limitez la taille des fichiers** uploadés
3. **Configurez des sauvegardes** régulières
4. **Utilisez un service de ping** pour éviter la mise en veille

## 🔄 Sauvegarde des Données

### Script de Sauvegarde

```bash
#!/bin/bash
# Sauvegarder les données Flowise sur Render

# Variables
APP_NAME="your-app-name"
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Créer le dossier de sauvegarde
mkdir -p $BACKUP_DIR

# Sauvegarder la base de données
curl -o "$BACKUP_DIR/database_$DATE.sqlite" \
  "https://$APP_NAME.onrender.com/api/v1/backup/database"

# Sauvegarder les fichiers uploadés
curl -o "$BACKUP_DIR/uploads_$DATE.tar.gz" \
  "https://$APP_NAME.onrender.com/api/v1/backup/uploads"

echo "Sauvegarde terminée : $BACKUP_DIR/"
```

## 🆘 Dépannage

### Problèmes Courants

1. **Build échoue** :
   - Vérifiez les logs de build dans Render Dashboard
   - Assurez-vous que `package.json` est correct
   - Vérifiez la version Node.js

2. **Application ne démarre pas** :
   - Vérifiez les logs de démarrage
   - Assurez-vous que le port est `10000`
   - Vérifiez les variables d'environnement

3. **Mise en veille fréquente** :
   - C'est normal avec le plan gratuit
   - Utilisez un service de ping pour maintenir l'app active

4. **Erreur de mémoire** :
   - Réduisez `NODE_OPTIONS` à `--max-old-space-size=256`
   - Optimisez votre application

### Service de Ping (Optionnel)

```javascript
// Ping automatique pour éviter la mise en veille
setInterval(() => {
  fetch('https://your-app.onrender.com/api/v1/ping')
    .catch(console.error);
}, 14 * 60 * 1000); // Toutes les 14 minutes
```

## 📈 Mise à Niveau

### Plan Payant

Si vous avez besoin de plus de ressources :

- **Starter** : $7/mois - Pas de mise en veille
- **Standard** : $25/mois - Plus de ressources
- **Pro** : $85/mois - Haute disponibilité

### Migration

1. **Sauvegardez vos données** avant la mise à niveau
2. **Mettez à niveau** dans Render Dashboard
3. **Redéployez** si nécessaire
4. **Testez** toutes les fonctionnalités

---

## 📚 Ressources

- **Documentation Render** : [render.com/docs](https://render.com/docs)
- **Documentation Flowise** : [docs.flowiseai.com](https://docs.flowiseai.com/)
- **Support Render** : [render.com/support](https://render.com/support)
