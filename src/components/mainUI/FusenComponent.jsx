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
    cursor: "pointer",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    MsUserSelect: "none",
    UserSelect: "none"
  },
  card: color => ({
    backgroundColor: color === "" ? "#fff" : `#${color}`
  }),
  deleteButton: {
    position: "absolute",
    height: 32,
    width: 32,
    top: 1,
    right: 1
  },
  deleteIcon: {
    height: 16
  },
  title: {
    lineHeight: "1.16667em",
    maxHeight: "calc(1.16667em * 2)",
    overflow: "hidden",
    wordWrap: "break-word",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2
  },
  tag: {
    lineHeight: "1.46429em",
    maxHeight: "calc(1.46429em * 1)",
    overflow: "hidden",
    wordWrap: "break-word",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1
  },
  text: {
    lineHeight: "1.46429em",
    maxHeight: "calc(1.46429em * 20)",
    overflow: "hidden",
    wordWrap: "break-word",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 20
  }
};

/**
 * 付箋コンポーネント
 * 個々の付箋となるコンポーネント
 * 検索時は一致文字列のハイライトを行う
 */
const FusenComponent = props => {
  const { fusen, searchWords, deleteFusen, openFusen } = props;

  return (
    <div style={styles.fusen}>
      <Card style={styles.card(fusen.color)}>
        <IconButton
          style={styles.deleteButton}
          onClick={() => deleteFusen(fusen.fusenID)}
        >
          <DeleteIcon style={styles.deleteIcon} />
        </IconButton>
        <CardContent
          onClick={() => openFusen(fusen.fusenID)}
          style={{ minHeight: 60 }}
        >
          <Typography variant="title" style={styles.title}>
            <Highlighter
              autoEscape={true}
              searchWords={searchWords}
              textToHighlight={fusen.title}
            />
          </Typography>
          <Typography color="textSecondary" style={styles.tag}>
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
          <Typography style={styles.text}>
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
