import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import conf from '../config.json';
import './BC.css';

class BC extends Component {
    render() {
        return (
            <p className="bc">
                <NavLink to="/" className="part">{conf.title}</NavLink>
                {this.props.path.map((part, key) => (<span key={key} className="part">{part}</span>))}
            </p>
        );
    }
}

export default BC;