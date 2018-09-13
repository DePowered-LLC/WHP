import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import E404 from './pages/E404';
import Main from './pages/Main';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import './App.css';
import API from '../API';
window.API = API;

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<Switch>
						<Route exact path="/" component={Main} />
						<Route exact path="/auth/register" component={Register} />
						<Route exact path="/auth/login" component={Login} />
						<Route component={E404} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;