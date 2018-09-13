import React, {Component} from 'react';
import './Sign.css';

class Sign extends Component {
    render() {
        return (
            <div className={'sign sign-'+this.props.type}>
                <span className="helper"></span>
                <span className="title">{this.props.title}</span>
                <div className="desk">{this.props.desk || ''}</div>
            </div>
        );
    }
}

export default Sign;