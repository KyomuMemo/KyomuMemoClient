import React, { Component } from "react";
import EditorComponent from "./EditorComponent";
import APIMock from "../mainUI/APIMock";

export default class EditorPage extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.fusenID;
    this.state = {
      loading: true,
      id: id,
      fusen: null,
      error: null
    };
    this.getFusen(id);
  }
  async getFusen(id) {
    try {
      const fusen = await APIMock.getFusen(id);
      this.setState({ fusen: fusen, loading: false });
    } catch (e) {
      console.log(e);
      this.setState({ error: e, loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (this.state.error !== null) {
      return <div>Error</div>;
    } else {
      return (
        <div>
          <EditorComponent {...this.state.fusen} />
        </div>
      );
    }
  }
}
