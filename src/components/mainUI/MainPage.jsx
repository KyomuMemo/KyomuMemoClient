import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { withRouter } from "react-router-dom";
import CreateFusenButtonComponent from "./CreateFusenButtonComponent";
import FusenComponent from "./FusenComponent";
import APIMock from "./APIMock";
import ContentsArea from "./ContentsArea";
import DeleteArea from "./DeleteArea";

const styles = {
  mainPage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#eee"
  }
};

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fusens: {},
      positions: {}
    };
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
    //TODO: 重なり制御とか
    let positions = {};
    //各付箋の位置をランダムで指定
    Object.keys(fusens).forEach(id => {
      positions[id] = {
        top: Math.random(),
        left: Math.random()
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
      top: toY
    };

    this.setState({ positions: positionsCopy });
  };

  openFusen = fusenID => {
    this.props.history.push("/fusen/" + fusenID);
  };

  render() {
    return (
      <div className="mainPage" style={styles.mainPage}>
        <ContentsArea moveFusen={this.moveFusen}>
          {Object.keys(this.state.fusens).map((id, index) => (
            <FusenComponent
              fusen={this.state.fusens[id]}
              position={this.state.positions[id]}
              key={id}
              deleteFusen={this.deleteFusen}
              openFusen={this.openFusen}
            />
          ))}
        </ContentsArea>
        <CreateFusenButtonComponent createFusen={this.createFusen} />
        <DeleteArea deleteFusen={this.deleteFusen} />
      </div>
    );
  }
}

export default withRouter(DragDropContext(HTML5Backend)(MainPage));
