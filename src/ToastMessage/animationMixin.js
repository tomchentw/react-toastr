"use strict";

var CSSCore = require("fbjs/lib/CSSCore");
var ReactTransitionEvents = require("react/lib/ReactTransitionEvents");
var ReactDOM = require('react-dom');
var TICK = 17;
var {toString} = Object.prototype;

module.exports = {
  getDefaultProps() {
    return {
      transition: null,//some examples defined in index.scss (scale, fadeInOut, rotate)
      showAnimation: "animated bounceIn", //or other animations from animate.css
      hideAnimation: "animated bounceOut",
      timeOut: 5000,
      extendedTimeOut: 1000,
    };
  },

  componentWillMount: function () {
    this.classNameQueue = [];
    this.isHiding = false;
    this.intervalId = null;
  },

  componentDidMount() {
    var {props} = this;
    this._show(props);

    var onHideComplete = () => {
      if (this.isHiding) {
        this._set_is_hiding(false);
        ReactTransitionEvents.removeEndEventListener(node, onHideComplete);
        this._handle_remove();
      }
    };

    var node = ReactDOM.findDOMNode(this);
    ReactTransitionEvents.addEndEventListener(node, onHideComplete);

    if (0 < props.timeOut) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.timeOut)
      );
    }
  },
  componentWillUnmount() {
    if(this.intervalId){
      clearTimeout(this.intervalId);
    }
  },
  _set_transition(hide) {
    var animationType = hide ? "leave" : "enter";
    var node = ReactDOM.findDOMNode(this);
    var className = this.props.transition + "-" + animationType;
    var activeClassName = className + "-active";

    var endListener = function (e) {
      if (e && e.target !== node) {
        return;
      }

      CSSCore.removeClass(node, className);
      CSSCore.removeClass(node, activeClassName);

      ReactTransitionEvents.removeEndEventListener(node, endListener);
    };

    ReactTransitionEvents.addEndEventListener(node, endListener);

    CSSCore.addClass(node, className);

    // Need to do this to actually trigger a transition.
    this._queue_class(activeClassName);
  },

  _clear_transition(hide) {
    var node = ReactDOM.findDOMNode(this);
    var animationType = hide ? "leave" : "enter";
    var className = this.props.transition + "-" + animationType;
    var activeClassName = className + "-active";

    CSSCore.removeClass(node, className);
    CSSCore.removeClass(node, activeClassName);
  },

  _set_animation(hide) {
    var node = ReactDOM.findDOMNode(this);
    var animations = this._get_animation_classes(hide);
    var endListener = function (e) {
      if (e && e.target !== node) {
        return;
      }

      animations.forEach((anim) => {
        CSSCore.removeClass(node, anim);
      });

      ReactTransitionEvents.removeEndEventListener(node, endListener);
    };

    ReactTransitionEvents.addEndEventListener(node, endListener);

    animations.forEach((anim) => {
      CSSCore.addClass(node, anim);
    });
  },

  _get_animation_classes(hide) {
    var {props} = this;
    var animations = hide ? props.hideAnimation : props.showAnimation;
    if ("[object Array]" === toString.call(animations)) {
      return animations;
    }
    else if ("string" === typeof animations) {
      return animations.split(" ");
    }
  },

  _clear_animation(hide) {
    var animations = this._get_animation_classes(hide);
    animations.forEach((animation) => {
      CSSCore.removeClass(ReactDOM.findDOMNode(this), animation);
    });
  },

  _queue_class(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this._flush_class_name_queue, TICK);
    }
  },

  _flush_class_name_queue() {
    if (this.isMounted()) {
      this.classNameQueue.forEach(
        CSSCore.addClass.bind(CSSCore, ReactDOM.findDOMNode(this))
      );
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  _show() {
    var {props} = this;
    if (props.transition) {
      this._set_transition();
    } else if (props.showAnimation) {
      this._set_animation();
    }
  },

  handleMouseEnter() {
    clearTimeout(this.intervalId);
    this._set_interval_id(null);
    if (this.isHiding) {
      this._set_is_hiding(false);

      var {props} = this;
      if (props.hideAnimation) {
        this._clear_animation(true);
      }
      else if (props.transition) {
        this._clear_transition(true);
      }
    }
  },

  handleMouseLeave() {
    var {props} = this;
    if (!this.isHiding &&
      (0 < props.timeOut || 0 < props.extendedTimeOut)) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.extendedTimeOut)
      );
    }
  },

  hideToast(override) {
    var {props} = this;
    if (this.isHiding || (null == this.intervalId && !override)) {
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

  _set_interval_id(intervalId) {
    this.intervalId = intervalId;
  },

  _set_is_hiding(isHiding) {
    this.isHiding = isHiding;
  },
};
