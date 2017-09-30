// @flow
import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"

import ToastMessage from "./ToastMessage"
import type { Props as ToastMessageProps } from "./ToastMessage"

type Props = ToastMessageProps & {
  /** effective $.hide() */
  style?: object,
  /** slideDown, and show are built into jQuery */
  showMethod?: string,
  showDuration?: number,
  /** and linear are built into jQuery */
  showEasing?: string,
  hideMethod?: string,
  hideDuration?: number,
  hideEasing?: string,

  /**
   * Set the time (in ms) after which the toast message should automatically close.
   */
  timeOut?: number,
  /**
   * Set the time (in ms) after which the toast message should automatically close after being hovered on. Applied on hover exit.
   */
  extendedTimeOut?: number,
  /**
   * Enable dismissing toasts on click.
   */
  tapToDismiss?: boolean,
  onRemove: func,
  onClick?: func,
  onCloseClick?: func,
}

let jQuery

/**
 * A standalone decorated component that leverages jQuery for toast showing/hiding.
 * 
 * @see https://jquery.com/
 */
export class ToastMessagejQuery extends React.PureComponent<Props> {
  static defaultProps = {
    style: {
      display: "none",
    },
    showMethod: "fadeIn",
    showDuration: 300,
    showEasing: "swing",
    hideMethod: "fadeOut",
    hideDuration: 1000,
    hideEasing: "swing",
    //
    timeOut: 5000,
    extendedTimeOut: 1000,
    //
    tapToDismiss: true,
    //
    onRemove: undefined,
    onClick: _.noop,
    onCloseClick: _.noop,
  }

  state = {
    hidingTimoutId: undefined,
  }

  componentDidMount() {
    jQuery = require("jquery")
    const $node = jQuery(ReactDOM.findDOMNode(this))
    $node[this.props.showMethod]()
    if (this.props.timeOut > 0) {
      this.setState(() => ({
        hidingTimoutId: setTimeout(this.handleHide, this.props.timeOut),
      }))
    }
  }

  componentWillUnmount() {
    if (!_.isUndefined(this.state.hidingTimoutId)) {
      clearTimeout(this.state.hidingTimoutId)
    }
    this.setState = _.noop
  }

  handleMouseEnter = () => {
    this.setState(state => {
      if (!_.isUndefined(state.hidingTimoutId)) {
        clearTimeout(state.hidingTimoutId)
      }
      const $node = jQuery(ReactDOM.findDOMNode(this))
      $node.stop(true, true)
      $node[this.props.showMethod]()
      return {
        hidingTimoutId: undefined,
      }
    })
  }

  handleMouseLeave = () => {
    this.setState(state => {
      const timeOut =
        this.props.extendedTimeOut !== 0
          ? this.props.extendedTimeOut
          : this.props.timeOut
      if (_.isUndefined(state.hidingTimoutId) && timeOut !== 0) {
        return {
          hidingTimoutId: setTimeout(this.handleHide, timeOut),
        }
      }
      return {}
    })
  }

  handleHide = (override = false) => {
    this.setState(state => {
      if (override || !_.isUndefined(state.hidingTimoutId)) {
        const $node = jQuery(ReactDOM.findDOMNode(this))
        $node[this.props.hideMethod]({
          duration: this.props.hideDuration,
          easing: this.props.hideEasing,
          complete: this.handleRemove,
        })
        return {
          hidingTimoutId: undefined,
        }
      }
    })
  }

  handleRemove = () => {
    this.props.onRemove()
  }

  handleOnClick = event => {
    this.props.onClick(event)
    if (this.props.tapToDismiss) {
      this.handleHide(true)
    }
  }

  handleOnCloseClick = event => {
    event.stopPropagation()
    this.props.onCloseClick(event)
    this.handleHide(true)
  }

  render() {
    const restProps = _.omit(
      this.props,
      _.keys(ToastMessagejQuery.defaultProps)
    )
    return (
      <ToastMessage
        {...restProps}
        onClick={this.handleOnClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onCloseClick={this.handleOnCloseClick}
      />
    )
  }
}

export default ToastMessagejQuery
