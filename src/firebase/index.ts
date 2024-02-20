import { initializeApp } from "firebase/app";
import firebaseConfig from "./config.json";

const app = initializeApp(firebaseConfig);

export default app;