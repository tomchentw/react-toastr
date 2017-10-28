"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports.ToastMessagejQuery = undefined

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

var _isUndefined2 = require("lodash/isUndefined")

var _isUndefined3 = _interopRequireDefault(_isUndefined2)

var _noop2 = require("lodash/noop")

var _noop3 = _interopRequireDefault(_noop2)

var _react = require("react")

var _react2 = _interopRequireDefault(_react)

var _reactDom = require("react-dom")

var _reactDom2 = _interopRequireDefault(_reactDom)

var _ToastMessage = require("./ToastMessage")

var _ToastMessage2 = _interopRequireDefault(_ToastMessage)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var jQuery = void 0

/**
 * A standalone decorated component that leverages jQuery for toast showing/hiding.
 * 
 * @see https://jquery.com/
 */

var ToastMessagejQuery = (exports.ToastMessagejQuery = (function(
  _React$PureComponent
) {
  ;(0, _inherits3.default)(ToastMessagejQuery, _React$PureComponent)

  function ToastMessagejQuery() {
    var _ref

    var _temp, _this, _ret

    ;(0, _classCallCheck3.default)(this, ToastMessagejQuery)

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
          ToastMessagejQuery.__proto__ ||
          (0, _getPrototypeOf2.default)(ToastMessagejQuery)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this)),
      (_this.state = {
        hidingTimoutId: undefined,
      }),
      (_this.handleMouseEnter = function() {
        _this.setState(function(state) {
          if (!(0, _isUndefined3.default)(state.hidingTimoutId)) {
            clearTimeout(state.hidingTimoutId)
          }
          var $node = jQuery(_reactDom2.default.findDOMNode(_this))
          $node.stop(true, true)
          $node[_this.props.showMethod]()
          return {
            hidingTimoutId: undefined,
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
      (_this.handleHide = function() {
        var override =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : false

        _this.setState(function(state) {
          if (override || !(0, _isUndefined3.default)(state.hidingTimoutId)) {
            var $node = jQuery(_reactDom2.default.findDOMNode(_this))
            $node[_this.props.hideMethod]({
              duration: _this.props.hideDuration,
              easing: _this.props.hideEasing,
              complete: _this.handleRemove,
            })
            return {
              hidingTimoutId: undefined,
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

  ;(0, _createClass3.default)(ToastMessagejQuery, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this

        jQuery = require("jquery")
        var $node = jQuery(_reactDom2.default.findDOMNode(this))
        $node[this.props.showMethod]()
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
          (0, _keys3.default)(ToastMessagejQuery.defaultProps)
        )
        return _react2.default.createElement(
          _ToastMessage2.default,
          (0, _extends3.default)({}, restProps, {
            onClick: this.handleOnClick,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onCloseClick: this.handleOnCloseClick,
          })
        )
      },
    },
  ])
  return ToastMessagejQuery
})(_react2.default.PureComponent))

ToastMessagejQuery.defaultProps = {
  style: {
    display: "none",
  },
  showMethod: "fadeIn",
  showDuration: 300,
  showEasing: "swing",
  hideMethod: "fadeOut",
  hideDuration: 1000,
  hideEasing: "swing",
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
exports.default = ToastMessagejQuery
