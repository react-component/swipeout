const expect = require('expect.js');
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
require('hammer-simulator');
const Simulator = window.Simulator;
Simulator.setType('pointer');
Simulator.events.pointer.fakeSupport();
const Swipeout = require('../');

/* global Hammer */
describe('simple', () => {
  let div;

  before(() => {
    div = document.createElement('div');
    div.style.width = '320px';
    document.body.insertBefore(div, document.body.firstChild);
  });

  after(() => {
    document.body.removeChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('works when swipe', done => {
    const instance = ReactDOM.render(
      <Swipeout
        right={[
          { text: 'more' },
          { text: 'delete' },
        ]} left={[
          { text: 'read' },
          { text: 'reply' },
        ]}
      >
        swipeout demo
      </Swipeout>
      , div
    );
    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content'
    );
    const leftActionEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-actions-left'
    );
    const rightActionEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-actions-right'
    );

    const hammer = new Hammer(domEl, { recognizers: [] });
    const swipe = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_HORIZONTAL });
    hammer.add(swipe);

    Simulator.gestures.swipe(domEl, {
      deltaX: 300,
      deltaY: 5,
    }, () => {
      expect(domEl.style.left).to.be('128px');
      expect(leftActionEl.style.width).to.be('128px');
      expect(rightActionEl.style.width).to.be('0px');

      const event = document.createEvent('UIEvent');
      event.initEvent('touchstart', true, true);
      document.body.dispatchEvent(event);

      expect(domEl.style.left).to.be('0px');
      expect(leftActionEl.style.width).to.be('0px');
      expect(rightActionEl.style.width).to.be('0px');
      done();
    });
  });

  it('onOpen & onClose to be called', done => {
    let openCalled = false;
    let closeCalled = false;
    const onOpenSpy = function () {
      openCalled = true;
    };
    const onCloseSpy = function () {
      closeCalled = true;
    };
    const instance = ReactDOM.render(
      <Swipeout
        right={[
          { text: 'more' },
          { text: 'delete' },
        ]} left={[
          { text: 'read' },
          { text: 'reply' },
        ]}
        onOpen={onOpenSpy}
        onClose={onCloseSpy}
      >
        swipeout demo
      </Swipeout>
      , div
    );
    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content'
    );

    const hammer = new Hammer(domEl, { recognizers: [] });
    const swipe = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_HORIZONTAL });
    hammer.add(swipe);

    Simulator.gestures.swipe(domEl, {
      deltaX: 300,
      deltaY: 10,
    }, () => {
      expect(openCalled).to.be(true);

      const event = document.createEvent('UIEvent');
      event.initEvent('touchstart', true, true);
      document.body.dispatchEvent(event);

      expect(closeCalled).to.be(true);
      done();
    });
  });

  it('button click & autoClose', done => {
    let readCalled = false;
    const onRead = function () {
      readCalled = true;
    };
    const instance = ReactDOM.render(
      <Swipeout
        left={[
          { text: 'read', onPress: () => onRead() },
          { text: 'reply' },
        ]}
        autoClose
      >
        swipeout demo
      </Swipeout>
      , div
    );
    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content'
    );
    const BtnElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout-btn'
    );

    const hammer = new Hammer(domEl, { recognizers: [] });
    const swipe = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_HORIZONTAL });
    hammer.add(swipe);
    const press = new Hammer.Press();
    hammer.add(press);

    Simulator.gestures.swipe(domEl, {
      deltaX: 260,
      deltaY: 10,
    }, () => {
      TestUtils.Simulate.click(BtnElArr[0]);
      expect(readCalled).to.be(true);
      expect(domEl.style.left).to.be('0px');
      done();
    });
  });

  it('left=right=[] render no swipeout', done => {
    const instance = ReactDOM.render(
      <Swipeout left={[]} right={[]}>swipeout demo</Swipeout>
      , div
    );
    const domElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout'
    );
    expect(domElArr.length).to.be(0);
    done();
  });

  it('render works', done => {
    const instance = ReactDOM.render(
      <Swipeout
        right={[
          { text: 'more' },
          { text: 'delete' },
        ]} left={[
          { text: 'read' },
          { text: 'reply' },
        ]}
      >
        swipeout demo
      </Swipeout>
      , div
    );
    const domElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout'
    );
    expect(domElArr.length).to.be(1);
    const actionElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout-btn'
    );
    expect(actionElArr.length).to.be(4);
    done();
  });

  it('swipe when disabled', done => {
    const instance = ReactDOM.render(
      <Swipeout
        left={[
          { text: 'read' },
          { text: 'reply' },
        ]}
        disabled
      >
        swipeout demo
      </Swipeout>
      , div
    );
    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content'
    );
    const leftActionEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-actions-left'
    );

    const hammer = new Hammer(domEl, { recognizers: [] });
    const swipe = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_HORIZONTAL });
    hammer.add(swipe);

    Simulator.gestures.swipe(domEl, {
      deltaX: 300,
      deltaY: 10,
    }, () => {
      expect(domEl.style.left).to.be('');
      expect(leftActionEl.style.width).to.be('');
      done();
    });
  });

  it('only left', done => {
    const instance = ReactDOM.render(
      <Swipeout
        left={[
          { text: 'read' },
          { text: 'reply' },
        ]}
      >
        swipeout demo
      </Swipeout>
      , div
    );
    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content'
    );
    const leftActionEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-actions-left'
    );

    const hammer = new Hammer(domEl, { recognizers: [] });
    const swipeLeft = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_LEFT });
    hammer.add(swipeLeft);

    Simulator.gestures.swipe(domEl, {
      deltaX: -300,
      deltaY: 10,
    }, () => {
      expect(parseInt(domEl.style.left, 10)).to.be(0);

      const swipeRight = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_RIGHT });
      hammer.add(swipeRight);

      Simulator.gestures.swipe(domEl, {
        deltaX: 300,
        deltaY: 10,
      }, () => {
        expect(domEl.style.left).to.be('128px');
        expect(leftActionEl.style.width).to.be('128px');
        done();
      });
    });
  });

  it('only right', done => {
    const instance = ReactDOM.render(
      <Swipeout
        right={[
          { text: 'read' },
          { text: 'reply' },
        ]}
      >
        swipeout demo
      </Swipeout>
      , div
    );
    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content'
    );
    const rightActionEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-actions-right'
    );

    const hammer = new Hammer(domEl, { recognizers: [] });
    const swipeRight = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_RIGHT });
    hammer.add(swipeRight);

    Simulator.gestures.swipe(domEl, {
      deltaX: 300,
      deltaY: 10,
    }, () => {
      expect(parseInt(domEl.style.left, 10)).to.be(0);

      const swipeLeft = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_LEFT });
      hammer.add(swipeLeft);

      Simulator.gestures.swipe(domEl, {
        deltaX: -300,
        deltaY: 10,
      }, () => {
        expect(domEl.style.left).to.be('-128px');
        expect(rightActionEl.style.width).to.be('128px');
        done();
      });
    });
  });
});
