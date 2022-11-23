import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)


const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    //--------
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //--------
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        setTheme(JSON.parse(window.localStorage.getItem("theme") || "false"));
    }, [])
    const handleThemeChange = () => {
        setTheme(!theme);
        window.localStorage.setItem("theme", JSON.stringify(!theme));
    }
    //--------
    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }
    //--------
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    //--------
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    //--------
    const updateUser = (userInfo) => {
        return updateProfile(user, userInfo);
    }
    //--------
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    //--------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])
    //--------
    const authInfo = {
        googleSignin,
        createUser,
        signIn,
        updateUser,
        logOut,
        user,
        loading,
        handleThemeChange, theme
    }
    //--------
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;