import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBmqnBuPvHK5xgvXLuwtQ-vh49bNyKYqCM",
  authDomain: "crwn-clothing-db-e80cb.firebaseapp.com",
  projectId: "crwn-clothing-db-e80cb",
  storageBucket: "crwn-clothing-db-e80cb.appspot.com",
  messagingSenderId: "955039285074",
  appId: "1:955039285074:web:7482701ab06dae5426c48b"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth) => {

    const userDocRef =  doc(db, 'users', userAuth.uid);
    console.log('userDocRef:');
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log('userSnapshot:');
    console.log(userSnapshot);
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
}