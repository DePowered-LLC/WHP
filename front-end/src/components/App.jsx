import React, { Component } from 'react';
import { AnimatedSwitch } from 'react-router-transition';
import { BrowserRouter, Route as ORoute } from 'react-router-dom';
import Header from './Header';
import E404 from './pages/E404';
import E403 from './pages/E403';
import Main from './pages/Main';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import './App.css';
import API from '../API';
window.API = API;

class App extends Component {
	constructor() {
		super();
		this.state = {
			loading: true
		};
		this.checkSession = this.checkSession.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		Route.App = this;
		this.checkSession();
	}

	async checkSession() {
		this.setState({loading: true});
		const result = await API.auth.session();
		if(result.msg) {
			User.isLogged = true;
			User.session = result.msg;
		}
		this.setState({loading: false});
	}
	
	async logout() {
		this.setState({loading: true});
        const result = await API.auth.logout();
        if(result.msg === 'success') {
            User.isLogged = false;
            User.session = {};
        } else {
            alert('Произошла непредвиденная ошибка');
        }
		this.setState({loading: false});
    }

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header App={this} User={User} />
					<div id="loader" className={this.state.loading ? '' : 'hidden'}></div>
					<AnimatedSwitch {...switchAnim}>
						<Route exact path="/" component={Main} />
						<Route exact auth path="/private" component={Main} />
						<Route exact path="/auth/register" component={Register} />
						<Route exact path="/auth/login" component={Login} />
						<Route component={E404} />
					</AnimatedSwitch>
				</div>
			</BrowserRouter>
		);
	}
}

const switchAnim = {
	atEnter:   {opacity: 1, left: 150},
	atLeave:   {opacity: 0, left: -100},
	atActive:  {opacity: 1, left: 0},
	className: 'switch-wrapper'
};

const User = {
	isLogged: false,
	session: {}
};

class Route extends ORoute {
	render() {
		const Component = this.props.component;
		const chProps = {...this.context.router, ...this.state, User, App: Route.App};
		return this.props.auth
			? User.isLogged ? <Component {...chProps} /> : <E403 {...chProps} />
			: <Component {...chProps} />
	}
}

export default App;