import './Landing.css';
import Carousel from "../../components/carousel/carousel";
import l1 from '../../img/l1.png';
import l2 from '../../img/l2.png';
import l3 from '../../img/l3.png';
import insta from '../../img/icons8-instagram.svg';
import fb from '../../img/icons8-facebook.svg';
import twitter from '../../img/icons8-twitter.svg';
import React, { useState, useEffect } from 'react';
import SideBar from '../../components/sidebar/Sidebar';
import {useNavigate} from "react-router-dom";


function Landing() {

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            const mainText = document.querySelector('.mainText');
            if (header) {
                header.style.backgroundSize = `${window.scrollY * 1.8 + 1920}px`;
            }
            if (mainText) {
                mainText.style.opacity = `${(-window.scrollY + 400) * 0.004}`;
            }
        };

        // Attach the event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        navigate('/bronn')
    }

    const scrollToGallery = () =>{
        document.getElementById('gallery').scrollIntoView({behavior: "smooth", block: "start"});
    }
    const scrollToService = () =>{
        document.getElementById('service').scrollIntoView({behavior: "smooth", block: "start"});
    }
    const scrollToContact = () =>{
        document.getElementById('contact').scrollIntoView({behavior: "smooth", block: "start"});
    }


    const TextAnimation = ({ text }) => {
        const [letters, setLetters] = useState([]);

        useEffect(() => {
            // Split the text into letters and set initial animation state for each letter
            const splitText = text.split('').map((char, index) => ({
                char,
                className: index % 2 === 0 ? 'animate-top' : 'animate-bottom'
            }));
            setLetters(splitText);
        }, [text]);

        return (
            <div className="mainText">
                {letters.map((letter, index) => (
                    <span key={index} className={`letter ${letter.className}`} style={{ animationDelay: `${index * 100}ms` }}>
          {letter.char}
        </span>
                ))}
            </div>
        );
    };

    const advantages = [
        {
            img: l1,
            header: 'Proffesional service.',
            description: 'cock suck.'

        },
        {
            img: l2,
            header: 'Comfortable atmo.',
            description: 'Aleksei bashmakov.'

        },
        {
            img: l3,
            header: 'Gift cards.',
            description: 'We provide gift cards.'

        },
    ]

    const sections = [
        {
            subHeader: 'Naiste lõikused',
            items: [
                { name: 'Naiste lõikus + viimistlus', price: '25-35€', side: 'left' },
                { name: 'Tuka lõikus', price: '10€', side: 'left' },
                { name: 'Föönisoeng', price: '20-30€', side: 'left' },
                { name: 'Lokid', price: '25-35€', side: 'right' },
                { name: 'Pidulik soeng', price: '35-50€', side: 'right' },
            ]
        },
        {
            subHeader: 'JUUSTE VÄRVIMINE',
            headerSubHeader: '(Lisandub materjali hind)',
            items: [
                { name: 'Juurevärv', price: '55€', side: 'left' },
                { name: 'Värvimine täispea', price: '60€', side: 'left' },
                { name: 'Juurevärv + lõikus', price: '65€', side: 'left' },
                { name: 'Värv + lõikus', price: '70-90€', side: 'left' },
                { name: 'Triibutamine', price: '85-105€', side: 'left' },
                { name: 'Triibutamine + lõikus', price: '85-105€', side: 'right' },
                { name: 'Airtouch', price: '95-125€', side: 'right' },
                { name: 'Balayage, ombre', price: '85-100€', side: 'right' },
                { name: 'Värvimine + joico hooldus', price: '75-100€', side: 'right' },
                { name: 'Juuste toneerimine', price: '15€', side: 'right' },
            ]
        },
        {
            subHeader: 'JUUSTE RAVI JA HOOLDUS',
            subDescription: 'Emmediciotto värvid 0,3 €\nWELLA värvid 0,4 €\nBlondeerimispulber 0,4 €', side: 'left',
            items: [
                { name: 'Joico', price: '35-50€', side: 'left' },
            ],
        },
        {
            subHeader: 'JUUKSURITEENUSED MEESTELE',
            items: [
                { name: 'Meestelõikus', price: '25€', side: 'left' },
                { name: 'Masinalõikus', price: '20€', side: 'right' },
            ]
        },
        {
            subHeader: 'MANIKÜÜR',
            items: [
                { name: 'Klassikaline maniküür', price: '25€', side: 'left' },
                { name: 'geelküünte paigaldus', price: '50€', side: 'left' },
                { name: 'geellaki paigaldus', price: '40€', side: 'left' },
                { name: 'gellküünte hooldus', price: '40€', side: 'left' },
                { name: 'geellaki hooldus', price: '35€', side: 'right' },
                { name: 'ühe küüne hoolduse välibe parandamine', price: '5€', side: 'right' },
                { name: 'geelküünte eemaldamine', price: '25€', side: 'right' },
            ]
        },
        {
            subHeader: 'PEDIKÜÜR',
            items: [
                { name: 'Pediküür', price: '40€', side: 'left' },
                { name: 'Pediküür geellakiga', price: '45€', side: 'left' },
                { name: 'Meeste pediküür', price: '40€', side: 'right' },
            ]
        },
        // Add more sections as needed, following the same structure
    ];


    return (
        <>
            <div className="content">
                <div className="header">
                    <div className="navbar">
                        <div className="navbarItem" onClick={scrollToService}>
                            Teenused
                        </div>
                        <div className="navbarItem" onClick={scrollToGallery}>
                            Galerii
                        </div>
                        <div className="navbarItem" onClick={toggleSidebar}>
                            Broneeri aega
                        </div>
                        <div className="navbarItem" onClick={scrollToContact}>
                            Kontakt
                        </div>
                    </div>
                    <div className="bookNow">
                        <div className="bookText">
                            Broneeri <br></br>
                            Aega
                        </div>
                    </div>
                    <TextAnimation text="JUUKSURITEENUSED" />
                </div>
                <div className="priceHeader" id='service'>TEENUSED</div>
                <div className="priceList" >

                    {sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="contentContainer">
                            <div className="singleSection">
                                <div className="subHeader">{section.subHeader}</div>
                                {section.headerSubHeader && <div className="headerSubHeader">{section.headerSubHeader}</div>}
                                <div className="sectionList">
                                    <div className="itemsLeft">
                                        {section.items.filter(item => item.side === 'left').map((item, itemIndex) => (
                                            <div key={itemIndex} className="item">
                                                <div className="serviceName">{item.name}</div>
                                                <div className="price">{item.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="itemsRight">
                                        {section.items.filter(item => item.side === 'right').map((item, itemIndex) => (
                                            <div key={itemIndex} className="item">
                                                <div className="serviceName">{item.name}</div>
                                                <div className="price">{item.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {section.subDescription && (
                                    <div className="subDescription">
                                        {section.subDescription.split('\n').map((line, index, array) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                {index < array.length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}
                </div>

                <div id='gallery' ></div>
                <Carousel >

                </Carousel>
                <div className="advantagesBg">
                    <div className="advantages">
                        <div className="advantagesHeader">
                            Our advantages
                        </div>
                        <div className="advantagesMain">
                            {advantages.map((item,i) => (
                                <div className="singleAdvantage">
                                    <div className="advantageImg"
                                         style={{ backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(00, 0, 0, 0.8)70%),url(${item.img})`}}
                                    >
                                    </div>
                                    <div className="advantageDescription">
                                        <div className="advHeader">
                                            {item.header}
                                        </div>
                                        <div className="advDescription">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="footer" id='contact'>
                    <div className="logo">
                        LOGO
                    </div>
                    <div className="description">
                        INSPIREERITUD TEIE ILUST
                    </div>
                    <div className="phone">
                        +372 555 907 04
                    </div>
                    <div className="mailAddressPostcode">
                        palmitsilulabor@gmail.com
                    </div>
                    <div className="mailAddressPostcode">
                        Kiikri 2/1
                    </div>
                    <div className="mailAddressPostcode">
                        10152 Tallinn, Estonia
                    </div>
                    <div className="socials">
                        <div className="singleLogo">
                            <img src={insta} alt=""/>
                        </div>
                        <div className="singleLogo">
                            <img src={fb} alt=""/>
                        </div>
                        <div className="singleLogo">
                            <img src={twitter} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landing;
