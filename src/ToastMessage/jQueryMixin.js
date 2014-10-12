function callShowMethod ($node, props) {
  $node[props.showMethod]({
    duration: props.showDuration,
    easing: props.showEasing
  });
}

module.exports = {
  getDefaultProps () {
    return {
      style: {
        display: "none" // effective $.hide()
      },
      showMethod: "fadeIn", //, slideDown, and show are built into jQuery
      showDuration: 300,
      showEasing: "swing", // and linear are built into jQuery
      hideMethod: "fadeOut",
      hideDuration: 1000,
      hideEasing: "swing",
      //
      timeOut: 5000,
      extendedTimeOut: 1000
    };
  },

  getInitialState () {
    return {
      intervalId: null,
      isHiding: false
    };
  },

  _get$Node () {
    return $(this.getDOMNode());
  },

  _setIntervalId (intervalId) {
    this.setState({
      intervalId
    });
  },

  componentDidMount () {
    var {props} = this;
    callShowMethod(this._get$Node(), props);
    if (props.timeOut > 0) {
      this._setIntervalId(
        setTimeout(this.hideToast, props.timeOut)
      );
    }
  },

  handleMouseEnter () {
    clearTimeout(this.state.intervalId);
    this._setIntervalId(null);

    callShowMethod(this._get$Node().stop(true, true), this.props);
  },

  handleMouseLeave () {
    var {props} = this;

    if (!this.state.isHiding &&
        (props.timeOut > 0 || props.extendedTimeOut > 0)) {
      this._setIntervalId(
        setTimeout(this.hideToast, props.extendedTimeOut)
      );
    }
  },

  hideToast (override) {
    if (this.state.intervalId == null && !override) return;
    this.setState({isHiding: true});

    var {props} = this;
    this._get$Node()[props.hideMethod]({
      duration: props.hideDuration,
      easing: props.hideEasing,
      complete: this._handle_remove
    });
  }
};
