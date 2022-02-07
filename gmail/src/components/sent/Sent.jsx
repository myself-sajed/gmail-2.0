import React, { useEffect, useState } from 'react';
import CenterSection from '../email/CenterSection';
import './Sent.css'
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { db } from '../../firebase';
import { mailRef } from '../../firerefs'
import { setBackTo, setTotalSent } from '../../slices/mailSlice';



const Sent = () => {

    const [emails, setEmails] = useState([]);
    const random = useSelector(((state) => state.mail.random));
    const user = useSelector((state) => state.user.value);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setBackTo('/sent'));
        setIsLoading(true)
        const fetcher = async () => {

            const q = query(mailRef, where("senderEmail", "==", user.email,), orderBy('time', 'desc'),);

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const mailsArray = []
                querySnapshot.forEach((doc) => {
                    mailsArray.push({ id: doc.id, data: doc.data() });
                });

                setEmails(mailsArray);
                dispatch(setTotalSent(mailsArray.length))
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



            {/* Emails */}
            <div className="inbox__emails">
                {
                    isLoading ? <Loader /> :


                        emails.length === 0 ?

                            <h3 className="mx-5 my-5">No email sent.. Compose Now!</h3>


                            :

                            emails.map(email => <CenterSection key={email.id} email={email} />)

                }
            </div>

        </div>

    </div>;
};

export default Sent;
