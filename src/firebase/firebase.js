// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWHFDc4W3Cg2BuLu4kuiCgNGvStS1zMFI",
  authDomain: "blog-app-8016d.firebaseapp.com",
  projectId: "blog-app-8016d",
  storageBucket: "blog-app-8016d.appspot.com",
  messagingSenderId: "734486986398",
  appId: "1:734486986398:web:92ad87d9c23b11cf96458f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};