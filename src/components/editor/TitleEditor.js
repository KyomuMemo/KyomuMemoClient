import React from "react";
import { FormControl, Input } from "@material-ui/core";

const style = {
  input: {
    fontSize:"40px",
    fontWeight: 600,
  }
};

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
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.title === undefined) {
      return nextProps;
    }
    return null;
  }
  render() {
    return (
      <FormControl fullWidth={true}>
        <Input
          value={this.state.title}
          onChange={this.onChange}
          fullWidth={true}
          style={style.input}
          disableUnderline={true}
        />
      </FormControl>
    );
  }
}
