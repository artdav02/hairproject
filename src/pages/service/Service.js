import React, {useEffect, useState} from 'react';
import {serviceCategories} from "./data";
import './Service.css';
import CalendarComponent from "../../components/calendar/Calendar";
import service from './img/icons8-list-48.png'
import date from './img/icons8-date-48.png'
import {useNavigate} from "react-router-dom";
import logo from './img/logo.png'
import back from './img/icons8-left-arrow-50.png'
import user from './img/icons8-user-48.png'
import faq from './img/icons8-more-info-50.png'
import hair from './img/icons8-hairdresser-50.png'
import kristjan from './img/Guy-Baron.jpg'
import lina from './img/woman.jpg';
import negr from './img/26xp-minneapolis-floyd-mediumSquareAt3X.jpg';

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
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [detailsFilled, setDetailsFilled] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // Adjust this regex according to the expected phone number format

    const [isMasterMenuVisible, setIsMasterMenuVisible] = useState(false);
    const [selectedMaster, setSelectedMaster] = useState(null);
    const masters = [
        { name: "Pole tähtis", imageUrl: user },
        { masterId: 1, name: 'Kristjan Babahmatov', imageUrl: kristjan, info: 'Minu nimi on Kristjan, ja ma olen juuksur-stilist Tallinnas. Alustasin oma karjääri viisteist aastat tagasi, pärast seda, kui avastasin oma kirge kunsti ja moe vastu. Minu spetsialiteet on avant-garde soengud ja julged värvilahendused, mis peegeldavad minu klientide isikupära. Ma usun, et iga soeng on nagu kunstiteos, mis räägib lugu. ', instUrl: 'https://google.com', linkedinUrl: 'https://linkedin.com', twitUrl: 'https://twitter.com' },
        { masterId: 2, name: 'Liina Makova', imageUrl: lina, info: 'Minu nimi on Liina, ja ma olen pärit väikesest Eesti külast, kus juuksuritööd peetakse põlvest põlve edasi antavaks käsitööks. Olen spetsialiseerunud traditsioonilistele lõikustehnikatele ja looduslikele juuksehooldusvahenditele, mida valmistan ise kohalikest taimedest. Minu klientide hulka kuuluvad need, kes hindavad aegumatut ilu ja soovivad oma juustele parimat hoolitsust.', instUrl: 'https://google.com', linkedinUrl: 'https://linkedin.com', twitUrl: 'https://twitter.com' },
        { masterId: 3, name: 'Marek Dodik', imageUrl: negr, info: 'Minu nimi on Marek, ja ma olen meeste juuksur Pärnus. Alustasin oma karjääri soovist moderniseerida meeste juuksurikogemust, pakkudes midagi enamat kui lihtsalt lõikust - pakkudes kogemust. Minu salongis ühendan ma traditsioonilised barberitehnikad kaasaegse stiiliga, luues nüüdisaegseid ja stiilseid lõikusi, mis sobivad iga mehe isikupäraga. Lisaks pakun habemeajamist ja näohooldusi, kasutades kvaliteetseid tooteid. ',instUrl: 'https://google.com', linkedinUrl: 'https://linkedin.com', twitUrl: 'https://twitter.com' },
        // Add more masters as needed
    ];


    const toggleMasterMenu = () => {
        if (selectedService) { // Ensure a service is selected before allowing to choose a master
            setIsMasterMenuVisible(!isMasterMenuVisible);
        }
        if(selectedMaster) {
            setSelectedMaster(null)
        }
    };

    const handleMasterSelection = (master) => {
        setSelectedMaster(master); // master should be an object with { name, imageUrl }
        setIsMasterMenuVisible(false);
    };


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
        setSelectedMaster(null);
        setIsMenuVisible(false);
        setIsCalendarVisible(false);
        setIsUserDetailsVisible(false); // Reset user details visibility
    };

    const handleDateSelectionClick = () => {
        if (selectedService && detailsFilled) { // Ensure all user details are valid
            setIsCalendarVisible(!isCalendarVisible);
        }
    };

    const handleUserDetailChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));

        let tempEmailError = emailError;
        let tempPhoneError = phoneError;

        // Email validation
        if (name === 'email') {
            tempEmailError = emailRegex.test(value) ? '' : 'Valesti sisestatud e-mail!';
        }

        // Phone number validation
        if (name === 'phoneNumber') {
            tempPhoneError = phoneRegex.test(value) ? '' : 'Valesti sisestatud number!';
        }

        setEmailError(tempEmailError);
        setPhoneError(tempPhoneError);

        // Check if all details are filled and valid
        const allDetailsFilled = Object.values({ ...userDetails, [name]: value }).every(detail => detail !== '') && !tempEmailError && !tempPhoneError;
        setDetailsFilled(allDetailsFilled);
    };



    const handleBack = () => {
        navigate('/');
    };



    const handleMaster = () => {
        console.log(selectedMaster.masterId)
        navigate('/master', { state: { name: selectedMaster.name, img: selectedMaster.imageUrl, info: selectedMaster.info, instUrl: selectedMaster.instUrl, masterId: selectedMaster.masterId } });
    }

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

                <div className={`mainDetails${selectedService ? '' : ' disabled'}`} onClick={toggleMasterMenu}>
                    <div className="serviceLogo">
                        <img src={hair} alt="" className='serviceLogoImg'/>
                    </div>
                    <div className="serviceChoose">
                        Vali teenusepakkuja
                    </div>
                </div>
                {isMasterMenuVisible && (
                    <div className={`mastersContainer ${isMasterMenuVisible ? 'fadeInUp' : ''}`}>
                        {masters.map((master, index) => (
                            <div className={`categoryNameMaster${activeCategory === master.name ? ' active' : ''}`}
                                 key={master.masterId}  onClick={() => handleMasterSelection(master)}
                                          style={{ animationDelay: `${index * 0.1}s` }} >
                                <img src={master.imageUrl} alt={master.name} className="masterImage" />
                                <div className="masterName">{master.name}</div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedMaster && (
                    <div className="selectedServiceContainer">
                        <div className="selectedMainMaster">
                                <div className="selectedMasterDetails">
                                <img src={selectedMaster.imageUrl} alt={selectedMaster.name} className="masterImage" />
                                <div className='selectedMasterName'>{selectedMaster.name}</div>
                                </div>
                            {selectedMaster.name !== "Pole tähtis" && (
                                <div className="selectedMasterInfo" >
                                    <img src={faq} alt="" className='faqImage' onClick={handleMaster}/>
                                </div>
                            )}
                        </div>
                    </div>
                )}


                <div className={`mainDetails ${selectedService && selectedMaster ? '' : ' disabled'}`} onClick={() => {
                    if (selectedMaster) { // Check if a master has been selected
                        handleUserDetailsToggle();
                    }
                }}>
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
                            Nimi *
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nimi"
                            value={userDetails.name}
                            onChange={handleUserDetailChange}
                            className="userDetailInput"
                        />
                        <div className="inputHeader">
                            Perekonnanimi *
                        </div>
                        <input
                            type="text"
                            name="surname"
                            placeholder="Perekonnanimi"
                            value={userDetails.surname}
                            onChange={handleUserDetailChange}
                            className="userDetailInput"
                        />
                        <div className="inputHeader">
                            E-mail *
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={userDetails.email}
                            onChange={handleUserDetailChange}
                            className="userDetailInput"
                        />
                        {emailError && <div className='inputError' style={{ color: 'red' }}>{emailError}</div>}
                        <div className="inputHeader">
                            Telefoni number *
                        </div>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="+372 12345678"
                            value={userDetails.phoneNumber}
                            onChange={handleUserDetailChange}
                            className="userDetailInput"
                        />
                        {phoneError && <div className='inputError' style={{ color: 'red' }}>{phoneError}</div>}
                        <div className="inputHeader">
                            Midagi kasulikut
                        </div>
                        <textarea
                            name="additionalInfo"
                            placeholder="Kirjuta siia mingeid lisasoove või informatsiooni"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className="userDetailInput area"
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
                            masterName={selectedMaster.name}
                            userName={userDetails.name}
                            userSurname={userDetails.surname}
                            email={userDetails.email}
                            phoneNumber={userDetails.phoneNumber}
                            additionalInfo={additionalInfo}
                            price='40$'
                        />

                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicePage;
