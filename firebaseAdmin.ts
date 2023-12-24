import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
}

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const adminDb = admin.firestore();
export { adminDb };
