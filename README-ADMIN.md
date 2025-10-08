# Administradores (opcional)

## Habilitar claim admin
Para controlar quem pode escrever no Firestore, defina a custom claim `admin=true` para um usuário.

1. Instale a CLI do Firebase:
```bash
npm i -g firebase-tools
firebase login
```
2. Use uma Cloud Function ou um script Admin SDK (Node) para definir a claim. Exemplo rápido com Admin SDK:
```js
// admin-claim.js
import admin from 'firebase-admin'
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' }

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const uid = 'UID_DO_USUARIO'
await admin.auth().setCustomUserClaims(uid, { admin: true })
console.log('Claim definida.')
```
3. Faça logout/login no app para a claim entrar no token.
