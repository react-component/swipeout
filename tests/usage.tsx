import expect from 'expect.js';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
const Simulator = (window as any).Simulator;
import Swipeout from '../src/index';

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
          { text: 'more', style: { width: 60 }},
          { text: 'delete', style: { width: 60 } },
        ]} left={[
          { text: 'read', style: { width: 80 } },
          { text: 'reply', style: { width: 60 } },
        ]}
      >
        swipeout demo
      </Swipeout>
      , div,
    );
    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content',
    );

    const rightActionEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-actions-right',
    );

    instance.onPanStart({
      direction: 4,
      moveStatus: {
        x: 10,
      },
    });
    instance.onPanMove({
      direction: 4,
      moveStatus: {
        x: 100,
      },
    });
    instance.onPanEnd({
      direction: 4,
      moveStatus: {
        x: 300,
      },
    });
    expect(domEl.style.transform).to.be('translate3d(140px, 0px, 0px)');
    expect(rightActionEl.offsetWidth).to.be(120);

    const event = document.createEvent('UIEvent');
    event.initEvent('touchstart', true, true);
    document.body.dispatchEvent(event);

    expect(domEl.style.transform).to.be('translate3d(0px, 0px, 0px)');
    done();
  });

  it('onOpen & onClose to be called', done => {
    let openCalled = false;
    let closeCalled = false;
    const onOpenSpy = () => {
      openCalled = true;
    };
    const onCloseSpy = () => {
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
      , div,
    );
    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content',
    );

    instance.onPanStart({
      direction: 4,
      moveStatus: {
        x: 10,
      },
    });
    instance.onPanMove({
      direction: 4,
      moveStatus: {
        x: 100,
      },
    });
    instance.onPanEnd({
      direction: 4,
      moveStatus: {
        x: 300,
      },
    });
    expect(openCalled).to.be(true);

    const event = document.createEvent('UIEvent');
    event.initEvent('touchstart', true, true);
    document.body.dispatchEvent(event);

    expect(closeCalled).to.be(true);
    done();
  });

  it('button click & autoClose', done => {
    let readCalled = false;
    const onRead = () => {
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
      , div,
    );
    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content',
    );
    const BtnElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout-btn',
    );

    instance.onPanStart({
      direction: 4,
      moveStatus: {
        x: 10,
      },
    });
    instance.onPanMove({
      direction: 4,
      moveStatus: {
        x: 100,
      },
    });
    instance.onPanEnd({
      direction: 4,
      moveStatus: {
        x: 300,
      },
    });
    TestUtils.Simulate.click(BtnElArr[0]);
    expect(readCalled).to.be(true);
    expect(domEl.style.transform).to.be('translate3d(0px, 0px, 0px)');
    done();
  });

  it('left=right=[] render no swipeout', done => {
    const instance = ReactDOM.render(
      <Swipeout left={[]} right={[]}>swipeout demo</Swipeout>
      , div,
    );
    const domElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout',
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
      , div,
    );
    const domElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout',
    );
    expect(domElArr.length).to.be(1);
    const actionElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout-btn',
    );
    expect(actionElArr.length).to.be(4);
    done();
  });

  it('swipe when disabled', () => {
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
      , div,
    );
    const domElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout-content',
    );

    expect(domElArr.length).to.be(0);
  });

  it('only one side', done => {
    const instance = ReactDOM.render(
      <Swipeout
        left={[
          { text: 'read', style: { width: 60 } },
          { text: 'reply', style: { width: 80 } },
        ]}
      >
        swipeout demo
      </Swipeout>
      , div,
    );

    const domEl = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'rc-swipeout-content',
    );
    expect(domEl.style.transform).to.be(undefined);
    instance.onPanStart({
      direction: 4,
      moveStatus: {
        x: 10,
      },
    });
    instance.onPanMove({
      direction: 2,
      moveStatus: {
        x: 100,
      },
    });
    instance.onPanEnd({
      direction: 2,
      moveStatus: {
        x: 300,
      },
    });
    expect(domEl.style.transform).to.be('translate3d(140px, 0px, 0px)');
    done();
  });

  // don't know why not render, comment temporarily
  // it('only right', done => {
  //   const instance = ReactDOM.render(
  //     <Swipeout
  //       right={[
  //         { text: 'read' },
  //         { text: 'reply' },
  //       ]}
  //     >
  //       swipeout demo
  //     </Swipeout>,
  //     div,
  //   );
  //   const domEl = TestUtils.findRenderedDOMComponentWithClass(
  //     instance, 'rc-swipeout-content',
  //   );
  //   const rightActionEl = TestUtils.findRenderedDOMComponentWithClass(
  //     instance, 'rc-swipeout-actions-right',
  //   );
  //
  //   const hammer = new Hammer(domEl, { recognizers: [] });
  //   const swipeRight = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_RIGHT });
  //   hammer.add(swipeRight);
  //
  //   Simulator.gestures.swipe(domEl, {
  //     deltaX: 300,
  //     deltaY: 10,
  //   }, () => {
  //     expect(parseInt(domEl.style.left, 10)).to.be(0);
  //
  //     // const swipeLeft = new Hammer.Swipe({ threshold: 1, direction: Hammer.DIRECTION_LEFT });
  //     // hammer.add(swipeLeft);
  //     //
  //     // Simulator.gestures.swipe(domEl, {
  //     //   deltaX: -300,
  //     //   deltaY: 10,
  //     // }, () => {
  //     //   expect(domEl.style.left).to.be('-128px');
  //     //   expect(rightActionEl.style.width).to.be('128px');
  //       done();
  //     // });
  //   });
  // });
});
