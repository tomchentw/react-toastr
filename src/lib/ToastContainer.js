import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import ToastMessage from './ToastMessage';

class ToastContainer extends React.Component {
  static propTypes = {
    toastType: PropTypes.shape({
      error: PropTypes.string,
      info: PropTypes.string,
      success: PropTypes.string,
      warning: PropTypes.string,
    }).isRequired,
    id: PropTypes.string.isRequired,
    toastMessageFactory: PropTypes.func.isRequired,
    preventDuplicates: PropTypes.bool.isRequired,
    newestOnTop: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    toastType: {
      error: 'error',
      info: 'info',
      success: 'success',
      warning: 'warning',
    },
    id: 'toast-container',
    toastMessageFactory: React.createFactory(ToastMessage.animation),
    preventDuplicates: true,
    newestOnTop: true,
    onClick() {},
  };

  state = {
    toasts: [],
    toastId: 0,
    messageList: [],
  };

  error(message, title, optionsOverride) {
    this._notify(this.props.toastType.error, message, title, optionsOverride);
  }

  info(message, title, optionsOverride) {
    this._notify(this.props.toastType.info, message, title, optionsOverride);
  }

  success(message, title, optionsOverride) {
    this._notify(this.props.toastType.success, message, title, optionsOverride);
  }

  warning(message, title, optionsOverride) {
    this._notify(this.props.toastType.warning, message, title, optionsOverride);
  }

  clear() {
    Object.keys(this.refs).forEach((key) => {
      this.refs[key].hideToast(false);
    });
  }

  _notify(type, message, title, optionsOverride = {}) {
    if (this.props.preventDuplicates) {
      if (_.includes(this.state.messageList, message)) {
        return;
      }
    }
    const key = this.state.toastId++;
    const toastId = key;
    const newToast = update(optionsOverride, {
      $merge: {
        type,
        title,
        message,
        toastId,
        key,
        ref: `toasts__${key}`,
        handleOnClick: (e) => {
          if (typeof optionsOverride.handleOnClick === 'function') {
            optionsOverride.handleOnClick();
          }
          return this.handleToastOnClick(e);
        },
        handleRemove: this.handleToastRemove,
      },
    });
    const toastOperation = {
      [`${this.props.newestOnTop ? '$unshift' : '$push'}`]: [newToast],
    };

    const messageOperation = {
      [`${this.props.newestOnTop ? '$unshift' : '$push'}`]: [message],
    };

    const nextState = update(this.state, {
      toasts: toastOperation,
      messageList: messageOperation,
    });
    this.setState(nextState);
  }

  handleToastOnClick = (event) => {
    this.props.onClick(event);
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  handleToastRemove = (toastId) => {
    if (this.props.preventDuplicates) {
      this.state.previousMessage = '';
    }
    const operationName = `${this.props.newestOnTop ? 'reduceRight' : 'reduce'}`;
    this.state.toasts[operationName]((found, toast, index) => {
      if (found || toast.toastId !== toastId) {
        return false;
      }
      this.setState(update(this.state, {
        toasts: { $splice: [[index, 1]] },
        messageList: { $splice: [[index, 1]] },
      }));
      return true;
    }, false);
  }

  render() {
    const divProps = _.omit(this.props, ['toastType', 'toastMessageFactory', 'preventDuplicates', 'newestOnTop']);

    return (
      <div {...divProps} aria-live="polite" role="alert">
        {this.state.toasts.map(toast => this.props.toastMessageFactory(toast))}
      </div>
    );
  }
}

module.exports = ToastContainer;
