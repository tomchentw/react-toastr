import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import ReactDOM from 'react-dom';
import elementClass from 'element-class';

const TICK = 17;
const { toString } = Object.prototype;

export default {
  getDefaultProps() {
    return {
      transition: null, // some examples defined in index.scss (scale, fadeInOut, rotate)
      showAnimation: 'animated bounceIn', // or other animations from animate.css
      hideAnimation: 'animated bounceOut',
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
    this.isMounted = true;
    this.show();
    const node = ReactDOM.findDOMNode(this);

    const onHideComplete = () => {
      if (this.isHiding) {
        this.setIsHiding(false);
        ReactTransitionEvents.removeEndEventListener(node, onHideComplete);
        this.handleRemove();
      }
    };
    ReactTransitionEvents.addEndEventListener(node, onHideComplete);

    if (this.props.timeOut > 0) {
      this.setIntervalId(
        setTimeout(this.hideToast, this.props.timeOut),
      );
    }
  },
  componentWillUnmount() {
    this.isMounted = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  },
  setTransition(hide) {
    const animationType = hide ? 'leave' : 'enter';
    const node = ReactDOM.findDOMNode(this);
    const className = `${this.props.transition}-${animationType}`;
    const activeClassName = `${className}-active`;

    const endListener = (e) => {
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
    this.queueClass(activeClassName);
  },

  clearTransition(hide) {
    const node = ReactDOM.findDOMNode(this);
    const animationType = hide ? 'leave' : 'enter';
    const className = `${this.props.transition}-${animationType}`;
    const activeClassName = `${className}-active`;

    const classList = elementClass(node);
    classList.remove(className);
    classList.remove(activeClassName);
  },

  setAnimation(hide) {
    const node = ReactDOM.findDOMNode(this);
    const animations = this.getAnimationClasses(hide);
    const endListener = (e) => {
      if (e && e.target !== node) {
        return;
      }

      animations.forEach(anim => elementClass(node).remove(anim));

      ReactTransitionEvents.removeEndEventListener(node, endListener);
    };

    ReactTransitionEvents.addEndEventListener(node, endListener);

    animations.forEach(anim => elementClass(node).add(anim));
  },

  getAnimationClasses(hide) {
    const animations = hide ? this.props.hideAnimation : this.props.showAnimation;
    if (toString.call(animations) === '[object Array]') {
      return animations;
    } else if (typeof animations === 'string') {
      return animations.split(' ');
    }
    return null;
  },

  clearAnimation(hide) {
    const node = ReactDOM.findDOMNode(this);
    const animations = this.getAnimationClasses(hide);
    animations.forEach(animation => elementClass(node).remove(animation));
  },

  queueClass(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
    }
  },

  flushClassNameQueue() {
    if (this.isMounted) {
      const node = ReactDOM.findDOMNode(this);
      this.classNameQueue.forEach(className => elementClass(node).add(className));
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  show() {
    if (this.props.transition) {
      this.setTransition();
    } else if (this.props.showAnimation) {
      this.setAnimation();
    }
  },

  handleMouseEnter() {
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

  handleMouseLeave() {
    if (!this.isHiding &&
      (this.props.timeOut > 0 || this.props.extendedTimeOut > 0)) {
      this.setIntervalId(setTimeout(this.hideToast, this.props.extendedTimeOut));
    }
  },

  hideToast(override) {
    if (this.isHiding || (this.intervalId === null && !override)) {
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

  setIntervalId(intervalId) {
    this.intervalId = intervalId;
  },

  setIsHiding(isHiding) {
    this.isHiding = isHiding;
  },
};
