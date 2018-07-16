import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { ItemTypes } from "./Constants";
import FusenComponent from "./FusenComponent";
import DragWrapper from "./DragWrapper";
import DragFusenLayer from "./DragFusenLayer";
import Typography from "@material-ui/core/Typography";

const styles = {
  contentsArea: {
    height: "100%",
    width: "100%",
    position: "relative"
  },
  noFusens: {
    textAlign: "center",
    marginTop: 16
  }
};

const contentTarget = {
  drop(props, monitor, component) {
    const fusen = monitor.getItem();

    const area = document.getElementsByClassName("areaContainer")[0];
    const width = area.clientWidth;
    const height = area.clientHeight;
    const boxWidth = 240;
    const boxHeight = 100;

    const offset = monitor.getSourceClientOffset();
    let x = offset.x - area.offsetLeft;
    let y = offset.y - area.offsetTop;

    //画面外に出たときの計算
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > width - boxWidth) x = width - boxWidth;
    if (y > height - boxHeight) y = height - boxHeight;

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
      openFusen,
      isInit
    } = this.props;

    const shouldShowNoFusens = isInit && Object.keys(fusens).length === 0;
    const noFusens = (
      <Typography color="textSecondary" style={styles.noFusens}>
        付箋はまだ一つも作られていません。右下の+ボタンから新しい付箋を作成しましょう。
      </Typography>
    );

    return connectDropTarget(
      <div className={"contentsArea"} style={styles.contentsArea}>
        {shouldShowNoFusens ? noFusens : null}
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
        <DragFusenLayer fusens={fusens} />
      </div>
    );
  }
}

export default DropTarget(ItemTypes.FUSEN, contentTarget, collect)(
  ContentsArea
);
