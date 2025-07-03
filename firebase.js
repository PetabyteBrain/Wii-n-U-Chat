// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Constants from "expo-constants";

const {
  firebaseApiKey,
  firebaseDbUrl,
  firebaseProjectId,
  firebaseAppId,
} = Constants.expoConfig.extra;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  databaseURL: firebaseDbUrl,
  projectId: firebaseProjectId,
  appId: firebaseAppId,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
