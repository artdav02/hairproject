import React from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import './About.css'
import {useNavigate} from "react-router-dom";

const containerStyle = {
    width: '400px',
    height: '400px',
    margin: '40px auto',
};

const center = {
    lat: 59.442020,
    lng: 24.784440
};

function About() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAGC_Fjmkifc979BtUjOijwVCenCktE1FU"
    })
    const navigate = useNavigate();
    const navigateToSection = (sectionId) => {
        navigate('/', { state: { scrollTo: sectionId } });
    };
    const toggleSidebar = () => {
        navigate('/bronn')
    }
    const handleAbout = () => {
        navigate('/about')
    }

    return isLoaded ? (
        <>
            <div className="aboutContainer">
                <div className="navbar">
                    <div className="navbarItem" onClick={() => navigateToSection('service')}>
                        Teenused
                    </div>
                    <div className="navbarItem" onClick={() => navigateToSection('gallery')}>
                        Galerii
                    </div>
                    <div className="navbarItem" onClick={toggleSidebar}>
                        Broneeri aega
                    </div>
                    <div className="navbarItem" onClick={handleAbout}>
                        Kontakt
                    </div>
                </div>
                <div className="bookNow" onClick={toggleSidebar}>
                    <div className="bookText">
                        Broneeri <br></br>
                        Aega
                    </div>
                </div>
                <div className="headerAbout">
                    Kontakt
                </div>
                <div className="aboutText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className="map">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                    >
                        { /* Child components, such as markers, info windows, etc. */ }
                        <Marker position={center}></Marker>
                    </GoogleMap>
                </div>
                <div className="underFot">
                    <div className="underText">
                        Tel: +372 51234568
                    </div>
                    <div className="underText">
                        Aadress: Kiikri 2/1
                    </div>
                    <div className="underText">
                        E-mail: smth@gmail.com
                    </div>
                </div>
                <div className="poweredBy">
                    Bashmack OÜ
                </div>
            </div>
        </>
    ) : <></>
}

export default About