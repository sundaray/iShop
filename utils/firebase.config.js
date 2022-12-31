import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {
  getFirestore,
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async (
  user,
  additionalUserData = {}
) => {
  const { displayName, email } = user;
  const timestamp = serverTimestamp();

  const userDocRef = doc(db, "users", user.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    try {
      setDoc(userDocRef, {
        displayName,
        email,
        timestamp,
        isAdmin: false,
        isPaid: false,
        ...additionalUserData,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const checkAdminStatus = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  }
};

export const checkPaidStatus = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  }
};
export const updatePaidStatus = async (uid) => {
  const userDocRef = doc(db, "users", uid);

  await updateDoc(userDocRef, {
    isPaid: true,
  });
};

//Fetch products
export const fetchProducts = async (fn) => {
  const products = [];
  const firestoreQuery = query(collection(db, "products"));
  const querySnapshot = await getDocs(firestoreQuery);
  querySnapshot.forEach((doc) =>
    products.push({
      ...doc.data(),
    })
  );
  fn(products);
};

// fetch product
export const fetchProduct = async (fn, productId) => {
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);
  fn(docSnap.data());
};


// Add item to cart
export const addToCart = async (product, qty, setLoading, setSuccess) => {
  const {name, description, price, stockCount, imgUrls} = product;
  setLoading(true)
  try {
    const newCartItemRef = doc(collection(db, "cartItems"));
    await setDoc(newCartItemRef, {
      id: newCartItemRef.id,
      name,
      description,
      price,
      qty,
      stockCount,
      imgUrls,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    setSuccess(true);
    window.location.assign("/cart")
  } catch (error) {
    setLoading(false);
    console.log("Error adding the product to cart", error.message);  
  }
}

// Fetch cartItems
export const fetchCartItems = async (setCartItems) => {
  const cartItems = [];
  const firestoreQuery = query(collection(db, "cartItems"));
  const querySnapshot = await getDocs(firestoreQuery);
  querySnapshot.forEach((doc) =>
    cartItems.push({
      ...doc.data(),
    })
  );
  setCartItems(cartItems);
  return;
}

