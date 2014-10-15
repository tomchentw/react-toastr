# react-toastr [![Travis CI][travis-image]][travis-url] [![Quality][codeclimate-image]][codeclimate-url] [![Coverage][coveralls-image]][coveralls-url] [![Dependencies][gemnasium-image]][gemnasium-url]
> React.js toastr component

[![Version][npm-image]][npm-url]


## Example

Please refer to [[client]][client] folder for example.


## Usage

This module requires to be bundled with [webpack][webpack]/browserify and loads `react/addons` internally. WIP: release a UMD version via bower/components.

Then:

```javascript
var {ToastContainer, ToastMessage} = require("react-toastr");

  // In a react component:
  render () {
    return (
      <div>
        <ToastContainer ref="container"
                        toastMessageClass={ToastMessage.jQuery}
                        className="toast-top-right" />
        <button onClick={this.addAlert}>GGininder</button>
      </div>
    );
  }
```

### ToastContainer

This is the container where all `ToastMessage` instances will go. Use it by retaining a [ref][react-ref] to publish a new **toast message**:

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
Normally you should use **`ToastMessage.jQuery`** directly.

#### Options

Directly migrated from `toastr.js` library, and can be overrided via `props` in a React way:

* [`ToastMessage::getDefaultProps`](http://git.io/90CzSA)
* [`ToastMessage.jQuery::getDefaultProps`](http://git.io/YcbXvA)


### Development

```shell
git clone ...
npm i
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


[npm-image]: https://img.shields.io/npm/v/react-toastr.svg
[npm-url]: https://www.npmjs.org/package/react-toastr

[travis-image]: https://travis-ci.org/tomchentw/react-toastr.svg?branch=master
[travis-url]: https://travis-ci.org/tomchentw/react-toastr
[codeclimate-image]: https://img.shields.io/codeclimate/github/tomchentw/react-toastr.svg
[codeclimate-url]: https://codeclimate.com/github/tomchentw/react-toastr
[coveralls-image]: https://img.shields.io/coveralls/tomchentw/react-toastr.svg
[coveralls-url]: https://coveralls.io/r/tomchentw/react-toastr
[gemnasium-image]: https://gemnasium.com/tomchentw/react-toastr.svg
[gemnasium-url]: https://gemnasium.com/tomchentw/react-toastr
[david-dm-image]: https://david-dm.org/tomchentw/react-toastr/dev-status.svg?theme=shields.io
[david-dm-url]: https://david-dm.org/tomchentw/react-toastr#info=devDependencies


[client]: https://github.com/tomchentw/react-toastr/tree/master/client
[webpack]: http://webpack.github.io/docs/tutorials/getting-started/
[react-ref]: http://facebook.github.io/react/docs/more-about-refs.html
[flux]: http://facebook.github.io/flux/docs/overview.html
