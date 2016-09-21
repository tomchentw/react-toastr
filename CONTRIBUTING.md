# Contributing to React-Toastr

## Convention

### `src/lib` contains core library

* Please add new features/fix bugs here
* They'll be compiled by babel into `lib` folder
* Don't manually modify contents under `lib` folder

### `src/app` contains docs app

* It can be served as local app for core library development
* It'll be released as `gh-pages` into `build` folder
* Don't manually modify contents under `build` folder


## Development

```shell
git clone ...
npm install
npm start
```

Now you can develop!


## Contributing

[![devDependency Status][david-dm-image]][david-dm-url]

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new pull request

[david-dm-image]: https://img.shields.io/david/dev/tomchentw/react-toastr.svg?style=flat-square
[david-dm-url]: https://david-dm.org/tomchentw/react-toastr#info=devDependencies
