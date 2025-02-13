// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0Arwr6v6m5RJCmsesag9EF7ivPb8MEKY",
  authDomain: "taskit-f250f.firebaseapp.com",
  projectId: "taskit-f250f",
  storageBucket: "taskit-f250f.appspot.com",
  messagingSenderId: "767637471677",
  appId: "1:767637471677:web:26b54f5459e6087b6e92d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
