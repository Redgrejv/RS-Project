import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component{
        render() {
            return (
                <div className="header1">
                    <h3>Авторизация</h3>
                    <a href="#" className="uppercase" id="come_back">Назад</a>
                </div>
            );
        }
    };

class Main extends React.Component {
    render(){
        return (
            <div className="reg_block">
              <div className="avatar"></div>
              <form action="#" method="POST">
                <input id="email" type="email" name="email" placeholder="Email" required />
                <input id="password" type="password" name="password" placeholder="Пароль" required />
                <button id="sign_up" type="submit" className="uppercase">Вход</button>
              </form>
            </div>
        );
    }
}

// function ActionLink() {
//   function handleClick(e) {
//     e.preventDefault();
//     console.log('The link was clicked.');
//   }
//
//   return (
//     <a href="#" onClick={handleClick}>
//       Click me
//     </a>
//   );
// }

Main.contextTypes = {
    getSearch: React.PropTypes.func
}

ReactDOM.render(
    <Header />,
    document.getElementById("header")
);

ReactDOM.render(
    <Main />,
    document.getElementById("main")
);
