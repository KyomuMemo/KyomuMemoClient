import React from "react";
import {
  Paper,
  Button,
  TextField,
  Typography,
  Input,
  InputAdornment
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountAPIClient from "../../client/AccountAPIClient";

const style = {
  paper: {
    padding: "20px",
    zIndex: 2147483647 - 1
  },
  form: {
    marginBottom: "1em"
  }
};

const variables = {
  login: {
    button: "ログイン",
    switch: {
      link: "/account/register",
      text: "アカウント作成"
    },
    request: AccountAPIClient.SendAccountLoginRequest,
    success: "ログインしました"
  },
  register: {
    button: "アカウント登録",
    switch: {
      link: "/account/login",
      text: "ログイン"
    },
    request: AccountAPIClient.SendAccountCreateRequest,
    success: "アカウント登録しました"
  }
};

export default class AccountFormCompoent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  handleSubmit = async event => {
    event.preventDefault();
    const response = await variables[this.props.type].request(
      this.state.username
    );
    if (response.result == "ok") {
      this.props.onAccountIDUpdate(response.userID);
      this.props.showNotification(
        "success",
        variables[this.props.type].success
      );
    } else {
      this.props.showNotification("error", response.message); //TODO:分かりやすいメッセージ
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
        <Paper style={style.paper}>
          <Typography variant="display2" gutterBottom>
            Fusen Memo Service
          </Typography>
          <form onSubmit={this.handleSubmit} style={style.form}>
            <TextField
              label="username"
              value={this.state.username}
              onChange={this.handleChange("username")}
            />
            <Button type={"submit"}>{variables[this.props.type].button}</Button>
          </form>
          <Link to={variables[this.props.type].switch.link}>
            {variables[this.props.type].switch.text}
          </Link>
        </Paper>
      </div>
    );
  }
}
