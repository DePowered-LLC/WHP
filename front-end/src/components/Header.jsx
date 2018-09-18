import React, {Component, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import conf from '../config.json';
import './Header.css';

class Header extends Component {
    componentWillMount() { document.title = conf.title; }
   
    render() {
        return (
            <header>
                <NavLink to="/" id="logo">{conf.title}</NavLink>
                <div>
                    <NavLink exact to="/" className="btn-header">Главная</NavLink>
                    {this.props.User.isLogged ? <Fragment>
                        <button onClick={this.props.App.logout} className="btn-header">Выйти</button>
                    </Fragment> : <Fragment>
                        <NavLink exact to="/auth/login" className="btn-header">Вход</NavLink>
                        <NavLink exact to="/auth/register" className="btn-header">Регистрация</NavLink>
                    </Fragment>}
                </div>
            </header>
        );
    }
}

export default Header;