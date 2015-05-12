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

