import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";

import ReactRoot from "./ReactRoot";

require("../styles/index.scss");

ReactDOM.render(<ReactRoot />, document.getElementById("react-container"));
