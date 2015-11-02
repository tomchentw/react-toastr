"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function call_show_method($node, props) {
  $node[props.showMethod]({
    duration: props.showDuration,
    easing: props.showEasing
  });
}

module.exports = {
  getDefaultProps: function getDefaultProps() {
    return {
      style: {
        display: "none" },
      // effective $.hide()
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

  getInitialState: function getInitialState() {
    return {
      intervalId: null,
      isHiding: false
    };
  },

  componentDidMount: function componentDidMount() {
    var props = this.props;

    call_show_method(this._get_$_node(), props);
    if (0 < props.timeOut) {
      this._set_interval_id(setTimeout(this.hideToast, props.timeOut));
    }
  },

  handleMouseEnter: function handleMouseEnter() {
    clearTimeout(this.state.intervalId);
    this._set_interval_id(null);
    this._set_is_hiding(false);

    call_show_method(this._get_$_node().stop(true, true), this.props);
  },

  handleMouseLeave: function handleMouseLeave() {
    var props = this.props;

    if (!this.state.isHiding && (0 < props.timeOut || 0 < props.extendedTimeOut)) {
      this._set_interval_id(setTimeout(this.hideToast, props.extendedTimeOut));
    }
  },

  hideToast: function hideToast(override) {
    var state = this.state;
    var props = this.props;

    if (state.isHiding || null == state.intervalId && !override) {
      return;
    }
    this.setState({ isHiding: true });

    this._get_$_node()[props.hideMethod]({
      duration: props.hideDuration,
      easing: props.hideEasing,
      complete: this._handle_remove
    });
  },

  _get_$_node: function _get_$_node() {
    /* eslint-disable no-undef */
    return jQuery(_reactDom2["default"].findDOMNode(this));
    /* eslint-enable no-undef */
  },

  _set_interval_id: function _set_interval_id(intervalId) {
    this.setState({
      intervalId: intervalId
    });
  },

  _set_is_hiding: function _set_is_hiding(isHiding) {
    this.setState({
      isHiding: isHiding
    });
  }
};