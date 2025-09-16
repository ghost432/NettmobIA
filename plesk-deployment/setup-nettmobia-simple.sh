#!/bin/bash

# Script simple pour configurer Flowise dans NettmobIA
# Usage: ./setup-nettmobia-simple.sh

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
    echo -e "${BLUE}  Configuration Flowise NettmobIA${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_header

# Détecter le répertoire actuel
CURRENT_DIR=$(pwd)
print_message "📁 Répertoire actuel : $CURRENT_DIR"

# Vérifier si nous sommes dans le bon répertoire
if [[ "$CURRENT_DIR" != *"NettmobIA"* ]]; then
    print_warning "Vous n'êtes pas dans le répertoire NettmobIA"
    print_message "Veuillez d'abord aller dans votre répertoire NettmobIA :"
    print_message "cd /var/www/vhosts/france.nettmobinfotech.fr/NettmobIA"
    exit 1
fi

# Vérifier si Node.js est disponible
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez installer l'extension Node.js dans Plesk"
    print_error "Extensions > Catalogue des extensions > Node.js"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2)
print_message "✅ Version Node.js détectée: $NODE_VERSION"

# Vérifier la version minimale
if ! node -e "process.exit(parseInt(process.version.slice(1).split('.')[0]) >= 18 ? 0 : 1)" 2>/dev/null; then
    print_error "Node.js version 18.15.0+ requis. Version actuelle: $NODE_VERSION"
    exit 1
fi

# Vérifier si PNPM est installé
if ! command -v pnpm &> /dev/null; then
    print_message "📦 Installation de PNPM..."
    npm install -g pnpm
fi

print_message "✅ PNPM détecté : $(pnpm --version)"

# Créer le fichier app.js
print_message "📝 Création du fichier app.js..."

cat > app.js << 'EOF'
#!/usr/bin/env node

/**
 * Point d'entrée Flowise pour NettmobIA sur Plesk
 */

const { spawn } = require('child_process');
const path = require('path');

// Définir le répertoire de travail vers le serveur Flowise
const serverPath = path.join(__dirname, 'packages', 'server', 'bin');

console.log('🚀 Démarrage de Flowise pour NettmobIA...');
console.log('📁 Répertoire serveur:', serverPath);

// Démarrer le serveur Flowise
const flowiseProcess = spawn('node', ['run', 'start'], {
    cwd: serverPath,
    stdio: 'inherit',
    env: {
        ...process.env,
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000
    }
});

flowiseProcess.on('error', (error) => {
    console.error('❌ Erreur lors du démarrage de Flowise:', error);
    process.exit(1);
});

flowiseProcess.on('exit', (code) => {
    console.log(`🔄 Processus Flowise terminé avec le code ${code}`);
    process.exit(code);
});

// Gestion de l'arrêt gracieux
process.on('SIGTERM', () => {
    console.log('🛑 Signal SIGTERM reçu, arrêt en cours...');
    flowiseProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
    console.log('🛑 Signal SIGINT reçu, arrêt en cours...');
    flowiseProcess.kill('SIGINT');
});
EOF

# Créer le package.json
print_message "📦 Création du package.json..."

cat > package.json << EOF
{
    "name": "nettmobia-flowise",
    "version": "1.0.0",
    "description": "Flowise deployment pour NettmobIA sur Plesk",
    "main": "app.js",
    "scripts": {
        "start": "node app.js",
        "build": "pnpm build",
        "dev": "pnpm dev",
        "install-deps": "pnpm install"
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
        "nettmobia",
        "plesk"
    ],
    "author": "NettmobIA",
    "license": "Apache-2.0"
}
EOF

# Créer le fichier .env
print_message "🔧 Création du fichier .env..."

# Générer des clés secrètes
SECRET_KEY=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 32)
JWT_REFRESH_SECRET=$(openssl rand -hex 32)
SESSION_SECRET=$(openssl rand -hex 32)
TOKEN_HASH_SECRET=$(openssl rand -hex 32)

cat > .env << EOF
# Configuration Flowise pour NettmobIA sur Plesk
# Généré automatiquement le $(date)

# Configuration de base
NODE_ENV=production
PORT=3000

# Base de données SQLite
DATABASE_TYPE=sqlite
DATABASE_PATH=./flowise_data/database.sqlite

# Sécurité
FLOWISE_SECRETKEY_OVERWRITE=$SECRET_KEY
JWT_AUTH_TOKEN_SECRET=$JWT_SECRET
JWT_REFRESH_TOKEN_SECRET=$JWT_REFRESH_SECRET
EXPRESS_SESSION_SECRET=$SESSION_SECRET
TOKEN_HASH_SECRET=$TOKEN_HASH_SECRET

# Configuration de l'application
APP_URL=https://france.nettmobinfotech.fr

# Stockage
STORAGE_TYPE=local
BLOB_STORAGE_PATH=./flowise_data/uploads

# Logging
LOG_LEVEL=info
LOG_PATH=./flowise_data/logs

# CORS et sécurité
CORS_ORIGINS=https://france.nettmobinfotech.fr
DISABLE_FLOWISE_TELEMETRY=true

# Limites
FLOWISE_FILE_SIZE_LIMIT=10

# Configuration Node.js
NODE_OPTIONS=--max-old-space-size=1024

# Configuration JWT
JWT_ISSUER=france.nettmobinfotech.fr
JWT_AUDIENCE=france.nettmobinfotech.fr
JWT_TOKEN_EXPIRY_IN_MINUTES=60
JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES=10080

# Configuration des nœuds
SHOW_COMMUNITY_NODES=true
DISABLED_NODES=

# Configuration email (optionnel)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_SECURE=true
SENDER_EMAIL=noreply@france.nettmobinfotech.fr
EOF

# Créer le dossier de données
print_message "📁 Création du dossier de données..."

mkdir -p flowise_data/{uploads,logs}
chmod 755 flowise_data
chmod 755 flowise_data/uploads
chmod 755 flowise_data/logs

# Installer les dépendances
print_message "📦 Installation des dépendances..."

# Installer les dépendances Flowise
print_message "🔄 Installation des dépendances Flowise..."
pnpm install

# Build de l'application
print_message "🔨 Construction de l'application..."
pnpm build

print_message "✅ Dépendances installées et application construite"

# Corriger les permissions
print_message "🔐 Correction des permissions..."

chmod +x app.js
chmod 755 flowise_data
chmod 755 flowise_data/uploads
chmod 755 flowise_data/logs

print_message "✅ Permissions corrigées"

# Instructions de configuration Plesk
print_header
print_message "🎉 Configuration terminée !"
print_message ""
print_message "📋 Configuration dans Plesk :"
print_message ""
print_message "1. 🌐 Allez dans Plesk Dashboard"
print_message "2. 🏠 Allez dans 'Sites Web & Domaines'"
print_message "3. 🔍 Sélectionnez le domaine : france.nettmobinfotech.fr"
print_message "4. 📱 Cliquez sur l'onglet 'Node.js'"
print_message "5. ⚙️ Configurez les paramètres suivants :"
print_message ""
print_message "   📝 Configuration Node.js :"
print_message "      - Version Node.js: $NODE_VERSION"
print_message "      - Racine de l'application: $CURRENT_DIR"
print_message "      - Fichier de démarrage: app.js"
print_message "      - Mode de l'application: Production"
print_message ""
print_message "6. 🔧 Variables d'environnement importantes :"
print_message "      - NODE_ENV: production"
print_message "      - PORT: 3000"
print_message "      - DATABASE_PATH: ./flowise_data/database.sqlite"
print_message "      - BLOB_STORAGE_PATH: ./flowise_data/uploads"
print_message "      - LOG_PATH: ./flowise_data/logs"
print_message "      - APP_URL: https://france.nettmobinfotech.fr"
print_message ""
print_message "7. 🚀 Cliquez sur 'Activer Node.js'"
print_message "8. ⏳ Attendez le démarrage (1-2 minutes)"
print_message "9. 🎯 Accédez à votre application : https://france.nettmobinfotech.fr"
print_message ""

print_warning "⚠️ Points importants :"
print_warning "   - Assurez-vous que l'extension Node.js est installée dans Plesk"
print_warning "   - Vérifiez que le port 3000 est disponible"
print_warning "   - Les données sont stockées dans : ./flowise_data"
print_warning "   - Sauvegardez régulièrement le dossier de données"
print_message ""

print_message "🔍 Vérification après activation :"
print_message "   1. Allez sur https://france.nettmobinfotech.fr"
print_message "   2. Vous devriez voir l'interface Flowise"
print_message "   3. Si erreur, vérifiez les logs dans Plesk"
print_message "   4. Testez l'endpoint de santé : https://france.nettmobinfotech.fr/api/v1/ping"
print_message ""

print_message "📁 Fichiers créés :"
print_message "   - app.js (point d'entrée)"
print_message "   - package.json (configuration NPM)"
print_message "   - .env (variables d'environnement)"
print_message "   - flowise_data/ (données de l'application)"
print_message ""

print_message "🆘 En cas de problème :"
print_message "   1. Vérifiez les logs dans Plesk > Node.js > Logs"
print_message "   2. Assurez-vous que Node.js est activé"
print_message "   3. Vérifiez les permissions des fichiers"
print_message "   4. Redémarrez l'application Node.js"
print_message ""

print_header
print_message "🚀 Configuration prête ! Suivez les étapes ci-dessus dans Plesk."
print_message "📁 Répertoire de travail : $CURRENT_DIR"
print_message "💾 Données stockées dans : ./flowise_data"
print_message ""
print_message "🎯 Votre Flowise sera accessible sur : https://france.nettmobinfotech.fr"
