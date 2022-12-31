import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

import {
  getFirestore,
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

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

// Sign in with Google login
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const checkAdminStatus = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  }
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
  const { name, description, price, stockCount, imgUrls } = product;
  setLoading(true);
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
    window.location.assign("/cart");
  } catch (error) {
    setLoading(false);
    console.log("Error adding the product to cart", error.message);
  }
};

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
};
// Fetch cartItems quantity
export const fetchCartItemsQty = async (setCartItemsQty) => {
  const cartItems = [];
  const firestoreQuery = query(collection(db, "cartItems"));
  const querySnapshot = await getDocs(firestoreQuery);
  querySnapshot.forEach((doc) => cartItems.push(Number(doc.data().qty)));
  const cartItemsQty = cartItems.reduce((x, y) => x + y, 0);
  setCartItemsQty(cartItemsQty);
};

// Update cart item
export const updateCartItem = async (id, qty) => {
  const cartItemRef = doc(db, "cartItems", id);
  await updateDoc(cartItemRef, {
    qty,
  });
};

// Delete cart item
export const deleteCartItem = async (id) => {
  const cartItemRef = doc(db, "cartItems", id);
  await deleteDoc(cartItemRef);
};
