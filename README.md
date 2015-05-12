# react-toastr [![Travis CI][travis-image]][travis-url] [![Quality][codeclimate-image]][codeclimate-url] [![Coverage][codeclimate-coverage-image]][codeclimate-coverage-url] [![Dependencies][gemnasium-image]][gemnasium-url] [![Gitter][gitter-image]][gitter-url]
> React.js toastr component

[![Version][npm-image]][npm-url]


## Demo

Static hosted [demo site][demo] on GitHub.


## Example

Please refer to [client][client] folder for example.


## Usage

This module requires to be bundled with [webpack][webpack]/browserify and loads `react/addons` internally.  
WIP: release a UMD version via bower/components.

Then:

```javascript
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
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


### ToastMessage

Base class for holding a toast message, it will not animate in and out during it's lifecycle.
Provides **`ToastMessage.animation`** and `ToastMessage.jQuery` for your choice.

#### Options

Directly migrated from `toastr.js` library, and can be overrided via `props` in a React way:

* [`ToastMessage::getDefaultProps`](http://git.io/90CzSA)
* [`ToastMessage.animation::getDefaultProps`](http://git.io/vU2sz)
  Credits go to **@Janekk**
* [`ToastMessage.jQuery::getDefaultProps`](http://git.io/YcbXvA)


### Development

```shell
git clone ...
npm install
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080).


## Contributing

[![devDependency Status][david-dm-image]][david-dm-url]

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


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
[david-dm-image]: https://img.shields.io/david/dev/tomchentw/react-toastr.svg?style=flat-square
[david-dm-url]: https://david-dm.org/tomchentw/react-toastr#info=devDependencies


[demo]: http://tomchentw.github.io/react-toastr/
[client]: https://github.com/tomchentw/react-toastr/tree/master/client
[webpack]: http://webpack.github.io/docs/tutorials/getting-started/
[react-ref]: http://facebook.github.io/react/docs/more-about-refs.html
[flux]: http://facebook.github.io/flux/docs/overview.html
