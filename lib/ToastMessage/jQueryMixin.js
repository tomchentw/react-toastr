"use strict";
function call_show_method ($node, props) {
  $node[props.showMethod]({
    duration: props.showDuration,
    easing: props.showEasing
  });
}

module.exports = {
  getDefaultProps:function () {
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

  getInitialState:function () {
    return {
      intervalId: null,
      isHiding: false
    };
  },

  componentDidMount:function () {
    var $__0=  this,props=$__0.props;
    call_show_method(this._get_$_node(), props);
    if (props.timeOut > 0) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.timeOut)
      );
    }
  },

  handleMouseEnter:function () {
    clearTimeout(this.state.intervalId);
    this._set_interval_id(null);

    call_show_method(this._get_$_node().stop(true, true), this.props);
  },

  handleMouseLeave:function () {
    var $__0=  this,props=$__0.props;

    if (!this.state.isHiding &&
        (props.timeOut > 0 || props.extendedTimeOut > 0)) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.extendedTimeOut)
      );
    }
  },

  hideToast:function (override) {
    var $__0=   this,state=$__0.state,props=$__0.props;
    if (state.isHiding || (state.intervalId == null && !override)) return;
    this.setState({isHiding: true});

    this._get_$_node()[props.hideMethod]({
      duration: props.hideDuration,
      easing: props.hideEasing,
      complete: this._handle_remove
    });
  },

  _get_$_node:function () {
    return jQuery(this.getDOMNode());
  },

  _set_interval_id:function (intervalId) {
    this.setState({
      intervalId:intervalId
    });
  }
};
