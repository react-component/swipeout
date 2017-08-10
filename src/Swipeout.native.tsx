import React from 'react';
import { View, Text } from 'react-native';
import Swipe from 'react-native-swipeout';
import SwipeoutPropType from './PropTypes';

class Swipeout extends React.Component<SwipeoutPropType, any> {
  static defaultProps = {
    autoClose: false,
    disabled: false,
    onOpen() {},
    onClose() {},
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
    const Component = (
      <View
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor,
        }}
      >
        <Text style={[button.style, { textAlign: 'center' }]}>
          {button.text}
        </Text>
      </View>
    );
    return {
      text: button.text || 'Click',
      onPress: button.onPress,
      type: 'default',
      component: Component,
      backgroundColor: 'transparent',
      color: '#999',
      disabled: false,
    };
  }

  render() {
    const {
      disabled, autoClose, style, left, right, onOpen, onClose, children, ...restProps,
    } = this.props;

    const customLeft = left && left.map(btn => {
      return this.renderCustomButton(btn);
    });
    const customRight = right && right.map(btn => {
      return this.renderCustomButton(btn);
    });

    return customLeft || customRight ? (
      <Swipe
        autoClose={autoClose}
        left={customLeft}
        right={customRight}
        style={style}
        onOpen={onOpen}
        onClose={onClose}
        disabled={disabled}
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
