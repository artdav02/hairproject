import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './Master.css'
import back from "../service/img/icons8-left-arrow-50.png";
import logo from "../service/img/logo.png";
import link from './img/icons8-linkedin.svg'
import inst from './img/icons8-instagram.svg'
import twit from './img/icons8-twitter.svg'
import { Rating } from 'react-simple-star-rating'
import axios from "axios";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const Master = () => {

    const location = useLocation();
    const { name, img, info, instUrl, masterId } = location.state;
    const navigate = useNavigate();
    const [rating, setRating] = useState(0)

    const handleRating = (rate) => {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            rating: rate // Update the rating in userDetails state
        }));
        setRating(rate); // This might not be necessary anymore if you're not using the rating state elsewhere
    }


    const handleBack = () => {
        navigate(-1)
    }
    const redirectToInsta = () => {
        window.open(instUrl, '_blank', 'noopener,noreferrer');
    };

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const queryParams = new URLSearchParams({ masterId: masterId }).toString();
                const response = await fetch(`http://localhost:3001/api/comments?${queryParams}`);
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        if (masterId) {
            fetchComments();
        }
    }, [masterId]); // masterId should be included in the dependency array

    useEffect(() => {
        // Check if the comment submission flag is set in local storage
        if (localStorage.getItem('commentSubmitted') === 'true') {
            // Show notification
            NotificationManager.success('Comment submitted successfully', 'Success!');
            // Clear the flag to prevent showing the notification again
            localStorage.removeItem('commentSubmitted');
        }
        // Other useEffect logic for fetching comments, etc.
    }, []); // Ensure this runs only once on component mount


    // Helper function to format the date without time
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [userDetails, setUserDetails] = useState({
        username: '',
        rating: rating,
        comment: '',
        masterId: masterId,
    });

    // Update the state directly based on input changes
    const handleUserDetailChange = (e) => {
        const { name, value } = e.target;

        // Apply validations for specific fields
        if (name === "username" && value.length > 20) return; // Limit username to 20 chars
        if (name === "comment" && value.length > 150) return; // Limit comment to 150 chars

        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // Check if required details are filled and valid for enabling the submit button
    const detailsFilled = userDetails.username.length > 0 && rating >= 1 && userDetails.rating <= 5;

    const handleComment = async () => {
        try {
            console.log('Sending comment:', userDetails);
            await axios.post('http://localhost:3001/api/db', userDetails);
            console.log('Comment submitted successfully');
            localStorage.setItem('commentSubmitted', 'true');
            window.location.reload(false);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const [showComment, setShowComment] = useState(true);
    const [showCommentBox, setShowCommentBox] = useState(false); // State to toggle comment box visibility
    const commentBoxRef = useRef(null); // Ref for the comment box to scroll into view

    // Existing functions: handleRating, handleBack, redirectToInsta, handleUserDetailChange, handleComment

    // New function to toggle comment box visibility and scroll into view
    const toggleCommentBoxVisibility = () => {
        setShowComment(false)
        setShowCommentBox(true); // Toggle visibility
        if (!showCommentBox) {
            setTimeout(() => {
                commentBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100); // Wait for the box to become visible if it was hidden
        }
    };



    return(

        <>
            <div className="masterContent">
                <div className="serviceHeader">
                    <img src={back} alt="" className="backCheevron" onClick={handleBack}/>
                    <div className="serviceAddress">
                        <img src={logo} alt="" className='logoImg'/>
                        <div className="addressAndName">
                            <div className="shopName">
                                SalongName
                            </div>
                            <div className="address">
                                Kiikri 2/1
                            </div>
                        </div>
                    </div>
                </div>
                <div className="masterMain">
                    <div className="usersImage">
                        <img src={img} alt="" className='usersImageImg'/>
                    </div>
                    <div className="masterMainName">
                        {name}
                    </div>
                    <div className="urls">
                        <div className="singleUrl">
                            <img src={link} alt="" className='singleUrlImg link'/>
                        </div>
                        <div className="singleUrl">
                            <img src={inst} alt="" className='singleUrlImg inst' onClick={redirectToInsta}/>
                        </div>
                        <div className="singleUrl">
                            <img src={twit} alt="" className='singleUrlImg twit'/>
                        </div>
                    </div>
                    <div className="selfAbout">
                        Minust
                    </div>
                    <div className="selfDescription">
                        {info}
                    </div>
                </div>
                <div className='commentsMain'>
                    <div className='commentsHeader'>Comments</div>
                    <div>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => {
                                const firstLetter = comment.username[0];
                                return (
                                    <div key={index} className='singleComment'>
                                        <div className="singleCommentUpper">
                                            <div className="userLogo">
                                                {firstLetter}
                                            </div>
                                            <div className="singleCommentUserInfo">
                                                <div className='singleCommentUser'>{comment.username}</div>
                                                <div className="singleCommentRatingDate">
                                                    <Rating initialValue={comment.rating} readonly={true} size={20} />
                                                    <div className='singleCommentDate'>{formatDate(comment.created_at)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {comment.comment && <div className='singleCommentText'>{comment.comment}</div>}
                                    </div>
                                );
                            })
                        ) : (
                            <p>No comments available.</p>
                        )}
                    </div>
                </div>
                <div className={`createComment ${showComment ? '' : 'hidden'}`} onClick={toggleCommentBoxVisibility}>
                    Write a comment
                </div>
                <div className={`writeCommentMain ${showCommentBox ? '' : 'hidden'}`} ref={commentBoxRef}>
                    <div className="inputHeader">
                        Nimi *
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Nimi"
                        value={userDetails.username}
                        onChange={handleUserDetailChange}
                        maxLength="20" // HTML5 input restriction
                        className="userDetailInput"
                    />
                    <div className="inputHeader">
                        Kvaliteet *
                    </div>
                    <Rating  onClick={handleRating} initialValue={0} size={30} showTooltip={true} tooltipDefaultText={'Teie rating!'}  className='rating'/>
                    <div className="inputHeader">
                        Komentaar
                    </div>
                    <input
                        type="text"
                        name="comment"
                        placeholder="Komentaar (valik, max 150 chars)"
                        value={userDetails.comment}
                        onChange={handleUserDetailChange}
                        maxLength="150" // HTML5 input restriction
                        className="userDetailInput"
                    />
                    <div className='commentButton' onClick={handleComment}>Submit Comment</div>
                </div>
            </div>
            <NotificationContainer />
        </>

    );

}

export default Master;