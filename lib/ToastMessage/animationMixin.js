"use strict";

var React = require("react/addons");

var CSSCore = require("react/lib/CSSCore");
var ReactTransitionEvents = require("react/lib/ReactTransitionEvents");
var TICK = 17;
var $__0=  Object.prototype,toString=$__0.toString;

module.exports = {
  getDefaultProps:function() {
    return {
      transition: null,//some examples defined in index.scss (scale, fadeInOut, rotate)
      showAnimation: "animated bounceIn", //or other animations from animate.css
      hideAnimation: "animated bounceOut",
      timeOut: 5000,
      extendedTimeOut: 1000
    };
  },

  componentWillMount: function () {
    this.classNameQueue = [];
    this.isHiding = false;
    this.intervalId = null;
  },

  componentDidMount:function() {
    var $__0=  this,props=$__0.props;
    this._show(props);

    var onHideComplete = function()  {
      if (this.isHiding) {
        this._set_is_hiding(false);
        ReactTransitionEvents.removeEndEventListener(node, onHideComplete);
        this._handle_remove();
      }
    }.bind(this);

    var node = this.getDOMNode();
    ReactTransitionEvents.addEndEventListener(node, onHideComplete);

    if (props.timeOut > 0) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.timeOut)
      );
    }
  },

  _set_transition:function(hide) {
    var animationType = hide ? "leave" : "enter";
    var node = this.getDOMNode();
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

  _clear_transition:function(hide) {
    var node = this.getDOMNode();
    var animationType = hide ? "leave" : "enter";
    var className = this.props.transition + "-" + animationType;
    var activeClassName = className + "-active";

    CSSCore.removeClass(node, className);
    CSSCore.removeClass(node, activeClassName);
  },

  _set_animation:function(hide) {
    var node = this.getDOMNode();
    var animations = this._get_animation_classes(hide);
    var endListener = function (e) {
      if (e && e.target !== node) {
        return;
      }

      animations.forEach(function(anim)  {
        CSSCore.removeClass(node, anim);
      });

      ReactTransitionEvents.removeEndEventListener(node, endListener);
    };

    ReactTransitionEvents.addEndEventListener(node, endListener);

    animations.forEach(function(anim)  {
      CSSCore.addClass(node, anim);
    })
  },

  _get_animation_classes:function(hide) {
    var $__0=  this,props=$__0.props;
    var animations = hide ? props.hideAnimation : props.showAnimation;
    if ("[object Array]" === toString.call(animations)) {
      return animations;
    }
    else if ("string" === typeof animations) {
      return animations.split(" ");
    }
  },

  _clear_animation:function(hide) {
    var animations = this._get_animation_classes(hide);
    animations.forEach(function(animation)  {
      CSSCore.removeClass(this.getDOMNode(), animation);
    }.bind(this))
  },

  _queue_class:function(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this._flush_class_name_queue, TICK);
    }
  },

  _flush_class_name_queue:function() {
    if (this.isMounted()) {
      this.classNameQueue.forEach(
        CSSCore.addClass.bind(CSSCore, this.getDOMNode())
      );
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  _show:function() {
    var $__0=  this,props=$__0.props;
    if (props.transition) {
      this._set_transition();
    } else if (props.showAnimation) {
      this._set_animation();
    }
  },

  handleMouseEnter:function() {
    clearTimeout(this.intervalId);
    this._set_interval_id(null);
    if (this.isHiding) {
      this._set_is_hiding(false);

      var $__0=  this,props=$__0.props;
      if (props.hideAnimation) {
        this._clear_animation(true);
      }
      else if (props.transition) {
        this._clear_transition(true);
      }
    }
  },

  handleMouseLeave:function() {
    var $__0=   this,props=$__0.props,state=$__0.state;
    if (!this.isHiding &&
      (props.timeOut > 0 || props.extendedTimeOut > 0)) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.extendedTimeOut)
      );
    }
  },

  hideToast:function(override) {
    var $__0=  this,props=$__0.props;
    if (this.isHiding || (this.intervalId == null && !override)) return;

    this._set_is_hiding(true);
    if (props.transition) {
      this._set_transition(true);
    } else if (props.hideAnimation) {
      this._set_animation(true);
    } else {
      this._handle_remove();
    }
  },

  _set_interval_id:function(intervalId) {
    this.intervalId = intervalId;
  },

  _set_is_hiding:function(isHiding) {
    this.isHiding = isHiding;
  }
};
