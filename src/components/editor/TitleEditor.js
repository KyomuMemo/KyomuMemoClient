import React from "react";
import { TextField } from "@material-ui/core";

//TODO : Custom CSSを使ってそれっぽくすること
export default class TitleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    };
  }
  onChange = e => {
    this.setState({ title: e.target.value });
    this.props.onTitleChanged(e);
  };
  render() {
    return (
      <TextField
        value={this.state.title}
        onChange={this.onChange}
        fullWidth={true}
      />
    );
  }
}
