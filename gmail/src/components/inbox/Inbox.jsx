import React, { useEffect, useState } from 'react';
import CenterSection from '../email/CenterSection';
import './Inbox.css'
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { mailRef } from '../../firerefs';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { setBackTo, setTotalInbox } from '../../slices/mailSlice';
import { db } from '../../firebase';



const Inbox = () => {

    const [emails, setEmails] = useState([]);
    const random = useSelector(((state) => state.mail.random));
    const user = useSelector((state) => state.user.value);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setBackTo('/'))
        setIsLoading(true)
        const fetcher = async () => {

            const q = query(collection(db, "emails"), where("recieverEmail", "==", user.email,), orderBy('time', 'desc'),);
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const mailsArray = []
                querySnapshot.forEach((doc) => {
                    mailsArray.push({ id: doc.id, data: doc.data() });
                });

                setEmails(mailsArray);
                dispatch(setTotalInbox(mailsArray.length))
            });


            setIsLoading(false);
        }
        fetcher()
    }, [random])

    return <div>

        <div className="inbox_section">
            {/* Toolbar */}
            <div className="inbox_toolbar">
                <div className="left_flex_me">
                    <img src={'/assets/check_icon.png'} alt="" />
                    <img src={'/assets/refresh_icon.png'} alt="" />
                    <img src={'/assets/three_dots_icon.png'} alt="" />
                </div>
                <div className="right_flex_me">
                    Total : {emails.length}
                    <img className="ms-2" src={'/assets/keyboard_icon.png'} alt="" />
                </div>
            </div>
            <hr style={{ marginTop: '2px', marginBottom: '0px' }} />

            {/* Navbar */}
            <div className="inbox__nav ">
                <div className="primary primary-active center_nav">
                    <img src={'/assets/inbox_icon.png'} alt="" />
                    <span>Primary</span>


                </div>
                <hr />
                <div className="social center_nav">
                    <img src={'/assets/social_icon.png'} alt="" />
                    Social
                </div>
                <hr />
                <div className="updates center_nav">
                    <img src={'/assets/updates_icon.png'} alt="" />
                    Updates
                </div>
                <hr />
            </div>

            {/* Emails */}
            <div className="inbox__emails">
                {

                    isLoading ? <Loader />
                        :


                        emails.length === 0 ?

                            <h3 className="mx-5 my-5">Sorry! No emails were found...</h3>


                            :
                            emails.map(email => <CenterSection key={email.id} email={email} />)



                }
            </div>

        </div>

    </div>;
};

export default Inbox;
