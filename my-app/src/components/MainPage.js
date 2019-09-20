  
import React, { Component } from "react";
import { Avatar, Button, DatePicker, Input, Icon } from "antd";
import axios from "axios";
import "./MainPage.css"

import Purchase from './Purchase'
import Table from './Table'

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      username: this.props.username,
      item_name: '',
      quantity: 0,
      price_per_unit: 0,
      date: 0,
      rows: []
    };
    this.handleGetPurchases = this.handleGetPurchases.bind(this);
    this.handlePurchaseSubmit = this.handlePurchaseSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  componentDidMount() {
    this.handleGetPurchases();
  }

  handleChange = variable => event => {
    this.setState({ [variable]: event.target.value });
    console.log(this.state[variable]);
  };

  handlePurchaseSubmit() {
    console.log(this.state.username)
    axios.post('/add-purchase', {
      username: this.props.username,
      item_name: this.state.item_name,
      quantity: this.state.quantity,
      price_per_unit: this.state.price_per_unit,
      date: this.state.date
    })
    .then((response) => {
      if (response.status === 500) {
        alert('cannot make new purchase!')
      } else if (response.status === 200) {
        this.handleGetPurchases()
      }
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleGetPurchases() {
    console.log(this.state.username)
    axios.get('/purchases/'+this.state.username)
    .then((response) => {
      if (response.status === 500) {
        alert('cannot make new purchase!')
      } else if (response.status === 200) {
          this.setState({rows: response.data})
      }
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleDate(variable, date) {
    this.setState({ [variable]: date });
    console.log(this.state[variable]);
  }

  render() {
    console.log("username"+this.props.username)
    return (
      <div className="MainPage">
        <div class="user-header-container">
          <div class="row justify-content-center">
            <div class="col-2">
              <Avatar size={200} icon="user" />
            </div>
            <div class="col-2">
              <h2 class="username-display ">{
                this.state.username}
              </h2>
            </div>
          </div>
        </div>
        <div class="create-item">
          <div class="row justify-content-center">
            <div class="col-9">
              <Purchase
                handlePurchaseSubmit = {this.handlePurchaseSubmit}
                handleChange = {this.handleChange}
                handleDate = {this.handleDate}
              />
            </div>
          </div>
        </div>
        <div class="purchases-table">
          <div class="row justify-content-center">
            <div class="col-9">
              <Table 
                rows={this.state.rows}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;