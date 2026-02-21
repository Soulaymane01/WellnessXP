import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ?.replace(/^"/, '')
    ?.replace(/"$/, '')
    ?.replace(/\\n/g, '\n')

const serviceAccount: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim(),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.trim(),
    privateKey: privateKey,
}

console.log('Firebase Admin init starting...')
console.log('Project ID:', serviceAccount.projectId)
console.log('Client Email:', serviceAccount.clientEmail)
console.log('Private Key length:', serviceAccount.privateKey?.length)
if (serviceAccount.privateKey) {
    console.log('Private Key starts with:', serviceAccount.privateKey.substring(0, 27))
    console.log('Private Key ends with:', serviceAccount.privateKey.substring(serviceAccount.privateKey.length - 25))
}

// Initialize Firebase Admin (singleton pattern)
let adminApp;
const existingApps = getApps();

if (existingApps.length === 0) {
    console.log('No existing Firebase Admin apps. Initializing new one...')
    adminApp = initializeApp({
        credential: serviceAccount.clientEmail ? cert(serviceAccount) : undefined,
        projectId: serviceAccount.projectId,
    });
} else {
    console.log('Firebase Admin app already exists. Reusing existing one.')
    adminApp = existingApps[0];
}

const adminDb = getFirestore(adminApp)
const adminAuth = getAuth(adminApp)

export { adminApp, adminDb, adminAuth }
