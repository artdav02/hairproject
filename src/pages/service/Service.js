import React, {useState} from 'react';
import {serviceCategories} from "./data";
import './Service.css';
import CalendarComponent from "../../components/calendar/Calendar";
import service from './img/icons8-list-48.png'
import date from './img/icons8-date-48.png'
import {useNavigate} from "react-router-dom";
import logo from './img/logo.png'
import back from './img/icons8-left-arrow-50.png'
import user from './img/icons8-user-48.png'
const ServicePage = () => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [isUserDetailsVisible, setIsUserDetailsVisible] = useState(false); // For user details visibility
    const [userDetails, setUserDetails] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: ''
    });
    const [detailsFilled, setDetailsFilled] = useState(false);

    const navigate = useNavigate();

    const toggleServiceMenu = () => {
        setIsMenuVisible(!isMenuVisible);
        if (isMenuVisible) {
            setActiveCategory(null);
            setSelectedService(null);
            setIsCalendarVisible(false);
            setIsUserDetailsVisible(false); // Reset user details visibility
        }
    };

    const toggleCategory = (categoryName) => {
        if (activeCategory !== categoryName) {
            setActiveCategory(categoryName);
        } else {
            setActiveCategory(null);
        }
    };

    const handleUserDetailsToggle = () => {
        if (selectedService) { // Make sure a service is selected before toggling
            setIsUserDetailsVisible(!isUserDetailsVisible);
        }
    };

    const handleServiceSelection = (serviceItem) => {
        setSelectedService(serviceItem);
        setIsMenuVisible(false);
        setIsCalendarVisible(false);
        setIsUserDetailsVisible(false); // Reset user details visibility
    };

    const handleDateSelectionClick = () => {
        if (selectedService && detailsFilled) {
            setIsCalendarVisible(!isCalendarVisible);
        }
    };

    const handleUserDetailChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
        // Check if all details are filled
        const allDetailsFilled = Object.values({ ...userDetails, [name]: value }).every(detail => detail !== '');
        setDetailsFilled(allDetailsFilled);
    };

    const handleBack = () => {
        navigate('/');
    };


    return (
        <div className="service-page">
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
            <div className="serviceContent">
            <div className="serviceDetails">
                <div className="serviceOptions">
                    <div className="mainDetails" onClick={() => {
                        if (selectedService) {
                            setSelectedService(null); // Allow changing service on first click
                        }
                        toggleServiceMenu();
                    }}>
                        <div className="serviceLogo">
                            <img src={service} alt="" className='serviceLogoImg'/>
                        </div>
                        <div className="serviceChoose" >
                            Valida teenust
                        </div>
                    </div>
                    {isMenuVisible && !selectedService && (
                        <div className="categoriesContainer">
                            {serviceCategories.map((category, categoryIndex) => (
                                <div key={category.categoryName}>
                                    <div className="categories">
                                        <div
                                            className={`categoryName${activeCategory === category.categoryName ? ' active' : ''}`}
                                            onClick={() => toggleCategory(category.categoryName)}
                                            style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                                        >
                                            {category.categoryName}
                                        </div>
                                    </div>
                                    {activeCategory === category.categoryName && (
                                        <ul className="categoryItems">
                                            {category.items.map((item, itemIndex) => (
                                                <li key={item.name} style={{ animationDelay: `${itemIndex * 0.1}s` }} className='singleItem' onClick={() => handleServiceSelection(item)}>
                                                    - {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedService && (
                        <div className="selectedServiceContainer">
                            <div className="selectedMain">
                                <div className="selectedService">
                                    Teenus: {selectedService.name}
                                </div>
                                <div className="selectedServiceDuration">
                                    Kestuvus: {selectedService.duration}
                                </div>
                            </div>
                            <div className="selectedPrice">
                                Hind: 40€
                            </div>
                        </div>
                    )}

                </div>
            </div>
                <div className={`mainDetails${selectedService ? '' : ' disabled'}`} onClick={handleUserDetailsToggle}>
                    <div className="serviceLogo">
                        <img src={user} alt="" className='serviceLogoImg'/>
                    </div>
                    <div className="serviceChoose">
                        Sisesta kliendi andmed
                    </div>
                </div>
                {isUserDetailsVisible && (
                    <div className="userDetailsSection">
                        <div className="inputHeader">
                            Nimi
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={userDetails.name}
                            onChange={handleUserDetailChange}
                            className="userDetailInput"
                        />
                        <div className="inputHeader">
                            Perekonnanimi
                        </div>
                        <input
                            type="text"
                            name="surname"
                            placeholder="Surname"
                            value={userDetails.surname}
                            onChange={handleUserDetailChange}
                            className="userDetailInput"
                        />
                        <div className="inputHeader">
                            E-mail
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userDetails.email}
                            onChange={handleUserDetailChange}
                            className="userDetailInput"
                        />
                        <div className="inputHeader">
                            Telefoni number
                        </div>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={userDetails.phoneNumber}
                            onChange={handleUserDetailChange}
                            className="userDetailInput"
                        />
                    </div>
                )}

                <div className={`mainDetails ${selectedService && detailsFilled ? '' : ' disabled'}`} onClick={handleDateSelectionClick} style={{ cursor: selectedService && detailsFilled ? 'pointer' : 'wait' }}>
                <div className="serviceLogo">
                        <img src={date} alt="" className='serviceLogoImg'/>
                    </div>
                    <div className="serviceChoose">
                        Vali aega
                    </div>
                </div>
                {selectedService && isCalendarVisible && (
                    <div className='calendarContainer'>
                        <CalendarComponent
                            serviceName={selectedService.name}
                            duration={selectedService.duration}
                            masterName="Einar Kivisaalu"
                            userName={userDetails.name}
                            userSurname={userDetails.surname}
                        />

                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicePage;
