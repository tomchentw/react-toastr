"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReactTransitionEvents = require("react/lib/ReactTransitionEvents");

var _ReactTransitionEvents2 = _interopRequireDefault(_ReactTransitionEvents);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _elementClass = require("element-class");

var _elementClass2 = _interopRequireDefault(_elementClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TICK = 17;
var toString = Object.prototype.toString;
exports.default = {
  getDefaultProps: function getDefaultProps() {
    return {
      transition: null, // some examples defined in index.scss (scale, fadeInOut, rotate)
      showAnimation: "animated bounceIn", // or other animations from animate.css
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

    this._is_mounted = true;
    this._show();
    var node = _reactDom2.default.findDOMNode(this);

    var onHideComplete = function onHideComplete() {
      if (_this.isHiding) {
        _this._set_is_hiding(false);
        _ReactTransitionEvents2.default.removeEndEventListener(node, onHideComplete);
        _this._handle_remove();
      }
    };
    _ReactTransitionEvents2.default.addEndEventListener(node, onHideComplete);

    if (this.props.timeOut > 0) {
      this._set_interval_id(setTimeout(this.hideToast, this.props.timeOut));
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this._is_mounted = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  },
  _set_transition: function _set_transition(hide) {
    var animationType = hide ? "leave" : "enter";
    var node = _reactDom2.default.findDOMNode(this);
    var className = this.props.transition + "-" + animationType;
    var activeClassName = className + "-active";

    var endListener = function endListener(e) {
      if (e && e.target !== node) {
        return;
      }

      var classList = (0, _elementClass2.default)(node);
      classList.remove(className);
      classList.remove(activeClassName);

      _ReactTransitionEvents2.default.removeEndEventListener(node, endListener);
    };

    _ReactTransitionEvents2.default.addEndEventListener(node, endListener);

    (0, _elementClass2.default)(node).add(className);

    // Need to do this to actually trigger a transition.
    this._queue_class(activeClassName);
  },
  _clear_transition: function _clear_transition(hide) {
    var node = _reactDom2.default.findDOMNode(this);
    var animationType = hide ? "leave" : "enter";
    var className = this.props.transition + "-" + animationType;
    var activeClassName = className + "-active";

    var classList = (0, _elementClass2.default)(node);
    classList.remove(className);
    classList.remove(activeClassName);
  },
  _set_animation: function _set_animation(hide) {
    var node = _reactDom2.default.findDOMNode(this);
    var animations = this._get_animation_classes(hide);
    var endListener = function endListener(e) {
      if (e && e.target !== node) {
        return;
      }

      animations.forEach(function (anim) {
        return (0, _elementClass2.default)(node).remove(anim);
      });

      _ReactTransitionEvents2.default.removeEndEventListener(node, endListener);
    };

    _ReactTransitionEvents2.default.addEndEventListener(node, endListener);

    animations.forEach(function (anim) {
      return (0, _elementClass2.default)(node).add(anim);
    });
  },
  _get_animation_classes: function _get_animation_classes(hide) {
    var animations = hide ? this.props.hideAnimation : this.props.showAnimation;
    if ("[object Array]" === toString.call(animations)) {
      return animations;
    } else if ("string" === typeof animations) {
      return animations.split(" ");
    }
  },
  _clear_animation: function _clear_animation(hide) {
    var node = _reactDom2.default.findDOMNode(this);
    var animations = this._get_animation_classes(hide);
    animations.forEach(function (animation) {
      return (0, _elementClass2.default)(node).remove(animation);
    });
  },
  _queue_class: function _queue_class(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this._flush_class_name_queue, TICK);
    }
  },
  _flush_class_name_queue: function _flush_class_name_queue() {
    var _this2 = this;

    if (this._is_mounted) {
      (function () {
        var node = _reactDom2.default.findDOMNode(_this2);
        _this2.classNameQueue.forEach(function (className) {
          return (0, _elementClass2.default)(node).add(className);
        });
      })();
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },
  _show: function _show() {
    if (this.props.transition) {
      this._set_transition();
    } else if (this.props.showAnimation) {
      this._set_animation();
    }
  },
  handleMouseEnter: function handleMouseEnter() {
    clearTimeout(this.intervalId);
    this._set_interval_id(null);
    if (this.isHiding) {
      this._set_is_hiding(false);

      if (this.props.hideAnimation) {
        this._clear_animation(true);
      } else if (this.props.transition) {
        this._clear_transition(true);
      }
    }
  },
  handleMouseLeave: function handleMouseLeave() {
    if (!this.isHiding && (this.props.timeOut > 0 || this.props.extendedTimeOut > 0)) {
      this._set_interval_id(setTimeout(this.hideToast, this.props.extendedTimeOut));
    }
  },
  hideToast: function hideToast(override) {
    if (this.isHiding || this.intervalId === null && !override) {
      return;
    }

    this._set_is_hiding(true);
    if (this.props.transition) {
      this._set_transition(true);
    } else if (this.props.hideAnimation) {
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