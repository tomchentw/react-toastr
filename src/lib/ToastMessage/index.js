import React from 'react';
import update from 'react-addons-update';
import classNames from 'classnames';
import animationMixin from './animationMixin';
import jQueryMixin from './jQueryMixin';

function noop() {}

const ToastMessageSpec = {
  displayName: 'ToastMessage',

  getDefaultProps() {
    const iconClassNames = {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning',
    };

    return {
      className: 'toast',
      iconClassNames,
      titleClassName: 'toast-title',
      messageClassName: 'toast-message',
      tapToDismiss: true,
      closeButton: false,
    };
  },

  handleOnClick(event) {
    this.props.handleOnClick(event);
    if (this.props.tapToDismiss) {
      this.hideToast(true);
    }
  },

  handleCloseButtonClick(event) {
    event.stopPropagation();
    this.hideToast(true);
  },

  handleRemove() {
    this.props.handleRemove(this.props.toastId);
  },

  renderCloseButton() {
    return this.props.closeButton ? (
      <button
        className="toast-close-button" role="button"
        onClick={this.handleCloseButtonClick}
        dangerouslySetInnerHTML={{ __html: '&times;' }}
      />
    ) : false;
  },

  renderTitleElement() {
    return this.props.title ? (
      <div className={this.props.titleClassName}>
        {this.props.title}
      </div>
    ) : false;
  },

  renderMessageElement() {
    return this.props.message ? (
      <div className={this.props.messageClassName}>
        {this.props.message}
      </div>
    ) : false;
  },

  render() {
    const iconClassName = this.props.iconClassName || this.props.iconClassNames[this.props.type];

    return (
      <div
        className={classNames(this.props.className, iconClassName)}
        style={this.props.style}
        onClick={this.handleOnClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.renderCloseButton()}
        {this.renderTitleElement()}
        {this.renderMessageElement()}
      </div>
    );
  },
};

export const animation = React.createClass(update(ToastMessageSpec, {
  displayName: { $set: 'ToastMessage.animation' },
  mixins: { $set: [animationMixin] },
}));

export const jQuery = React.createClass(update(ToastMessageSpec, {
  displayName: { $set: 'ToastMessage.jQuery' },
  mixins: { $set: [jQueryMixin] },
}));

/*
 * assign default noop functions
 */
ToastMessageSpec.handleMouseEnter = noop;
ToastMessageSpec.handleMouseLeave = noop;
ToastMessageSpec.hideToast = noop;

const ToastMessage = React.createClass(ToastMessageSpec);

ToastMessage.animation = animation;
ToastMessage.jQuery = jQuery;

export default ToastMessage;
