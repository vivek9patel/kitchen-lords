import { initializeApp} from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  "apiKey": process.env.NEXT_PUBLIC_API_KEY,
  "authDomain": process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  "projectId": process.env.NEXT_PUBLIC_PROJECT_ID,
  "storageBucket": process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  "messagingSenderId": process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  "appId": process.env.NEXT_PUBLIC_APP_ID
});


let dbInstance: Database | null = null;

export const getFirebaseDB = (): Database => {
  if (!dbInstance) {
    console.log('Creating new db instance');
    dbInstance = getDatabase(app);
  }
  else {
    console.log('Using existing db instance');
  }
  return dbInstance;
};

export const auth = getAuth(app);

export default app;