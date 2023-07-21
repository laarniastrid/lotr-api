import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.scss';

const NavBar = () => {
    return (
        <nav className='nav'>
            <div className="nav-links">
                <NavLink to="/" className="link" >
                    Home
                </NavLink>
                <NavLink to="/movies" className="link" >
                    Movies
                </NavLink>
                <NavLink to="/characters" className="link" >
                    Characters
                </NavLink>
                <NavLink to="/quotes" className="link" >
                    Quotes
                </NavLink>
            </div>
        </nav>
    );
};

export default NavBar;
