import React from "react";
import { DragLayer } from "react-dnd";
import FusenComponent from "./FusenComponent";
import Fade from "@material-ui/core/Fade";

const styles = {
  shadow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.4)"
  },
  dragLayer: (x, y) => ({
    display: "inline-block",
    position: "relative",
    transform: `translate(${x}px, ${y}px)`,
    opacity: 0.9,
    zIndex: 2147483647 - 2,
    pointerEvents: "none"
  }),
  fusenComponent: isDragging => ({
    opacity: isDragging ? 1 : 0
  })
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

/**
 * ドラッグレイヤーコンポーネント
 * ドラッグ中の付箋を表示するコンポーネント
 */
class DragFusenLayer extends React.Component {
  x = 0;
  y = 0;
  fusen = {};

  render() {
    const { fusens, isDragging, currentOffset, item } = this.props;

    //影のフェードアウトを実現するため，付箋情報と位置を保存してドラッグレイヤを常に表示
    if (item !== null && fusens[item.fusenID] !== undefined)
      this.fusen = fusens[item.fusenID];
    if (this.fusen.fusenID === undefined) return null;

    if (currentOffset) {
      const area = document.getElementsByClassName("areaContainer")[0];
      this.y = currentOffset.y - area.offsetTop - 1;
      this.x = currentOffset.x - area.offsetLeft - 1;
    }

    return (
      <div style={styles.dragLayer(this.x, this.y)}>
        <Fade in={isDragging}>
          <div style={styles.shadow} />
        </Fade>
        <div style={styles.fusenComponent(isDragging)}>
          <FusenComponent
            fusen={this.fusen}
            searchWords={[]}
            shouldFade={false}
          />
        </div>
      </div>
    );
  }
}

export default DragLayer(collect)(DragFusenLayer);
