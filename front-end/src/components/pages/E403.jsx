import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import BC from '../BC';

class E403 extends Component {    
    render() {
        return (
            <div className="page-container center">
                <BC path={['Ошибка доступа']} />
                <h1>403</h1>
                <h2>Недостоточно прав для просмотра страницы</h2>
                <a onClick={this.props.history.goBack} className="btn">Назад</a>
                <NavLink to="/" className="btn btn-success">Главная</NavLink>
                <NavLink to="/auth/login" className="btn btn-info">Вход</NavLink>
            </div>
        );
    }
}

export default E403;