import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { ItemTypes } from "./Constants";
import FusenComponent from "./FusenComponent";
import DragWrapper from "./DragWrapper";

const contentTarget = {
  drop(props, monitor, component) {
    const fusen = monitor.getItem();

    const area = document.getElementsByClassName("contentsArea")[0];
    const width = area.clientWidth;
    const height = area.clientHeight;
    const boxSize = 100;

    const offset = monitor.getSourceClientOffset();
    let x = offset.x - area.offsetLeft;
    let y = offset.y - area.offsetTop;

    //画面外に出たときの計算
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > width - boxSize) x = width - boxSize;
    if (y > height - boxSize) y = height - boxSize;

    //付箋のポジションを画面の大きさに対する割合で返す
    props.moveFusen(fusen.fusenID, x / width, y / height);
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
    const {
      connectDropTarget,
      fusens,
      positions,
      deleteFusen,
      openFusen
    } = this.props;

    return connectDropTarget(
      <div
        className={"contentsArea"}
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        {Object.keys(fusens).map((id, index) => (
          <DragWrapper fusenID={id} position={positions[id]} key={id}>
            <FusenComponent
              fusen={fusens[id]}
              searchWords={[]}
              deleteFusen={deleteFusen}
              openFusen={openFusen}
            />
          </DragWrapper>
        ))}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.FUSEN, contentTarget, collect)(
  ContentsArea
);
