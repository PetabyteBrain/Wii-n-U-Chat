import 'dotenv/config';

export default {
  expo: {
    name: "Wii n U Chat",
    slug: "wii-n-u-chat",
    scheme: "acme",
    version: "1.0.0",
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseDbUrl: process.env.FIREBASE_DB_URL,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    },
  },
};
