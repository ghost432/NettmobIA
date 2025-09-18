#!/bin/bash

echo "🔧 Correction finale pour buildChatflow.ts..."

# Créer un script Node.js pour faire les corrections précises
cat > fix_buildchatflow.js << 'EOF'
const fs = require('fs');

// Lire le fichier
let content = fs.readFileSync('src/utils/buildChatflow.ts', 'utf8');
let lines = content.split('\n');

// Trouver toutes les lignes avec des erreurs endingNodeData
for (let i = 0; i < lines.length; i++) {
    // Ligne avec endingNodeData?.outputs?.output
    if (lines[i].includes('endingNodeData?.outputs?.output')) {
        // S'assurer que endingNodeData est correctement typé
        if (lines[i].includes('const isEndingNode')) {
            lines[i] = lines[i].replace('endingNodeData?.outputs?.output', '(endingNodeData as any)?.outputs?.output');
        }
    }
    
    // Lignes 887-893 - Corriger le bloc conditionnel
    if (lines[i].trim().includes('endingNodeData?.outputs &&') ||
        lines[i].trim().includes('endingNodeData.outputs &&')) {
        
        // Remplacer tout le bloc conditionnel
        let blockStart = i;
        let blockEnd = i;
        
        // Trouver la fin du bloc if
        let braceCount = 0;
        let foundStart = false;
        
        for (let j = i; j < lines.length; j++) {
            if (lines[j].includes('if (')) foundStart = true;
            if (foundStart) {
                braceCount += (lines[j].match(/{/g) || []).length;
                braceCount -= (lines[j].match(/}/g) || []).length;
                if (braceCount === 0 && j > i) {
                    blockEnd = j;
                    break;
                }
            }
        }
        
        // Remplacer le bloc entier
        const newBlock = [
            '        if ((endingNodeData as any)?.outputs &&',
            '            Object.keys((endingNodeData as any).outputs).length &&',
            '            (endingNodeData as any)?.name &&',
            '            !Object.values((endingNodeData as any)?.outputs ?? {}).includes((endingNodeData as any).name)',
            '        ) {',
            '            throw new Error(',
            '                `Output of ${(endingNodeData as any)?.label || \'Unknown\'} (${(endingNodeData as any)?.id || \'Unknown\'}) must be ${(endingNodeData as any)?.label || \'Unknown\'}, can\\'t be an Output Prediction`',
            '            )',
            '        }'
        ];
        
        // Remplacer les lignes
        lines.splice(blockStart, blockEnd - blockStart + 1, ...newBlock);
        break;
    }
    
    // Corriger les autres références individuelles
    if (lines[i].includes('endingNodeData.outputs') && !lines[i].includes('(endingNodeData as any)')) {
        lines[i] = lines[i].replace(/endingNodeData\.outputs/g, '(endingNodeData as any)?.outputs');
    }
    
    if (lines[i].includes('endingNodeData.name') && !lines[i].includes('(endingNodeData as any)')) {
        lines[i] = lines[i].replace(/endingNodeData\.name/g, '(endingNodeData as any)?.name');
    }
    
    if (lines[i].includes('endingNodeData.label') && !lines[i].includes('(endingNodeData as any)')) {
        lines[i] = lines[i].replace(/endingNodeData\.label/g, '(endingNodeData as any)?.label');
    }
    
    if (lines[i].includes('endingNodeData.id') && !lines[i].includes('(endingNodeData as any)')) {
        lines[i] = lines[i].replace(/endingNodeData\.id/g, '(endingNodeData as any)?.id');
    }
}

// Écrire le fichier corrigé
fs.writeFileSync('src/utils/buildChatflow.ts', lines.join('\n'));
console.log('✅ Corrections appliquées à buildChatflow.ts');
EOF

# Sauvegarde
cp src/utils/buildChatflow.ts src/utils/buildChatflow.ts.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ Sauvegarde créée"

# Appliquer les corrections
node fix_buildchatflow.js

# Nettoyage
rm fix_buildchatflow.js

echo "🧪 Test de compilation..."
if npm run build > build_test.log 2>&1; then
    echo "🎉 SUCCESS! Compilation réussie!"
    rm build_test.log
else
    echo "❌ Erreurs restantes:"
    tail -20 build_test.log
    rm build_test.log
fi