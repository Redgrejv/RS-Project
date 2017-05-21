import React from 'react';
import ReactDOM from 'react-dom';

class RegHeader extends React.Component{
  render() {
    return (
      <div className="header1">
        <h3>Регистрация</h3>
        <a href="#" className="uppercase" id="come_back">Назад</a>
      </div>
    );
  }
};

class RegBlock extends React.Component{
  render(){
    return(
      <div className="reg_block">
        <FormReg />
      </div>
    );
  }
};

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class FormReg extends React.Component {

  render() {
    return (
      <form method="POST" name="sign_up">
      <input id="first_name" type="text" name="first_name" placeholder="Имя"  />
      <input id="last_name" type="text" name="last_name" placeholder="Фамилия"  />
      <input id="email" type="email" name="email" placeholder="Email"  />
      <input id="password" type="password" name="password" placeholder="Пароль"  />
      <input id="confirm_password" type="password" name="confirm_password" placeholder="Подтвердить пароль"  />
      <Toggle />
      </form>
    );
  }
}

class Avatar extends React.Component{
  render(){
    return(
      <div className="avatar">
      <Toggle />
      </div>
    );
  }
};

ReactDOM.render(
  <RegHeader />,
  document.getElementById("header")
);

ReactDOM.render(
  <RegBlock />,
  document.getElementById("main1")
);

export default RegHeader;
