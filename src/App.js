import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Auth from './Auth';
import Chat from './Chat';

const firebaseConfig = {
  apiKey: "AIzaSyCPRZ_0Mr3JFtE1acqJ10JwapwokNyJOYk",
  authDomain: "my-chat-app-8d713.firebaseapp.com",
  projectId: "my-chat-app-8d713",
  storageBucket: "my-chat-app-8d713.appspot.com",
  messagingSenderId: "190877113203",
  appId: "1:190877113203:web:cf5dc7c726787ea9c2c306",
  measurementId: "G-KTV580Y8EB"
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <div className='bg-blue-700 p-8 text-white'>
            <h1>Welcome {user.email}</h1>
          </div>
          <Chat />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
