# 🚀 Guide de Démarrage Rapide - Flowise sur Plesk

## 📋 Résumé des Options

Vous avez **2 méthodes principales** pour déployer Flowise sur Plesk :

### 1. 🟢 **Node.js** (Recommandé pour débutants)
- ✅ Plus simple à configurer
- ✅ Intégration native Plesk
- ✅ Moins de ressources système
- ❌ Nécessite Node.js 18.15.0+

### 2. 🐳 **Docker** (Recommandé pour production)
- ✅ Isolation complète
- ✅ Facile à mettre à jour
- ✅ Configuration portable
- ❌ Nécessite Docker installé

---

## ⚡ Installation Express (5 minutes)

### Option A : Node.js

```bash
# 1. Téléchargez et exécutez le script d'installation
wget https://raw.githubusercontent.com/FlowiseAI/Flowise/main/plesk-deployment/plesk-setup-script.sh
chmod +x plesk-setup-script.sh

# 2. Lancez l'installation (remplacez par votre domaine)
./plesk-setup-script.sh votre-domaine.com nodejs

# 3. Configurez dans Plesk :
#    Sites Web & Domaines > votre-domaine.com > Node.js
#    - Version Node.js: 18.15.0+
#    - Racine: /var/www/vhosts/votre-domaine.com/httpdocs
#    - Fichier de démarrage: app.js
#    - Mode: Production
#    - Cliquez sur "Activer Node.js"
```

### Option B : Docker

```bash
# 1. Téléchargez et exécutez le script d'installation
wget https://raw.githubusercontent.com/FlowiseAI/Flowise/main/plesk-deployment/plesk-setup-script.sh
chmod +x plesk-setup-script.sh

# 2. Lancez l'installation (remplacez par votre domaine)
./plesk-setup-script.sh votre-domaine.com docker

# 3. Configurez le proxy reverse dans Plesk :
#    Sites Web & Domaines > votre-domaine.com > Hébergement et DNS
#    - Source: /
#    - Destination: http://localhost:3000
```

---

## 🔧 Configuration Manuelle (si le script ne fonctionne pas)

### Méthode Node.js

1. **Téléchargez Flowise** :
   ```bash
   git clone https://github.com/FlowiseAI/Flowise.git
   cd Flowise
   ```

2. **Copiez les fichiers** :
   ```bash
   cp -r plesk-deployment/* /var/www/vhosts/votre-domaine.com/httpdocs/
   cd /var/www/vhosts/votre-domaine.com/httpdocs/
   ```

3. **Configurez l'environnement** :
   ```bash
   cp env.example .env
   # Éditez .env avec vos paramètres
   ```

4. **Installez les dépendances** :
   ```bash
   npm install
   ```

5. **Configurez dans Plesk** (voir Option A ci-dessus)

### Méthode Docker

1. **Créez le dossier Docker** :
   ```bash
   mkdir -p /var/www/vhosts/votre-domaine.com/flowise-docker
   cd /var/www/vhosts/votre-domaine.com/flowise-docker
   ```

2. **Copiez les fichiers Docker** :
   ```bash
   cp /path/to/plesk-deployment/docker-compose.yml .
   cp /path/to/plesk-deployment/Dockerfile .
   ```

3. **Configurez docker-compose.yml** :
   - Remplacez `yourdomain.com` par votre domaine
   - Changez les clés secrètes

4. **Démarrez le conteneur** :
   ```bash
   docker-compose up -d
   ```

5. **Configurez le proxy reverse** (voir Option B ci-dessus)

---

## ✅ Vérification de l'Installation

1. **Accédez à votre site** : `https://votre-domaine.com`
2. **Vous devriez voir** l'interface Flowise
3. **Créez votre premier chatbot** pour tester

---

## 🛠️ Dépannage Rapide

### Problème : "Port déjà utilisé"
```bash
# Vérifiez les ports utilisés
netstat -tulpn | grep :3000

# Changez le port dans .env ou docker-compose.yml
PORT=3001
```

### Problème : "Permissions refusées"
```bash
# Corrigez les permissions
chown -R psacln:psaserv /var/www/vhosts/votre-domaine.com/httpdocs
chmod -R 755 /var/www/vhosts/votre-domaine.com/flowise_data
```

### Problème : "Node.js non trouvé"
- Installez l'extension Node.js dans Plesk
- Ou utilisez la méthode Docker

### Problème : "Docker non installé"
- Installez Docker sur votre serveur Plesk
- Ou utilisez la méthode Node.js

---

## 📚 Documentation Complète

- **Guide Node.js détaillé** : `README.md`
- **Guide Docker détaillé** : `docker-deployment-guide.md`
- **Variables d'environnement** : `ENVIRONMENT_VARIABLES.md`
- **Script d'installation** : `plesk-setup-script.sh`

---

## 🆘 Support

- **Documentation officielle** : [docs.flowiseai.com](https://docs.flowiseai.com/)
- **GitHub Issues** : [github.com/FlowiseAI/Flowise/issues](https://github.com/FlowiseAI/Flowise/issues)
- **Discord** : [discord.gg/jbaHfsRVBW](https://discord.gg/jbaHfsRVBW)

---

## 🎯 Prochaines Étapes

1. **Configurez SSL/HTTPS** dans Plesk
2. **Sauvegardez régulièrement** vos données
3. **Configurez un domaine personnalisé** si nécessaire
4. **Explorez les fonctionnalités** de Flowise
5. **Créez vos premiers chatbots** !

**Bon déploiement ! 🚀**
