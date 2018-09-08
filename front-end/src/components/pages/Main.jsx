import React, {Component} from 'react';
import BC from '../BC';

class Main extends Component {
    render() {
        return (
            <div className="page-container">
                <BC path={['Главная']} />
            </div>
        );
    }
}

export default Main;