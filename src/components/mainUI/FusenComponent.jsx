import React, { Component } from "react";
import { DragSource } from "react-dnd";
import { ItemTypes } from "./Constants";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";

const fusenSource = {
  beginDrag(props, monitor, component) {
    return { fusenID: props.fusen.fusenID };
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

const styles = {
  fusen: {
    position: "absolute",
    width: "200px",
    cursor: "pointer"
  },
  deleteButton: {
    position: "absolute",
    height: 32,
    width: 32,
    top: 1,
    right: 1
  },
  deleteIcon: {
    height: 16
  }
};

class FusenComponent extends Component {
  handleDeleteClick = () => {
    this.props.deleteFusen(this.props.fusen.fusenID);
  };

  handleFusenSelected = () => {
    this.props.openFusen(this.props.fusen.fusenID);
  };

  render() {
    const { fusen, position, connectDragSource, isDragging } = this.props;

    const fusenPosition = {
      top: `calc(${position.top} * 100%)`,
      left: `calc(${position.left} * 100%)`,
      opacity: isDragging ? 0 : 1
    };

    return connectDragSource(
      <div style={Object.assign(fusenPosition, styles.fusen)}>
        <Card style={{ backgroundColor: `#${fusen.color}` }}>
          <IconButton
            style={styles.deleteButton}
            onClick={this.handleDeleteClick}
          >
            <DeleteIcon style={styles.deleteIcon} />
          </IconButton>
          <CardContent onClick={this.handleFusenSelected}>
            <Typography variant="title"> {fusen.title} </Typography>
            <Typography color="textSecondary">{fusen.tag.join(" ")}</Typography>
            <Typography> {fusen.text} </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default DragSource(ItemTypes.FUSEN, fusenSource, collect)(
  FusenComponent
);
