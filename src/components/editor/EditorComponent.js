import React, { Component } from "react";
import Textfield from "@material-ui/core/TextField";
import TagEditor from "./TagEditor";
import TitleComponent from "./TitleEditor";
import { TwitterPicker } from "react-color";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import APIMock from "../mainUI/APIMock";

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
  };
  deleteTag = (e, i) => {
    let tag = this.state.tag;
    tag.splice(i, 1);
    this.setState({
      tag: tag
    });
  };
  addTag = e => {
    let tag = this.state.tag !== undefined ? this.state.tag : [];
    tag.push("");
    this.setState({
      tag: tag
    });
  };

  onTitleChanged = e => {
    this.setState({ title: e.target.value });
  };

  onColorChanged = e => {
    this.setState({ color: e.hex.split("#")[1] });
  };

  onSaveButtonClicked = async e => {
    try {
      await APIMock.updateFusen(this.state);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: "#" + this.state.color, padding: "10px" }}>
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
          type={"text"}
          onChange={e => {
            this.setState({ text: e.target.value });
          }}
          value={this.state.text}
          fullWidth
        />
        <TwitterPicker
          color={this.state.color}
          onChangeComplete={this.onColorChanged.bind(this)}
        />
        <Button onClick={this.onSaveButtonClicked}>
          <SaveIcon />
        </Button>
      </div>
    );
  }
}
