import React from "react";
import './Success.css';
import success from './img/icons8-tick-150.png'
import {useLocation} from "react-router-dom";

function Success () {

    const location = useLocation();
    const { name, surname, date, time } = location.state;

    return (

        <>
            <div className="successContent">
                <div className="successMain">
                    <div className="pageLogo">
                        <img src={success} alt=""/>
                    </div>
                    <div className="pageText">
                        Teie broneering on kinnitatud!
                    </div>
                    <div className="pageSubText">
                        Ootame teid, {`${name} ${surname} ${date} ${time}`}
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

export default Success;