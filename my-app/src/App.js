  
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import CreateUser from "./components/CreateUser";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={MainPage} />
            <Route exact path="/create-user" component={CreateUser} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;