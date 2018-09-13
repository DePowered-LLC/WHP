import React, {Component} from 'react';
import './Input.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {val: '', active: false};
        this.handleChange = this.handleChange.bind(this);
        this.set = this.set.bind(this);
    }
    
    handleChange(event) {
        let val = event.target.value.trim();
        this.props.onChange && this.props.onChange(event);
        this.set(val);
    }

    set(val) {
        if(val) { this.setState({active: true, val}); }
        else { this.setState({active: false, val}); }
    }
    
    render() {
        return (
            <div className={'input_wrapper' + (this.state.active?' active':'')}>
                <input value={this.state.val} onChange={this.handleChange} name={this.props.name} type={this.props.type || 'text'} required />
                <span className="placeholder">{this.props.placeholder}</span>
            </div>
        );
    }
}

export default Input;