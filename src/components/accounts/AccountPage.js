import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router";
import RegisterFormCompoent from "./RegisterForm";
import LoginFormCompoent from "./LoginForm";
import Typography from "@material-ui/core/Typography";

class AccountPage extends Component {
  componentDidMount() {
    // 初回時はLoginページに飛ぶ
    this.props.history.push("/account/login");
  }
  render() {
    return (
      <div>
        <Typography variant="display2" gutterBottom>
          Fusen Memo Service
        </Typography>
        <Switch>
          <Route path="/account/login" component={LoginFormCompoent} />
          <Route path="/account/register" component={RegisterFormCompoent} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AccountPage);
