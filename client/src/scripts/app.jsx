import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test.jsx';

class App extends React.Component {

    constructor() {
        super();
    }
    render () {
        return (
            <div>
            Hello world
            <Test />
            </div>
        );
    }
}

ReactDOM.render(App, document.getElementById('app'));
