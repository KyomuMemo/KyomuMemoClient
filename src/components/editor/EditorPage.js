import React, { Component } from "react";
import EditorComponent from "./EditorComponent";

export default class EditorPage extends Component {
  render() {
    return (
      <div>
        <EditorComponent {...this.props}/>
      </div>
    );
  }
}
