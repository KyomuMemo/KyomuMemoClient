import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { ItemTypes } from "./Constants";
import DeleteIcon from "@material-ui/icons/Delete";
import Fade from "@material-ui/core/Fade";

const styles = {
  deleteArea: canDrop => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 2147483647 - 1,
    pointerEvents: canDrop ? "auto" : "none"
  }),
  deleteIcon: (isOver, canDrop) => ({
    fontSize: 56,
    position: "absolute",
    bottom: 16,
    left: 16,
    fill: "#e00",
    filter: isOver ? "drop-shadow(0px 0px 20px rgba(249, 0, 0, 1))" : "",
    opacity: isOver ? 1 : canDrop ? 0.4 : 0
  })
};

const deleteTarget = {
  /**
   *  付箋がドロップされたらmainUIの付箋削除処理を呼び出す
   */
  drop(props, monitor, component) {
    const item = monitor.getItem();
    props.deleteFusen(item.fusenID);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

/**
 * デリートエリアコンポーネント
 * 付箋ドラッグ中のみ画面左下に表示される
 */
class DeleteArea extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;

    return connectDropTarget(
      <div className={"deleteArea"} style={styles.deleteArea(canDrop)}>
        <Fade in={canDrop}>
          <DeleteIcon style={styles.deleteIcon(isOver, canDrop)} />
        </Fade>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.FUSEN, deleteTarget, collect)(DeleteArea);
