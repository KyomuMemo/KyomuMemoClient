import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { withRouter, Route, Switch } from "react-router-dom";
import SearchBarComponent from "./SearchBarComponent";
import CreateFusenButtonComponent from "./CreateFusenButtonComponent";
import APIMock from "./APIMock";
import ContentsArea from "./ContentsArea";
import DeleteArea from "./DeleteArea";
import SearchResultArea from "../search/SerachResultArea";
import AppContext from "./AppContext";
import EditorPage from "../editor/EditorPage";
import FusenComponent from "./FusenComponent";

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
      searchWords: []
    };
    this.maxZIndex = 1;
    this.initState();
  }

  async initState() {
    try {
      const fusens = await this.getFusensData(this.props.userID);
      const positions = this.initPositions(fusens);

      this.setState({
        fusens: fusens,
        positions: positions
      });
    } catch (e) {
      console.log("取得失敗"); //TODO: エラー表示
    }
  }

  async getFusensData(userID) {
    //mock APIからは配列が返ってくる
    const fusenArray = await APIMock.getAllFusen(this.props.userID);

    //fusenIDをキーに持つオブジェクトに変換
    let fusenObj = {};
    fusenArray.forEach(fusen => {
      fusenObj[fusen.fusenID] = fusen;
    });
    return fusenObj;
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
      const fusen = await APIMock.createFusen(this.props.userID);
      this.updateFusen(fusen);
      //TODO:詳細画面に遷移したほうがいい？
    } catch (e) {
      console.log("作成失敗"); //TODO:エラー表示
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

    await APIMock.deleteFusen(this.props.userID, fusenID).catch(e => {
      //削除失敗時に復元
      fusensCopy[fusenID] = deletedFusen;
      positionsCopy[fusenID] = deletedPosition;
      this.setState({ fusens: fusensCopy, positions: positionsCopy });
      console.log("削除失敗"); //TODO:エラー表示
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
      pathname: "/memo/" + fusenID,
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
      await APIMock.updateFusen(fusen);
      this.updateFusen(fusen)
    } catch (e) {
      console.log(e);
    }
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
        <Switch>
          <Route path="/memo/:id" render={props => {
            return (
              <AppContext.Provider value={this.state.fusens}>
                <EditorPage saveFusen={this.saveFusen}/>
              </AppContext.Provider>
            );
          }}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(DragDropContext(HTML5Backend)(MainPage));
