import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp, writeBatch } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const authState = onAuthStateChanged;
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const registerCustomer = async (email, password, displayName) => { const cred = await createUserWithEmailAndPassword(auth, email, password); if (displayName) await updateProfile(cred.user, { displayName }); await sendEmailVerification(cred.user); return cred; };
export const logout = () => signOut(auth);
export const productsRef = collection(db, "products");
export const categoriesRef = collection(db, "categories");
export const productDoc = id => doc(db, "products", String(id));
export const categoryDoc = id => doc(db, "categories", String(id));
export { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp, writeBatch };
export const settingsRef = doc(db, 'settings', 'catalog');
