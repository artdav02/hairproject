import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import close from './img/close.svg'
import {serviceCategories} from "../../pages/service/data";

const SideBar = ({ isOpen, closeSidebar }) => {

    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();

    const handleServiceClick = (serviceName) => {
        const urlFriendlyName = serviceName.replace(/\s+/g, '-').toLowerCase(); // Convert serviceName to URL-friendly format
        navigate(`/bronn/${urlFriendlyName}`); // Navigate to the new URL
    };


    const toggleDropdown = (categoryName) => {
        if (activeDropdown === categoryName) {
            setActiveDropdown(null); // Close dropdown if the same category is clicked again
        } else {
            setActiveDropdown(categoryName);
        }
    };


    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <img src={close} onClick={closeSidebar} className='closeSvg'/>
            <div className="content">
                <div className="buttons">
                    {serviceCategories.map((category, index) => (
                        <div key={category.categoryName} className="buttonsCategory">
                            <div onClick={() => toggleDropdown(category.categoryName)} className='buttonsSingleCategory'>{category.categoryName}</div>
                            {activeDropdown === category.categoryName && (
                                <ul>
                                    {category.items.map((service, i) => (
                                        <li key={service} style={{ animationDelay: `${i * 0.1}s` }} onClick={() => handleServiceClick(service.name)}>
                                            {service.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SideBar;
