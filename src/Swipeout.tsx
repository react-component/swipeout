import { PropTypes } from 'react';
import * as React from 'react';
import { View, Text } from 'react-native';
import Swipe from 'react-native-swipeout';
import splitObject from './util/splitObject';
import SwipeoutProps from './SwipeoutProps';

class Swipeout extends React.Component<SwipeoutProps, any> {
  static propTypes = {
    prefixCls: PropTypes.string,
    autoClose: PropTypes.bool,
    disabled: PropTypes.bool,
    left: PropTypes.arrayOf(PropTypes.object),
    right: PropTypes.arrayOf(PropTypes.object),
    onOpen: PropTypes.func,
    children: PropTypes.any,
  };

  static defaultProps = {
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    onOpen() {},
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      paddingTop: 0,
    };
  }

  renderCustomButton(button) {
    const buttonStyle = button.style || {};
    const bgColor = buttonStyle.backgroundColor || 'transparent';
    const component = (
      <View style={{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
      }}>
        <Text style={[button.style, {textAlign: 'center'}]}>
          {button.text}
        </Text>
      </View>
    );
    return {
      text: button.text || 'Click',
      onPress: button.onPress,
      type: 'default',
      component: component,
      backgroundColor: 'transparent',
      color: '#999',
      disabled: false
    };
  }

  render() {
    let [{disabled, autoClose, style, left, right, onOpen, children}, restProps] = splitObject(
      this.props,
      ['disabled', 'autoClose', 'style', 'left', 'right', 'onOpen', 'children']
    );

    const cutsomLeft = left.map(btn => {
      return this.renderCustomButton(btn);
    });
    const cutsomRight = right.map(btn => {
      return this.renderCustomButton(btn);
    });

    return (left.length || right.length) && !disabled ? (
      <Swipe
        autoClose={autoClose}
        left={cutsomLeft}
        right={cutsomRight}
        style={style}
        onOpen={onOpen}
      >
        {children}
      </Swipe>
    ) : (
      <View style={style} {...restProps}>
        {children}
      </View>
    );
  }
}

export default Swipeout;
