import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router";
import AccountForm from "./AccountForm";

const style = {
  root: {
    background: "rgba(0,0,0,0.5)",
    bottom: 0,
    left: 0,
    overflow: "auto",
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: 2147483647 - 2,
    padding: "10%"
  }
};

class AccountPage extends Component {
  componentDidMount() {
    // 初回時はLoginページに飛ぶ
    this.props.history.push("/account/login");
  }
  onAccountIDUpdate = async (id, userName) => {
    await this.props.onAccountIDUpdate(id, userName);
    this.props.history.push("/home");
  };
  render() {
    const form = type => (
      <AccountForm
        type={type}
        onAccountIDUpdate={this.onAccountIDUpdate}
        showNotification={this.props.showNotification}
      />
    );
    return (
      <div style={style.root}>
        <Switch>
          <Route path="/account/login" render={_ => form("login")} />
          <Route path="/account/register" render={_ => form("register")} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AccountPage);
