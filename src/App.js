import React, { Component } from "react";
import { BrowserRouter, Link ,Route} from "react-router-dom";
import { Grid } from "@material-ui/core";
import "./App.css";
import MainPage from "./components/mainUI/MainPage";
import EditorPage from "./components/editor/EditorPage"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Grid container spacing={40}>
          <Grid item xs={12}>
            <Route path="/main" component={MainPage}/>
            <Route path="/fusen/:fusenID" component={EditorPage}/>
          </Grid>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default App;
