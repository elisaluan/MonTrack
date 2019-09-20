  
import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { Avatar, Button, DatePicker, Input, Icon } from "antd";
import "./MainPage.css"

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  refresh() {
    this.props.handlePurchaseSubmit("submit")
    // window.location.reload();
  }

  onDateChange(date, dateString) {
    this.props.handleDate('date', dateString)
  }

  render() {
    return (
      <div className="Purchase">
        <div class="item-input">
          <div class="row">
            <div class="col-5">
              <Input
                placeholder = "Enter the name of the item"
                onChange={this.props.handleChange("item_name")}
              />
            </div>
            <div class="col-2">
              <Input
                placeholder = "Quantity"
                onChange={this.props.handleChange("quantity")}
              />
            </div>
            <div class="col-2">
              <Input
                placeholder = "Price Per Unit"
                onChange={this.props.handleChange("price_per_unit")}
              />
            </div>
            <div class="col-2">
                <DatePicker 
                    onChange={this.onDateChange} 
                    format={'YYYY-MM-DD'}
                />
            </div>
            <div class="col-1">
                <Button shape="circle" icon="plus" onClick={this.refresh}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Purchase);