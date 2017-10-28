"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports.ToastMessageAnimated = undefined

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

var _isNil2 = require("lodash/isNil")

var _isNil3 = _interopRequireDefault(_isNil2)

var _flowRight2 = require("lodash/flowRight")

var _flowRight3 = _interopRequireDefault(_flowRight2)

var _isUndefined2 = require("lodash/isUndefined")

var _isUndefined3 = _interopRequireDefault(_isUndefined2)

var _noop2 = require("lodash/noop")

var _noop3 = _interopRequireDefault(_noop2)

var _classnames = require("classnames")

var _classnames2 = _interopRequireDefault(_classnames)

var _react = require("react")

var _react2 = _interopRequireDefault(_react)

var _on = require("dom-helpers/events/on")

var _on2 = _interopRequireDefault(_on)

var _properties = require("dom-helpers/transition/properties")

var _ToastMessage = require("./ToastMessage")

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * A decorated component that leverages animate.css for toast showing/hiding.
 * 
 * @see https://daneden.github.io/animate.css/
 */
var ToastMessageAnimated = (exports.ToastMessageAnimated = (function(
  _React$PureComponent
) {
  ;(0, _inherits3.default)(ToastMessageAnimated, _React$PureComponent)

  function ToastMessageAnimated() {
    var _ref

    var _temp, _this, _ret

    ;(0, _classCallCheck3.default)(this, ToastMessageAnimated)

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
          ToastMessageAnimated.__proto__ ||
          (0, _getPrototypeOf2.default)(ToastMessageAnimated)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this)),
      (_this.state = {
        hidingTimoutId: undefined,
        className: undefined,
      }),
      (_this.handleMount = function(ref) {
        _this.message = ref
      }),
      (_this.handleMouseEnter = function() {
        _this.setState(function(state) {
          if (!(0, _isUndefined3.default)(state.hidingTimoutId)) {
            clearTimeout(state.hidingTimoutId)
          }
          return {
            hidingTimoutId: undefined,
            className: undefined,
          }
        })
      }),
      (_this.handleMouseLeave = function() {
        _this.setState(function(state) {
          var timeOut =
            _this.props.extendedTimeOut !== 0
              ? _this.props.extendedTimeOut
              : _this.props.timeOut
          if (
            (0, _isUndefined3.default)(state.hidingTimoutId) &&
            timeOut !== 0
          ) {
            return {
              hidingTimoutId: setTimeout(_this.handleHide, timeOut),
            }
          }
          return {}
        })
      }),
      (_this.handleTransitionEnd = function() {
        _this.setState(function() {
          return {
            className: undefined,
          }
        })
      }),
      (_this.handleHideHookOnEnd = function() {
        ;(0, _on2.default)(
          _this.message,
          _properties.animationEnd,
          (0, _flowRight3.default)(
            _this.handleRemove,
            _this.handleTransitionEnd
          )
        )
      }),
      (_this.handleHide = function() {
        var override =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : false

        _this.setState(function(state) {
          if (override || !(0, _isUndefined3.default)(state.hidingTimoutId)) {
            if (!(0, _isNil3.default)(_this.props.hideAnimation)) {
              return {
                hidingTimoutId: setTimeout(_this.handleHideHookOnEnd, 50),
                className: _this.props.hideAnimation,
              }
            } else {
              _this.handleRemove()
              return {
                hidingTimoutId: undefined,
                className: undefined,
              }
            }
          }
        })
      }),
      (_this.handleRemove = function() {
        _this.props.onRemove()
      }),
      (_this.handleOnClick = function(event) {
        _this.props.onClick(event)
        if (_this.props.tapToDismiss) {
          _this.handleHide(true)
        }
      }),
      (_this.handleOnCloseClick = function(event) {
        event.stopPropagation()
        _this.props.onCloseClick(event)
        _this.handleHide(true)
      }),
      _temp)),
      (0, _possibleConstructorReturn3.default)(_this, _ret)
    )
  }

  ;(0, _createClass3.default)(ToastMessageAnimated, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this

        if (!(0, _isUndefined3.default)(this.props.showAnimation)) {
          this.setState(function() {
            ;(0,
            _on2.default)(_this2.message, _properties.animationEnd, _this2.handleTransitionEnd)
            return {
              className: _this2.props.showAnimation,
            }
          })
        }
        if (this.props.timeOut > 0) {
          this.setState(function() {
            return {
              hidingTimoutId: setTimeout(
                _this2.handleHide,
                _this2.props.timeOut
              ),
            }
          })
        }
      },
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (!(0, _isUndefined3.default)(this.state.hidingTimoutId)) {
          clearTimeout(this.state.hidingTimoutId)
        }
        this.setState = _noop3.default
      },
    },
    {
      key: "render",
      value: function render() {
        var restProps = (0, _omit3.default)(
          this.props,
          (0, _keys3.default)(ToastMessageAnimated.defaultProps)
        )
        return (0, _ToastMessage.ToastMessage)(
          (0, _extends3.default)({}, restProps, {
            ref: this.handleMount,
            className: (0, _classnames2.default)(
              this.props.className,
              this.state.className
            ),
            onClick: this.handleOnClick,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onCloseClick: this.handleOnCloseClick,
          })
        )
      },
    },
  ])
  return ToastMessageAnimated
})(_react2.default.PureComponent))

ToastMessageAnimated.defaultProps = {
  className: "toast",
  showAnimation: "animated bounceIn",
  hideAnimation: "animated bounceOut",
  //
  timeOut: 5000,
  extendedTimeOut: 1000,
  //
  tapToDismiss: true,
  //
  onRemove: undefined,
  onClick: _noop3.default,
  onCloseClick: _noop3.default,
}
exports.default = ToastMessageAnimated
