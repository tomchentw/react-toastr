import ReactDOM from 'react-dom';

function callShowMethod($node, props) {
  $node[props.showMethod]({
    duration: props.showDuration,
    easing: props.showEasing,
  });
}

export default {
  getDefaultProps() {
    return {
      style: {
        display: 'none', // effective $.hide()
      },
      showMethod: 'fadeIn', // slideDown, and show are built into jQuery
      showDuration: 300,
      showEasing: 'swing', // and linear are built into jQuery
      hideMethod: 'fadeOut',
      hideDuration: 1000,
      hideEasing: 'swing',
      //
      timeOut: 5000,
      extendedTimeOut: 1000,
    };
  },

  getInitialState() {
    return {
      intervalId: null,
      isHiding: false,
    };
  },

  componentDidMount() {
    callShowMethod(this.getNode(), this.props);
    if (this.props.timeOut > 0) {
      this.setIntervalId(setTimeout(this.hideToast, this.props.timeOut));
    }
  },

  handleMouseEnter() {
    clearTimeout(this.state.intervalId);
    this.setIntervalId(null);
    this.setIsHiding(false);

    callShowMethod(this.getNode().stop(true, true), this.props);
  },

  handleMouseLeave() {
    if (!this.state.isHiding &&
        (this.props.timeOut > 0 || this.props.extendedTimeOut > 0)) {
      this.setIntervalId(setTimeout(this.hideToast, this.props.extendedTimeOut));
    }
  },

  hideToast(override) {
    if (this.state.isHiding || (this.state.intervalId === null && !override)) {
      return;
    }
    this.setState({ isHiding: true });

    this.getNode()[this.props.hideMethod]({
      duration: this.props.hideDuration,
      easing: this.props.hideEasing,
      complete: this.handleRemove,
    });
  },

  getNode() {
    /* eslint-disable no-undef */
    return jQuery(ReactDOM.findDOMNode(this));
    /* eslint-enable no-undef */
  },

  setIntervalId(intervalId) {
    this.setState({
      intervalId,
    });
  },

  setIsHiding(isHiding) {
    this.setState({
      isHiding,
    });
  },
};
