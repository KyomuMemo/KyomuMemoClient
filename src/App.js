import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import "./App.css";
import MainPage from "./components/mainUI/MainPage";
import EditorPage from "./components/editor/EditorPage";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={MainPage} />
    </BrowserRouter>
  );
};

export default App;
