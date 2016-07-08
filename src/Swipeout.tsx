import { PropTypes } from 'react';
import * as React from 'react';
import { View, PanResponder } from 'react-native';
import SwipeoutProps from './SwipeoutProps';

class Swipeout extends React.Component<SwipeoutProps, any> {
  static propTypes = {
    prefixCls: PropTypes.string,
    autoClose: PropTypes.bool,
    disabled: PropTypes.bool,
    left: PropTypes.arrayOf(PropTypes.object),
    right: PropTypes.arrayOf(PropTypes.object),
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.any,
  };

  static defaultProps = {
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    onOpen() {},
    onClose() {},
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) =>
      Math.abs(gestureState.dx) > this.props.sensitivity &&
      Math.abs(gestureState.dy) > this.props.sensitivity,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      onShouldBlockNativeResponder: (event, gestureState) => true,
    });
  }

  _handlePanResponderGrant = (e, gestureState) => {

  }

  _handlePanResponderMove = (e, gestureState) => {

  }

  _handlePanResponderEnd = (e, gestureState) => {

  }

  render() {
    const { autoClose, backgroundColor, left, right, children } = this.props;

    return (left.length || right.length) ? (
      <View style={styleSwipeout}>
        <View
            ref="swipeoutContent"
            style={styleContent}
            onLayout={this._onLayout}
            {...this._panResponder.panHandlers}>
          {this.props.children}
        </View>
        { this._renderButtons(this.props.right, isRightVisible, styleRight) }
        { this._renderButtons(this.props.left, isLeftVisible, styleLeft) }
      </View>
    ) : null;
  }
}

export default Swipeout;
