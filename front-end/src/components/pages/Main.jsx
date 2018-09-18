import React, {Component} from 'react';
import BC from '../BC';

class Main extends Component {
    render() {
        return (
            <div className="page-container">
                <BC path={['Главная']} />
                {JSON.stringify(this.props.User)}
            </div>
        );
    }
}

export default Main;