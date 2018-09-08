import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import conf from '../config.json';
import './Header.css';

class Header extends Component {
    componentWillMount() {
        document.title = conf.title;
    }
    
    render() {
        return (
            <header>
                <NavLink to="/" id="logo">{conf.title}</NavLink>
                <div>
                    <NavLink exact to="/" className="btn">Главная</NavLink>
                    <NavLink exact to="/auth/login" className="btn">Вход</NavLink>
                    <NavLink exact to="/auth/register" className="btn">Регистрация</NavLink>
                </div>
            </header>
        );
    }
}

export default Header;