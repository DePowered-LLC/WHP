import React, {Component} from 'react';
import conf from '../../../config.json';
import BC from '../../BC';
import Input from '../../Input';
import Select from '../../Select';

class Register extends Component {
    render() {
        return (
            <div className="page-container">
                <BC path={['Авторизация', 'Регистрация']} />
                <form className="center" action="/auth/register/post" method="POST">
                    <h2 className="pheader">Регистрация аккаунта {conf.title}</h2>
                    <h3 className="pheader">Основная информация</h3>
                    <Input type="email" placeholder="Введите email" />
                    <Input type="password" placeholder="Введите пароль" />
                    <Input type="password" placeholder="Повторите пароль" />
                    
                    <h3 className="pheader">Платёжная информация</h3>
                    <Select placeholder="Платёжная система">
                        <option value="qiwi">QIWI</option>
                        <hr />
                        <option value="ym">Yandex.Money</option>
                        <option value="mc">MasterCard</option>
                    </Select>
                    <Input type="text" placeholder="Реквизит платёжной системы" />
                    
                    <h3 className="pheader">Договор</h3>
                    <pre className="wd40">{conf.dogovor}</pre>
                    
                    <button type="submit" className="button-success button-lg wd30">Зарегистрироваться</button>
                </form>
                <br />
            </div>
        );
    }
}

export default Register;