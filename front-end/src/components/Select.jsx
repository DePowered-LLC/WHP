import React, {Component} from 'react';
import './Select.css';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {val: '', name: '', open: false};
        this.onOptionClick = this.onOptionClick.bind(this);
        this.onOutsideClick = this.onOutsideClick.bind(this);
        this.setRef = this.setRef.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onOutsideClick);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onOutsideClick);
    }
    
    onOptionClick(e) {
        if(e.target.localName === 'option') this.setState({val: e.target.value, name: e.target.innerHTML});
        e.target.className = 'hidden';
        this.setState({open: false});
    }
    
    setRef(elem) { this.ref = elem; }
    onOutsideClick(e) {
        if (this.ref && !this.ref.contains(e.target)) {
            this.setState({open: false});
        }
    }
    
    render() {
        const options = React.Children.map(this.props.children, child => {
            let elem = React.cloneElement(child, { onClick: this.onOptionClick, className: 't' });
            console.log(elem);
            return elem;
        });
      
        return (
            <div ref={this.setRef} className={'select_wrapper' + (this.state.open?' open':'')}>
                <span onClick={() => this.setState({open: !this.state.open})} className="current">{this.state.name}</span>
                <span className="placeholder">{this.props.placeholder}</span>
                <div className="options">{options}</div>
            </div>
        );
    }
}

export default Select;