### Usage

```jsx static
import { ToastContainer } from "react-toastr";

```

### DEMO App


```jsx
require("./demo.css");
let container;

<div className="container">
  <ToastContainer
    ref={ref => container = ref}
    className="toast-top-right"
  />
  <h1>
    React-Toastr
    <small>React.js toastr component</small>
  </h1>
  <div className="btn-container">
    <button
      className="primary"
      onClick={() =>
        container.success(`hi! Now is ${new Date()}`, `///title\\\\\\`, {
          closeButton: true,
        })
      }
    >
      Hello
    </button>
    <button className="primary" onClick={() => container.clear()}>
      CLEAR
    </button>
  </div>
  <div className="github-button-container">
    <iframe
      title="Hello"
      src="https://ghbtns.com/github-btn.html?user=tomchentw&amp;repo=react-toastr&amp;type=watch&amp;count=true"
      allowTransparency="true"
      frameBorder="0"
      scrolling="0"
      width="90"
      height="20"
    />
    <iframe
      title="CLEAR"
      src="https://ghbtns.com/github-btn.html?user=tomchentw&amp;repo=react-toastr&amp;type=fork&amp;count=true"
      allowTransparency="true"
      frameBorder="0"
      scrolling="0"
      width="90"
      height="20"
    />
  </div>
</div>
```
