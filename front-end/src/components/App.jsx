import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import E404 from './pages/E404';
import Main from './pages/Main';
import AddBill from "./pages/AddBill";
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
						<Route exact path="/add/bill" component={AddBill} />
						<Route component={E404} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;