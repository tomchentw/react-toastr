# react-toastr
> React.js toastr component

[![Version][npm-image]][npm-url] [![Travis CI][travis-image]][travis-url] [![Quality][codeclimate-image]][codeclimate-url] [![Coverage][codeclimate-coverage-image]][codeclimate-coverage-url] [![Dependencies][gemnasium-image]][gemnasium-url] [![Gitter][gitter-image]][gitter-url]


## Installation

```sh
npm i --save react-toastr
```


## Demo

Static hosted [demo site][demo] on GitHub.


## Example

Check [src/app][src/app] folder.


## Usage

This module requires to be bundled with [webpack][webpack]/browserify and loads `react/addons` internally.  
You'll need to download animate.css from here [Animate @github](https://raw.github.com/daneden/animate.css/master/animate.css)

Link to css for styles:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css">
```

Then:

```javascript
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

  // In a react component:
  render () {
    return (
      <div>
        <ToastContainer ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right" />
        <button onClick={this.addAlert}>GGininder</button>
      </div>
    );
  }
```

Here's a list of React Elements:

### ToastContainer

This is the container where all `ToastMessage` elements will go. Use it by retaining a [ref][react-ref] to publish a new **toast message**:

```javascript
  addAlert () {
    this.refs.container.success(
      "Welcome welcome welcome!!",
      "You are now home my friend. Welcome home my friend.", {
      timeOut: 30000,
      extendedTimeOut: 10000
    });
    window.open("http://youtu.be/3SR75k7Oggg");
  }
```

or integrated with your [flux][flux] architecture?

```javascript
  componentDidMount: function() {
    InInDerStore.addChangeListener(this.addAlert);
  }
```

#### Options

Directly migrated from `toastr.js` library, and can be overrided via `props` in a React way:

[`ToastContainer::getDefaultProps`](http://git.io/RagItA)

##### Close Button

The close button on the toastr is an optional functionality.

```javascript
  closeButton:true
```
##### Time Out

Set the time(in ms) after which the toastr message should automatically close.

```javascript
  timeOut:5000
```
##### Prevent Duplicates

This prevents duplicate messages from getting triggered.

```javascript
  preventDuplicates:true
```

#### Displaying HTML

To display HTML simply pass JSX instead of strings for title and message arguments:

```javascript
this.refs.container.success(
  <strong>I am a strong title</strong>,
  <em>I am an emphasized message</em>
});
```

### ToastMessage

Base class for holding a toast message, it will not animate in and out during it's lifecycle.
Provides **`ToastMessage.animation`** and `ToastMessage.jQuery` for your choice.

#### Options

Directly migrated from `toastr.js` library, and can be overrided via `props` in a React way:

* [`ToastMessage::getDefaultProps`](http://git.io/90CzSA)
* [`ToastMessage.animation::getDefaultProps`](http://git.io/vU2sz)
  Credits go to **@Janekk**
* [`ToastMessage.jQuery::getDefaultProps`](http://git.io/YcbXvA)


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
