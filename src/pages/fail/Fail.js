import React from "react";
import './Fail.css';
import fail from './img/icons8-fail-100.png'
import {useNavigate} from "react-router-dom";

function Fail () {

    const navigate = useNavigate();

    const handleBackToMainPage = () =>{
        navigate('/')
    }

    return (

        <>
            <div className="successContent">
                <div className="successMain">
                    <div className="pageLogo">
                        <img src={fail} alt="" className='iconFail'/>
                    </div>
                    <div className="pageText">
                        Kahjuks midagi laks valesti!
                    </div>
                    <div className="bookButtonSuccess" onClick={handleBackToMainPage}>
                        <div className="bookButton">
                            Proovida uuesti!
                        </div>
                    </div>
                    <div className="contactDetails">
                        <div className="contactSalong">
                            Salong Name
                        </div>
                        <div className="contactAddress">
                            Kiikri 2/1
                        </div>
                        <div className="contactNumber">
                            +372 123456789
                        </div>
                    </div>
                </div>
            </div>
        </>

    );


}

export default Fail;