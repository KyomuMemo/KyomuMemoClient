import React, { Component } from "react";
import { Paper, Button, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountAPIClient from "../../client/AccountAPIClient"

export default class LoginFormCompoent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  // mock
  handleSubmit = async event => {
    event.preventDefault();
    const response = await AccountAPIClient.SendAccountLoginRequest(this.state.username);
    if(response.result == "ok"){
      this.props.onAccountIDUpdate(response.userID)
      this.props.showNotification("success", "ログインしました。");
    } else {
      this.props.showNotification("error", "ログインに失敗しました。"); //TODO:分かりやすいメッセージ
    }
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    return (
      <div className="login-page">
        <Paper
          style={{
            backgroundColor: "#" + this.state.color,
            padding: "20px",
            zIndex: 2147483647 - 1
          }}
          elevation={0}
          onClick={e => e.stopPropagation()}
        >
          <Typography variant="display2" gutterBottom>
            Fusen Memo Service
          </Typography>
          <form onSubmit={this.handleSubmit} style={{marginBottom: "1em"}}>
            <TextField
              label="username"
              value={this.state.username}
              onChange={this.handleChange("username")}
            />
            <Button type={"submit"}>
              ログイン
            </Button>
          </form>
          <Link to={"/account/register"}>アカウント作成ページへ</Link>
        </Paper>
      </div>
    );
  }
}
