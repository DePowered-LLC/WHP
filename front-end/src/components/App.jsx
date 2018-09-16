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
		(async () => {
			Object.assign(User, await API.auth.session());
			this.setState({loading: false});
		})();
	}

	render() {
		return this.state.loading
			? <div id="loader"></div>
			: <BrowserRouter>
				<div>
					<Header />
					<AnimatedSwitch {...switchAnim}>
						<Route onEnter={() => console.log('Works fine')} exact path="/" component={Main} />
						<Route exact auth path="/private" component={Main} />
						<Route exact path="/auth/register" component={Register} />
						<Route exact path="/auth/login" component={Login} />
						<Route component={E404} />
					</AnimatedSwitch>
				</div>
			</BrowserRouter>;
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
		const chProps = {...this.context.router, ...this.state, User};
		const Component = this.props.component;
		return this.props.auth
			? User.isLogged ? <Component {...chProps} /> : <E403 {...chProps} />
			: <Component {...chProps} />
	}
}

export default App;