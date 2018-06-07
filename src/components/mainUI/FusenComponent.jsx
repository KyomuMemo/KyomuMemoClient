import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class FusenComponent extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      'position': 'absolute',
      'width': '300px',
      'top': this.props.position.top,
      'left': this.props.position.left
    }
  }

  render() {
    const fusen = this.props.fusen;

    return (
      <Card className='fusen' style={this.styles}>
        <CardContent>
          <Typography className='title' variant='title'>{fusen.title}</Typography>
          <Typography className='tag' color='textSecondary'>{fusen.tag.join(' ')}</Typography>
          <Typography className='text'>{fusen.text}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default FusenComponent;
