import React, { useContext, useEffect, useState } from "react";
import { createContext, ReactNode } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getStorage, ref, uploadBytes } from "firebase/storage";

import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBEil3D0UNCwIP54cmwwbIDSj8oGexIGKk",
  authDomain: "products-cms-app.firebaseapp.com",
  projectId: "products-cms-app",
  storageBucket: "products-cms-app.appspot.com",
  messagingSenderId: "419823876442",
  appId: "1:419823876442:web:a5b3fafd1aacec91e05b63",
  databaseURL: "https://products-cms-app-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp);
const firestore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
interface FirebaseProviderProps {
  children: ReactNode;
}

interface FirebaseContextType {
  signUpUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;

  signinUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  database: Firestore;
  listAllProducts: () => void;
  deleteProduct: (id: any) => void;
  addProduct: (
    product: string,
    description: string,
    price: number,
    stock: number,
    code: string,
    category: string
  ) => void;
  updateData(
    id: string,
    product: string,
    description: string,
    code: string,
    category: string,
    price: number,
    stock: number
  ): any;
  handleLogout: any;
  currentUser: any;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = (props) => {
  const { children } = props;
  // signup user with email and password
  const signUpUserWithEmailAndPassword = (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // signin user with email and password
  const signinUserWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // logout
  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        setCurrentUser({});
        navigate("/signin");
        console.log("Signed out successfully");
      })
      .catch((error) => {});
  };

  // fetch data
  const listAllProducts = async () => {
    return await getDocs(collection(firestore, "products"));
  };

  // delete data
  const deleteProduct = async (docId: any) => {
    try {
      const documentRef = doc(collection(firestore, "products"), docId);
      await deleteDoc(documentRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // add data
  const addProduct = async (
    product: string,
    description: string,
    price: number,
    stock: number,
    code: string,
    category: string
  ) => {
    const docRef = await addDoc(collection(database, "products"), {
      product: product,
      description: description,
      stock: stock,
      price: price,
      code: code,
      category: category,
    });
    console.log(docRef);
  };

  //update data
  const updateData = async (
    id: string,
    product: string,
    description: string,
    code: string,
    category: string,
    price: number,
    stock: number
  ) => {
    try {
      await setDoc(doc(database, "products", id), {
        product: product,
        description: description,
        code: code,
        stock: stock,
        price: price,
        category: category,
      });
      return true; // Return true or any other value to indicate success
    } catch (error) {
      console.error("Error updating document: ", error);
      return false; // Return false or any other value to indicate failure
    }
  };

  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unSubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  });

  const navigate = useNavigate();
  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        database,
        listAllProducts,
        deleteProduct,
        addProduct,
        updateData,
        handleLogout,
        currentUser,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
