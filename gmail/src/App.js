import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Inbox from './components/inbox/Inbox';
import Compose from './components/compose/Compose';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
import OpenMail from './components/email/OpenMail';
import { useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from './firebase';
import { signIn, signOut } from './slices/userSlice'
import './Loading.css'
import Loader from './components/loader/Loader';
import Sent from './components/sent/Sent';

function App() {

  const isComposeOpen = useSelector((state) => state.mail.isComposeOpen);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)


  // Loging in user
  useEffect(() => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        document.title = user.email;

        dispatch(signIn({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }))
        // ...
      }).catch((error) => {
        // Handle Errors here.

        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);

  return (
    <>

      {user ? <div className="gmail__clone">

        {isComposeOpen && <Compose />}
        <Navbar />


        <div className="main">
          <Sidebar />
          <Routes>

            <Route path="/mail/inbox/:mailId" exact element={<OpenMail />} />
            <Route path="/inbox" exact element={<Inbox />} />
            <Route path="/sent" exact element={<Sent />} />
            <Route path="/" exact element={<Inbox />} />

          </Routes>
        </div>

      </div> :

        <>

          <div className="gmail__logo__loading">
            <img src={'/assets/newgmaillogo.jpg'} alt="" />
            <Loader />
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Login to G-Mail
            </button>
          </div>



        </>

      }


    </>
  );
}

export default App;
