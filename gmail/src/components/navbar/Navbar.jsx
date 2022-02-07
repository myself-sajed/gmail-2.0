import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import './Navbar.css'
import { signOutUser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value)
    const navigate = useNavigate()

    function signMeOut() {
        const auth = getAuth();
        dispatch(signOutUser())
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Sign-out successful.');
            navigate('/');
        }).catch((error) => {
            console.log('first error', error);
        });
    }

    return <div>

        {/* Navbar */}
        <div className="gmail__navbar ">
            <div className="logo__input flex__me">
                <div className="logo__wrapper flex__me">
                    <img src={'/assets/hamburger.svg'} style={{ height: '23px', width: '23px' }} alt="" />
                    <img src={'/assets/gmail-logo.png'} size="" className="gmail__logo" alt="" />
                </div>
                <div>
                    <div className="input__wrapper img__nav flex__me">
                        <img src={'/assets/search.svg'} alt="" />
                        <input type="text" size="63" placeholder="Search mail" />
                        <img src={'/assets/filter.svg'} alt="" />
                    </div>
                </div>
            </div>
            <div className="side__menu img__nav">
                <img src={'/assets/qmark.svg'} alt="" />
                <img src={'/assets/settings.svg'} alt="" />
                <img src={'/assets/menu.svg'} alt="" />
                <img className="profile" style={{ cursor: 'pointer' }} onClick={signMeOut}
                    src={user.photoURL} alt="" />
            </div>
        </div>
        <hr className="nav__hr" />


    </div>
};

export default Navbar;
