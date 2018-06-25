import React, { Component } from "react";
import Textfield from "@material-ui/core/TextField";
import TagEditor from "./TagEditor";
import TitleComponent from "./TitleEditor";
import { TwitterPicker } from "react-color";
import { Button, Paper } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userID,
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
          style={{
            backgroundColor: "#" + this.state.color,
            padding: "20px",
            zIndex: 2147483647 - 1
          }}
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
          <div style={{ minHeight: "1.5em", margin: "0.5em" }}>
            <Button
              onClick={e => this.props.onSaveButtonClicked(this.state)}
              style={{ display: "block", float: "right" }}
              variant="contained"
              size={"small"}
            >
              <SaveIcon />
            </Button>
          </div>
        </Paper>
        <div
          style={{ display: "inline-block" }}
          onClick={e => e.stopPropagation()}
        >
          <TwitterPicker
            color={this.state.color}
            onChangeComplete={this.onColorChanged.bind(this)}
          />
        </div>
      </div>
    );
  }
}
