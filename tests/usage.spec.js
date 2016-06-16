const expect = require('expect.js');
const React = require('react');
const ReactDOM = require('react-dom');
// const TestUtils = require('react-addons-test-utils');
// const Simulate = TestUtils.Simulate;

const Swipeout = require('../');

describe('simple', () => {
  let instance;
  let div;
  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it('render to body works', () => {
    instance = ReactDOM.render(
      <Swipeout />,
      div);
    expect(ReactDOM.findDOMNode(instance).
    parentNode.parentNode.nodeName.toLowerCase()).to.be('body');
  });
});
