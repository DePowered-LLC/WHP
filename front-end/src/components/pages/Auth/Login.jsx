import React, {Component} from 'react';
import conf from '../../../config.json';
import BC from '../../BC';
import Input from '../../Input';

class Login extends Component {
    render() {
        return (
            <div className="page-container">
                <BC path={['Авторизация', 'Вход']} />
                <form className="center" action="/auth/login/post" method="POST">
                    <h2 className="pheader">Войдите в свой аккаунт {conf.title}</h2>
                    <Input type="email" placeholder="Введите email" />
                    <Input type="password" placeholder="Введите пароль" />
                    <button type="submit" className="button-success button-lg wd30">Войти</button>
                </form>
            </div>
        );
    }
}

export default Login;