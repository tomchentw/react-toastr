import {
  default as React,
} from "react";

import {
  default as ReactDOM,
} from "react-dom";

import {
  default as ReactRoot,
} from "./ReactRoot";

require(`../styles/index.scss`);

ReactDOM.render(<ReactRoot />, document.getElementById(`react-container`));
