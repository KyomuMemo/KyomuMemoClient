import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import Highlighter from "react-highlight-words";

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

const FusenComponent = props => {
  const { fusen, searchWords, deleteFusen, openFusen } = props;

  return (
    <div style={styles.fusen}>
      <Card style={{ backgroundColor: `#${fusen.color}`, minHeight: 100 }}>
        <IconButton
          style={styles.deleteButton}
          onClick={() => deleteFusen(fusen.fusenID)}
        >
          <DeleteIcon style={styles.deleteIcon} />
        </IconButton>
        <CardContent onClick={() => openFusen(fusen.fusenID)}>
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
            {fusen.text.split("\n").map((text, index) => (
              <span key={index}>
                <Highlighter
                  autoEscape={true}
                  searchWords={searchWords}
                  textToHighlight={text}
                />
                <br />
              </span>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default FusenComponent;
