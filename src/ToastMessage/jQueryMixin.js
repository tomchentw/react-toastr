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
    };
  },

  getInitialState () {
    return {
      intervalId: null
    };
  },

  _get$Node () {
    return $(this.getDOMNode());
  },

  componentDidMount () {
    var {props} = this;
    this._get$Node()[props.showMethod]({
      duration: props.showDuration,
      easing: props.showEasing
    });
    // if (props.timeOut > 0) {
    //   this.setState({
    //     intervalId: setTimeout('hideToast', props.timeOut);
    //   });
    // }
  }
};
