# react-toastr
> React.js toastr component

[![Version][npm-image]][npm-url] [![Travis CI][travis-image]][travis-url] [![Quality][codeclimate-image]][codeclimate-url] [![Coverage][codeclimate-coverage-image]][codeclimate-coverage-url] [![Dependencies][gemnasium-image]][gemnasium-url] [![Gitter][gitter-image]][gitter-url]


## Installation

```sh
npm i --save react-toastr
```


## Demo

Static hosted [demo site][demo] on GitHub. Check out the source in [src/app][src/app].


## Usage

This module requires bundling via [webpack][webpack]/browserify and loads `react/addons` internally.  
You'll need to download animate.css from here: [Animate @github](https://raw.github.com/daneden/animate.css/master/animate.css)

#### Styling links (CSS):

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css">
```

#### Example (within a React component or wrapper):
```javascript
// Non ES6:
var ReactToastr = require("react-toastr");
var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

// ES6:
import { ToastContainer,
  ToastMessage,
} from "react-toastr";
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

...
  addAlert() {
    this.container.success(
      "my-fascinating-toast-message",
      "my-title", {
      timeOut: 5000,
      extendedTimeOut: 3000
    });
  }
  
  render() {
    return (
      <div>
        <ToastContainer ref={(input) => {this.container = input}}
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right"
                        preventDuplicates={true} />
        <button onClick={this.addAlert}>Add Toast</button>
      </div>
    );
  }
```

Integrated with your [flux][flux] architecture:

```javascript
  componentDidMount: function() {
    InInDerStore.addChangeListener(this.addAlert);
  }
```

### ToastContainer

This is the container where all `ToastMessage` elements will go. Use it by retaining a [ref][react-ref] to publish a new **ToastMessage**:

```javascript
  addAlert () {
    this.container.success(
      "my-fascinating-toast-message",
      "my-title", {
      timeOut: 5000,
      extendedTimeOut: 3000
    });
  }
```

#### Options

Directly migrated from `toastr.js` library. Set these as props on **ToastContainer** to override the defaults.

* [`ToastContainer::getDefaultProps`](http://git.io/RagItA)

##### Prevent Duplicates

Prevent identical toast messages from displaying.

```javascript
  preventDuplicates: true
```

##### Newest on Top

Display new toast messages at the top or bottom of the queue.

```javascript
  newestOnTop: true
```

#### Displaying HTML

To display HTML, simply pass JSX instead of strings for title and message arguments:

```javascript
this.container.success(
  <em>I am an emphasized message</em>,
  <strong>I am a strong title</strong>
});
```

### ToastMessage

Base class for holding a toast message.

#### Options

Directly migrated from `toastr.js` library. Set these as props on **ToastMessage** to override the defaults.

* [`ToastMessage::getDefaultProps`](http://git.io/90CzSA)

##### Close Button

Show or hide an optional close button.

```javascript
  closeButton: false
```

##### Tap to Dismiss

Enable dismissing toasts on click.

```javascript
  tapToDismiss: true
```

### Animation

For animation, choose between **`ToastMessage.animation`** or **`ToastMessage.jQuery`**.

```javascript
  var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
  //or...
  var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.jQuery);
```

#### Options

* [`ToastMessage.animation::getDefaultProps`](http://git.io/vU2sz)
  (Credits go to **@Janekk**)
* [`ToastMessage.jQuery::getDefaultProps`](http://git.io/YcbXvA)

##### Time Out

Set the time (in ms) after which the toast message should automatically close.

```javascript
  timeOut: 5000
```
##### Extended Time Out

Set the time (in ms) after which the toast message should automatically close after being hovered on. Applied on hover exit.

```javascript
  extendedTimeOut: 3000
```
[npm-image]: https://img.shields.io/npm/v/react-toastr.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/react-toastr

[travis-image]: https://img.shields.io/travis/tomchentw/react-toastr.svg?style=flat-square
[travis-url]: https://travis-ci.org/tomchentw/react-toastr
[codeclimate-image]: https://img.shields.io/codeclimate/github/tomchentw/react-toastr.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/tomchentw/react-toastr
[codeclimate-coverage-image]: https://img.shields.io/codeclimate/coverage/github/tomchentw/react-toastr.svg?style=flat-square
[codeclimate-coverage-url]: https://codeclimate.com/github/tomchentw/react-toastr
[gemnasium-image]: https://img.shields.io/gemnasium/tomchentw/react-toastr.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/tomchentw/react-toastr
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/tomchentw/react-toastr?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

[demo]: https://tomchentw.github.io/react-toastr/
[src/app]: https://github.com/tomchentw/react-toastr/tree/master/src/app
[webpack]: https://webpack.github.io/docs/tutorials/getting-started/
[react-ref]: https://facebook.github.io/react/docs/more-about-refs.html
[flux]: https://facebook.github.io/flux/docs/overview.html
