import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CenterSection.css'

const CenterSection = ({ email }) => {

    const navigate = useNavigate()
    const url = window.location.href


    return <div>
        <div className="email__section" onClick={() => navigate(`/mail/inbox/${email.id}`)}>
            <div className="left">

                <img src={'/assets/check_icon.png'} alt="" />
                <img src={'/assets/star_icon.png'} alt="" />
                <img src={'/assets/important_icon.png'} alt="" />
                {url.includes('sent') ? <span className="username__mail me-5">{email.data.recieverEmail}</span>

                    : <span className="username__mail me-5">{email.data.senderEmail}</span>

                }

            </div>
            <div className="middle">
                <div className="subject__matter">
                    <span className="subject me-3">{email.data.subject}</span>
                    <span className="subject text-muted">{email.data.body}</span>
                </div>
                {/* <div className="file__wrap">
                    <img style={{ height: '17px' }} src={'/assets/pdf_icon.png'} alt="" />
                    <span >bank passbookasjdklakjsldj.pdf</span>
                </div> */}
            </div>
            <div className="right ms-2">
                <span>{new Date(email.data.time?.seconds * 1000).toLocaleTimeString()}</span>
            </div>
        </div>
    </div>;
};

export default CenterSection;
