import React from "react";
import { IconButton, Button, Input, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const style = {
  tag: {
    display: "inline-block",
    marginRight: 10
  },
  addbutton: {
    float: "right"
  }
};

/**
 * タグエディタコンポーネント
 * 一つ一つのタグ編集フィールドに該当
 */
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
            <div key={i} style={style.tag}>
              <Input
                value={tag}
                onChange={e => {
                  this.onChange(e, i);
                }}
                placeholder={"tag"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={e => this.props.onClickRemoveButton(e, i)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          );
        })
      ) : (
        <div />
      );

    return (
      <div>
        {tags}
        <Button
          onClick={this.props.onClickAddButton}
          size="small"
          style={style.addbutton}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}
