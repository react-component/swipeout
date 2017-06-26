import React from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'rc-hammerjs';
import omit from 'object.omit';
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
  contentWidth: number;
  btnsLeftWidth: number;
  btnsRightWidth: number;
  panStartX: number;

  constructor(props) {
    super(props);

    this.onPanStart = this.onPanStart.bind(this);
    this.onPan = this.onPan.bind(this);
    this.onPanEnd = this.onPanEnd.bind(this);
    this.onCloseSwipe = this.onCloseSwipe.bind(this);

    this.openedLeft = false;
    this.openedRight = false;
  }

  componentDidMount() {
    const { left = [], right = [] } = this.props;
    const width = this.content.offsetWidth;

    if (this.cover) {
      this.cover.style.width = `${width}px`;
    }

    this.contentWidth = width;
    this.btnsLeftWidth = (width / 5) * left.length;
    this.btnsRightWidth = (width / 5) * right.length;

    document.body.addEventListener('touchstart', this.onCloseSwipe, true);
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchstart', this.onCloseSwipe, true);
  }

  onCloseSwipe(ev) {
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

  onPanStart(e) {
    if (this.props.disabled) {
      return;
    }
    this.panStartX = e.deltaX;
  }

  onPan(e) {
    if (this.props.disabled) {
      return;
    }
    const { left = [], right = []} = this.props;
    const posX = e.deltaX - this.panStartX;
    if (posX < 0 && right.length) {
      this._setStyle(Math.min(posX, 0));
    } else if (posX > 0 && left.length) {
      this._setStyle(Math.max(posX, 0));
    }
  }

  onPanEnd(e) {
    if (this.props.disabled) {
      return;
    }

    const { left = [], right = [] } = this.props;
    const posX = e.deltaX - this.panStartX;
    const contentWidth = this.contentWidth;
    const btnsLeftWidth = this.btnsLeftWidth;
    const btnsRightWidth = this.btnsRightWidth;
    const openX = contentWidth * 0.33;
    const openLeft = posX > openX || posX > btnsLeftWidth / 2;
    const openRight = posX < -openX || posX < -btnsRightWidth / 2;

    if (openRight && posX < 0 && right.length) {
      this.open(-btnsRightWidth, false, true);
    } else if (openLeft && posX > 0 && left.length) {
      this.open(btnsLeftWidth, true, false);
    } else {
      this.close();
    }
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
    if (value < 0 && value < limit) {
      return limit - Math.pow(limit - value, 0.85);
    } else if (value > 0 && value > limit) {
      return limit + Math.pow(value - limit, 0.85);
    }
    return value;
  }

  // set content & actions style
  _setStyle(value) {
    const { left = [], right = [] } = this.props;
    const limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth;
    const contentLeft = this._getContentEasing(value, limit);
    this.content.style.left = `${contentLeft}px`;
    if (this.cover) {
      this.cover.style.display = Math.abs(value) > 0 ? 'block' : 'none';
      this.cover.style.left = `${contentLeft}px`;
    }
    if (left.length) {
      const leftWidth = Math.max(Math.min(value, Math.abs(limit)), 0);
      this.left.style.width = `${leftWidth}px`;
    }
    if (right.length) {
      const rightWidth = Math.max(Math.min(-value, Math.abs(limit)), 0);
      this.right.style.width = `${rightWidth}px`;
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
        ref={(el) => this[ref] = ReactDOM.findDOMNode(el)}
      >
        {
          buttons.map((btn, i) => (
            <div key={i}
              className={`${prefixCls}-btn ${btn.hasOwnProperty('className') ? btn.className : ''}`}
              style={btn.style}
              role="button"
              onClick={(e) => this.onBtnClick(e, btn)}
            >
              <div className={`${prefixCls}-text`}>{btn.text || 'Click'}</div>
            </div>
          ))
        }
      </div>
    ) : null;
  }

  render() {
    const { prefixCls, left = [], right = [], children, ...restProps } = this.props;
    const divProps = omit(restProps, [
      'disabled',
      'autoClose',
      'onOpen',
      'onClose',
    ]);

    const refProps = {
      ref: el => this.content = ReactDOM.findDOMNode(el),
    };
    return (left.length || right.length) ? (
      <div className={`${prefixCls}`} {...divProps}>
        {/* 保证 body touchStart 后不触发 pan */}
        <div className={`${prefixCls}-cover`} ref={(el) => this.cover = ReactDOM.findDOMNode(el)} />
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
