# Configuration des Organisations

## Variable d'Environnement pour Plusieurs Organisations

Pour permettre la création de plusieurs organisations dans l'environnement OpenSource, ajoutez cette variable à votre fichier `.env` :

```bash
# Permettre plusieurs organisations (OpenSource uniquement)
ALLOW_MULTIPLE_ORGANIZATIONS=true
```

## Comportement par Défaut

- **Par défaut** : `ALLOW_MULTIPLE_ORGANIZATIONS=false`
- **Avec la variable** : `ALLOW_MULTIPLE_ORGANIZATIONS=true`

## Logique Modifiée

### Avant (Limitation stricte)
```typescript
if (organizations.length > 0) {
    throw new Error('You can only have one organization')
}
```

### Après (Avec la variable d'environnement)
```typescript
const allowMultipleOrgs = process.env.ALLOW_MULTIPLE_ORGANIZATIONS === 'true'

if (!allowMultipleOrgs && organizations.length > 0) {
    throw new Error('You can only have one organization')
}
```

## Logique Alternative pour OpenSource

Le code a été modifié pour gérer intelligemment les organisations existantes :

1. **Première organisation** : Créée avec le nom par défaut et l'utilisateur comme OWNER
2. **Organisations existantes** : L'utilisateur est ajouté à l'organisation existante avec le rôle USER

## Redémarrage Requis

Après avoir modifié la variable d'environnement, redémarrez le serveur :

```bash
npm run dev
# ou
pnpm dev
```

## Notes Importantes

- Cette modification affecte uniquement l'environnement **OpenSource**
- Les environnements **Cloud** et **Enterprise** ne sont pas affectés
- La modification est rétrocompatible


