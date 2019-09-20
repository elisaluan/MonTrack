import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import './Login.css'
import axios from "axios";

import { Button, Input, Icon } from "antd";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderRedirect() {
    this.props.history.push("/")
  }

  handleSubmit() {
    console.log("before axios call: " + this.state.username + ' ' + this.state.password)
    axios.post('/create-user', {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      if (response === 500) {
        alert('could not create user!')
      } else {
        this.renderRedirect();
      }
      console.log(response);
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
    return (
      <div className="CreateUser">
        <div class="login-section">
          <div class="login-design-box">
            <div class="row justify-content-center">
              <h1 class="login-title">New Account</h1>
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

            <br/>

            <div class="row justify-content-center">
              <div class="col-6">
                <Button
                  onClick = {this.handleSubmit}
                  ghost
                >
                  create account!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateUser);;

