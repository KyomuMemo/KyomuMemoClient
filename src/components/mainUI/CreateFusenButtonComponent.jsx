import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const styles = {
  button: {
    position: "fixed",
    bottom: 16,
    right: 16,
    zIndex: 2147483647 - 1
  }
};

class CreateFusenButtonComponent extends Component {
  render() {
    return (
      <div>
        <Button
          variant="fab"
          color="secondary"
          style={styles.button}
          aria-label="Create"
          onClick={this.props.createFusen}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default CreateFusenButtonComponent;
