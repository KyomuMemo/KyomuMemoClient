import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { withRouter, Route, Switch } from "react-router-dom";
import SearchBarComponent from "./SearchBarComponent";
import CreateFusenButtonComponent from "./CreateFusenButtonComponent";
import ContentsArea from "./ContentsArea";
import DeleteArea from "./DeleteArea";
import SearchResultArea from "../search/SerachResultArea";
import EditorPage from "../editor/EditorPage";
import AccountPage from "../accounts/AccountPage";
import FusenAPIClient from "../../client/FusenAPIClient";
import Notification, { NotificationType } from "./Notification";

const styles = {
  mainPage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eee"
  },
  areaContainer: {
    height: "100%",
    width: "100%"
  }
};

/**
 * メインページ
 * アプリケーション全体の親となるコンポーネント
 */
class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fusens: {},
      positions: {},
      isSearch: false,
      searchWords: [],
      userID: "",
      userName: "",
      notificationData: {
        variant: "",
        message: "",
        key: Math.random()
      },
      notificationOpen: false,
      isInit: false
    };
    this.maxZIndex = 1;
    this.props.history.push("/account");
  }

  /**
   * 付箋の初期化を行う
   * ログイン直後に一度だけ呼び出される
   */
  async initFusen() {
    const fusens = await this.getFusensData();
    const positions = this.initPositions(fusens);

    this.setState({
      fusens: fusens,
      positions: positions,
      isInit: true
    });
  }

  /**
   * ログインしたユーザの全付箋データを取得する
   */
  async getFusensData() {
    const response = await FusenAPIClient.sendFusenGetRequest(
      this.state.userID
    );
    if (response.result === "ok") {
      let fusenObj = {};
      response.fusens.forEach(fusen => {
        fusenObj[fusen.fusenID] = fusen;
      });
      return fusenObj;
    } else {
      this.showNotification(NotificationType.error, response.message);
      return {};
    }
  }

  /**
   * 画面内における付箋の位置をランダムで生成する
   */
  getRandomPosition() {
    const area = document.getElementsByClassName("areaContainer")[0] || {};
    const areaWidth = area.clientWidth || 1920;
    const areaHeight = area.clientHeight || 1024;
    const boxWidth = 240;
    const boxHeight = 100;

    const calcPosition = (areaSize, boxSize) => {
      let x = Math.random();
      if (boxSize > areaSize) return x;

      const isInArea = x * areaSize + boxSize < areaSize;
      return isInArea ? x : calcPosition(areaSize, boxSize);
    };

    return {
      x: calcPosition(areaWidth, boxWidth),
      y: calcPosition(areaHeight, boxHeight)
    };
  }

  /**
   *  取得した全付箋データの位置を初期化する
   */
  initPositions(fusens) {
    let positions = {};

    Object.keys(fusens).forEach(id => {
      const position = this.getRandomPosition();
      positions[id] = {
        top: position.y,
        left: position.x,
        zIndex: 0
      };
    });
    return positions;
  }

  /**
   * 付箋の表示内容を更新する
   * 付箋の保存時，新規作成時に呼び出される
   */
  updateFusen(fusen) {
    const fusensCopy = Object.assign({}, this.state.fusens);
    const positionsCopy = Object.assign({}, this.state.positions);

    fusensCopy[fusen.fusenID] = fusen;
    //新しい付箋なら初期位置に配置
    if (!positionsCopy.hasOwnProperty(fusen.fusenID)) {
      const position = this.getRandomPosition();
      const initialPosition = {
        top: position.y,
        left: position.x,
        zIndex: this.maxZIndex++
      };
      positionsCopy[fusen.fusenID] = initialPosition;
    }
    this.setState({ fusens: fusensCopy, positions: positionsCopy });
  }

  /**
   * 付箋を新規作成する
   * 新規作成ボタンクリック時に呼び出される
   */
  createFusen = async () => {
    const response = await FusenAPIClient.sendFusenCreateRequest(
      this.state.userID
    );

    if (response.result === "ok") {
      this.updateFusen(response.fusen);
      this.openFusen(response.fusen.fusenID);
    } else {
      this.showNotification(NotificationType.error, response.message);
    }
  };

  /**
   * 付箋を削除する
   * 付箋が削除エリアにドロップされた時と削除ボタンクリック時に呼びされる
   */
  deleteFusen = async fusenID => {
    const fusensCopy = Object.assign({}, this.state.fusens);
    const positionsCopy = Object.assign({}, this.state.positions);
    const deletedFusen = fusensCopy[fusenID];
    const deletedPosition = positionsCopy[fusenID];

    delete fusensCopy[fusenID];
    delete positionsCopy[fusenID];
    this.setState({ fusens: fusensCopy, positions: positionsCopy });

    const response = await FusenAPIClient.sendFusenDeleteRequest(
      this.state.userID,
      fusenID
    );

    if (response.result !== "ok") {
      this.showNotification(NotificationType.error, response.message);

      //fusensCopyを再利用するとthis.setStateが即座に反映されないためコピーを作成
      const fusensCopy2 = Object.assign({}, fusensCopy);
      const positionsCopy2 = Object.assign({}, positionsCopy);

      fusensCopy2[fusenID] = deletedFusen;
      positionsCopy2[fusenID] = deletedPosition;
      this.setState({ fusens: fusensCopy2, positions: positionsCopy2 });
    }
  };

  /**
   * 付箋の位置を更新する
   * 付箋がドロップされた時に呼び出される
   */
  moveFusen = (fusenID, toX, toY) => {
    const positionsCopy = Object.assign({}, this.state.positions);
    positionsCopy[fusenID] = {
      left: toX,
      top: toY,
      zIndex: this.maxZIndex++
    };
    this.setState({ positions: positionsCopy });
  };

  /**
   * 付箋編集画面を開く
   * 付箋クリック時に呼び出される
   */
  openFusen = fusenID => {
    this.props.history.push({
      pathname: "/memo/" + fusenID
    });
  };

  /**
   * 付箋検索画面への遷移を行う
   * 検索時，検索終了時に呼び出される
   */
  updateSearchState = searchStr => {
    searchStr = searchStr.trim();
    const searchWords = searchStr.split(/\s+/); //スペース区切りで配列化
    const isSearch = searchStr !== "";
    this.setState({ searchWords: searchWords, isSearch: isSearch });
    this.props.history.push(isSearch ? "/search" : "home");
  };

  /**
   * 付箋を保存する
   * 付箋編集画面の保存ボタンクリック時に呼び出される
   */
  saveFusen = async fusen => {
    const response = await FusenAPIClient.sendFusenUpdateRequest(fusen);
    if (response.result === "ok") {
      this.updateFusen(fusen);
      this.showNotification(NotificationType.success, "付箋を保存しました");
      return true;
    } else {
      this.showNotification(NotificationType.error, response.message);
      return false;
    }
  };

  /**
   * ログイン中のアカウントIDを更新する
   * ログイン成功時に呼び出される
   */
  updateAccountID = (id, userName) => {
    this.setState({ userID: id, userName: userName });
    this.initFusen();
  };

  /**
   * 通知を表示する
   * エラー発生時，操作成功時などに呼び出される
   */
  showNotification = (variant = "success", message = "") => {
    const key = Math.random();
    this.setState({
      notificationOpen: true,
      notificationData: { variant: variant, message: message, key: key }
    });
  };

  /**
   * 通知を閉じる
   */
  closeNotification = () => {
    this.setState({ notificationOpen: false });
  };

  render() {
    const searchResultArea = (
      <SearchResultArea
        fusens={this.state.fusens}
        searchWords={this.state.searchWords}
        deleteFusen={this.deleteFusen}
        openFusen={this.openFusen}
      />
    );

    const contentsArea = (
      <ContentsArea
        moveFusen={this.moveFusen}
        fusens={this.state.fusens}
        positions={this.state.positions}
        deleteFusen={this.deleteFusen}
        openFusen={this.openFusen}
        isInit={this.state.isInit}
      />
    );

    return (
      <div className="mainPage" style={styles.mainPage}>
        <SearchBarComponent
          updateSearchState={this.updateSearchState}
          isSearch={this.state.isSearch}
          userName={this.state.userName}
        />
        <div className="areaContainer" style={styles.areaContainer}>
          {this.state.isSearch ? searchResultArea : contentsArea}
        </div>
        <Notification
          closeNotification={this.closeNotification}
          open={this.state.notificationOpen}
          notificationData={this.state.notificationData}
        />
        <Switch>
          <Route
            path="/memo/:id"
            render={props => (
              <EditorPage
                saveFusen={this.saveFusen}
                fusen={this.state.fusens[props.match.params.id]}
                isSearch={this.state.isSearch}
                showNotification={this.showNotification}
              />
            )}
          />
          <Route
            path="/account"
            render={_ => (
              <AccountPage
                onAccountIDUpdate={this.updateAccountID}
                showNotification={this.showNotification}
              />
            )}
          />
          <Route
            path="/home"
            render={_ => (
              <div>
                <CreateFusenButtonComponent createFusen={this.createFusen} />
                <DeleteArea deleteFusen={this.deleteFusen} />
              </div>
            )}
          />
          <Route
            path="/search"
            render={_ => (
              <CreateFusenButtonComponent createFusen={this.createFusen} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  DragDropContext(TouchBackend({ enableMouseEvents: true }))(MainPage)
);
