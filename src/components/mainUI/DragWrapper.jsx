import React, { Component } from "react";
import { DragSource } from "react-dnd";
import { ItemTypes } from "./Constants";
import Fade from "@material-ui/core/Fade";

const styles = {
  wrapper: (position, isDragging) => ({
    position: "absolute",
    height: "auto",
    width: "auto",
    top: `calc(${position.top} * 100%)`,
    left: `calc(${position.left} * 100%)`,
    zIndex: position.zIndex,
    visibility: isDragging ? "hidden" : "visible"
  })
};

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
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag()
  };
}

/**
 * ドラッグラッパー
 * 付箋コンポーネントをドラッグ可能にするためのコンポーネント
 */
class DragWrapper extends Component {
  componentDidMount() {
    const img = new Image();
    this.props.connectDragPreview(img);
  }

  render() {
    const { connectDragSource, isDragging, position, children } = this.props;

    return connectDragSource(
      <div style={styles.wrapper(position, isDragging)}>
        <Fade in={true}>
          <div>{children}</div>
        </Fade>
      </div>
    );
  }
}

export default DragSource(ItemTypes.FUSEN, fusenSource, collect)(DragWrapper);
