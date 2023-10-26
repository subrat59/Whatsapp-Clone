// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,GoogleAUthProvider} from "firebase/auth" 
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAg8ecMjW8XJ3dviONGeL_Pc_5A6wxpo1Y",

  authDomain: "whatsapp-clone-9f2cf.firebaseapp.com",

  projectId: "whatsapp-clone-9f2cf",

  storageBucket: "whatsapp-clone-9f2cf.appspot.com",

  messagingSenderId: "223015499231",

  appId: "1:223015499231:web:69c0f012b946da66ae406a",

  measurementId: "G-2YKDSB19R9"


};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider(app);
export const database=getFirestore(app);
