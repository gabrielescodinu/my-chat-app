import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.database().ref(`users/${user.uid}`).set({ email: user.email });
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign In</button>
            </form>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Auth;
