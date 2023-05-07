import React from "react";
import { NavLink } from "react-router-dom";
import './styles/Menu.css';

const Menu = () => {
    return ( 
        <div className="menu">
            <NavLink to="/home" className='menu-title'>
                <h1>Orbly</h1>
            </NavLink>
            <div className="menu-items">
                <NavLink to="/home" className='menu-item'>Home</NavLink>
                <NavLink to="/explore" className='menu-item'>Explore</NavLink>
                <NavLink to="/messages" className='menu-item'>Messages</NavLink>
                <NavLink to="/notifications" className='menu-item'>Notifications</NavLink>
                <div className='menu-item create-button'>Create</div>
                <NavLink to="/profile" className='menu-item'>Profile</NavLink>
            </div>
            <div className="menu-settings">
                <button className='menu-item-settings'>Settings</button>
            </div>
        </div>
    );
}
 
export default Menu;