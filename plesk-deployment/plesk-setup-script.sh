#!/bin/bash

# Script d'installation automatique de Flowise sur Plesk
# Usage: ./plesk-setup-script.sh [domain] [method]
# Exemple: ./plesk-setup-script.sh mon-domaine.com nodejs

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
    echo -e "${BLUE}  Installation Flowise sur Plesk${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Vérification des paramètres
if [ $# -lt 2 ]; then
    print_error "Usage: $0 <domain> <method>"
    print_error "Méthodes disponibles: nodejs, docker"
    print_error "Exemple: $0 mon-domaine.com nodejs"
    exit 1
fi

DOMAIN=$1
METHOD=$2
HTTPDOCS_PATH="/var/www/vhosts/$DOMAIN/httpdocs"
FLOWISE_DATA_PATH="/var/www/vhosts/$DOMAIN/flowise_data"

print_header

# Vérification des prérequis
print_message "Vérification des prérequis..."

# Vérifier si le domaine existe
if [ ! -d "/var/www/vhosts/$DOMAIN" ]; then
    print_error "Le domaine $DOMAIN n'existe pas dans Plesk"
    exit 1
fi

# Vérifier Node.js pour la méthode nodejs
if [ "$METHOD" = "nodejs" ]; then
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé. Veuillez installer l'extension Node.js dans Plesk"
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

# Vérifier Docker pour la méthode docker
if [ "$METHOD" = "docker" ]; then
    if ! command -v docker &> /dev/null; then
        print_error "Docker n'est pas installé"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose n'est pas installé"
        exit 1
    fi
    
    print_message "Docker et Docker Compose détectés"
fi

# Création des dossiers nécessaires
print_message "Création des dossiers nécessaires..."

mkdir -p "$FLOWISE_DATA_PATH"/{uploads,logs}
chmod 755 "$FLOWISE_DATA_PATH"
chmod 755 "$FLOWISE_DATA_PATH"/uploads
chmod 755 "$FLOWISE_DATA_PATH"/logs

# Déploiement selon la méthode choisie
if [ "$METHOD" = "nodejs" ]; then
    print_message "Déploiement avec Node.js..."
    
    # Copier les fichiers de déploiement
    cp app.js "$HTTPDOCS_PATH/"
    cp package.json "$HTTPDOCS_PATH/"
    cp env.example "$HTTPDOCS_PATH/.env"
    
    # Configurer le fichier .env
    sed -i "s/yourdomain.com/$DOMAIN/g" "$HTTPDOCS_PATH/.env"
    sed -i "s|/var/www/vhosts/yourdomain.com|/var/www/vhosts/$DOMAIN|g" "$HTTPDOCS_PATH/.env"
    
    # Générer des clés secrètes
    SECRET_KEY=$(openssl rand -hex 32)
    JWT_SECRET=$(openssl rand -hex 32)
    JWT_REFRESH_SECRET=$(openssl rand -hex 32)
    
    sed -i "s/your-secret-key-here/$SECRET_KEY/g" "$HTTPDOCS_PATH/.env"
    sed -i "s/your-jwt-secret-here/$JWT_SECRET/g" "$HTTPDOCS_PATH/.env"
    sed -i "s/your-refresh-secret-here/$JWT_REFRESH_SECRET/g" "$HTTPDOCS_PATH/.env"
    
    # Installer les dépendances
    print_message "Installation des dépendances..."
    cd "$HTTPDOCS_PATH"
    npm install
    
    print_message "Configuration terminée pour Node.js"
    print_warning "N'oubliez pas de configurer l'application Node.js dans Plesk :"
    print_warning "1. Allez dans Sites Web & Domaines > $DOMAIN"
    print_warning "2. Cliquez sur l'onglet Node.js"
    print_warning "3. Configurez :"
    print_warning "   - Version Node.js: $(node --version)"
    print_warning "   - Racine: $HTTPDOCS_PATH"
    print_warning "   - Fichier de démarrage: app.js"
    print_warning "   - Mode: Production"
    print_warning "4. Cliquez sur 'Activer Node.js'"
    
elif [ "$METHOD" = "docker" ]; then
    print_message "Déploiement avec Docker..."
    
    # Créer le dossier Docker
    DOCKER_PATH="/var/www/vhosts/$DOMAIN/flowise-docker"
    mkdir -p "$DOCKER_PATH"
    
    # Copier les fichiers Docker
    cp docker-compose.yml "$DOCKER_PATH/"
    cp Dockerfile "$DOCKER_PATH/"
    
    # Configurer docker-compose.yml
    sed -i "s/yourdomain.com/$DOMAIN/g" "$DOCKER_PATH/docker-compose.yml"
    
    # Générer des clés secrètes
    SECRET_KEY=$(openssl rand -hex 32)
    JWT_SECRET=$(openssl rand -hex 32)
    JWT_REFRESH_SECRET=$(openssl rand -hex 32)
    
    sed -i "s/your-secret-key-here/$SECRET_KEY/g" "$DOCKER_PATH/docker-compose.yml"
    sed -i "s/your-jwt-secret-here/$JWT_SECRET/g" "$DOCKER_PATH/docker-compose.yml"
    sed -i "s/your-refresh-secret-here/$JWT_REFRESH_SECRET/g" "$DOCKER_PATH/docker-compose.yml"
    
    # Démarrer le conteneur
    print_message "Démarrage du conteneur Docker..."
    cd "$DOCKER_PATH"
    docker-compose up -d
    
    print_message "Configuration terminée pour Docker"
    print_warning "N'oubliez pas de configurer le proxy reverse dans Plesk :"
    print_warning "1. Allez dans Sites Web & Domaines > $DOMAIN"
    print_warning "2. Cliquez sur 'Hébergement et DNS'"
    print_warning "3. Configurez un proxy reverse :"
    print_warning "   - Source: /"
    print_warning "   - Destination: http://localhost:3000"
    
else
    print_error "Méthode non reconnue: $METHOD"
    print_error "Méthodes disponibles: nodejs, docker"
    exit 1
fi

# Vérification finale
print_message "Vérification de l'installation..."

if [ "$METHOD" = "docker" ]; then
    # Vérifier que le conteneur fonctionne
    if docker-compose -f "$DOCKER_PATH/docker-compose.yml" ps | grep -q "Up"; then
        print_message "✅ Conteneur Docker démarré avec succès"
    else
        print_error "❌ Problème avec le conteneur Docker"
        print_error "Vérifiez les logs: docker-compose -f $DOCKER_PATH/docker-compose.yml logs"
    fi
fi

print_header
print_message "🎉 Installation terminée !"
print_message "Votre Flowise sera accessible sur: https://$DOMAIN"
print_message "Données stockées dans: $FLOWISE_DATA_PATH"
print_warning "N'oubliez pas de configurer SSL/TLS dans Plesk pour HTTPS"
print_warning "Sauvegardez régulièrement le dossier: $FLOWISE_DATA_PATH"

# Afficher les informations de connexion
print_message "📋 Informations importantes:"
print_message "   - Domaine: $DOMAIN"
print_message "   - Méthode: $METHOD"
print_message "   - Données: $FLOWISE_DATA_PATH"
if [ "$METHOD" = "nodejs" ]; then
    print_message "   - Configuration Plesk: Sites Web & Domaines > $DOMAIN > Node.js"
else
    print_message "   - Configuration Plesk: Sites Web & Domaines > $DOMAIN > Hébergement et DNS"
fi

print_message "🔧 Commandes utiles:"
if [ "$METHOD" = "docker" ]; then
    print_message "   - Logs: docker-compose -f $DOCKER_PATH/docker-compose.yml logs -f"
    print_message "   - Redémarrer: docker-compose -f $DOCKER_PATH/docker-compose.yml restart"
    print_message "   - Arrêter: docker-compose -f $DOCKER_PATH/docker-compose.yml down"
fi

print_message "📚 Documentation: $HTTPDOCS_PATH/README.md"
