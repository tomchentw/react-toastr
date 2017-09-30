// @flow
import _ from "lodash"
import React from "react"

import ToastMessageAnimated from "./ToastMessage/ToastMessageAnimated"
import type { IconClassNames } from "./ToastMessage/ToastMessage"

type Props = {
  toastType?: IconClassNames,
  id?: string,
  toastMessageFactory?: func,
  /**
   * Prevent identical toast messages from displaying.
   */
  preventDuplicates?: boolean,
  /**
   * Display new toast messages at the top or bottom of the queue.
   */
  newestOnTop?: boolean,
  onClick?: func,
}

/**
 * A React container for displaying a list of toast messages.
 * It mimics the APIs with the vanilla [toastr.js](https://github.com/CodeSeven/toastr)
 * by retaining a [ref][react-ref] to publish a new **toast**.
 * 
 * To display HTML, simply pass JSX instead of strings for title and message.
 * 
 * ```javascript
 * this.container.success(
 *   <strong>I am a strong title</strong>,
 *   <em>I am an emphasized message</em>
 * });
 * ```
 * 
 * If you're using Redux for managing states, you might consider using the
 * underlying component directly. See [ToastMessageAnimated](#toastmessage) below
 */
export class ToastContainer extends React.PureComponent<Props> {
  static defaultProps = {
    toastType: {
      error: "error",
      info: "info",
      success: "success",
      warning: "warning",
    },
    id: "toast-container",
    toastMessageFactory: React.createFactory(ToastMessageAnimated),
    preventDuplicates: true,
    newestOnTop: true,
    onClick: _.noop,
  }

  state = {
    toastList: [],
  }

  toastMessageRefs = {}

  /**
   * 
   * @param {any} message 
   * @param {any} title 
   * @param {any} optionsOverride 
   * @public
   */
  error(message, title, optionsOverride) {
    this.handleNotify(
      this.props.toastType.error,
      message,
      title,
      optionsOverride
    )
  }

  /**
   * 
   * @param {any} message 
   * @param {any} title 
   * @param {any} optionsOverride 
   * @public
   */
  info(message, title, optionsOverride) {
    this.handleNotify(
      this.props.toastType.info,
      message,
      title,
      optionsOverride
    )
  }

  /**
   * 
   * @param {any} message 
   * @param {any} title 
   * @param {any} optionsOverride 
   * @public
   */
  success(message, title, optionsOverride) {
    this.handleNotify(
      this.props.toastType.success,
      message,
      title,
      optionsOverride
    )
  }

  /**
   * 
   * @param {any} message 
   * @param {any} title 
   * @param {any} optionsOverride 
   * @public
   */
  warning(message, title, optionsOverride) {
    this.handleNotify(
      this.props.toastType.warning,
      message,
      title,
      optionsOverride
    )
  }

  /**
   * 
   * @public
   */
  clear() {
    _.forEach(this.toastMessageRefs, ref => {
      if (_.isObject(ref)) {
        ref.handleHide()
      }
    })
  }

  handleNotify(type, message, title, optionsOverride = {}) {
    if (
      this.props.preventDuplicates &&
      _.includes(this.state.toastList, { message })
    ) {
      return
    }
    const key = _.uniqueId("toast_")
    const nextToast = {
      ...optionsOverride,
      key,
      type,
      title,
      message,
      ref: ref => {
        this.toastMessageRefs[key] = ref
      },
      onClick: event => {
        if (_.isFunction(optionsOverride.handleOnClick)) {
          optionsOverride.handleOnClick()
        }
        this.handleOnToastClick(event)
      },
      onRemove: _.bind(this.handleOnToastRemove, this, key),
    }
    this.setState(state => ({
      toastList: this.props.newestOnTop
        ? [nextToast, ...state.toastList]
        : [...state.toastList, nextToast],
    }))
  }

  handleOnToastClick = event => {
    this.props.onClick(event)
    if (event.defaultPrevented) {
      return
    }
    event.preventDefault()
    event.stopPropagation()
  }

  handleOnToastRemove = key => {
    this.setState(state => ({
      toastList: _.reject(state.toastList, { key }),
    }))
  }

  render() {
    const restProps = _.omit(this.props, _.keys(ToastContainer.defaultProps))
    return (
      <div {...restProps} id={this.props.id} aria-live="polite" role="alert">
        {this.state.toastList.map(it => this.props.toastMessageFactory(it))}
      </div>
    )
  }
}

export default ToastContainer
