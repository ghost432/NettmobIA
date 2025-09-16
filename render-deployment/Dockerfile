# Dockerfile optimisé pour Render
# Multi-stage build pour réduire la taille de l'image

# Stage 1: Build
FROM node:20-alpine AS builder

# Installer les dépendances système nécessaires
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    build-base \
    cairo-dev \
    pango-dev \
    chromium \
    curl

# Installer PNPM globalement
RUN npm install -g pnpm

# Variables d'environnement pour le build
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_OPTIONS=--max-old-space-size=2048

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# Copier les packages
COPY packages/ ./packages/

# Installer les dépendances
RUN pnpm install --frozen-lockfile

# Build de l'application
RUN pnpm build

# Stage 2: Production
FROM node:20-alpine AS production

# Installer les dépendances système minimales
RUN apk add --no-cache \
    chromium \
    curl

# Installer PNPM
RUN npm install -g pnpm

# Variables d'environnement
ENV NODE_ENV=production
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_OPTIONS=--max-old-space-size=512

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S flowise -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# Copier les packages depuis le stage de build
COPY --from=builder /app/packages/ ./packages/

# Installer seulement les dépendances de production
RUN pnpm install --prod --frozen-lockfile

# Créer les dossiers nécessaires
RUN mkdir -p /app/database /app/uploads /app/logs

# Changer les permissions
RUN chown -R flowise:nodejs /app

# Passer à l'utilisateur non-root
USER flowise

# Exposer le port (Render utilise le port 10000)
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:10000/api/v1/ping || exit 1

# Commande de démarrage
CMD ["pnpm", "start"]
