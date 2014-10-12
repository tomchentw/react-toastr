function call_show_method ($node, props) {
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

  componentDidMount () {
    var {props} = this;
    call_show_method(this._get_$_node(), props);
    if (props.timeOut > 0) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.timeOut)
      );
    }
  },

  handleMouseEnter () {
    clearTimeout(this.state.intervalId);
    this._set_interval_id(null);

    call_show_method(this._get_$_node().stop(true, true), this.props);
  },

  handleMouseLeave () {
    var {props} = this;

    if (!this.state.isHiding &&
        (props.timeOut > 0 || props.extendedTimeOut > 0)) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.extendedTimeOut)
      );
    }
  },

  hideToast (override) {
    var {state, props} = this;
    if (state.isHiding || (state.intervalId == null && !override)) return;
    this.setState({isHiding: true});

    this._get_$_node()[props.hideMethod]({
      duration: props.hideDuration,
      easing: props.hideEasing,
      complete: this._handle_remove
    });
  },

  _get_$_node () {
    return $(this.getDOMNode());
  },

  _set_interval_id (intervalId) {
    this.setState({
      intervalId
    });
  }
};
