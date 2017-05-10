import React from 'react';
import ReactDOM from 'react-dom';
// import Test from './test.jsx';

let test = [{
    id: 1,
    name: 'Yoda'
},
{
    id: 2,
    name: 'Obi Van'
},{
    id: 3,
    name: 'C3PO'
},
{
    id: 4,
    name: 'Bill'
}];

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.context.getSearch()} onChange={(event)=> {
                        this.props.onChange(event.target.value);
                    }} />
            </div>
        );
    }
}

Input.contextTypes = {
    getSearch: React.PropTypes.func
}

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            search: '',
            items: test
        };
    }

    getChildContext() {
        return {
            getSearch: ()=> {
                return this.state.search
            }
        }
    }

    renderList() {
        let list = this.state.items.filter((item)=> {
            return item.name.match(this.state.search);
        });
        return (
            <ul>
                {list.map((item)=> {
                    return (
                        <li key={item.id}>{item.name}</li>
                    );
                })}
            </ul>
        );
    }

    render() {
        return (
            <div>
                Hello world
                <Input onChange={(data)=>{
                        this.setState({
                            search: data
                        });
                }} />
                {this.state.search}
                {this.renderList.call(this)}
            </div>
        );
    }

}

App.childContextTypes = {
    getSearch: React.PropTypes.func
}

ReactDOM.render(<App/>, document.getElementById('app'));
