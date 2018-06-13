import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class CreateFusenButtonComponent extends Component {
  style = {
    position: 'fixed',
    bottom: 16,
    right: 16
  }

  render() {
    return (
      <div>
        <Button variant='fab' color='secondary' style={this.style} aria-label="Create" onClick={this.props.createFusen}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default CreateFusenButtonComponent;
