import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchBar from "material-ui-search-bar";

const styles = {
  searchBar: {
    margin: "0 auto",
    width: "80%",
    maxWidth: 800
  },
  userName: {
    position: "absolute",
    right: 30
  }
};

class SearchBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { word: "" };
  }

  handleChange = word => {
    this.setState({ word: word });
    if (word === "") this.props.updateSearchState("");
  };

  handleRequestSearch = word => {
    this.props.updateSearchState(word);
  };

  render() {
    const { isSearch, userName } = this.props;

    return (
      <div style={{ height: "auto" }}>
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <span style={styles.userName}>{userName}</span>
            <SearchBar
              onChange={this.handleChange}
              onRequestSearch={this.handleRequestSearch}
              style={styles.searchBar}
              value={isSearch ? this.state.word : ""}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default SearchBarComponent;
