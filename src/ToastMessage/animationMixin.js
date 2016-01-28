import {
  default as ReactTransitionEvents,
} from "react/lib/ReactTransitionEvents";

import {
  default as ReactDOM,
} from "react-dom";

import {
  default as elementClass,
} from "element-class";

const TICK = 17;
const { toString } = Object.prototype;

export default {
  getDefaultProps() {
    return {
      transition: null, // some examples defined in index.scss (scale, fadeInOut, rotate)
      showAnimation: `animated bounceIn`, // or other animations from animate.css
      hideAnimation: `animated bounceOut`,
      timeOut: 5000,
      extendedTimeOut: 1000,
    };
  },

  componentWillMount() {
    this.classNameQueue = [];
    this.isHiding = false;
    this.intervalId = null;
  },

  componentDidMount() {
    this._is_mounted = true;
    this._show();
    const node = ReactDOM.findDOMNode(this);

    const onHideComplete = () => {
      if (this.isHiding) {
        this._set_is_hiding(false);
        ReactTransitionEvents.removeEndEventListener(node, onHideComplete);
        this._handle_remove();
      }
    };
    ReactTransitionEvents.addEndEventListener(node, onHideComplete);

    if (this.props.timeOut > 0) {
      this._set_interval_id(
        setTimeout(this.hideToast, this.props.timeOut)
      );
    }
  },
  componentWillUnmount() {
    this._is_mounted = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  },
  _set_transition(hide) {
    const animationType = hide ? `leave` : `enter`;
    const node = ReactDOM.findDOMNode(this);
    const className = `${ this.props.transition }-${ animationType }`;
    const activeClassName = `${ className }-active`;

    const endListener = e => {
      if (e && e.target !== node) {
        return;
      }

      const classList = elementClass(node);
      classList.remove(className);
      classList.remove(activeClassName);

      ReactTransitionEvents.removeEndEventListener(node, endListener);
    };

    ReactTransitionEvents.addEndEventListener(node, endListener);

    elementClass(node).add(className);

    // Need to do this to actually trigger a transition.
    this._queue_class(activeClassName);
  },

  _clear_transition(hide) {
    const node = ReactDOM.findDOMNode(this);
    const animationType = hide ? `leave` : `enter`;
    const className = `${ this.props.transition }-${ animationType }`;
    const activeClassName = `${ className }-active`;

    const classList = elementClass(node);
    classList.remove(className);
    classList.remove(activeClassName);
  },

  _set_animation(hide) {
    const node = ReactDOM.findDOMNode(this);
    const animations = this._get_animation_classes(hide);
    const endListener = e => {
      if (e && e.target !== node) {
        return;
      }

      animations.forEach(anim =>
        elementClass(node).remove(anim)
      );

      ReactTransitionEvents.removeEndEventListener(node, endListener);
    };

    ReactTransitionEvents.addEndEventListener(node, endListener);

    animations.forEach(anim =>
      elementClass(node).add(anim)
    );
  },

  _get_animation_classes(hide) {
    const animations = hide ? this.props.hideAnimation : this.props.showAnimation;
    if (`[object Array]` === toString.call(animations)) {
      return animations;
    } else if (`string` === typeof animations) {
      return animations.split(` `);
    }
  },

  _clear_animation(hide) {
    const node = ReactDOM.findDOMNode(this);
    const animations = this._get_animation_classes(hide);
    animations.forEach(animation =>
      elementClass(node).remove(animation)
    );
  },

  _queue_class(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this._flush_class_name_queue, TICK);
    }
  },

  _flush_class_name_queue() {
    if (this._is_mounted) {
      const node = ReactDOM.findDOMNode(this);
      this.classNameQueue.forEach(className =>
        elementClass(node).add(className)
      );
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  _show() {
    if (this.props.transition) {
      this._set_transition();
    } else if (this.props.showAnimation) {
      this._set_animation();
    }
  },

  handleMouseEnter() {
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

  handleMouseLeave() {
    if (!this.isHiding &&
      (this.props.timeOut > 0 || this.props.extendedTimeOut > 0)) {
      this._set_interval_id(
        setTimeout(this.hideToast, this.props.extendedTimeOut)
      );
    }
  },

  hideToast(override) {
    if (this.isHiding || (this.intervalId === null && !override)) {
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

  _set_interval_id(intervalId) {
    this.intervalId = intervalId;
  },

  _set_is_hiding(isHiding) {
    this.isHiding = isHiding;
  },
};
