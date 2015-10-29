import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  default as ToastMessage,
  itemShapeDefinition,
} from "./ToastMessage";


export default class ToastMessageList extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape(itemShapeDefinition)).isRequired,
    defaultToastMessage: PropTypes.func,
  };

  static defaultProps = {
    list: [],
    defaultToastMessage: ToastMessage,
    ariaLive: "polite",
    role: "alert",
  };

  renderItem (toastMessage) {
    const {
      ToastMessage = this.props.defaultToastMessage,
      ...restProps,
    } = toastMessage;

    return (
      <ToastMessage
        key={restProps.toastId}
        {...restProps}
      />
    );
  }

  render () {
    const {list, ...restProps} = this.props;

    return (
      <div {...restProps}>
        {list.map(::this.renderItem)}
      </div>
    );
  }
}
