import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { withRouter, Route, Switch } from "react-router-dom";
import SearchBarComponent from "./SearchBarComponent";
import CreateFusenButtonComponent from "./CreateFusenButtonComponent";
import ContentsArea from "./ContentsArea";
import DeleteArea from "./DeleteArea";
import SearchResultArea from "../search/SerachResultArea";
import AppContext from "./AppContext";
import EditorPage from "../editor/EditorPage";
import AccountPage from "../accounts/AccountPage";
import FusenAPIClient from "../../client/FusenAPIClient";
import Notification from "./Notification";

const styles = {
  mainPage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eee"
  }
};

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fusens: {},
      positions: {},
      isSearch: false,
      searchWords: [],
      userID: "",
      notificationData: {
        variant: "",
        message: "",
        key: Math.random()
      },
      notificationOpen: false
    };
    this.maxZIndex = 1;
    this.props.history.push("/account");
  }

  async initFusen() {
    try {
      const fusens = await this.getFusensData(this.state.userID);
      const positions = this.initPositions(fusens);
      
      this.setState({
        fusens: fusens,
        positions: positions
      });
    } catch (e) {
      this.showNotification("error", "付箋の初期化に失敗しました。");
    }
  }

  async getFusensData(userID) {
    const response = await FusenAPIClient.sendFusenGetRequest(
      this.state.userID,
      0
    );
    if (response.result === "ok") {
      let fusenObj = {};
      response.fusens.forEach(fusen => {
        fusenObj[fusen.fusenID] = fusen;
      });
      return fusenObj;
    } else {
      this.showNotification("error", "付箋の取得に失敗しました。");
      return {};
    }
  }

  initPositions(fusens) {
    let positions = {};

    const getRandomPosition = (areaWidth, boxWidth) => {
      let x = Math.random();
      if (boxWidth > areaWidth) return x;

      const isInArea = x * areaWidth + boxWidth < areaWidth;
      return isInArea ? x : getRandomPosition(areaWidth, boxWidth);
    };

    Object.keys(fusens).forEach(id => {
      const area = document.getElementsByClassName("contentsArea")[0] || {};
      const areaWidth = area.clientWidth || 1920;
      const areaHeight = area.clientHeight || 1024;
      const boxWidth = 240;
      const boxHeight = 100;

      positions[id] = {
        top: getRandomPosition(areaHeight, boxHeight),
        left: getRandomPosition(areaWidth, boxWidth),
        zIndex: 0
      };
    });
    return positions;
  }

  updateFusen(fusen) {
    const fusensCopy = Object.assign({}, this.state.fusens);
    const positionsCopy = Object.assign({}, this.state.positions);

    fusensCopy[fusen.fusenID] = fusen;
    //新しい付箋なら初期位置に配置
    if (!positionsCopy.hasOwnProperty(fusen.fusenID)) {
      const initialPosition = { top: 0, left: 0 };
      positionsCopy[fusen.fusenID] = initialPosition;
    }
    this.setState({ fusens: fusensCopy, positions: positionsCopy });
  }

  createFusen = async () => {
    try {
      const response = await FusenAPIClient.sendFusenCreateRequest(
        this.state.userID,
        0
      );
      if (response.result === "ok") {
        this.updateFusen(response.fusen);
      } else {
        this.showNotification("error", "付箋の作成に失敗しました。");
      }
      //TODO:詳細画面に遷移したほうがいい？
    } catch (e) {
      this.showNotification("error", "付箋の作成に失敗しました。");
    }
  };

  deleteFusen = async fusenID => {
    const fusensCopy = Object.assign({}, this.state.fusens);
    const positionsCopy = Object.assign({}, this.state.positions);
    const deletedFusen = fusensCopy[fusenID];
    const deletedPosition = positionsCopy[fusenID];

    delete fusensCopy[fusenID];
    delete positionsCopy[fusenID];
    this.setState({ fusens: fusensCopy, positions: positionsCopy });

    await FusenAPIClient.sendFusenDeleteRequest(
      this.state.userID,
      fusenID
    ).catch(e => {
      //削除失敗時に復元
      fusensCopy[fusenID] = deletedFusen;
      positionsCopy[fusenID] = deletedPosition;
      this.setState({ fusens: fusensCopy, positions: positionsCopy });
      this.showNotification("error", "付箋の削除に失敗しました。");
    });
  };

  moveFusen = (fusenID, toX, toY) => {
    const positionsCopy = Object.assign({}, this.state.positions);
    positionsCopy[fusenID] = {
      left: toX,
      top: toY,
      zIndex: this.maxZIndex++
    };
    this.setState({ positions: positionsCopy });
  };

  openFusen = fusenID => {
    this.props.history.push({
      pathname: "/memo/" + fusenID
    });
  };

  updateSearchState = searchStr => {
    searchStr = searchStr.trim();
    const searchWords = searchStr.split(/\s+/); //スペース区切りで配列化
    const isSearch = searchStr !== "";
    this.setState({ searchWords: searchWords, isSearch: isSearch });
  };

  saveFusen = async fusen => {
    try {
      await FusenAPIClient.sendFusenUpdateRequest(this.state.userID, fusen);
      this.updateFusen(fusen);
      return true;
    } catch (e) {
      this.showNotification("error", "付箋の保存に失敗しました。");
      return false;
    }
  };

  updateAccountID = async id => {
    this.setState({ userID: id });
    await this.initFusen();
  };

  showNotification = (variant = "success", message = "") => {
    const key = Math.random();
    this.setState({
      notificationOpen: true,
      notificationData: { variant: variant, message: message, key: key }
    });
  };

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
      />
    );

    return (
      <div className="mainPage" style={styles.mainPage}>
        <SearchBarComponent
          updateSearchState={this.updateSearchState}
          isSearch={this.state.isSearch}
        />
        {this.state.isSearch ? searchResultArea : contentsArea}

        <CreateFusenButtonComponent createFusen={this.createFusen} />
        <DeleteArea deleteFusen={this.deleteFusen} />
        <Notification
          closeNotification={this.closeNotification}
          open={this.state.notificationOpen}
          notificationData={this.state.notificationData}
        />
        <Switch>
          <Route
            path="/memo/:id"
            render={props => {
              return (
                <AppContext.Provider
                  value={this.state.fusens[props.match.params.id]}
                >
                  <EditorPage saveFusen={this.saveFusen} />
                </AppContext.Provider>
              );
            }}
          />
          <Route
            path="/account"
            render={_ => {
              return (
                <AccountPage
                  onAccountIDUpdate={this.updateAccountID}
                  showNotification={this.showNotification}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(DragDropContext(HTML5Backend)(MainPage));
