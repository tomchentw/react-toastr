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

    this.isMounted = true;
    this.show();
    var node = _reactDom2.default.findDOMNode(this);

    var onHideComplete = function onHideComplete() {
      if (_this.isHiding) {
        _this.setIsHiding(false);
        _ReactTransitionEvents2.default.removeEndEventListener(node, onHideComplete);
        _this.handleRemove();
      }
    };
    _ReactTransitionEvents2.default.addEndEventListener(node, onHideComplete);

    if (this.props.timeOut > 0) {
      this.setIntervalId(setTimeout(this.hideToast, this.props.timeOut));
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.isMounted = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  },
  setTransition: function setTransition(hide) {
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
    this.queueClass(activeClassName);
  },
  clearTransition: function clearTransition(hide) {
    var node = _reactDom2.default.findDOMNode(this);
    var animationType = hide ? "leave" : "enter";
    var className = this.props.transition + "-" + animationType;
    var activeClassName = className + "-active";

    var classList = (0, _elementClass2.default)(node);
    classList.remove(className);
    classList.remove(activeClassName);
  },
  setAnimation: function setAnimation(hide) {
    var node = _reactDom2.default.findDOMNode(this);
    var animations = this.getAnimationClasses(hide);
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
  getAnimationClasses: function getAnimationClasses(hide) {
    var animations = hide ? this.props.hideAnimation : this.props.showAnimation;
    if ("[object Array]" === toString.call(animations)) {
      return animations;
    } else if ("string" === typeof animations) {
      return animations.split(" ");
    }
  },
  clearAnimation: function clearAnimation(hide) {
    var node = _reactDom2.default.findDOMNode(this);
    var animations = this.getAnimationClasses(hide);
    animations.forEach(function (animation) {
      return (0, _elementClass2.default)(node).remove(animation);
    });
  },
  queueClass: function queueClass(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
    }
  },
  flushClassNameQueue: function flushClassNameQueue() {
    var _this2 = this;

    if (this.isMounted) {
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
  show: function show() {
    if (this.props.transition) {
      this.setTransition();
    } else if (this.props.showAnimation) {
      this.setAnimation();
    }
  },
  handleMouseEnter: function handleMouseEnter() {
    clearTimeout(this.intervalId);
    this.setIntervalId(null);
    if (this.isHiding) {
      this.setIsHiding(false);

      if (this.props.hideAnimation) {
        this.clearAnimation(true);
      } else if (this.props.transition) {
        this.clearTransition(true);
      }
    }
  },
  handleMouseLeave: function handleMouseLeave() {
    if (!this.isHiding && (this.props.timeOut > 0 || this.props.extendedTimeOut > 0)) {
      this.setIntervalId(setTimeout(this.hideToast, this.props.extendedTimeOut));
    }
  },
  hideToast: function hideToast(override) {
    if (this.isHiding || this.intervalId === null && !override) {
      return;
    }

    this.setIsHiding(true);
    if (this.props.transition) {
      this.setTransition(true);
    } else if (this.props.hideAnimation) {
      this.setAnimation(true);
    } else {
      this.handleRemove();
    }
  },
  setIntervalId: function setIntervalId(intervalId) {
    this.intervalId = intervalId;
  },
  setIsHiding: function setIsHiding(isHiding) {
    this.isHiding = isHiding;
  }
};
