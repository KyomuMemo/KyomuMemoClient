import React from "react";
import { DragLayer } from "react-dnd";
import FusenComponent from "./FusenComponent";
import Fade from "@material-ui/core/Fade";

function collect(monitor) {
  return {
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

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
      const area = document.getElementsByClassName("contentsArea")[0];
      this.y = currentOffset.y - area.offsetTop - 1;
      this.x = currentOffset.x - area.offsetLeft - 1;
    }

    const shadow = (
      <Fade in={isDragging}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.4)"
          }}
        />
      </Fade>
    );

    return (
      <div
        style={{
          display: "inline-block",
          position: "relative",
          transform: `translate(${this.x}px, ${this.y}px)`,
          opacity: 0.9,
          zIndex: 2147483646, //max-1
          pointerEvents: "none"
        }}
      >
        {shadow}
        <div style={{ opacity: isDragging ? 1 : 0 }}>
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
