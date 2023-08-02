import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import globals from "./globals.config";

const serviceAccount = JSON.parse(globals.GOOGLE_SERVICE_ACCOUNT);

const playStreamzApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firebaseAuth = getAuth(playStreamzApp);

export default firebaseAuth;
