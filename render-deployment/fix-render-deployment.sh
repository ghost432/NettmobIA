#!/bin/bash

# Script de correction pour le déploiement Flowise sur Render
# Usage: ./fix-render-deployment.sh [app-name]
# Exemple: ./fix-render-deployment.sh flowise-ai

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Correction Déploiement Render${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Vérification des paramètres
if [ $# -lt 1 ]; then
    print_error "Usage: $0 <app-name>"
    print_error "Exemple: $0 flowise-ai"
    exit 1
fi

APP_NAME=$1
APP_URL="https://$APP_NAME.onrender.com"

print_header

print_message "🔧 Correction du déploiement Flowise sur Render"
print_message "Application : $APP_NAME"
print_message "URL : $APP_URL"
print_message ""

# Générer des clés secrètes
print_message "🔐 Génération de nouvelles clés secrètes..."

SECRET_KEY=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 32)
JWT_REFRESH_SECRET=$(openssl rand -hex 32)
SESSION_SECRET=$(openssl rand -hex 32)
TOKEN_HASH_SECRET=$(openssl rand -hex 32)

print_message "✅ Clés secrètes générées"

# Créer un fichier de configuration corrigé
print_message "📝 Création de la configuration corrigée..."

cat > render-fixed.yaml << EOF
services:
  - type: web
    name: $APP_NAME
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
      
      # Sécurité
      - key: FLOWISE_SECRETKEY_OVERWRITE
        value: $SECRET_KEY
      - key: JWT_AUTH_TOKEN_SECRET
        value: $JWT_SECRET
      - key: JWT_REFRESH_TOKEN_SECRET
        value: $JWT_REFRESH_SECRET
      - key: EXPRESS_SESSION_SECRET
        value: $SESSION_SECRET
      - key: TOKEN_HASH_SECRET
        value: $TOKEN_HASH_SECRET
      
      # Configuration de l'application
      - key: APP_URL
        value: $APP_URL
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
        value: $APP_URL
      - key: DISABLE_FLOWISE_TELEMETRY
        value: true
      
      # Limites
      - key: FLOWISE_FILE_SIZE_LIMIT
        value: 10
      
      # Configuration Node.js
      - key: NODE_OPTIONS
        value: --max-old-space-size=512
      
      # Configuration JWT
      - key: JWT_ISSUER
        value: $APP_NAME.onrender.com
      - key: JWT_AUDIENCE
        value: $APP_NAME.onrender.com
      - key: JWT_TOKEN_EXPIRY_IN_MINUTES
        value: 60
      - key: JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES
        value: 10080
      
      # Configuration des nœuds
      - key: SHOW_COMMUNITY_NODES
        value: true
      - key: DISABLED_NODES
        value: ""
      
      # Configuration email (optionnel)
      - key: SMTP_HOST
        value: ""
      - key: SMTP_PORT
        value: 587
      - key: SMTP_USER
        value: ""
      - key: SMTP_PASSWORD
        value: ""
      - key: SMTP_SECURE
        value: true
      - key: SENDER_EMAIL
        value: noreply@$APP_NAME.onrender.com
EOF

print_message "✅ Fichier render-fixed.yaml créé"

# Créer un package.json corrigé
print_message "📦 Création du package.json corrigé..."

cat > package-fixed.json << EOF
{
  "name": "flowise-render-fixed",
  "version": "1.0.0",
  "description": "Flowise deployment package for Render - Fixed",
  "main": "packages/server/dist/index.js",
  "scripts": {
    "start": "cd packages/server && node dist/index.js",
    "build": "pnpm build",
    "dev": "pnpm dev",
    "install-deps": "pnpm install",
    "postinstall": "pnpm build"
  },
  "engines": {
    "node": ">=18.15.0 <19.0.0 || ^20",
    "pnpm": ">=9"
  },
  "dependencies": {
    "flowise": "latest"
  },
  "keywords": [
    "flowise",
    "ai",
    "chatbot",
    "render",
    "deployment"
  ],
  "author": "FlowiseAI",
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/FlowiseAI/Flowise.git"
  }
}
EOF

print_message "✅ Fichier package-fixed.json créé"

# Créer un fichier de variables d'environnement
print_message "🔧 Création du fichier de variables d'environnement..."

cat > .env.render << EOF
# Configuration Flowise pour Render - $APP_NAME
# Généré automatiquement le $(date)

# Configuration de base
NODE_ENV=production
PORT=10000
APP_URL=$APP_URL

# Base de données
DATABASE_TYPE=sqlite
DATABASE_PATH=/opt/render/project/src/database.sqlite

# Sécurité
FLOWISE_SECRETKEY_OVERWRITE=$SECRET_KEY
JWT_AUTH_TOKEN_SECRET=$JWT_SECRET
JWT_REFRESH_TOKEN_SECRET=$JWT_REFRESH_SECRET
EXPRESS_SESSION_SECRET=$SESSION_SECRET
TOKEN_HASH_SECRET=$TOKEN_HASH_SECRET

# Stockage et logs
STORAGE_TYPE=local
BLOB_STORAGE_PATH=/opt/render/project/src/uploads
LOG_LEVEL=info
LOG_PATH=/opt/render/project/src/logs

# CORS et sécurité
CORS_ORIGINS=$APP_URL
DISABLE_FLOWISE_TELEMETRY=true
FLOWISE_FILE_SIZE_LIMIT=10

# Configuration Node.js
NODE_OPTIONS=--max-old-space-size=512

# Configuration JWT
JWT_ISSUER=$APP_NAME.onrender.com
JWT_AUDIENCE=$APP_NAME.onrender.com
JWT_TOKEN_EXPIRY_IN_MINUTES=60
JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES=10080

# Configuration des nœuds
SHOW_COMMUNITY_NODES=true
DISABLED_NODES=

# Configuration email
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_SECURE=true
SENDER_EMAIL=noreply@$APP_NAME.onrender.com
EOF

print_message "✅ Fichier .env.render créé"

# Instructions de correction
print_header
print_message "🎉 Configuration de correction créée !"
print_message ""
print_message "📋 Étapes de correction :"
print_message ""
print_message "1. 🌐 Allez sur https://render.com/dashboard"
print_message "2. 🔍 Trouvez votre service : $APP_NAME"
print_message "3. ⚙️ Allez dans 'Environment'"
print_message "4. 🔧 Mettez à jour ces variables :"
print_message ""
print_message "   📝 Variables obligatoires :"
print_message "      - NODE_ENV = production"
print_message "      - PORT = 10000"
print_message "      - DATABASE_TYPE = sqlite"
print_message "      - DATABASE_PATH = /opt/render/project/src/database.sqlite"
print_message "      - FLOWISE_SECRETKEY_OVERWRITE = $SECRET_KEY"
print_message "      - JWT_AUTH_TOKEN_SECRET = $JWT_SECRET"
print_message "      - JWT_REFRESH_TOKEN_SECRET = $JWT_REFRESH_SECRET"
print_message "      - EXPRESS_SESSION_SECRET = $SESSION_SECRET"
print_message "      - TOKEN_HASH_SECRET = $TOKEN_HASH_SECRET"
print_message "      - APP_URL = $APP_URL"
print_message "      - STORAGE_TYPE = local"
print_message "      - BLOB_STORAGE_PATH = /opt/render/project/src/uploads"
print_message "      - LOG_LEVEL = info"
print_message "      - LOG_PATH = /opt/render/project/src/logs"
print_message "      - CORS_ORIGINS = $APP_URL"
print_message "      - DISABLE_FLOWISE_TELEMETRY = true"
print_message "      - FLOWISE_FILE_SIZE_LIMIT = 10"
print_message "      - NODE_OPTIONS = --max-old-space-size=512"
print_message ""
print_message "5. 💾 Sauvegardez les changements"
print_message "6. 🔄 Redéployez le service :"
print_message "      - Allez dans 'Manual Deploy'"
print_message "      - Cliquez sur 'Clear build cache & deploy'"
print_message "7. ⏳ Attendez le redéploiement (5-10 minutes)"
print_message "8. 🎯 Testez votre application : $APP_URL"
print_message ""

print_warning "⚠️ Points importants :"
print_warning "   - Assurez-vous que PORT=10000 est défini"
print_warning "   - Vérifiez que toutes les variables sont correctes"
print_warning "   - Le redéploiement peut prendre 5-10 minutes"
print_warning "   - Consultez les logs en cas de problème"
print_message ""

print_message "🔍 Vérification après redéploiement :"
print_message "   1. Allez sur $APP_URL"
print_message "   2. Vous devriez voir l'interface Flowise"
print_message "   3. Si 'Not Found', vérifiez les logs"
print_message "   4. Testez l'endpoint de santé : $APP_URL/api/v1/ping"
print_message ""

print_message "📚 Fichiers créés :"
print_message "   - render-fixed.yaml (configuration complète)"
print_message "   - package-fixed.json (package.json corrigé)"
print_message "   - .env.render (variables d'environnement)"
print_message ""

print_message "🆘 Si le problème persiste :"
print_message "   1. Consultez les logs dans Render Dashboard"
print_message "   2. Vérifiez que le service est 'Live' (pas 'Sleeping')"
print_message "   3. Assurez-vous que le build s'est bien passé"
print_message "   4. Vérifiez que toutes les variables sont définies"
print_message ""

print_header
print_message "🚀 Correction prête ! Suivez les étapes ci-dessus."
print_message "📁 Fichiers de référence créés dans le répertoire courant."
print_message ""
print_message "💡 Conseil : Copiez-collez les variables une par une pour éviter les erreurs."
