import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp, writeBatch } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig, appCheckSiteKey } from "./firebase-config.js";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-check.js";

export const app = initializeApp(firebaseConfig);
if (appCheckSiteKey && appCheckSiteKey !== "ADD_RECAPTCHA_ENTERPRISE_SITE_KEY") {
  initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey), isTokenAutoRefreshEnabled: true });
}
export const auth = getAuth(app);
export const db = getFirestore(app);
export const authState = onAuthStateChanged;
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const productsRef = collection(db, "products");
export const categoriesRef = collection(db, "categories");
export const productDoc = id => doc(db, "products", String(id));
export const categoryDoc = id => doc(db, "categories", String(id));
export { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp, writeBatch };
export const settingsRef = doc(db, 'settings', 'catalog');
