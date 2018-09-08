import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import BC from '../BC';

class E404 extends Component {
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    
    render() {
        return (
            <div className="page-container center">
                <BC path={['Страница не найдена']} />
                <h1 className="pheader">404</h1>
                <h3 className="pheader">Страница не найдена</h3>
                <a onClick={this.props.history.goBack} className="button-default button-lg">Назад</a>
                <NavLink to="/" className="button-success button-lg">Главная</NavLink>
            </div>
        );
    }
}

export default E404;