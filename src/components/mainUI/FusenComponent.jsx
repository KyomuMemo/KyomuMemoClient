import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";

const styles = {
  fusen: {
    position: "relative",
    width: 240,
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
    const { fusen } = this.props;

    return (
      <div style={styles.fusen}>
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

export default FusenComponent;
