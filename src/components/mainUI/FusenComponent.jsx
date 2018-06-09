import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Clear';

class FusenComponent extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      fusen: {
        position: 'absolute',
        width: '300px',
        top: this.props.position.top,
        left: this.props.position.left,
        backgroundColor: `#${this.props.fusen.color}`
      },
      deleteButton:{
        position:'absolute',
        height:32,
        width:32,
        top:1,
        right:1
      },
      deleteIcon:{
        height:16
      }
    }
  }

  handleClick=()=>{
    this.props.deleteFusen(this.props.fusen);
  }

  render() {
    const fusen = this.props.fusen;

    return (
      <Card className='fusen' style={this.styles.fusen}>
        <IconButton aria-label='Delete' style={this.styles.deleteButton} onClick={this.handleClick}>
          <DeleteIcon style={this.styles.deleteIcon}/>
        </IconButton>
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
