import React, { Component } from "react";
import { DragSource } from "react-dnd";
import { ItemTypes } from "./Constants";

const fusenSource = {
  beginDrag(props, monitor, component) {
    return { fusenID: props.fusenID };
  },
  canDrag(props, monitor) {
    return true;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag()
  };
}

class DragWrapper extends Component {
  render() {
    const { connectDragSource, isDragging, position, children } = this.props;

    return connectDragSource(
      <div
        style={{
          position: "absolute",
          height: "auto",
          width: "auto",
          top: `calc(${position.top} * 100%)`,
          left: `calc(${position.left} * 100%)`,
          visibility: isDragging ? "hidden" : "visible"
        }}
      >
        {children}
      </div>
    );
  }
}

export default DragSource(ItemTypes.FUSEN, fusenSource, collect)(DragWrapper);
