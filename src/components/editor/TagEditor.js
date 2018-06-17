import React from "react";
import { TextField, Button, Icon } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

export default class TagEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: props.tag
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.tag !== nextProps.tag && nextProps.tag !== nextState.tag) {
      this.setState({ tag: nextProps.tag });
    }
  }

  onChange = (e, i) => {
    let tag = this.state.tag;
    tag[i] = e.target.value;
    this.setState({
      tag: tag
    });
    this.props.onTextFieldChange(e, i);
  };

  render() {
    const tags =
      this.state.tag != null ? (
        this.state.tag.map((tag, i, _) => {
          return (
            <div key={i} style={{ display: "inline" }}>
              <TextField
                value={tag}
                onChange={e => {
                  this.onChange(e, i);
                }}
              />
              <Button onClick={e => this.props.onClickRemoveButton(e, i)}>
                <DeleteIcon />
              </Button>
            </div>
          );
        })
      ) : (
        <div />
      );

    return (
      <div>
        {tags}
        <Button onClick={this.props.onClickAddButton}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}
