import { initializeApp } from "firebase/app";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
  where,
  writeBatch,
  orderBy,
  Timestamp,
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
("");
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

// Upload product images

export const uploadProductImages = async (images, setLoading, setError, setSuccess) => {
  setLoading(true);
  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, "images/" + image.name);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const imageUrls = await Promise.all(
    images.map(async (image) => {
      return await storeImage(image);
    })
  ).catch((error) => {
    setLoading(false);
    setSuccess(false);
    setError(error.message);
  });
  return imageUrls;
};

// Upload product

export const uploadProduct = async (
  router,
  resetForm,
  name,
  description,
  price,
  stockCount,
  imageUrls,
  setLoading,
  setError,
  setSuccess
) => {
  try {
    setLoading(true);
    const newProductRef = doc(collection(db, "products"));
    await setDoc(newProductRef, {
      id: newProductRef.id,
      name,
      description,
      price,
      stockCount,
      imgUrls: imageUrls,
      timestamp: serverTimestamp(),
    });

    setLoading(false);
    resetForm();
    setSuccess(true);
    setTimeout(() => router.push("/"), 1000);
  } catch (error) {
    setLoading(false);
    setError(error.message);
    setSuccess(false);
  }
};

//Fetch products
export const fetchProducts = async (
  setProducts,
  setFinalProducts,
  productsPerPage,
  setLoading,
  setError
) => {
  try {
    setLoading(true);
    const products = [];
    const firestoreQuery = query(collection(db, "products"));
    const querySnapshot = await getDocs(firestoreQuery);
    querySnapshot.forEach((doc) =>
      products.push({
        ...doc.data(),
      })
    );
    setProducts(products);
    setFinalProducts(products.slice(0, productsPerPage));
    setLoading(false);
  } catch (error) {
    setLoading(false);
    if (error.code === "unavailable") {
      setError("No internet connection");
    } else if (error.code === "quota-exceeded") {
      setError("Quota exceeded");
    } else {
      setError("Error fetching products");
    }
  }
};

// fetch product
export const fetchProduct = async (
  setLoading,
  setError,
  setProduct,
  productId
) => {
  try {
    setLoading(true);
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    setProduct(docSnap.data());
    setLoading(false);
  } catch (error) {
    setLoading(false);
    if (error.code === "unavailable") {
      setError("No internet connection");
    } else {
      setError("Error fetching product");
    }
  }
};

// Add item to cart
export const addToCart = async (
  router,
  userId,
  product,
  qty,
  setLoading,
  setError
) => {
  const { id, name, description, price, stockCount, imgUrls } = product;
  try {
    setLoading(true);
    const newCartItemRef = doc(collection(db, "cartItems"));
    await setDoc(newCartItemRef, {
      id: newCartItemRef.id,
      userId,
      productId: id,
      name,
      description,
      price,
      qty,
      stockCount,
      imgUrls,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    router.push("/cart");
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
};

// Fetch cartItems
export const fetchCartItems = async (setCartItems, userId) => {
  console.log(userId);
  const cartItems = [];
  const firestoreQuery = query(
    collection(db, "cartItems"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(firestoreQuery);
  querySnapshot.forEach((doc) =>
    cartItems.push({
      ...doc.data(),
    })
  );
  setCartItems(cartItems);
};

// Clear cartItems
export const clearCartItems = async (userId) => {
  const batch = writeBatch(db);

  const cartItemsQuery = query(
    collection(db, "cartItems"),
    where("userId", "==", userId)
  );
  const cartItemsQuerySnapshot = await getDocs(cartItemsQuery);
  cartItemsQuerySnapshot.forEach((doc) => batch.delete(doc.ref));

  batch.commit();
};

// Fetch cartItems quantity
export const fetchCartItemsQty = async (setCartItemsQty, userId) => {
  if (userId) {
    const cartItems = [];
    const firestoreQuery = query(
      collection(db, "cartItems"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(firestoreQuery);
    querySnapshot.forEach((doc) => cartItems.push(Number(doc.data().qty)));
    const cartItemsQty = cartItems.reduce((x, y) => x + y, 0);
    setCartItemsQty(cartItemsQty);
  } else {
    setCartItemsQty(0);
  }
};

// Update cart item
export const updateCartItem = async (productId, qty, userId) => {
  const cartItemRef = doc(db, "cartItems", productId);
  const cartItemSnap = await getDoc(cartItemRef);

  if (cartItemSnap.exists() && cartItemSnap.data().userId === userId) {
    await updateDoc(cartItemRef, {
      qty,
    });
  }
};

// Delete cart item
export const deleteCartItem = async (id, userId) => {
  const cartItemRef = doc(db, "cartItems", id);
  const cartItemSnap = await getDoc(cartItemRef);

  if (cartItemSnap.exists() && cartItemSnap.data().userId === userId) {
    await deleteDoc(cartItemRef);
  }
};

// Create order items for a user

export const createOrderItems = async (userId) => {
  const productIds = [];
  const cartItemsQuery = query(
    collection(db, "cartItems"),
    where("userId", "==", userId)
  );
  const cartItemsSnapshot = await getDocs(cartItemsQuery);
  cartItemsSnapshot.forEach((doc) => productIds.push(doc.data().productId));
  const newOrderItemRef = doc(collection(db, "orderItems"));
  await setDoc(newOrderItemRef, {
    id: newOrderItemRef.id,
    productIds,
    userId,
    timestamp: serverTimestamp(),
  });
};

// Find out whether the logger in user has bought the product or not

export const fetchBoughtStatus = async (productId, userId, setBoughtByUser) => {
  const orderItemsQuery = query(
    collection(db, "orderItems"),
    where("productIds", "array-contains", productId),
    where("userId", "==", userId)
  );
  const orderItemsSnapshot = await getDocs(orderItemsQuery);
  if (orderItemsSnapshot.size > 0) {
    setBoughtByUser(true);
  }
};

// Add review for a product
export const addReview = async (
  productId,
  userId,
  name,
  rating,
  review,
  setLoading,
  setError
) => {
  try {
    setLoading(true);
    const reviewRef = doc(collection(db, "products", productId, "reviews"));
    await setDoc(reviewRef, {
      id: reviewRef.id, // Assign the autogenerated ID from the review document to the 'id' field
      userId,
      userName: name,
      productId,
      rating: Number(rating),
      review,
      reviewDate: Timestamp.fromDate(new Date()),
    });
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
};

// Fetch reviews for a product
export const fetchProductReviews = async (
  productId,
  setProductReviews,
  userId,
  setUserReviewed
) => {
  const reviews = [];
  // const reviewsRef = collection(db, "products", productId, "reviews");
  const reviewsRef = query(
    collection(db, "products", productId, "reviews"),
    orderBy("reviewDate", "desc")
  );

  const reviewsSnapshot = await getDocs(reviewsRef);
  // const reviewsSnapshot2 = await getCountFromServer(reviewsRef);
  reviewsSnapshot.forEach((doc) =>
    reviews.push({
      ...doc.data(),
    })
  );
  setProductReviews(reviews);

  // count the number of reviews by the user
  const userReviewsQuery = query(
    collection(db, "products", productId, "reviews"),
    where("userId", "==", userId)
  );
  const userReviewsSnapshot = await getDocs(userReviewsQuery);
  if (userReviewsSnapshot.size > 0) {
    setUserReviewed(true);
  }
};

// Fetch average rating for a product

export const fetchAverageRating = async (
  productId,
  setAverageRating,
  setRatingCount
) => {
  const reviews = [];
  let averageRating;
  const reviewsRef = query(collection(db, "products", productId, "reviews"));
  const reviewsSnapshot = await getDocs(reviewsRef);
  reviewsSnapshot.forEach((doc) => reviews.push(doc.data()));
  averageRating = reviews.reduce((x, y) => x + y.rating, 0) / reviews.length;
  setAverageRating(averageRating);
  setRatingCount(reviews.length);
};

// Create a user document in firestore

const createUserDocument = async (user) => {
  const { displayName, email } = user;

  const userDocRef = doc(db, "users", user.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    setDoc(userDocRef, {
      displayName,
      email,
      timestamp: serverTimestamp(),
      isAdmin: false,
    });
  }
};

// Get user document

export const userData = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  }
};

// Sign in user

export const signIn = async (router, email, password, setLoading, setError) => {
  try {
    setLoading(true);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user.emailVerified) {
      createUserDocument(user);
      setError(null);
      setLoading(false);
      router.replace(
        router.query.from ? decodeURIComponent(router.query.from) : "/"
      );
    } else {
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    setError(error.message);
    if (error.code === "auth/user-not-found") {
      setError("User not found");
    } else if (error.code === "auth/wrong-password") {
      setError("Invalid password");
    } else if (error.code === "auth/network-request-failed") {
      setError("Network Error");
    }
  }
};

// Sign up user

export const signUp = async (
  router,
  username,
  email,
  password,
  setLoading,
  setError
) => {
  try {
    setLoading(true);
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(auth.currentUser).then(async () => {
      setLoading(false);
      router.push("/users/verify-email");
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
    });
  } catch (error) {
    setLoading(false);
    if (error.code === "auth/email-already-in-use") {
      setError("User already registered");
    }
  }
};

// Reset password

export const resetPassword = async (
  email,
  setLoading,
  setError,
  setSuccess
) => {
  try {
    setLoading(true);
    await sendPasswordResetEmail(auth, email);
    setLoading(false);
    setError(null);
    setSuccess("Password reset email sent");
  } catch (error) {
    setLoading(false);
    setSuccess(null);
    if (error.code === "auth/user-not-found") {
      setError("No user with that email address");
    }
  }
};
