import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { ItemTypes } from "./Constants";

const contentTarget = {
  drop(props, monitor, component) {
    const offset = monitor.getSourceClientOffset();
    const fusen = monitor.getItem();

    const area = document.getElementsByClassName("contentsArea")[0];
    const width = area.clientWidth;
    const height = area.clientHeight;
    const boxSize = 100;

    //画面外に出たときの計算
    if (offset.x < 0) offset.x = 0;
    if (offset.y < 0) offset.y = 0;
    if (offset.x > width - boxSize) offset.x = width - boxSize;
    if (offset.y > height - boxSize) offset.y = height - boxSize;

    //付箋のポジションを画面の大きさに対する割合で返す
    props.moveFusen(fusen.fusenID, offset.x / width, offset.y / height);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class ContentsArea extends Component {
  render() {
    const { connectDropTarget, children } = this.props;

    return connectDropTarget(
      <div className="contentsArea" style={{ height: "100%", width: "100%" }}>
        {children}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.FUSEN, contentTarget, collect)(
  ContentsArea
);
