import React, { Component } from "react";
import EditorComponent from "./EditorComponent";
import AppContext from "../mainUI/AppContext";
import { withRouter, Redirect } from "react-router-dom";

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
    padding: "5%"
  }
};

const EditorPage = props => {
  const backTomain = e => {
    props.history.push("/");
  };
  return (
    <div style={style.root} onClick={backTomain}>
      <AppContext.Consumer>
        {fusens => (
          <EditorComponent
            onSaveButtonClicked={props.saveFusen}
            {...fusens[props.match.params.id]}
          />
        )}
      </AppContext.Consumer>
    </div>
  );
};

export default withRouter(EditorPage);
