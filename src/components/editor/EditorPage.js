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
    padding: "10%"
  }
};

class EditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false
    };
  }
  updated = () => {
    this.setState({ updated: true });
  };
  
  onSaveButtonClicked = async fusen => {
    try {
      const result = await this.props.saveFusen(fusen);
      if (result) {
        this.setState({ updated: false });
      } else {
        // TODO : エラー表示
        console.log("error")
      }
    } catch (e) {
      console.log(e);
    }
  };

  backTomain = e => {
    if (this.state.updated) {
      if (
        !window.confirm("未保存のデータがあります。本当に戻っていいですか？")
      ) {
        return;
      }
    }
    this.props.history.push("/");
  };
  render() {
    return (
      <div style={style.root} onClick={this.backTomain}>
        <AppContext.Consumer>
          {fusens => (
            <EditorComponent
              onSaveButtonClicked={this.onSaveButtonClicked}
              onUpdated={this.updated}
              {...fusens[this.props.match.params.id]}
            />
          )}
        </AppContext.Consumer>
      </div>
    );
  }
}

export default withRouter(EditorPage);
