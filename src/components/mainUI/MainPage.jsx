import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import CreateFusenButtonComponent from './CreateFusenButtonComponent';
import FusenComponent from './FusenComponent';
import APIMock from './APIMock';
import ContentsArea from './ContentsArea';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fusens: {},
      positions: {}
    }
    this.initState();
  }

  styles = {
    mainPage: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: '#eee'
    }
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
      console.log('取得失敗'); //TODO: エラー表示
    }
  }

  async getFusensData(userID) {
    //mock APIからは配列が返ってくる
    const fusenArray = await APIMock.getAllFusen(this.props.userID);

    //fusenIDをキーに持つオブジェクトに変換
    let fusenObj = {};
    fusenArray.forEach(fusen => {
      fusenObj[fusen.fusenID] = fusen;
    })
    return fusenObj;
  }

  initPositions(fusens) {
    //TODO: 重なり制御とか
    let positions = {};
    //各付箋の位置をランダムで指定
    Object.keys(fusens).forEach(id => {
      positions[id] = {
        top: Math.random() * document.documentElement.clientHeight,
        left: Math.random() * document.documentElement.clientWidth
      }
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
      console.log('作成失敗'); //TODO:エラー表示
    }
  }

  deleteFusen = async (fusen) => {
    //TODO:APIの返信を待つことなく削除→失敗時は復元することができそう
    try {
      await APIMock.deleteFusen(this.props.userID, fusen.fusenID);

      const fusensCopy = Object.assign({}, this.state.fusens);
      const positionsCopy = Object.assign({}, this.state.positions);
      delete fusensCopy[fusen.fusenID];
      delete positionsCopy[fusen.fusenID];

      this.setState({ fusens: fusensCopy, positions: positionsCopy });
    } catch (e) {
      console.log('削除失敗'); //TODO:エラー表示
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="mainPage" style={this.styles.mainPage}>
          <ContentsArea>
            {Object.keys(this.state.fusens).map((id, index) => (
              <FusenComponent
                fusen={this.state.fusens[id]}
                position={this.state.positions[id]}
                key={id}
                deleteFusen={this.deleteFusen}
              />
            ))}
            <CreateFusenButtonComponent
              createFusen={this.createFusen}
            />
          </ContentsArea>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainPage;