/* global API */
import React, {Component} from 'react';
import conf from '../../../config.json';
import BC from '../../BC';
import Input from '../../Input';
import Sign from '../../Sign';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                email: '',
                pass: '',
                passr: ''
            },
            status: {
                type: 'hidden',
                text: ''
            },
            working: false
        };
        this.formChange = this.formChange.bind(this);
        this.formSend = this.formSend.bind(this);
    }

    formChange(e) {
        let data = this.state.data;
        data[e.target.name] = e.target.value;
        this.setState({data});
    }

    defaultStatus = { type: 'error', text: 'Сбой сервера, попробуйте позже' };

    async formSend(e) {
        this.setState({
            status: {
                type: 'hidden',
                text: ''
            },
            working: true
        });
        e.preventDefault();

        const {data} = this.state;
        if(data.pass !== data.passr) {
            this.setState({
                status: {
                    type: 'warning',
                    text: 'Пароли не совпадают'
                }
            });
        } else if(data.pass.length < 8 || data.pass.length > 32) {
            this.setState({
                status: {
                    type: 'warning',
                    text: 'Пароль должен содержать от 8 до 32 символов'
                }
            });
        } else {
            let result = await API.auth.register(data);
            switch(result.msg) {
                case 'passwords_doesnt_match':
                    result = {
                        type: 'warning',
                        text: 'Пароли не совпадают'
                    };
                    break;
                case 'password_length':
                    result = {
                        type: 'warning',
                        text: 'Пароль должен содержать от 8 до 32 символов'
                    };
                    break;
                case 'email_taken':
                    result = {
                        type: 'warning',
                        text: 'Данный email уже занят'
                    };
                    break;
                case 'success':
                    result = {
                        type: 'success',
                        text: 'Аккаунт был успешно зарегистрирован'
                    };
                    sessionStorage.setItem('register', data.email);
                    setTimeout(() => this.props.history.push('/auth/login'), 1000);
                    break;
                default: console.error(result); result = this.defaultStatus; break;
            }

            this.setState({
                status: result,
                working: false
            });
        }
    }

    render() {
        return (
            <div className="page-container">
                <BC path={['Авторизация', 'Регистрация']} />
                <form className="center" onSubmit={this.formSend}>
                    <Sign type={this.state.status.type} title="Регистрация" desk={this.state.status.text} />
                    <h2>Регистрация аккаунта {conf.title}</h2>
                    <Input onChange={this.formChange} name="email" type="email" placeholder="Введите email" />
                    <div style={{display: 'flex'}}>
                        <Input onChange={this.formChange} name="first_name" type="text" placeholder="Введите имя" />
                        <Input onChange={this.formChange} name="last_name" type="text" placeholder="Введите фамилию" />
                    </div>
                    <Input onChange={this.formChange} name="pass" type="password" placeholder="Введите пароль" />
                    <Input onChange={this.formChange} name="passr" type="password" placeholder="Повторите пароль" />                    
                    <button disabled={this.state.working} type="submit" className="btn btn-success">Зарегистрироваться</button>
                </form>
            </div>
        );
    }
}

export default Register;