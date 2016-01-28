"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require("react-addons-update");

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _ToastMessage = require("./ToastMessage");

var _ToastMessage2 = _interopRequireDefault(_ToastMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToastContainer = function (_Component) {
  _inherits(ToastContainer, _Component);

  function ToastContainer() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ToastContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ToastContainer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      toasts: [],
      toastId: 0,
      previousMessage: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToastContainer, [{
    key: "error",
    value: function error(message, title, optionsOverride) {
      this._notify(this.props.toastType.error, message, title, optionsOverride);
    }
  }, {
    key: "info",
    value: function info(message, title, optionsOverride) {
      this._notify(this.props.toastType.info, message, title, optionsOverride);
    }
  }, {
    key: "success",
    value: function success(message, title, optionsOverride) {
      this._notify(this.props.toastType.success, message, title, optionsOverride);
    }
  }, {
    key: "warning",
    value: function warning(message, title, optionsOverride) {
      this._notify(this.props.toastType.warning, message, title, optionsOverride);
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this2 = this;

      Object.keys(this.refs).forEach(function (key) {
        _this2.refs[key].hideToast(false);
      });
    }
  }, {
    key: "_notify",
    value: function _notify(type, message, title) {
      var _this3 = this;

      var optionsOverride = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

      if (this.props.preventDuplicates) {
        if (this.state.previousMessage === message) {
          return;
        }
      }
      var key = this.state.toastId++;
      var toastId = key;
      var newToast = (0, _reactAddonsUpdate2.default)(optionsOverride, {
        $merge: {
          type: type,
          title: title,
          message: message,
          toastId: toastId,
          key: key,
          ref: "toasts__" + key,
          handleOnClick: function handleOnClick(e) {
            if ("function" === typeof optionsOverride.handleOnClick) {
              optionsOverride.handleOnClick();
            }
            return _this3._handle_toast_on_click(e);
          },
          handleRemove: this._handle_toast_remove.bind(this)
        }
      });
      var toastOperation = _defineProperty({}, "" + (this.props.newestOnTop ? "$unshift" : "$push"), [newToast]);

      var nextState = (0, _reactAddonsUpdate2.default)(this.state, {
        toasts: toastOperation,
        previousMessage: { $set: message }
      });
      this.setState(nextState);
    }
  }, {
    key: "_handle_toast_on_click",
    value: function _handle_toast_on_click(event) {
      this.props.onClick(event);
      if (event.defaultPrevented) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "_handle_toast_remove",
    value: function _handle_toast_remove(toastId) {
      var _this4 = this;

      var operationName = "" + (this.props.newestOnTop ? "reduceRight" : "reduce");
      this.state.toasts[operationName](function (found, toast, index) {
        if (found || toast.toastId !== toastId) {
          return false;
        }
        _this4.setState((0, _reactAddonsUpdate2.default)(_this4.state, {
          toasts: { $splice: [[index, 1]] }
        }));
        return true;
      }, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement(
        "div",
        _extends({}, this.props, { "aria-live": "polite", role: "alert" }),
        this.state.toasts.map(function (toast) {
          return _this5.props.toastMessageFactory(toast);
        })
      );
    }
  }]);

  return ToastContainer;
}(_react.Component);

ToastContainer.propTypes = {
  toastType: _react.PropTypes.shape({
    error: _react.PropTypes.string,
    info: _react.PropTypes.string,
    success: _react.PropTypes.string,
    warning: _react.PropTypes.string
  }).isRequired,
  id: _react.PropTypes.string.isRequired,
  toastMessageFactory: _react.PropTypes.func.isRequired,
  preventDuplicates: _react.PropTypes.bool.isRequired,
  newestOnTop: _react.PropTypes.bool.isRequired,
  onClick: _react.PropTypes.func.isRequired
};
ToastContainer.defaultProps = {
  toastType: {
    error: "error",
    info: "info",
    success: "success",
    warning: "warning"
  },
  id: "toast-container",
  toastMessageFactory: _react2.default.createFactory(_ToastMessage2.default),
  preventDuplicates: false,
  newestOnTop: true,
  onClick: function onClick() {}
};
exports.default = ToastContainer;