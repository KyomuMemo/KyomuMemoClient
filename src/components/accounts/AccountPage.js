import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router";
import RegisterFormCompoent from "./RegisterForm";
import LoginFormCompoent from "./LoginForm";
import Typography from "@material-ui/core/Typography";

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
  onAccountIDUpdate = async id => {
    await this.props.onAccountIDUpdate(id);
    this.props.history.push("/");
  };
  render() {
    return (
      <div style={style.root}>
        <Switch>
          <Route
            path="/account/login"
            render={props => (
              <LoginFormCompoent
                onAccountIDUpdate={this.onAccountIDUpdate}
                showNotification={this.props.showNotification}
              />
            )}
          />
          <Route
            path="/account/register"
            render={props => (
              <RegisterFormCompoent
                onAccountIDUpdate={this.onAccountIDUpdate}
                showNotification={this.props.showNotification}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AccountPage);
