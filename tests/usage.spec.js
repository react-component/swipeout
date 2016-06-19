const expect = require('expect.js');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const sinon = require('sinon');
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

    // TODO async to sync, add swipeLeft tests

    Simulator.gestures.swipe(domEl, {
      deltaX: 300,
      deltaY: 5,
    }, () => {
      expect(domEl.style.left).to.be('128px');
      expect(leftActionEl.style.width).to.be('128px');
      expect(rightActionEl.style.width).to.be('0px');

      const tap = new Hammer.Tap({ threshold: 2 });
      hammer.add(tap);

      Simulator.gestures.tap(domEl, {
        pos: [200, 10],
      }, () => {
        expect(domEl.style.left).to.be('0px');
        expect(leftActionEl.style.width).to.be('0px');
        expect(rightActionEl.style.width).to.be('0px');
        done();
      });
    });
  });

  it('onOpen & onClose to be called', done => {
    const onOpenSpy = sinon.spy();
    const onCloseSpy = sinon.spy();
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

    const tap = new Hammer.Tap({ threshold: 2 });
    hammer.add(tap);

    Simulator.gestures.swipe(domEl, {
      deltaX: 300,
      deltaY: 10,
    }, () => {
      expect(onOpenSpy.called).to.be(true);
      Simulator.gestures.tap(domEl, {
        pos: [200, 10],
      }, () => {
        expect(onCloseSpy.called).to.be(true);
        done();
      });
    });
  });

  it('button click & autoClose', done => {
    const onRead = sinon.spy();
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
      expect(onRead.called).to.be(true);
      expect(domEl.style.left).to.be('0px');
      done();
    });
  });
});
