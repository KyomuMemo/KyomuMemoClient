import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import CreateFusenButtonComponent from './CreateFusenButtonComponent';
import FusenComponent from './FusenComponent';

class MainPage extends Component {
  constructor(props) {
    super(props);

    const fusens=this.getFusenData(this.props.userID);
    const fusenPositions=this.initFusenPositions(fusens);

    this.state = {
      'fusens': fusens,
      'fusenPositions':fusenPositions
    }
  }

  getFusenData(userID) {
    let fusenArray = [];
    //TODO: 実際はAPIから取得
    for (let i = 0; i < 10; i++) {
      const fusenData = {
        'userID': userID,
        'fusenID': i,
        'title': `title${i}`,
        'tag': ['tag1', 'tag2'],
        'text': `テキストテキストテキスト${i}`,
        'color': '#ffffff'
      };
      fusenArray.push(fusenData);
    }

    return fusenArray;
  }

  initFusenPositions(fusens){
    //TODO: 重なり制御とか
    const fusenPositions=fusens.map((fusen, index)=>({
      top:Math.random() * document.documentElement.clientHeight,
      left:Math.random() * document.documentElement.clientWidth
    }));

    return fusenPositions;
  }

  render() {
    return (
      <BrowserRouter>
        <div className="mainPage">
          {this.state.fusens.map((fusen, index) => (
            <FusenComponent fusen={fusen} position={this.state.fusenPositions[index]} />
          ))}
          <CreateFusenButtonComponent />
        </div>
      </BrowserRouter>
    );
  }
}

export default MainPage;