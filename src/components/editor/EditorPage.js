import React from "react";
import EditorComponent from "./EditorComponent";
import { withRouter } from "react-router-dom";
import { NotificationType } from "../mainUI/Notification";

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

/**
 * エディタページ
 * エディタコンポーネントを表示するページ
 * 編集画面の外をクリックすると前のページに戻る
 * 編集された付箋が未保存のまま戻ろうとすると警告を表示する
 */
class EditorPage extends React.Component {
  constructor(props) {
    super(props);
    if (props.fusen === undefined) {
      this.props.showNotification(
        NotificationType.error,
        "指定されたメモが見つかりません"
      );
      this.props.history.push(this.props.isSearch ? "/search" : "/home");
    }
    this.state = {
      updated: false
    };
  }
  updated = () => {
    this.setState({ updated: true });
  };

  onSaveButtonClicked = async fusen => {
    const result = await this.props.saveFusen(fusen);
    if (result) this.setState({ updated: false });
  };

  backTomain = e => {
    if (this.state.updated) {
      if (
        !window.confirm("未保存のデータがあります。本当に戻っていいですか？")
      ) {
        return;
      }
    }
    this.props.history.push(this.props.isSearch ? "/search" : "/home");
  };
  render() {
    return (
      <div style={style.root} onClick={this.backTomain}>
        <EditorComponent
          onSaveButtonClicked={this.onSaveButtonClicked}
          onUpdated={this.updated}
          {...this.props.fusen}
        />
      </div>
    );
  }
}

export default withRouter(EditorPage);
