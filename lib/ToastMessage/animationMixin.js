"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fbjsLibCSSCore = require("fbjs/lib/CSSCore");

var _fbjsLibCSSCore2 = _interopRequireDefault(_fbjsLibCSSCore);

var _reactLibReactTransitionEvents = require("react/lib/ReactTransitionEvents");

var _reactLibReactTransitionEvents2 = _interopRequireDefault(_reactLibReactTransitionEvents);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsUpdate = require("react-addons-update");

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var TICK = 17;
var toString = Object.prototype.toString;
exports["default"] = {
  getDefaultProps: function getDefaultProps() {
    return {
      transition: null, //some examples defined in index.scss (scale, fadeInOut, rotate)
      showAnimation: "animated bounceIn", //or other animations from animate.css
      hideAnimation: "animated bounceOut",
      timeOut: 5000,
      extendedTimeOut: 1000
    };
  },

  componentWillMount: function componentWillMount() {
    this.classNameQueue = [];
    this.isHiding = false;
    this.intervalId = null;
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    var props = this.props;

    this._show(props);

    var onHideComplete = function onHideComplete() {
      if (_this.isHiding) {
        _this._set_is_hiding(false);
        _reactLibReactTransitionEvents2["default"].removeEndEventListener(node, onHideComplete);
        _this._handle_remove();
      }
    };

    var node = _reactDom2["default"].findDOMNode(this);
    _reactLibReactTransitionEvents2["default"].addEndEventListener(node, onHideComplete);

    if (0 < props.timeOut) {
      this._set_interval_id(setTimeout(this.hideToast, props.timeOut));
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  },
  _set_transition: function _set_transition(hide) {
    var animationType = hide ? "leave" : "enter";
    var node = _reactDom2["default"].findDOMNode(this);
    var className = this.props.transition + "-" + animationType;
    var activeClassName = className + "-active";

    var endListener = function endListener(e) {
      if (e && e.target !== node) {
        return;
      }

      _fbjsLibCSSCore2["default"].removeClass(node, className);
      _fbjsLibCSSCore2["default"].removeClass(node, activeClassName);

      _reactLibReactTransitionEvents2["default"].removeEndEventListener(node, endListener);
    };

    _reactLibReactTransitionEvents2["default"].addEndEventListener(node, endListener);

    _fbjsLibCSSCore2["default"].addClass(node, className);

    // Need to do this to actually trigger a transition.
    this._queue_class(activeClassName);
  },

  _clear_transition: function _clear_transition(hide) {
    var node = _reactDom2["default"].findDOMNode(this);
    var animationType = hide ? "leave" : "enter";
    var className = this.props.transition + "-" + animationType;
    var activeClassName = className + "-active";

    _fbjsLibCSSCore2["default"].removeClass(node, className);
    _fbjsLibCSSCore2["default"].removeClass(node, activeClassName);
  },

  _set_animation: function _set_animation(hide) {
    var node = _reactDom2["default"].findDOMNode(this);
    var animations = this._get_animation_classes(hide);
    var endListener = function endListener(e) {
      if (e && e.target !== node) {
        return;
      }

      animations.forEach(function (anim) {
        _fbjsLibCSSCore2["default"].removeClass(node, anim);
      });

      _reactLibReactTransitionEvents2["default"].removeEndEventListener(node, endListener);
    };

    _reactLibReactTransitionEvents2["default"].addEndEventListener(node, endListener);

    animations.forEach(function (anim) {
      _fbjsLibCSSCore2["default"].addClass(node, anim);
    });
  },

  _get_animation_classes: function _get_animation_classes(hide) {
    var props = this.props;

    var animations = hide ? props.hideAnimation : props.showAnimation;
    if ("[object Array]" === toString.call(animations)) {
      return animations;
    } else if ("string" === typeof animations) {
      return animations.split(" ");
    }
  },

  _clear_animation: function _clear_animation(hide) {
    var _this2 = this;

    var animations = this._get_animation_classes(hide);
    animations.forEach(function (animation) {
      _fbjsLibCSSCore2["default"].removeClass(_reactDom2["default"].findDOMNode(_this2), animation);
    });
  },

  _queue_class: function _queue_class(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this._flush_class_name_queue, TICK);
    }
  },

  _flush_class_name_queue: function _flush_class_name_queue() {
    if (this.isMounted()) {
      this.classNameQueue.forEach(_fbjsLibCSSCore2["default"].addClass.bind(_fbjsLibCSSCore2["default"], _reactDom2["default"].findDOMNode(this)));
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  _show: function _show() {
    var props = this.props;

    if (props.transition) {
      this._set_transition();
    } else if (props.showAnimation) {
      this._set_animation();
    }
  },

  handleMouseEnter: function handleMouseEnter() {
    clearTimeout(this.intervalId);
    this._set_interval_id(null);
    if (this.isHiding) {
      this._set_is_hiding(false);

      var props = this.props;

      if (props.hideAnimation) {
        this._clear_animation(true);
      } else if (props.transition) {
        this._clear_transition(true);
      }
    }
  },

  handleMouseLeave: function handleMouseLeave() {
    var props = this.props;

    if (!this.isHiding && (0 < props.timeOut || 0 < props.extendedTimeOut)) {
      this._set_interval_id(setTimeout(this.hideToast, props.extendedTimeOut));
    }
  },

  hideToast: function hideToast(override) {
    var props = this.props;

    if (this.isHiding || null == this.intervalId && !override) {
      return;
    }

    this._set_is_hiding(true);
    if (props.transition) {
      this._set_transition(true);
    } else if (props.hideAnimation) {
      this._set_animation(true);
    } else {
      this._handle_remove();
    }
  },

  _set_interval_id: function _set_interval_id(intervalId) {
    this.intervalId = intervalId;
  },

  _set_is_hiding: function _set_is_hiding(isHiding) {
    this.isHiding = isHiding;
  }
};
module.exports = exports["default"];