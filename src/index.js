import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { DotEnv } from "./utils/dotenv/dotenv";

DotEnv.loadEnv();

ReactDOM.render(<App />, document.getElementById("root"));
