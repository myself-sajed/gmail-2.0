import React, { useEffect, useState } from 'react';
import './OpenMail.css'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';

const OpenMail = () => {

    const { mailId } = useParams()
    const [mail, setMail] = useState(null);
    const backTo = useSelector(state => state.mail.backTo)


    useEffect(() => {
        const fetcher = async () => {
            const docRef = doc(db, "emails", mailId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setMail(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        fetcher()
    }, [])
    return <div>

        <div className="one__mail" style={{
            width: '83vw',
            padding: '10px',
            overflow: 'hidden'
        }}>

            <div className="mail____header">


                <div className="mail__header__left">
                    <Link to={backTo}><img src={'/assets/back.png'} className="mail__left" alt="" /></Link>
                    <img src={'/assets/archive.png'} alt="" />
                    <img src={'/assets/important_icon.png'} alt="" />
                    <img src={'/assets/bin_icon.png'} alt="" />
                    <img src={'/assets/spam_icon.png'} alt="" />
                    <img src={'/assets/snoozed_icon.png'} alt="" />
                    <img src={'/assets/add_to_task.png'} alt="" />
                    <img src={'/assets/three_dots_icon.png'} alt="" />
                </div>

                {mail === null ? <img className="open__mail__loader" src={'/assets/Loader.gif'} alt="" /> :

                    <div className="super__section">
                        <div className="mail__section">

                            <div className="mail__subject">
                                <p className="mails__subject mx-5">
                                    {mail.subject}
                                </p>
                            </div>
                            <div className="mail__right">
                                <img src={'/assets/print.png'} alt="" />
                                <img src={'/assets/bin_icon.png'} alt="" />
                            </div>

                        </div>

                        <div className="mail__id mx-5">
                            <div className="mail__id__left">
                                <img className="profile__mail" src={mail.sendPhotoURL} alt="" />

                                <span className="text-muted">{mail.senderName}</span>
                                <span className="text-muted">{mail.senderEmail}</span>
                            </div>
                            <div className="mail__id__right">
                                <span>{new Date(mail.time?.seconds * 1000).toLocaleTimeString()}</span>
                                <img src={'/assets/star_icon.png'} alt="" />
                                <img src={'/assets/reply.png'} alt="" />
                                <img src={'/assets/three_dots_icon.png'} alt="" />
                            </div>
                        </div>

                        <div className="mail__body">

                            <h4 className="mb-4">Body : </h4>
                            <p>{mail.body ? mail.body : <b>This mail has no boddy</b>}</p>

                            <hr />
                            <br />


                            {mail.attachments ? <b>This mail has attachments</b> : <b>This mail has no attachments</b>}
                        </div>
                    </div>


                }
            </div>
        </div>
    </div>;
};

export default OpenMail;
