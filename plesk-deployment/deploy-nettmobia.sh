#!/bin/bash

# Script de déploiement Flowise sur Plesk pour le projet NettmobIA
# Usage: ./deploy-nettmobia.sh [domain]
# Exemple: ./deploy-nettmobia.sh france.nettmobinfotech.fr

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
    echo -e "${BLUE}  Déploiement Flowise NettmobIA${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Vérification des paramètres
if [ $# -lt 1 ]; then
    print_error "Usage: $0 <domain>"
    print_error "Exemple: $0 france.nettmobinfotech.fr"
    exit 1
fi

DOMAIN=$1
HTTPDOCS_PATH="/var/www/vhosts/$DOMAIN/httpdocs"
NETTMOBIA_PATH="/var/www/vhosts/$DOMAIN/NettmobIA"
FLOWISE_DATA_PATH="/var/www/vhosts/$DOMAIN/flowise_data"

print_header

print_message "🚀 Déploiement Flowise pour NettmobIA"
print_message "Domaine : $DOMAIN"
print_message "Répertoire NettmobIA : $NETTMOBIA_PATH"
print_message ""

# Vérification des prérequis
print_message "🔍 Vérification des prérequis..."

# Vérifier si le domaine existe
if [ ! -d "/var/www/vhosts/$DOMAIN" ]; then
    print_error "Le domaine $DOMAIN n'existe pas dans Plesk"
    exit 1
fi

# Vérifier si le répertoire NettmobIA existe
if [ ! -d "$NETTMOBIA_PATH" ]; then
    print_error "Le répertoire NettmobIA n'existe pas : $NETTMOBIA_PATH"
    exit 1
fi

print_message "✅ Répertoire NettmobIA trouvé : $NETTMOBIA_PATH"

# Vérifier si Node.js est disponible
if ! command -v node &> /dev/null; then
    print_warning "Node.js n'est pas installé. Veuillez installer l'extension Node.js dans Plesk"
    print_warning "Extensions > Catalogue des extensions > Node.js"
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

# Création des dossiers nécessaires
print_message "📁 Création des dossiers nécessaires..."

mkdir -p "$FLOWISE_DATA_PATH"/{uploads,logs}
chmod 755 "$FLOWISE_DATA_PATH"
chmod 755 "$FLOWISE_DATA_PATH"/uploads
chmod 755 "$FLOWISE_DATA_PATH"/logs

print_message "✅ Dossiers créés : $FLOWISE_DATA_PATH"

# Copier les fichiers de déploiement dans NettmobIA
print_message "📋 Copie des fichiers de déploiement..."

# Créer le fichier app.js pour NettmobIA
cat > "$NETTMOBIA_PATH/app.js" << 'EOF'
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

# Créer le package.json pour NettmobIA
cat > "$NETTMOBIA_PATH/package.json" << EOF
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

# Créer le fichier .env pour NettmobIA
cat > "$NETTMOBIA_PATH/.env" << EOF
# Configuration Flowise pour NettmobIA sur Plesk
# Généré automatiquement le $(date)

# Configuration de base
NODE_ENV=production
PORT=3000

# Base de données SQLite
DATABASE_TYPE=sqlite
DATABASE_PATH=$FLOWISE_DATA_PATH/database.sqlite

# Sécurité (générées automatiquement)
FLOWISE_SECRETKEY_OVERWRITE=$(openssl rand -hex 32)
JWT_AUTH_TOKEN_SECRET=$(openssl rand -hex 32)
JWT_REFRESH_TOKEN_SECRET=$(openssl rand -hex 32)
EXPRESS_SESSION_SECRET=$(openssl rand -hex 32)
TOKEN_HASH_SECRET=$(openssl rand -hex 32)

# Configuration de l'application
APP_URL=https://$DOMAIN

# Stockage
STORAGE_TYPE=local
BLOB_STORAGE_PATH=$FLOWISE_DATA_PATH/uploads

# Logging
LOG_LEVEL=info
LOG_PATH=$FLOWISE_DATA_PATH/logs

# CORS et sécurité
CORS_ORIGINS=https://$DOMAIN
DISABLE_FLOWISE_TELEMETRY=true

# Limites
FLOWISE_FILE_SIZE_LIMIT=10

# Configuration Node.js
NODE_OPTIONS=--max-old-space-size=1024

# Configuration JWT
JWT_ISSUER=$DOMAIN
JWT_AUDIENCE=$DOMAIN
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
SENDER_EMAIL=noreply@$DOMAIN
EOF

print_message "✅ Fichiers de configuration créés dans NettmobIA"

# Installer les dépendances
print_message "📦 Installation des dépendances..."

cd "$NETTMOBIA_PATH"

# Installer PNPM si pas déjà fait
if ! command -v pnpm &> /dev/null; then
    npm install -g pnpm
fi

# Installer les dépendances Flowise
print_message "🔄 Installation des dépendances Flowise..."
pnpm install

# Build de l'application
print_message "🔨 Construction de l'application..."
pnpm build

print_message "✅ Dépendances installées et application construite"

# Corriger les permissions
print_message "🔐 Correction des permissions..."

chown -R psacln:psaserv "$NETTMOBIA_PATH"
chown -R psacln:psaserv "$FLOWISE_DATA_PATH"
chmod -R 755 "$NETTMOBIA_PATH"
chmod -R 755 "$FLOWISE_DATA_PATH"

print_message "✅ Permissions corrigées"

# Instructions de configuration Plesk
print_header
print_message "🎉 Déploiement terminé !"
print_message ""
print_message "📋 Configuration dans Plesk :"
print_message ""
print_message "1. 🌐 Allez dans Plesk Dashboard"
print_message "2. 🏠 Allez dans 'Sites Web & Domaines'"
print_message "3. 🔍 Sélectionnez le domaine : $DOMAIN"
print_message "4. 📱 Cliquez sur l'onglet 'Node.js'"
print_message "5. ⚙️ Configurez les paramètres suivants :"
print_message ""
print_message "   📝 Configuration Node.js :"
print_message "      - Version Node.js: $NODE_VERSION"
print_message "      - Racine de l'application: $NETTMOBIA_PATH"
print_message "      - Fichier de démarrage: app.js"
print_message "      - Mode de l'application: Production"
print_message "      - Variables d'environnement: Voir fichier .env"
print_message ""
print_message "6. 🔧 Variables d'environnement importantes :"
print_message "      - NODE_ENV: production"
print_message "      - PORT: 3000"
print_message "      - DATABASE_PATH: $FLOWISE_DATA_PATH/database.sqlite"
print_message "      - BLOB_STORAGE_PATH: $FLOWISE_DATA_PATH/uploads"
print_message "      - LOG_PATH: $FLOWISE_DATA_PATH/logs"
print_message "      - APP_URL: https://$DOMAIN"
print_message ""
print_message "7. 🚀 Cliquez sur 'Activer Node.js'"
print_message "8. ⏳ Attendez le démarrage (1-2 minutes)"
print_message "9. 🎯 Accédez à votre application : https://$DOMAIN"
print_message ""

print_warning "⚠️ Points importants :"
print_warning "   - Assurez-vous que l'extension Node.js est installée dans Plesk"
print_warning "   - Vérifiez que le port 3000 est disponible"
print_warning "   - Les données sont stockées dans : $FLOWISE_DATA_PATH"
print_warning "   - Sauvegardez régulièrement le dossier de données"
print_message ""

print_message "🔍 Vérification après activation :"
print_message "   1. Allez sur https://$DOMAIN"
print_message "   2. Vous devriez voir l'interface Flowise"
print_message "   3. Si erreur, vérifiez les logs dans Plesk"
print_message "   4. Testez l'endpoint de santé : https://$DOMAIN/api/v1/ping"
print_message ""

print_message "📁 Fichiers créés :"
print_message "   - $NETTMOBIA_PATH/app.js (point d'entrée)"
print_message "   - $NETTMOBIA_PATH/package.json (configuration NPM)"
print_message "   - $NETTMOBIA_PATH/.env (variables d'environnement)"
print_message "   - $FLOWISE_DATA_PATH/ (données de l'application)"
print_message ""

print_message "🆘 En cas de problème :"
print_message "   1. Vérifiez les logs dans Plesk > Node.js > Logs"
print_message "   2. Assurez-vous que Node.js est activé"
print_message "   3. Vérifiez les permissions des fichiers"
print_message "   4. Redémarrez l'application Node.js"
print_message ""

print_header
print_message "🚀 Configuration prête ! Suivez les étapes ci-dessus dans Plesk."
print_message "📁 Répertoire de travail : $NETTMOBIA_PATH"
print_message "💾 Données stockées dans : $FLOWISE_DATA_PATH"
print_message ""
print_message "🎯 Votre Flowise sera accessible sur : https://$DOMAIN"
