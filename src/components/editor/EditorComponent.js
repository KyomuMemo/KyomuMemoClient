import React, { Component } from "react";
import Textfield from "@material-ui/core/TextField";
import TagEditor from "./TagEditor";
import TitleComponent from "./TitleEditor";
import { TwitterPicker } from "react-color";
import { Button, Paper } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
  red,
  pink,
  purple,
  orange,
  yellow,
  lime,
  green,
  cyan,
  blue
} from "@material-ui/core/colors";

const style = {
  paper: color => ({
    backgroundColor: "#" + color,
    padding: "20px",
    zIndex: 2147483647 - 1
  }),
  savebutton: {
    div: {
      minHeight: "1.5em",
      margin: "0.5em"
    },
    button: {
      display: "block",
      float: "right"
    }
  },
  picker: {
    display: "inline-block"
  }
};

export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.userID,
      fusenID: props.fusenID,
      title: props.title,
      tag: props.tag,
      text: props.text,
      color: props.color
    };
  }
  // TagEditor Functions
  updateTag = (e, i) => {
    let tag = this.state.tag;
    tag[i] = e.target.value;
    this.setState({
      tag: tag
    });
    this.props.onUpdated();
  };

  deleteTag = (e, i) => {
    let tag = this.state.tag;
    tag.splice(i, 1);
    this.setState({
      tag: tag
    });
    this.props.onUpdated();
  };

  addTag = e => {
    let tag = this.state.tag !== undefined ? this.state.tag : [];
    tag.push("");
    this.setState({
      tag: tag
    });
    this.props.onUpdated();
  };

  onTitleChanged = e => {
    this.setState({ title: e.target.value });
    this.props.onUpdated();
  };

  onColorChanged = e => {
    this.setState({ color: e.hex.split("#")[1] });
    this.props.onUpdated();
  };

  onTextChanged = e => {
    this.setState({ text: e.target.value });
    this.props.onUpdated();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.fusenID === undefined) {
      return nextProps;
    }
    return null;
  }

  render() {
    return (
      <div>
        <Paper
          style={style.paper(this.state.color)}
          elevation={0}
          onClick={e => e.stopPropagation()}
        >
          <TitleComponent
            onTitleChanged={this.onTitleChanged.bind(this)}
            title={this.state.title}
          />
          <TagEditor
            onTextFieldChange={this.updateTag.bind(this)}
            onClickRemoveButton={this.deleteTag.bind(this)}
            onClickAddButton={this.addTag.bind(this)}
            tag={this.state.tag}
          />
          <Textfield
            multiline={true}
            rows={15}
            onChange={this.onTextChanged}
            value={this.state.text}
            placeholder={"text"}
            fullWidth
          />
          <div style={style.savebutton.div}>
            <Button
              onClick={e => this.props.onSaveButtonClicked(this.state)}
              style={style.savebutton.button}
              variant="contained"
              size={"small"}
            >
              <SaveIcon />
            </Button>
          </div>
        </Paper>
        <div style={style.picker} onClick={e => e.stopPropagation()}>
          <TwitterPicker
            color={this.state.color}
            onChangeComplete={this.onColorChanged.bind(this)}
            colors={[
              red["A100"],
              pink["A100"],
              purple["A100"],
              orange["A100"],
              yellow["A100"],
              lime["A100"],
              green["A100"],
              cyan["A100"],
              blue["A100"],
              "#fff"
            ]}
          />
        </div>
      </div>
    );
  }
}
