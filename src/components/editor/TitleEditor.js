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
  static getDerivedStateFromProps(nextProps,prevState){
    if(prevState.title === undefined){
      return nextProps;
    }
    return null;
  }
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
