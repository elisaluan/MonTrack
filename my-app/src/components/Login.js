import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import axios from "axios";

import './Login.css'
import MainPage from './MainPage'

import { Button, Input, Icon } from "antd";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedin: false,
      wrongCred: false
    };
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderRedirect() {
    this.props.history.push("/dashboard")
  }

  handleSubmit() {
    axios({ method:"post", url:'/user-login', data:{
      username: this.state.username,
      password: this.state.password
    }, validateStatus:(s) => s < 500 })
    .then((response) => {
      if (response.status === 400) {
        alert('wrong credentials!')
        this.setState({wrongCred: true})
      } else if (response.status === 200) {
        this.setState({loggedin: true})
        // this.renderRedirect();
      }
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleChange = variable => event => {
    this.setState({ [variable]: event.target.value });
    console.log(this.state[variable]);
  };


  render() {
    if (this.state.loggedin) {
      return (
        <>
          <MainPage
            username = {this.state.username}
          />
        </>
      );
    } else {
      return (
        <div className="Login">
          <div class="login-section">
            <div class="login-design-box">
              <div class="row justify-content-center">
                <h1 class="login-title">MonTrack</h1>
              </div>
              <div class="row justify-content-center">
                <div class="col-6">
                  <Input
                    defaultValue = {this.state.username}
                    onChange = {this.handleChange('username')}
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </div>
              </div>

              <br/>

              <div class="row justify-content-center">
                <div class="col-6">
                  <Input
                      defaultValue = {this.state.password}
                      onChange = {this.handleChange('password')}
                      placeholder="Enter your password"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
              </div>

              { this.state.wrongCred ?
                <div>
                  <br/> 

                  <div class="row justify-content-center">
                    <div class="col-6">
                      <span style={{color: 'red'}}>incorrect password or username</span>
                    </div>
                  </div>
                </div>
              :
                null
              }

              <br/>

              <div class="row justify-content-center">
                <div class="col-6">
                  <Button
                    onClick = {this.handleSubmit}
                    ghost
                  >
                    login!
                  </Button>
                </div>
              </div>

              <br/> 
              <div class="row justify-content-center">
                <div class="col-6">
                  <a href="/create-user"><span style={{color: 'black'}}>create an account</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Login);;

