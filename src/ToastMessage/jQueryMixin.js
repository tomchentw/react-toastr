"use strict";

import {
  default as ReactDOM,
} from "react-dom";

function call_show_method ($node, props) {
  $node[props.showMethod]({
    duration: props.showDuration,
    easing: props.showEasing,
  });
}

module.exports = {
  getDefaultProps () {
    return {
      style: {
        display: "none", // effective $.hide()
      },
      showMethod: "fadeIn", //, slideDown, and show are built into jQuery
      showDuration: 300,
      showEasing: "swing", // and linear are built into jQuery
      hideMethod: "fadeOut",
      hideDuration: 1000,
      hideEasing: "swing",
      //
      timeOut: 5000,
      extendedTimeOut: 1000,
    };
  },

  getInitialState () {
    return {
      intervalId: null,
      isHiding: false,
    };
  },

  componentDidMount () {
    var {props} = this;
    call_show_method(this._get_$_node(), props);
    if (0 < props.timeOut) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.timeOut)
      );
    }
  },

  handleMouseEnter () {
    clearTimeout(this.state.intervalId);
    this._set_interval_id(null);
    this._set_is_hiding(false);

    call_show_method(this._get_$_node().stop(true, true), this.props);
  },

  handleMouseLeave () {
    var {props} = this;

    if (!this.state.isHiding &&
        (0 < props.timeOut || 0 < props.extendedTimeOut)) {
      this._set_interval_id(
        setTimeout(this.hideToast, props.extendedTimeOut)
      );
    }
  },

  hideToast (override) {
    var {state, props} = this;
    if (state.isHiding || (null == state.intervalId && !override)) {
      return;
    }
    this.setState({isHiding: true});

    this._get_$_node()[props.hideMethod]({
      duration: props.hideDuration,
      easing: props.hideEasing,
      complete: this._handle_remove,
    });
  },

  _get_$_node () {
    /* eslint-disable no-undef */
    return jQuery(ReactDOM.findDOMNode(this));
    /* eslint-enable no-undef */
  },

  _set_interval_id (intervalId) {
    this.setState({
      intervalId,
    });
  },

  _set_is_hiding (isHiding) {
    this.setState({
      isHiding,
    });
  },
};
