// @flow
import _ from "lodash"
import cx from "classnames"
import React from "react"

export type IconClassNames = {
  error: string,
  info: string,
  success: string,
  warning: string,
}

const defaultIconClassNames: IconClassNames = {
  error: "toast-error",
  info: "toast-info",
  success: "toast-success",
  warning: "toast-warning",
}

export type Props = {
  className?: string,
  type: string,
  iconClassNames?: IconClassNames,
  iconClassName?: string,
  /**
   * Show or hide an optional close button.
   */
  closeButton?: boolean,
  onCloseClick?: func,
  title?: any,
  titleClassName?: string,
  message?: any,
  messageClassName?: string,
}

/**
 * Base component for displaying a toast message.
 */
export const ToastMessage = ({
  className = "toast",
  type,
  iconClassNames = defaultIconClassNames,
  iconClassName = iconClassNames[type],
  closeButton = false,
  onCloseClick = _.noop,
  title = false,
  titleClassName = "toast-title",
  message = false,
  messageClassName = "toast-message",
  ...restProps
}: Props) => (
  <div {...restProps} className={cx(className, iconClassName)}>
    {!!closeButton && (
      <button
        className="toast-close-button"
        onClick={onCloseClick}
        dangerouslySetInnerHTML={{ __html: "&times;" }}
      />
    )}
    {!!title && <div className={titleClassName}>{title}</div>}
    {!!message && <div className={messageClassName}>{message}</div>}
  </div>
)

export default ToastMessage
