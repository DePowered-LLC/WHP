import React, {Component} from 'react';
import Input from '../Input';
import BC from '../BC';

class AddBill extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            value: ''
        };
        this.add = this.add.bind(this);
        this.change = this.change.bind(this);
    }

    add() {
        window.API.bills.add(this.state);
    }

    change(e) {
        let st = {};
        st[e.target.name] = e.target.value;
        this.setState(st);
    }

    render() {
        return (
            <div className="page-container center">
                <BC path={['Добавить', 'Счёт']} />
                <Input onChange={this.change} name="name" placeholder="Название" />
                <Input onChange={this.change} name="value" placeholder="Основной реквизит" />
                <button onClick={this.add} className="button-success button-lg wd30">Добавить</button>
            </div>
        );
    }
}

export default AddBill;