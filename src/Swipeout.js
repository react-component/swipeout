import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Swipe from 'react-native-swipe-out';
import Icon as FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import splitObject from './util/splitObject';

class Swipeout extends React.Component {
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
    const icon = button.icon || null;
    const iconStyle = icon && icon.style || {};
    const iconType = icon && icon.type || 'FontAwesome'; // TODO: support Ionicons, MaterialIcons etc 
    const iconName = icon && icon.name || null;
    const iconSize = icon && icon.size || 15;
    const iconColor = icon && icon.color || 'black';
    
    const Component = (
      <View
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor,
        }}
      >
      {
        iconName && (
          <FontAwesomeIcon
            name={iconName}
            color={iconColor}
            style={iconStyle}
            size={iconSize}
          />
        )
      }
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
    const [{
      disabled, autoClose, style, left, right, onOpen, onClose, children,
    }, restProps] = splitObject(
      this.props,
      ['disabled', 'autoClose', 'style', 'left', 'right', 'onOpen', 'onClose', 'children']
    );

    const customLeft = left.map(btn => {
      return this.renderCustomButton(btn);
    });
    const customRight = right.map(btn => {
      return this.renderCustomButton(btn);
    });

    return (left.length || right.length) && !disabled ? (
      <Swipe
        autoClose={autoClose}
        left={customLeft}
        right={customRight}
        style={style}
        onOpen={onOpen}
        onClose={onClose}
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
