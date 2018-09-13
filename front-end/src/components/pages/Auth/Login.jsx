/* global API */
import React, {Component} from 'react';
import conf from '../../../config.json';
import BC from '../../BC';
import Input from '../../Input';
import Sign from '../../Sign';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                email: '',
                pass: '',
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

        let result = await API.auth.login(this.state.data);
        switch(result.msg) {
            case 'no_account':
                result = {
                    type: 'error',
                    text: 'Аккаунт не найден'
                };
                break;
            case 'wrong_password':
                result = {
                    type: 'warning',
                    text: 'Пароль не верный'
                };
                break;
            case 'success':
                result = {
                    type: 'success',
                    text: 'Вы успешно вошли в свой аккаунт'
                };
                setTimeout(() => this.props.history.push('/'), 700);
                break;
            default: console.error(result); result = this.defaultStatus; break;
        }
        
        this.setState({
            status: result,
            working: false
        });
    }

    render() {
        return (
            <div className="page-container">
                <BC path={['Авторизация', 'Вход']} />
                <form className="center" onSubmit={this.formSend}>
                    <Sign type={this.state.status.type} title="Вход" desk={this.state.status.text} />
                    <h2 className="pheader">Войдите в свой аккаунт {conf.title}</h2>
                    <Input ref={inComp => {
                        if(sessionStorage.getItem('register')) {
                            const email = sessionStorage.getItem('register');
                            inComp.set(email);
                            sessionStorage.removeItem('register');
                            this.setState({
                                data: {email},
                                status: {
                                    type: 'info',
                                    text: 'Теперь Вы можете войти в свой аккаунт'
                                }
                            });
                        }
                    }} onChange={this.formChange} name="email" type="email" placeholder="Введите email" />
                    <Input onChange={this.formChange} name="pass" type="password" placeholder="Введите пароль" />
                    <button disabled={this.state.working} type="submit" className="button-success button-lg">Войти</button>
                </form>
            </div>
        );
    }
}

export default Login;