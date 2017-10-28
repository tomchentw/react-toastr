"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports.ToastContainer = undefined

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray")

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2)

var _extends2 = require("babel-runtime/helpers/extends")

var _extends3 = _interopRequireDefault(_extends2)

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of")

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf)

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck")

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2)

var _createClass2 = require("babel-runtime/helpers/createClass")

var _createClass3 = _interopRequireDefault(_createClass2)

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn")

var _possibleConstructorReturn3 = _interopRequireDefault(
  _possibleConstructorReturn2
)

var _inherits2 = require("babel-runtime/helpers/inherits")

var _inherits3 = _interopRequireDefault(_inherits2)

var _keys2 = require("lodash/keys")

var _keys3 = _interopRequireDefault(_keys2)

var _omit2 = require("lodash/omit")

var _omit3 = _interopRequireDefault(_omit2)

var _reject2 = require("lodash/reject")

var _reject3 = _interopRequireDefault(_reject2)

var _bind2 = require("lodash/bind")

var _bind3 = _interopRequireDefault(_bind2)

var _isFunction2 = require("lodash/isFunction")

var _isFunction3 = _interopRequireDefault(_isFunction2)

var _uniqueId2 = require("lodash/uniqueId")

var _uniqueId3 = _interopRequireDefault(_uniqueId2)

var _includes2 = require("lodash/includes")

var _includes3 = _interopRequireDefault(_includes2)

var _isObject2 = require("lodash/isObject")

var _isObject3 = _interopRequireDefault(_isObject2)

var _forEach2 = require("lodash/forEach")

var _forEach3 = _interopRequireDefault(_forEach2)

var _noop2 = require("lodash/noop")

var _noop3 = _interopRequireDefault(_noop2)

var _react = require("react")

var _react2 = _interopRequireDefault(_react)

var _ToastMessageAnimated = require("./ToastMessage/ToastMessageAnimated")

var _ToastMessageAnimated2 = _interopRequireDefault(_ToastMessageAnimated)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * A React container for displaying a list of toast messages.
 * It mimics the APIs with the vanilla [toastr.js](https://github.com/CodeSeven/toastr)
 * by retaining a [ref][react-ref] to publish a new **toast**.
 * 
 * To display HTML, simply pass JSX instead of strings for title and message.
 * 
 * ```javascript
 * this.container.success(
 *   <strong>I am a strong title</strong>,
 *   <em>I am an emphasized message</em>
 * });
 * ```
 * 
 * If you're using Redux for managing states, you might consider using the
 * underlying component directly. See [ToastMessageAnimated](#toastmessage) below
 */
var ToastContainer = (exports.ToastContainer = (function(_React$PureComponent) {
  ;(0, _inherits3.default)(ToastContainer, _React$PureComponent)

  function ToastContainer() {
    var _ref

    var _temp, _this, _ret

    ;(0, _classCallCheck3.default)(this, ToastContainer)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = (0, _possibleConstructorReturn3.default)(
        this,
        (_ref =
          ToastContainer.__proto__ ||
          (0, _getPrototypeOf2.default)(ToastContainer)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this)),
      (_this.state = {
        toastList: [],
      }),
      (_this.toastMessageRefs = {}),
      (_this.handleOnToastClick = function(event) {
        _this.props.onClick(event)
        if (event.defaultPrevented) {
          return
        }
        event.preventDefault()
        event.stopPropagation()
      }),
      (_this.handleOnToastRemove = function(key) {
        _this.setState(function(state) {
          return {
            toastList: (0, _reject3.default)(state.toastList, { key: key }),
          }
        })
      }),
      _temp)),
      (0, _possibleConstructorReturn3.default)(_this, _ret)
    )
  }

  ;(0, _createClass3.default)(ToastContainer, [
    {
      key: "error",

      /**
     * 
     * @param {any} message 
     * @param {any} title 
     * @param {any} optionsOverride 
     * @public
     */
      value: function error(message, title, optionsOverride) {
        this.handleNotify(
          this.props.toastType.error,
          message,
          title,
          optionsOverride
        )
      },

      /**
     * 
     * @param {any} message 
     * @param {any} title 
     * @param {any} optionsOverride 
     * @public
     */
    },
    {
      key: "info",
      value: function info(message, title, optionsOverride) {
        this.handleNotify(
          this.props.toastType.info,
          message,
          title,
          optionsOverride
        )
      },

      /**
     * 
     * @param {any} message 
     * @param {any} title 
     * @param {any} optionsOverride 
     * @public
     */
    },
    {
      key: "success",
      value: function success(message, title, optionsOverride) {
        this.handleNotify(
          this.props.toastType.success,
          message,
          title,
          optionsOverride
        )
      },

      /**
     * 
     * @param {any} message 
     * @param {any} title 
     * @param {any} optionsOverride 
     * @public
     */
    },
    {
      key: "warning",
      value: function warning(message, title, optionsOverride) {
        this.handleNotify(
          this.props.toastType.warning,
          message,
          title,
          optionsOverride
        )
      },

      /**
     * 
     * @public
     */
    },
    {
      key: "clear",
      value: function clear() {
        ;(0, _forEach3.default)(this.toastMessageRefs, function(ref) {
          if ((0, _isObject3.default)(ref)) {
            ref.handleHide()
          }
        })
      },
    },
    {
      key: "handleNotify",
      value: function handleNotify(type, message, title) {
        var _this2 = this

        var optionsOverride =
          arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}

        if (
          this.props.preventDuplicates &&
          (0, _includes3.default)(this.state.toastList, { message: message })
        ) {
          return
        }
        var key = (0, _uniqueId3.default)("toast_")
        var nextToast = (0, _extends3.default)({}, optionsOverride, {
          key: key,
          type: type,
          title: title,
          message: message,
          ref: function ref(_ref2) {
            _this2.toastMessageRefs[key] = _ref2
          },
          onClick: function onClick(event) {
            if ((0, _isFunction3.default)(optionsOverride.handleOnClick)) {
              optionsOverride.handleOnClick()
            }
            _this2.handleOnToastClick(event)
          },
          onRemove: (0, _bind3.default)(this.handleOnToastRemove, this, key),
        })
        this.setState(function(state) {
          return {
            toastList: _this2.props.newestOnTop
              ? [nextToast].concat(
                  (0, _toConsumableArray3.default)(state.toastList)
                )
              : [].concat((0, _toConsumableArray3.default)(state.toastList), [
                  nextToast,
                ]),
          }
        })
      },
    },
    {
      key: "render",
      value: function render() {
        var _this3 = this

        var restProps = (0, _omit3.default)(
          this.props,
          (0, _keys3.default)(ToastContainer.defaultProps)
        )
        return _react2.default.createElement(
          "div",
          (0, _extends3.default)({}, restProps, {
            id: this.props.id,
            "aria-live": "polite",
            role: "alert",
          }),
          this.state.toastList.map(function(it) {
            return _this3.props.toastMessageFactory(it)
          })
        )
      },
    },
  ])
  return ToastContainer
})(_react2.default.PureComponent))

ToastContainer.defaultProps = {
  toastType: {
    error: "error",
    info: "info",
    success: "success",
    warning: "warning",
  },
  id: "toast-container",
  toastMessageFactory: _react2.default.createFactory(
    _ToastMessageAnimated2.default
  ),
  preventDuplicates: true,
  newestOnTop: true,
  onClick: _noop3.default,
}
exports.default = ToastContainer
