import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { ItemTypes } from "./Constants";
import DeleteIcon from "@material-ui/icons/Delete";

const deleteTarget = {
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

class DeleteArea extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    if (!isOver && !canDrop) return null;

    return connectDropTarget(
      <div
        className={"deleteArea"}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          opacity: isOver ? 1 : canDrop ? 0.7 : 0
        }}
      >
        <DeleteIcon
          style={{
            fontSize: 56,
            position: "absolute",
            bottom: 16,
            left: 16,
            fill: "#e00",
            filter: isOver ? "drop-shadow(0px 0px 20px rgba(249, 0, 0, 1))" : ""
          }}
        />
      </div>
    );
  }
}

export default DropTarget(ItemTypes.FUSEN, deleteTarget, collect)(DeleteArea);
