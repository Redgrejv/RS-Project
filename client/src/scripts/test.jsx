import React from 'react';
var ReactDOM = require('react-dom');

class Test extends React.Component {

    constructor() {
        super();
    }
    render () {
        return (
            <div>Hello world 2</div>
        );
    }
}

class Test1 extends React.Component {

    constructor() {
        super();
    }
    render () {
        return (
            <div>Hello world 3</div>
        );
    }
}

ReactDOM.render(
  <Test />,
  document.getElementById('hello')
);

ReactDOM.render(
  <Test1 />,
  document.getElementById('hello1')
);

export default Test;
