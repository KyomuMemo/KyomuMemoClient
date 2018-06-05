import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom";

export default class RegisterFormCompoent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  // mock
  handleSubmit = event => {
    console.log(this.state.username);
    event.preventDefault();
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    return (
      <div className="login-page">
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="username"
            value={this.state.username}
            onChange={this.handleChange("username")}
          />
          <Button variant="contained" type={"submit"}>アカウント作成</Button>
        </form>
        <Link to={"/account/login"}>ログインページへ</Link>
      </div>
    );
  }
}
