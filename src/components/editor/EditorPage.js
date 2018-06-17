import React, { Component } from "react";
import EditorComponent from "./EditorComponent";
import APIMock from "../mainUI/APIMock";

export default class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fusen: props.location.state.fusen
    };
  }
  render() {
    return (
      <div>
        <EditorComponent {...this.state.fusen} />
      </div>
    );
  }
}
