import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchBar from "material-ui-search-bar";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";

const styles = {
  searchBar: {
    margin: "0 auto",
    width: "80%",
    maxWidth: 800
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

  handleBackClick = () => {
    this.setState({ word: "" });
    this.props.updateSearchState("");
  };

  render() {
    const { isSearch } = this.props;

    return (
      <div style={{ height: "auto" }}>
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              onClick={this.handleBackClick}
              style={{
                position: "absolute",
                visibility: isSearch ? "visible" : "hidden"
              }}
            >
              <BackIcon style={{ color: "#fff" }} />
            </IconButton>

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
