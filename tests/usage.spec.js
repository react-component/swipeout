const expect = require('expect.js');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Simulate = TestUtils.Simulate;

const Swipeout = require('../');

describe('simple', () => {
  let div;

  before(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  after(() => {
    document.body.removeChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });


  it('left=right=[] render no swipeout', () => {
    const instance = ReactDOM.render(
      <Swipeout left={[]} right={[]}>swipeout demo</Swipeout>
      , div
    );
    const domElArr = TestUtils.scryRenderedDOMComponentsWithClass(
      instance, 'rc-swipeout'
    );
    expect(domElArr.length).to.be(0);
  });

  it('render works', () => {
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
  });

  it('works when swipe', () => {
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
      instance, 'rc-swipeout'
    );

    Simulate.mouseDown(domEl);
  });
});
