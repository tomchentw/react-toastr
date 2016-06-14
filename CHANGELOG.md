# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.7.0"></a>
# [2.7.0](https://github.com/tomchentw/react-toastr/compare/v2.6.2...v2.7.0) (2016-06-14)


### Features

* **ToastContainer:** add props.preventDuplicates suppory ([b8e9bd2](https://github.com/tomchentw/react-toastr/commit/b8e9bd2)), closes [#58](https://github.com/tomchentw/react-toastr/issues/58) [#56](https://github.com/tomchentw/react-toastr/issues/56) [#53](https://github.com/tomchentw/react-toastr/issues/53)



<a name="2.6.2"></a>
## [2.6.2](https://github.com/tomchentw/react-toastr/compare/v2.6.1...v2.6.2) (2016-05-31)



<a name="2.6.1"></a>
## [2.6.1](https://github.com/tomchentw/react-toastr/compare/v2.6.0...v2.6.1) (2016-04-28)


### Bug Fixes

* **package.json:** make react and react-dom support both @^0.14.0 and @^15.0.0 ([394ef07](https://github.com/tomchentw/react-toastr/commit/394ef07))



<a name="2.6.0"></a>
# (Unpublished) [2.6.0](https://github.com/tomchentw/react-toastr/compare/v2.4.0...v2.6.0) (2016-04-26)

### Unpublished due to

* [#49](https://github.com/tomchentw/react-toastr/issues/49): react@^15.0.0 is required

### Features

* **package.json:** update to react@^15.0.0 ([6d7e8a8](https://github.com/tomchentw/react-toastr/commit/6d7e8a8))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/tomchentw/react-toastr/compare/v2.3.1...v2.4.0) (2016-01-28)


### Features

* **package.json:** bump dependencies ([d74c217](https://github.com/tomchentw/react-toastr/commit/d74c217))
* **ToastMessage:** replace fbjs dependency with element-class ([97c171b](https://github.com/tomchentw/react-toastr/commit/97c171b))



<a name="2.3.1"></a>
## [2.3.1](https://github.com/tomchentw/react-toastr/compare/v2.3.0...v2.3.1) (2016-01-19)




<a name="2.3.0"></a>
# [2.3.0](https://github.com/tomchentw/react-toastr/compare/v2.2.4...v2.3.0) (2016-01-03)


### Features

* **package.json:** bump fbjs to ^0.6.0 ([ae96bee](https://github.com/tomchentw/react-toastr/commit/ae96bee))



<a name="2.2.4"></a>
## [2.2.4](https://github.com/tomchentw/react-toastr/compare/v2.2.3...v2.2.4) (2015-12-10)


### Bug Fixes

* **ToastContainer:** add default value for optionsOverride ([14f953a](https://github.com/tomchentw/react-toastr/commit/14f953a))



<a name="2.2.3"></a>
## [2.2.3](https://github.com/tomchentw/react-toastr/compare/v2.2.2...v2.2.3) (2015-12-10)


### Features

* **ToastContainer:** add support for optionsOverride.handleOnClick ([73dc376](https://github.com/tomchentw/react-toastr/commit/73dc376)), closes [#43](https://github.com/tomchentw/react-toastr/issues/43)



<a name="2.2.2"></a>
## [2.2.2](https://github.com/tomchentw/react-toastr/compare/v2.2.1...v2.2.2) (2015-11-02)


### Bug Fixes

* **src:** Revert breaking changes commits for v2.2.1. Closes #42 ([988112e](https://github.com/tomchentw/react-toastr/commit/988112e)), closes [#42](https://github.com/tomchentw/react-toastr/issues/42)



<a name="2.2.1"></a>
## _UNPLUBISHED FROM NPM_ [2.2.1](https://github.com/tomchentw/react-toastr/compare/v2.2.0...v2.2.1) (2015-11-02)

This version has been unpublished from npm. The __Bug Fixes__ here still applied but __Features__ are removed. See https://github.com/tomchentw/react-toastr/issues/42.

### Bug Fixes

* **package.json:** added react-dom as dependency ([18c58d0](https://github.com/tomchentw/react-toastr/commit/18c58d0)), closes [#41](https://github.com/tomchentw/react-toastr/issues/41)
* **ToastMessage:** use ReactDOM.findDOMNode instead of this.getDOMNode ([d4f40b3](https://github.com/tomchentw/react-toastr/commit/d4f40b3))

### Features

* **src:** ES2015 ([96aa073](https://github.com/tomchentw/react-toastr/commit/96aa073))
* **ToastContainer:** ES2015 ([dce1279](https://github.com/tomchentw/react-toastr/commit/dce1279))
* **ToastMessage:** ES2015 + props naming convention changed ([69c23db](https://github.com/tomchentw/react-toastr/commit/69c23db))
* **ToastMessage.animation:** ES2015 ([69dbd7e](https://github.com/tomchentw/react-toastr/commit/69dbd7e))
* **ToastMessage.jQuery:** ES2015 + require jQuery as dependency ([e0ff62b](https://github.com/tomchentw/react-toastr/commit/e0ff62b))
* **ToastMessageList:** add pure component to wrap toast list ([db9fee6](https://github.com/tomchentw/react-toastr/commit/db9fee6))


### BREAKING CHANGES

* ToastMessage: Props naming convention changed

Before: type,handleRemove, handleOnClick

After: toastType, onRemove, onClick
* ToastMessage.jQuery: use ES2015 import statement for jquery

Previously, we requires you to inject jQuery as global variable ($, jQuery).
However, as people adoping module bundler such as webpack, it's more common
to declare it as dependency.



<a name="2.2.0"></a>
# [2.2.0](https://github.com/tomchentw/react-toastr/compare/v2.1.0...v2.2.0) (2015-10-28)


### Bug Fixes

* **src:** React@0.14 migration, add react-addons-update as a dep ([e8b7152](https://github.com/tomchentw/react-toastr/commit/e8b7152)), closes [#38](https://github.com/tomchentw/react-toastr/issues/38)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/tomchentw/react-toastr/compare/v2.0.0...v2.1.0) (2015-10-11)


### Bug Fixes

* **package.json:** move classnames to dependencies ([9a74e6f](https://github.com/tomchentw/react-toastr/commit/9a74e6f)), closes [#32](https://github.com/tomchentw/react-toastr/issues/32)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/tomchentw/react-toastr/compare/v1.5.2...v2.0.0) (2015-10-08)


### Features

* **package.json:** upgrade to React@^0.14 ([c1cfc28](https://github.com/tomchentw/react-toastr/commit/c1cfc28))


### BREAKING CHANGES

* __React@^0.14__: upgrade at peerDependencies
	* move __React@^0.14__ and __classnames@^2.1.5__ from dependencies to peerDependencies
	* also add __fbjs^0.3.1__ to peerDependencies



<a name"1.5.2"></a>
### 1.5.2 (2015-09-25)


#### Bug Fixes

* **ToastMessage:** need clear setTimeout when component unmount ([e12f025c](https://github.com/tomchentw/react-toastr/commit/e12f025c), closes [#29](https://github.com/tomchentw/react-toastr/issues/29))


<a name"1.5.1"></a>
### 1.5.1 (2015-07-01)


<a name"1.5.0"></a>
## 1.5.0 (2015-07-01)


#### Bug Fixes

* **ToastMessage:** &times; using dangerouslySetInnerHTML ([af7e6059](https://github.com/tomchentw/react-toastr/commit/af7e6059))


#### Features

* **ToastMessage:** Update React addon classSet to classnames ([528473e9](https://github.com/tomchentw/react-toastr/commit/528473e9), closes [#23](https://github.com/tomchentw/react-toastr/issues/23))


## 1.4.0 (2015-05-22)


### 1.3.1 (2015-05-21)


#### Bug Fixes

* **package.json:** move react from dependencies to devDependencies ([07e1acf3](https://github.com/tomchentw/react-toastr/commit/07e1acf3cae1052546a3d9a415ae007fd72eff3e))


## 1.3.0 (2015-05-12)


#### Bug Fixes

* **animationMixin:** misuse typeof ([8f504133](https://github.com/tomchentw/react-toastr/commit/8f504133235e2a4b29992b213b1bb51f9ff22f5b))


#### Features

* **animationMixin:** animate toasts using css transitions/animations ([ed0d8b07](https://github.com/tomchentw/react-toastr/commit/ed0d8b07cb9ed94148a409945981479adfa0882f))


## 1.2.0 (2015-04-27)


#### Features

* **package.json:** update to react@0.13 and add peerDependencies ([0e00b836](https://github.com/tomchentw/react-toastr/commit/0e00b836bfa5cfa435d497a78c6fba872aa7cfde))


### 1.1.2 (2014-11-20)


### 1.1.1 (2014-11-14)


#### Bug Fixes

* **jQueryMixin:** update jQuery calls to use jQuery rather than $ ([d1d858b4](https://github.com/tomchentw/react-toastr/commit/d1d858b4c7df32c5bb88399a1aa9be74a866cde0))


## 1.1.0 (2014-10-29)


#### Features

* **ToastContainer:** toastMessageClass changed to toastMessageFactory ([bdcbabac](https://github.com/tomchentw/react-toastr/commit/bdcbabacfffea683ababd26a2f6ecb59c66dbda2))
* **lib:** upgrade React to 0.12 ([5a375ae8](https://github.com/tomchentw/react-toastr/commit/5a375ae8125216eb478feb80cf67402d6bcc647a))


#### Breaking Changes

* propTypes renamed to toastMessageFactory

toastMessageFactory now only accepts the result of calling React.createFactory(ReactElementClass).

 ([bdcbabac](https://github.com/tomchentw/react-toastr/commit/bdcbabacfffea683ababd26a2f6ecb59c66dbda2))


## 1.0.0 (2014-10-19)


#### Bug Fixes

* **.travis.yml:** remove 0.11 target for jest bug ([09c9ab66](https://github.com/tomchentw/react-toastr/commit/09c9ab665cbb5cd385df4abd72c680bcb73bca1b))


#### Features

* **ToastContainer:** add clear interface ([29bef4c0](https://github.com/tomchentw/react-toastr/commit/29bef4c01908db02a38e9a2a43b0bd05d952ae4a))
* **ToastMessage:**
  * add closeButton props support ([ea53e383](https://github.com/tomchentw/react-toastr/commit/ea53e383343122aeb66ea7a4673851447d937e2b))
  * hookup remove toast from state ([f0a72224](https://github.com/tomchentw/react-toastr/commit/f0a7222439b290b4e445472c114255cfa49cbe33))
  * add handleMouse{Enter/Leave} for internal api ([6f340ffc](https://github.com/tomchentw/react-toastr/commit/6f340ffc828917c414fe003724862dd2b67611a2))
  * hook onClick handler ([312764d2](https://github.com/tomchentw/react-toastr/commit/312764d26e36db373cc1cec678591bdb23d89965))
* **ToastMessage.jQuery:** with jQueryMixin ([1fc06874](https://github.com/tomchentw/react-toastr/commit/1fc068740ce864a6daac87774d9834b8d5e590a2))
* **ToastMessage:**
  * export ToastContainer and ToastMessage ([ea3d2ea3](https://github.com/tomchentw/react-toastr/commit/ea3d2ea31fb608d392afbda72e321d32cf84164e))
  * add newestOnTop to props ([1d7950d1](https://github.com/tomchentw/react-toastr/commit/1d7950d1f52710e638d30379ae8ba9b0d69ebc43))
  * add onClick handler and hook toast callback ([e71a0058](https://github.com/tomchentw/react-toastr/commit/e71a00585e1d52ec0186bc89e48392a6efbcc2ac))
  * add preventDuplicates props ([c9d548b8](https://github.com/tomchentw/react-toastr/commit/c9d548b82ca14a56dc7214b30d097844f992286d))
  * add default container-id and move to top-right ([30fa8264](https://github.com/tomchentw/react-toastr/commit/30fa8264dab02756b27fd34b63e5e05d7b9bc2bc))
  * add iconClassNames and toastType to props ([3916c2ef](https://github.com/tomchentw/react-toastr/commit/3916c2efcfe8240bb4ead80b0326743e86b4030b))
  * port from jsfiddle.net/tomchentw/x7m8wavf ([bb87f99c](https://github.com/tomchentw/react-toastr/commit/bb87f99c43c26d0558cddc788bff3c025c1dfe5f))
* **jQueryMixin:**
  * hook hover logic into handleMouse{Enter/Leave} ([bc8d8e49](https://github.com/tomchentw/react-toastr/commit/bc8d8e495ba240349d8d69b9745f3357857f6be7))
  * add show props and hook to componentDidMount ([a90a47ce](https://github.com/tomchentw/react-toastr/commit/a90a47ceb6f4365927d6ba42acd4570b9a928c9b))
* **lib:** compile src to lib ([44f406dd](https://github.com/tomchentw/react-toastr/commit/44f406dd0479c50d94c43cd3b8487a27a7ed5c78))
* **package.json:** downgrade react to 0.11.0 ([4f105dc7](https://github.com/tomchentw/react-toastr/commit/4f105dc7c29599184d75a31468a32528966649b9))
