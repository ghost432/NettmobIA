#!/bin/bash

# Script de déploiement automatique de Flowise sur Render
# Usage: ./deploy-to-render.sh [app-name] [method]
# Exemple: ./deploy-to-render.sh flowise-ai nodejs

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
    echo -e "${BLUE}  Déploiement Flowise sur Render${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Vérification des paramètres
if [ $# -lt 2 ]; then
    print_error "Usage: $0 <app-name> <method>"
    print_error "Méthodes disponibles: nodejs, docker"
    print_error "Exemple: $0 flowise-ai nodejs"
    exit 1
fi

APP_NAME=$1
METHOD=$2
APP_URL="https://$APP_NAME.onrender.com"

print_header

# Vérification des prérequis
print_message "Vérification des prérequis..."

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    print_error "Git n'est pas installé"
    exit 1
fi

# Vérifier si Node.js est installé (pour la méthode nodejs)
if [ "$METHOD" = "nodejs" ]; then
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé. Veuillez installer Node.js 18.15.0+"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    print_message "Version Node.js détectée: $NODE_VERSION"
    
    # Vérifier la version minimale
    if ! node -e "process.exit(parseInt(process.version.slice(1).split('.')[0]) >= 18 ? 0 : 1)" 2>/dev/null; then
        print_error "Node.js version 18.15.0+ requis. Version actuelle: $NODE_VERSION"
        exit 1
    fi
fi

# Vérifier si Docker est installé (pour la méthode docker)
if [ "$METHOD" = "docker" ]; then
    if ! command -v docker &> /dev/null; then
        print_error "Docker n'est pas installé"
        exit 1
    fi
    
    print_message "Docker détecté"
fi

# Vérifier si le repository Git existe
if [ ! -d ".git" ]; then
    print_error "Ce n'est pas un repository Git. Veuillez initialiser Git d'abord."
    print_error "git init && git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Vérifier si le repository est connecté à GitHub
if ! git remote get-url origin &> /dev/null; then
    print_warning "Aucun remote 'origin' trouvé. Veuillez ajouter votre repository GitHub :"
    print_warning "git remote add origin https://github.com/votre-username/votre-repo.git"
    exit 1
fi

print_message "Repository Git détecté : $(git remote get-url origin)"

# Création des fichiers de configuration
print_message "Création des fichiers de configuration..."

# Créer le dossier render-deployment s'il n'existe pas
mkdir -p render-deployment

# Copier les fichiers de configuration
if [ "$METHOD" = "nodejs" ]; then
    # Configuration Node.js
    cp render-deployment/package.json ./
    cp render-deployment/render.yaml ./
    
    print_message "Fichiers de configuration Node.js copiés"
    
elif [ "$METHOD" = "docker" ]; then
    # Configuration Docker
    cp render-deployment/Dockerfile ./
    cp render-deployment/render.yaml ./
    
    print_message "Fichiers de configuration Docker copiés"
fi

# Générer des clés secrètes
print_message "Génération des clés secrètes..."

SECRET_KEY=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 32)
JWT_REFRESH_SECRET=$(openssl rand -hex 32)
SESSION_SECRET=$(openssl rand -hex 32)
TOKEN_HASH_SECRET=$(openssl rand -hex 32)

# Mettre à jour render.yaml avec les clés générées
sed -i "s/your-app-name/$APP_NAME/g" render.yaml
sed -i "s/flowise.onrender.com/$APP_NAME.onrender.com/g" render.yaml

print_message "Clés secrètes générées et configuration mise à jour"

# Créer un fichier .env.local pour référence
cat > .env.local << EOF
# Configuration Flowise pour Render - $APP_NAME
# Généré automatiquement le $(date)

# Configuration de base
NODE_ENV=production
PORT=10000
APP_URL=$APP_URL

# Base de données
DATABASE_TYPE=sqlite
DATABASE_PATH=/opt/render/project/src/database.sqlite

# Sécurité (générées automatiquement)
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
EOF

print_message "Fichier .env.local créé pour référence"

# Ajouter les fichiers au repository Git
print_message "Ajout des fichiers au repository Git..."

git add .
git commit -m "Add Render deployment configuration for $APP_NAME" || print_warning "Aucun changement à commiter"

# Pousser vers GitHub
print_message "Poussée vers GitHub..."
git push origin main || git push origin master

print_message "Code poussé vers GitHub avec succès"

# Instructions pour Render
print_header
print_message "🎉 Configuration terminée !"
print_message ""
print_message "📋 Prochaines étapes :"
print_message ""
print_message "1. 🌐 Allez sur https://render.com/"
print_message "2. 🔐 Connectez-vous avec votre compte GitHub"
print_message "3. ➕ Cliquez sur 'New' → 'Web Service'"
print_message "4. 🔗 Connectez votre repository Flowise"
print_message "5. ⚙️ Configurez le service :"
print_message ""

if [ "$METHOD" = "nodejs" ]; then
    print_message "   📝 Configuration Node.js :"
    print_message "      - Name: $APP_NAME"
    print_message "      - Environment: Node"
    print_message "      - Build Command: npm install && npm run build"
    print_message "      - Start Command: npm start"
    print_message "      - Instance Type: Free"
    print_message ""
elif [ "$METHOD" = "docker" ]; then
    print_message "   🐳 Configuration Docker :"
    print_message "      - Name: $APP_NAME"
    print_message "      - Environment: Docker"
    print_message "      - Dockerfile Path: ./Dockerfile"
    print_message "      - Instance Type: Free"
    print_message ""
fi

print_message "6. 🔧 Ajoutez les variables d'environnement :"
print_message "      - NODE_ENV: production"
print_message "      - PORT: 10000"
print_message "      - DATABASE_TYPE: sqlite"
print_message "      - DATABASE_PATH: /opt/render/project/src/database.sqlite"
print_message "      - FLOWISE_SECRETKEY_OVERWRITE: $SECRET_KEY"
print_message "      - JWT_AUTH_TOKEN_SECRET: $JWT_SECRET"
print_message "      - JWT_REFRESH_TOKEN_SECRET: $JWT_REFRESH_SECRET"
print_message "      - EXPRESS_SESSION_SECRET: $SESSION_SECRET"
print_message "      - TOKEN_HASH_SECRET: $TOKEN_HASH_SECRET"
print_message "      - APP_URL: $APP_URL"
print_message "      - STORAGE_TYPE: local"
print_message "      - BLOB_STORAGE_PATH: /opt/render/project/src/uploads"
print_message "      - LOG_LEVEL: info"
print_message "      - LOG_PATH: /opt/render/project/src/logs"
print_message "      - CORS_ORIGINS: $APP_URL"
print_message "      - DISABLE_FLOWISE_TELEMETRY: true"
print_message "      - FLOWISE_FILE_SIZE_LIMIT: 10"
print_message "      - NODE_OPTIONS: --max-old-space-size=512"
print_message ""
print_message "7. 🚀 Cliquez sur 'Create Web Service'"
print_message "8. ⏳ Attendez le déploiement (5-10 minutes)"
print_message "9. 🎯 Accédez à votre application : $APP_URL"
print_message ""

print_warning "⚠️ Important :"
print_warning "   - Le plan gratuit met l'app en veille après 15 min d'inactivité"
print_warning "   - Le redémarrage prend 30-60 secondes"
print_warning "   - Les données sont stockées localement (perdues au redémarrage)"
print_warning "   - Configurez des sauvegardes régulières"
print_message ""

print_message "📚 Documentation :"
print_message "   - Guide complet : render-deployment/README.md"
print_message "   - Variables d'environnement : render-deployment/RENDER_VARIABLES.md"
print_message "   - Configuration locale : .env.local"
print_message ""

print_message "🔧 Commandes utiles :"
print_message "   - Logs Render : render.com/dashboard → $APP_NAME → Logs"
print_message "   - Redéploiement : render.com/dashboard → $APP_NAME → Manual Deploy"
print_message "   - Variables d'env : render.com/dashboard → $APP_NAME → Environment"
print_message ""

print_message "🆘 Support :"
print_message "   - Documentation Render : https://render.com/docs"
print_message "   - Documentation Flowise : https://docs.flowiseai.com/"
print_message "   - Support Render : https://render.com/support"
print_message ""

print_header
print_message "🎉 Déploiement prêt ! Votre Flowise sera accessible sur : $APP_URL"
print_message "📁 Fichiers créés :"
print_message "   - render.yaml (configuration Render)"
print_message "   - .env.local (variables d'environnement)"
if [ "$METHOD" = "nodejs" ]; then
    print_message "   - package.json (configuration Node.js)"
elif [ "$METHOD" = "docker" ]; then
    print_message "   - Dockerfile (configuration Docker)"
fi
print_message ""
print_message "🚀 Bon déploiement sur Render !"
