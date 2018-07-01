import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import FusenComponent from "../mainUI/FusenComponent";
import Typography from "@material-ui/core/Typography";

const styles = {
  area: {
    height: "100%",
    width: "100%",
    overflowX: "auto"
  },
  stackGrid: {
    margin: "16px 0px"
  }
};

export default class SearchResultArea extends Component {
  //AND検索
  matchesSearch(fusen, searchWords) {
    //付箋の要素に含まれるか判定 タグは完全一致
    const includedFusen = word => {
      //大文字小文字を無視
      word = word.toLowerCase();
      const title = fusen.title.toLowerCase();
      const text = fusen.text.toLowerCase();
      const tag = fusen.tag.map(tag => tag.toLowerCase());

      return title.includes(word) || text.includes(word) || tag.includes(word);
    };

    return searchWords.every(includedFusen);
  }

  render() {
    const { fusens, searchWords, deleteFusen, openFusen } = this.props;
    let matchedCount = 0;

    const matchedFusens = Object.keys(fusens).map(id => {
      if (this.matchesSearch(fusens[id], searchWords)) {
        matchedCount++;
        return (
          <FusenComponent
            fusen={fusens[id]}
            searchWords={searchWords}
            openFusen={openFusen}
            deleteFusen={deleteFusen}
            key={id}
          />
        );
      } else return null;
    });

    const noResult = (
      <Typography
        color="textSecondary"
        style={{ textAlign: "center", marginTop: 16 }}
      >
        一致する結果はありません。
      </Typography>
    );

    return (
      <div style={styles.area}>
        {matchedCount === 0 ? noResult : ""}
        <StackGrid
          columnWidth={240}
          gutterWidth={8}
          gutterHeight={16}
          style={styles.stackGrid}
        >
          {matchedFusens}
        </StackGrid>
      </div>
    );
  }
}
