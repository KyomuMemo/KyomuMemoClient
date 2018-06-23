import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import Highlighter from "react-highlight-words";

const styles = {
  fusen: {
    position: "relative",
    width: 200,
    cursor: "pointer",
    flexShrink: 0
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

export default class SearchResultFusenComponent extends Component {
  handleDeleteClick = () => {
    this.props.deleteFusen(this.props.fusen.fusenID);
  };

  handleFusenSelected = () => {
    this.props.openFusen(this.props.fusen.fusenID);
  };

  render() {
    const { fusen, searchWords } = this.props;

    return (
      <div style={styles.fusen}>
        <Card style={{ backgroundColor: `#${fusen.color}`, maxHeight: 300 }}>
          <IconButton
            style={styles.deleteButton}
            onClick={this.handleDeleteClick}
          >
            <DeleteIcon style={styles.deleteIcon} />
          </IconButton>
          <CardContent onClick={this.handleFusenSelected}>
            <Typography variant="title">
              <Highlighter
                autoEscape={true}
                searchWords={searchWords}
                textToHighlight={fusen.title}
              />
            </Typography>
            <Typography color="textSecondary">
              {fusen.tag.map((tag, index) => (
                <span key={index}>
                  <Highlighter
                    autoEscape={false}
                    searchWords={searchWords.map(word => `^${word}$`)}
                    textToHighlight={tag}
                  />{" "}
                </span>
              ))}
            </Typography>
            <Typography>
              <Highlighter
                autoEscape={true}
                searchWords={searchWords}
                textToHighlight={fusen.text}
              />
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
