import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { addDoc, Timestamp } from 'firebase/firestore';
import { closeCompose, setRandom } from '../../slices/mailSlice';
import './Compose.css';
import { mailRef } from '../../firerefs';
import { useRef } from 'react';



const Compose = () => {
    const dispatch = useDispatch()
    // states
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const user = useSelector(state => state.user.value)
    const recRef = useRef()

    function sendEmail(e) {
        e.preventDefault();
        const date = new Date()
        const time = Timestamp.fromDate(date)

        const email = {
            recieverEmail: recipient,
            subject,
            body,
            time,
            senderEmail: user.email,
            senderName: user.displayName,
            sendPhotoURL: user.photoURL,
        }

        addDoc(mailRef, email);
        // alert('Email sent successfully!')

        dispatch(closeCompose())
        dispatch(setRandom())

    }

    useEffect(() => {
        recRef.current.focus()
    }, [])

    return <div>

        <form onSubmit={sendEmail}>
            <div className="compose__modal ">
                <div className="new__message">
                    <span>New Message</span>
                    <svg onClick={() => dispatch(closeCompose())} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                    </svg>
                </div>
                <div className="email__body">
                    <input type="email" placeholder="Recipient" ref={recRef} className="mb-2" value={recipient} onChange={(e) => { setRecipient(e.target.value) }} required />
                    <input type="text" placeholder="Subject" className="mb-2" value={subject} onChange={(e) => { setSubject(e.target.value) }} required />
                    <textarea placeholder="Body goes here..." cols="30" rows="10" value={body} onChange={(e) => { setBody(e.target.value) }} required />
                </div>

                <div className="send">
                    <div className="left">
                        <button className="btn btn-primary" type="submit">Send <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg> </button>
                    </div>
                    <div className="right">
                        <img src={'/assets/attach_icon.png'} alt="" />
                        <img src={'/assets/files_icon.png'} alt="" />
                        <img src={'/assets/emoji_icon.png'} alt="" />
                        <img src={'/assets/drive_icon.png'} alt="" />
                        <img src={'/assets/gallery_icon.png'} alt="" />
                        <img src={'/assets/lock_time_icon.png'} alt="" />
                        <img src={'/assets/pen_icon.png'} alt="" />
                    </div>

                    <div className="exright">
                        <img src={'/assets/three_dots_icon.png'} alt="" />
                        <img src={'/assets/bin_icon.png'} alt="" />

                    </div>



                </div>

            </div>
        </form>


    </div>;
};

export default Compose;
