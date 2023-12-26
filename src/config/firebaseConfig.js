import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyA_VQneU4xBL-l8L6hJgmMmFz2VVyL4u3U",
  authDomain: "pbl5-1549a.firebaseapp.com",
  databaseURL: "https://pbl5-1549a-default-rtdb.firebaseio.com",
  projectId: "pbl5-1549a",
  storageBucket: "pbl5-1549a.appspot.com",
  messagingSenderId: "776433297650",
  appId: "1:776433297650:web:abe5e18e8dc7148a66c86b",
  measurementId: "G-1KDQFJEBDR",
};

const app = initializeApp(firebaseConfig);

export default app;
