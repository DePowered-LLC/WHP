import React, {Component} from 'react';
import './Input.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {val: '', active: false};
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        let val = event.target.value.trim();
        if(val) { this.setState({active: true, val}); }
        else { this.setState({active: false, val}); }
    }
    
    render() {
        return (
            <div className={'input_wrapper' + (this.state.active?' active':'')}>
                <input value={this.state.val} onChange={this.handleChange} type={this.props.type || 'text'} required />
                <span className="placeholder">{this.props.placeholder}</span>
            </div>
        );
    }
}

export default Input;