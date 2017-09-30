// @flow
import _ from "lodash"
import cx from "classnames"
import React from "react"
import on from "dom-helpers/events/on"
import { animationEnd } from "dom-helpers/transition/properties"

import { ToastMessage as renderToastMessage } from "./ToastMessage"
import type { Props as ToastMessageProps } from "./ToastMessage"

type Props = ToastMessageProps & {
  className?: string,
  /** or other animations from animate.css */
  showAnimation?: string,
  /** or other animations from animate.css */
  hideAnimation?: string,

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

/**
 * A decorated component that leverages animate.css for toast showing/hiding.
 * 
 * @see https://daneden.github.io/animate.css/
 */
export class ToastMessageAnimated extends React.PureComponent<Props> {
  static defaultProps = {
    className: "toast",
    showAnimation: "animated bounceIn",
    hideAnimation: "animated bounceOut",
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
    className: undefined,
  }

  componentDidMount() {
    if (!_.isUndefined(this.props.showAnimation)) {
      this.setState(() => {
        on(this.message, animationEnd, this.handleTransitionEnd)
        return {
          className: this.props.showAnimation,
        }
      })
    }
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

  handleMount = ref => {
    this.message = ref
  }

  handleMouseEnter = () => {
    this.setState(state => {
      if (!_.isUndefined(state.hidingTimoutId)) {
        clearTimeout(state.hidingTimoutId)
      }
      return {
        hidingTimoutId: undefined,
        className: undefined,
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

  handleTransitionEnd = () => {
    this.setState(() => ({
      className: undefined,
    }))
  }

  handleHideHookOnEnd = () => {
    on(
      this.message,
      animationEnd,
      _.flowRight(this.handleRemove, this.handleTransitionEnd)
    )
  }

  handleHide = (override = false) => {
    this.setState(state => {
      if (override || !_.isUndefined(state.hidingTimoutId)) {
        if (!_.isNil(this.props.hideAnimation)) {
          return {
            hidingTimoutId: setTimeout(this.handleHideHookOnEnd, 50),
            className: this.props.hideAnimation,
          }
        } else {
          this.handleRemove()
          return {
            hidingTimoutId: undefined,
            className: undefined,
          }
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
      _.keys(ToastMessageAnimated.defaultProps)
    )
    return renderToastMessage({
      ...restProps,
      ref: this.handleMount,
      className: cx(this.props.className, this.state.className),
      onClick: this.handleOnClick,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onCloseClick: this.handleOnCloseClick,
    })
  }
}

export default ToastMessageAnimated
