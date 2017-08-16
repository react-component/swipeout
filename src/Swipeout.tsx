import React from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'rc-hammerjs';
import omit from 'omit.js';
import SwipeoutPropType from './PropTypes';

class Swipeout extends React.Component <SwipeoutPropType, any> {
  static defaultProps = {
    prefixCls: 'rc-swipeout',
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    onOpen() {},
    onClose() {},
  };

  openedLeft: boolean;
  openedRight: boolean;
  content: any;
  cover: any;
  left: any;
  right: any;
  btnsLeftWidth: number;
  btnsRightWidth: number;
  swiping: boolean;
  needShowLeft: boolean;
  needShowRight: boolean;

  constructor(props) {
    super(props);

    this.openedLeft = false;
    this.openedRight = false;
  }

  componentDidMount() {
    this.btnsLeftWidth = this.left ? this.left.offsetWidth : 0;
    this.btnsRightWidth = this.right ? this.right.offsetWidth : 0;
    document.body.addEventListener('touchstart', this.onCloseSwipe, true);
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchstart', this.onCloseSwipe, true);
  }

  onCloseSwipe = (ev) => {
    if (this.openedLeft || this.openedRight) {
      const pNode = (node => {
        while (node.parentNode && node.parentNode !== document.body) {
          if (node.className.indexOf(`${this.props.prefixCls}-actions`) > -1) {
            return node;
          }
          node = node.parentNode;
        }
      })(ev.target);
      if (!pNode) {
        ev.preventDefault();
        this.close();
      }
    }
  }

  onPanStart = (e) => {
    const { direction, deltaX } = e;
    // http://hammerjs.github.io/api/#directions
    const isLeft = direction === 2;
    const isRight = direction === 4;

    if (!isLeft && !isRight) {
      return;
    }
    const { left, right } = this.props;
    this.needShowRight = isLeft && right!.length > 0;
    this.needShowLeft = isRight && left!.length > 0;
    if (this.left) {
      this.left.style.visibility = this.needShowRight ? 'hidden' : 'visible';
    }
    if (this.right) {
      this.right.style.visibility = this.needShowLeft ? 'hidden' : 'visible';
    }
    if (this.needShowLeft || this.needShowRight) {
      this.swiping = true;
      this._setStyle(deltaX);
    }
  }
  onPan = (e) => {
    const { deltaX } = e;
    if (!this.swiping) {
     return;
    }
    this._setStyle(deltaX);
  }

  onPanEnd = (e) => {
    if (!this.swiping) {
      return;
    }

    const { left = [], right = [] } = this.props;
    const btnsLeftWidth = this.btnsLeftWidth;
    const btnsRightWidth = this.btnsRightWidth;

    const { direction, deltaX } = e;
    // http://hammerjs.github.io/api/#directions
    const isLeft = direction === 2;
    const isRight = direction === 4;

    const needOpenRight = this.needShowRight && Math.abs(deltaX) > btnsRightWidth / 2;
    const needOpenLeft = this.needShowLeft && Math.abs(deltaX) > btnsRightWidth / 2;

    if (needOpenRight) {
      this.open(-btnsRightWidth, false, true);
    } else if (needOpenLeft) {
      this.open(btnsLeftWidth, true, false);
    } else {
      this.close();
    }
    this.swiping = false;
    this.needShowLeft = false;
    this.needShowRight = false;
  }

  // left & right button click
  onBtnClick(ev, btn) {
    const onPress = btn.onPress;
    if (onPress) {
      onPress(ev);
    }
    if (this.props.autoClose) {
      this.close();
    }
  }

  _getContentEasing(value, limit) {
    // limit content style left when value > actions width
    const delta = Math.abs(value) - Math.abs(limit);
    const isOverflow = delta > 0;
    const factor = limit > 0 ? 1 : -1;
    if (isOverflow) {
      value = limit + Math.pow(delta, 0.85) * factor;
      return Math.abs(value) > Math.abs(limit) ? limit : value;
    }
    return value;
  }

  // set content & actions style
  _setStyle = (value) => {

    const limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth;
    const contentLeft = this._getContentEasing(value, limit);
    this.content.style.left = `${contentLeft}px`;
    if (this.cover) {
      this.cover.style.display = Math.abs(value) > 0 ? 'block' : 'none';
      this.cover.style.left = `${contentLeft}px`;
    }
  }

  open(value, openedLeft, openedRight) {
    if (!this.openedLeft && !this.openedRight && this.props.onOpen) {
      this.props.onOpen();
    }

    this.openedLeft = openedLeft;
    this.openedRight = openedRight;
    this._setStyle(value);
  }

  close() {
    if ((this.openedLeft || this.openedRight) && this.props.onClose) {
      this.props.onClose();
    }
    this._setStyle(0);
    this.openedLeft = false;
    this.openedRight = false;
  }

  renderButtons(buttons, ref) {
    const prefixCls = this.props.prefixCls;

    return (buttons && buttons.length) ? (
      <div
        className={`${prefixCls}-actions ${prefixCls}-actions-${ref}`}
        ref={(el) => this[ref] = el}
      >
        {
          buttons.map((btn, i) => (
            <div key={i}
              className={`${prefixCls}-btn ${btn.hasOwnProperty('className') ? btn.className : ''}`}
              style={btn.style}
              role="button"
              onClick={(e) => this.onBtnClick(e, btn)}
            >
              <div className={`${prefixCls}-btn-text`}>{btn.text || 'Click'}</div>
            </div>
          ))
        }
      </div>
    ) : null;
  }

  render() {
    const { prefixCls, left, right, disabled, children, ...restProps } = this.props;
    const divProps = omit(restProps, [
      'autoClose',
      'onOpen',
      'onClose',
    ]);

    const refProps = {
      ref: el => this.content = ReactDOM.findDOMNode(el),
    };

    return (left!.length || right!.length) && !disabled ? (
      <div className={`${prefixCls}`} {...divProps}>
        {/* 保证 body touchStart 后不触发 pan */}
        <div className={`${prefixCls}-cover`} ref={(el) => this.cover = el} />
        { this.renderButtons(left, 'left') }
        { this.renderButtons(right, 'right') }
        <Hammer
          direction="DIRECTION_HORIZONTAL"
          onPanStart={this.onPanStart}
          onPan={this.onPan}
          onPanEnd={this.onPanEnd}
          {...refProps}
        >
          <div className={`${prefixCls}-content`}>{children}</div>
        </Hammer>
     </div>
    ) : (
      <div {...refProps} {...divProps}>{children}</div>
    );
  }
}

export default Swipeout;
