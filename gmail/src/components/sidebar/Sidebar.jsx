import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openCompose } from '../../slices/mailSlice';
import './Sidebar.css';


const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const totalInbox = useSelector((state) => state.mail.totalInbox)
    const totalSent = useSelector((state) => state.mail.totalSent)



    function handleInboxClick(e) {
        navigate('/')


        document.getElementById('myInbox').classList.add('inbox')
        document.getElementById('myInbox').classList.remove('draft')

        document.getElementById('mySent').classList.add('draft')
        document.getElementById('mySent').classList.remove('inbox')

    }

    function handleSentClick(e) {
        navigate('/sent')

        document.getElementById('mySent').classList.add('inbox')
        document.getElementById('mySent').classList.remove('draft')

        document.getElementById('myInbox').classList.add('draft')
        document.getElementById('myInbox').classList.remove('inbox')



    }


    return <div>


        <div className="flex-shrink-0 bg-white text-black" style={{ width: '232px' }}>
            <button className="compose" onClick={() => dispatch(openCompose())}>
                <img src={'/assets/compose_icon.png'} alt="" />
                <p className="mt-2">Compose</p>
            </button>
            <div className="side__tools mt-2">
                <div className="inbox" id="myInbox" onClick={handleInboxClick} >
                    <div> <img src={'/assets/inbox_icon.png'} alt="" />
                        <b>Inbox</b></div>
                    <b>{totalInbox}</b>
                </div>
                <div className="draft">
                    <div> <img src={'/assets/draft_icon.png'} alt="" />
                        <b>Draft</b></div>
                    <b>2</b>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/less_icon.png'} alt="" />
                        <b>Less</b></div>
                </div>
                <div className="draft " id='mySent' onClick={handleSentClick} >
                    <div> <img src={'/assets/sent_icon.png'} alt="" />
                        <b>Sent</b></div>
                    <b>{totalSent}</b>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/starred_icon.png'} alt="" />
                        <b>Starred</b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/snoozed_icon.png'} alt="" />
                        <b>Snoozed</b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/important_icon.png'} alt="" />
                        <b>Important</b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/chats_icon.png'} alt="" />
                        <b>Chats</b></div>
                </div>

                <div className="draft ">
                    <div> <img src={'/assets/scheduled_icon.png'} alt="" />
                        <b>Schedule</b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/allmail_icon.png'} alt="" />
                        <b>All Mail</b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/spam_icon.png'} alt="" />
                        <b>Spam</b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/bin_icon.png'} alt="" />
                        <b>Bin</b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/categories_icon.png'} alt="" />
                        <b>Categories</b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/manage_labels_icon.png'} alt="" />
                        <b>Manage labels</b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/create_new_label_icon.png'} alt="" />
                        <b>Create new label </b></div>
                </div>

            </div>

            <div className="meet">
                <hr />
                <p className="ms-4">Meet</p>
                <div className="draft ">
                    <div> <img src={'/assets/meet_icon.png'} alt="" />
                        <b>New Meeting </b></div>
                </div>
                <div className="draft ">
                    <div> <img src={'/assets/keyboard_icon.png'} alt="" />
                        <b>Join a meeting </b></div>
                </div>
            </div>
            <hr />
            <p className="meet ms-4">Hangouts</p>
            <div className="">
                <div className="hangouts">
                    <img src={'/assets/person_icon.png'} alt="" />
                    <img src={'/assets/people_icon.png'} alt="" />
                </div>
            </div>




        </div>

    </div>;
};

export default Sidebar;
