# Configuration des Variables d'Environnement Flowise

Ce document détaille toutes les variables d'environnement disponibles pour configurer Flowise sur Plesk.

## 🔧 Variables Principales

### Configuration du Serveur

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `PORT` | Port d'écoute du serveur | `3000` | `3000` |
| `NODE_ENV` | Environnement d'exécution | `development` | `production` |
| `APP_URL` | URL de base de l'application | `http://localhost:3000` | `https://votre-domaine.com` |

### Base de Données

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `DATABASE_TYPE` | Type de base de données | `sqlite` | `sqlite`, `postgres`, `mysql` |
| `DATABASE_PATH` | Chemin vers la base SQLite | `~/.flowise/database.sqlite` | `/var/www/vhosts/domaine.com/flowise_data/database.sqlite` |
| `DATABASE_HOST` | Hôte de la base de données | - | `localhost` |
| `DATABASE_PORT` | Port de la base de données | - | `5432` |
| `DATABASE_NAME` | Nom de la base de données | - | `flowise` |
| `DATABASE_USER` | Utilisateur de la base | - | `flowise_user` |
| `DATABASE_PASSWORD` | Mot de passe de la base | - | `motdepasse_securise` |
| `DATABASE_SSL` | Activer SSL pour la base | `false` | `true` |

### Sécurité et Authentification

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `FLOWISE_SECRETKEY_OVERWRITE` | Clé secrète principale | Générée automatiquement | `votre_cle_secrete_32_caracteres` |
| `JWT_AUTH_TOKEN_SECRET` | Secret pour les tokens JWT | Généré automatiquement | `jwt_secret_32_chars` |
| `JWT_REFRESH_TOKEN_SECRET` | Secret pour les refresh tokens | Généré automatiquement | `refresh_secret_32_chars` |
| `JWT_ISSUER` | Émetteur des tokens JWT | `flowise` | `votre-domaine.com` |
| `JWT_AUDIENCE` | Audience des tokens JWT | `flowise` | `votre-domaine.com` |
| `JWT_TOKEN_EXPIRY_IN_MINUTES` | Durée de vie des tokens (minutes) | `60` | `120` |
| `JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES` | Durée de vie des refresh tokens (minutes) | `10080` | `20160` |
| `EXPIRE_AUTH_TOKENS_ON_RESTART` | Expirer les tokens au redémarrage | `false` | `true` |
| `EXPRESS_SESSION_SECRET` | Secret pour les sessions Express | Généré automatiquement | `session_secret_32_chars` |
| `PASSWORD_SALT_HASH_ROUNDS` | Nombre de rounds pour le hachage | `10` | `12` |
| `TOKEN_HASH_SECRET` | Secret pour le hachage des tokens | Généré automatiquement | `token_hash_secret` |

### Stockage des Fichiers

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `STORAGE_TYPE` | Type de stockage | `local` | `local`, `s3`, `google` |
| `BLOB_STORAGE_PATH` | Chemin de stockage local | `~/.flowise/uploads` | `/var/www/vhosts/domaine.com/flowise_data/uploads` |

#### Configuration S3 (si STORAGE_TYPE=s3)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `S3_STORAGE_BUCKET_NAME` | Nom du bucket S3 | `mon-bucket-flowise` |
| `S3_STORAGE_ACCESS_KEY_ID` | Clé d'accès AWS | `AKIAIOSFODNN7EXAMPLE` |
| `S3_STORAGE_SECRET_ACCESS_KEY` | Clé secrète AWS | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `S3_STORAGE_REGION` | Région AWS | `eu-west-1` |
| `S3_ENDPOINT_URL` | URL du endpoint S3 | `https://s3.amazonaws.com` |
| `S3_FORCE_PATH_STYLE` | Forcer le style de chemin | `true` |

#### Configuration Google Cloud Storage (si STORAGE_TYPE=google)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `GOOGLE_CLOUD_STORAGE_CREDENTIAL` | Credentials JSON (base64) | `eyJ0eXBlIjoic2VydmljZV9hY2NvdW50Ii...` |
| `GOOGLE_CLOUD_STORAGE_PROJ_ID` | ID du projet Google Cloud | `mon-projet-gcp` |
| `GOOGLE_CLOUD_STORAGE_BUCKET_NAME` | Nom du bucket | `mon-bucket-flowise` |
| `GOOGLE_CLOUD_UNIFORM_BUCKET_ACCESS` | Accès uniforme au bucket | `true` |

### Logging et Debug

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `DEBUG` | Activer le mode debug | `false` | `true` |
| `LOG_LEVEL` | Niveau de log | `info` | `debug`, `info`, `warn`, `error` |
| `LOG_PATH` | Chemin des fichiers de log | `~/.flowise/logs` | `/var/www/vhosts/domaine.com/flowise_data/logs` |

### Configuration CORS et Sécurité

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `CORS_ORIGINS` | Origines autorisées pour CORS | `*` | `https://votre-domaine.com,https://app.votre-domaine.com` |
| `IFRAME_ORIGINS` | Origines autorisées pour iframe | - | `https://votre-domaine.com` |
| `NUMBER_OF_PROXIES` | Nombre de proxies devant l'app | `0` | `1` |
| `FLOWISE_FILE_SIZE_LIMIT` | Taille max des fichiers (MB) | `10` | `50` |

### Configuration Email (SMTP)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SMTP_HOST` | Serveur SMTP | `smtp.gmail.com` |
| `SMTP_PORT` | Port SMTP | `587` |
| `SMTP_USER` | Utilisateur SMTP | `votre-email@gmail.com` |
| `SMTP_PASSWORD` | Mot de passe SMTP | `votre_mot_de_passe_app` |
| `SMTP_SECURE` | Utiliser SSL/TLS | `true` |
| `ALLOW_UNAUTHORIZED_CERTS` | Autoriser les certificats non autorisés | `false` |
| `SENDER_EMAIL` | Email expéditeur | `noreply@votre-domaine.com` |

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

### Configuration Enterprise

| Variable | Description | Exemple |
|----------|-------------|---------|
| `LICENSE_URL` | URL de la licence | `https://license.flowiseai.com` |
| `FLOWISE_EE_LICENSE_KEY` | Clé de licence Enterprise | `ee_license_key_here` |
| `OFFLINE` | Mode hors ligne | `false` |
| `INVITE_TOKEN_EXPIRY_IN_HOURS` | Durée des invitations (heures) | `24` |

### Configuration des Nœuds

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `SHOW_COMMUNITY_NODES` | Afficher les nœuds communautaires | `true` | `false` |
| `DISABLED_NODES` | Nœuds désactivés (séparés par virgule) | - | `OpenAI,Anthropic` |
| `MODEL_LIST_CONFIG_JSON` | Configuration des modèles (JSON) | - | `{"openai":["gpt-4","gpt-3.5-turbo"]}` |

### Télémétrie et Métriques

| Variable | Description | Valeur par défaut | Exemple |
|----------|-------------|-------------------|---------|
| `DISABLE_FLOWISE_TELEMETRY` | Désactiver la télémétrie | `false` | `true` |
| `ENABLE_METRICS` | Activer les métriques | `false` | `true` |
| `METRICS_PROVIDER` | Fournisseur de métriques | `prometheus` | `prometheus`, `datadog` |
| `METRICS_SERVICE_NAME` | Nom du service pour les métriques | `flowise` | `flowise-prod` |

## 🔐 Génération de Clés Secrètes

### Script de génération automatique

```bash
#!/bin/bash
# Générer des clés secrètes sécurisées

echo "FLOWISE_SECRETKEY_OVERWRITE=$(openssl rand -hex 32)"
echo "JWT_AUTH_TOKEN_SECRET=$(openssl rand -hex 32)"
echo "JWT_REFRESH_TOKEN_SECRET=$(openssl rand -hex 32)"
echo "EXPRESS_SESSION_SECRET=$(openssl rand -hex 32)"
echo "TOKEN_HASH_SECRET=$(openssl rand -hex 32)"
```

### Génération manuelle

```bash
# Clé secrète principale
openssl rand -hex 32

# Secret JWT
openssl rand -base64 32

# Secret de session
openssl rand -base64 32
```

## 📝 Exemple de Configuration Complète

```bash
# Configuration de base pour Plesk
PORT=3000
NODE_ENV=production
APP_URL=https://votre-domaine.com

# Base de données SQLite
DATABASE_TYPE=sqlite
DATABASE_PATH=/var/www/vhosts/votre-domaine.com/flowise_data/database.sqlite

# Sécurité
FLOWISE_SECRETKEY_OVERWRITE=votre_cle_secrete_32_caracteres
JWT_AUTH_TOKEN_SECRET=jwt_secret_32_chars
JWT_REFRESH_TOKEN_SECRET=refresh_secret_32_chars
JWT_ISSUER=votre-domaine.com
JWT_AUDIENCE=votre-domaine.com

# Stockage local
STORAGE_TYPE=local
BLOB_STORAGE_PATH=/var/www/vhosts/votre-domaine.com/flowise_data/uploads

# Logging
LOG_LEVEL=info
LOG_PATH=/var/www/vhosts/votre-domaine.com/flowise_data/logs

# CORS
CORS_ORIGINS=https://votre-domaine.com

# Limites
FLOWISE_FILE_SIZE_LIMIT=10

# Désactiver la télémétrie
DISABLE_FLOWISE_TELEMETRY=true
```

## ⚠️ Recommandations de Sécurité

1. **Changez toutes les clés par défaut** avant la mise en production
2. **Utilisez HTTPS** avec des certificats SSL valides
3. **Limitez les origines CORS** à vos domaines uniquement
4. **Configurez un firewall** pour limiter l'accès
5. **Sauvegardez régulièrement** la base de données
6. **Surveillez les logs** pour détecter les activités suspectes
7. **Mettez à jour régulièrement** Flowise et ses dépendances

## 🔄 Migration des Variables

Si vous migrez d'une installation existante :

1. **Exportez les variables** de l'ancienne installation
2. **Adaptez les chemins** pour Plesk
3. **Testez la configuration** en mode développement
4. **Déployez en production** une fois validé
