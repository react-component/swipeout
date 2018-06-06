/* eslint-disable no-console */
/* tslint:disable:no-console */
import 'rc-swipeout/assets/index.less';
import Swipeout from '../src/';
import React from 'react';
import ReactDOM from 'react-dom';

const SwipeDemo = () => (
  <Swipeout
    style={{ backgroundColor: 'white' }}
    autoClose
    right={[
      {
        text: <span style={{ color: 'yellow'}}>more more</span>,
        onPress: () => console.log('more more'),
        style: { backgroundColor: 'orange', color: 'white' },
      },
      { text: 'delete',
        onPress: () => console.log('delete'),
        style: { backgroundColor: 'red', color: 'white' },
      },
    ]}
    left={[
      {
        text: 'read',
        onPress: () => console.log('read'),
        style: { backgroundColor: 'blue', color: 'white' },
      },
      {
        text: 'reply me',
        onPress: () => console.log('reply me'),
        style: { backgroundColor: 'green', color: 'white' },
      },
      {
        text: 'reply other people',
        onPress: () => console.log('reply other people'),
        style: { backgroundColor: 'gray', color: 'white' },
      },
    ]}
    onOpen={() => console.log('open')}
    onClose={() => console.log('close')}
  >
    <div style={{
      height: 44,
      backgroundColor: 'white',
      lineHeight: '44px',
      borderTop: '1px solid #dedede',
      borderBottom: '1px solid #dedede',
    }}
    >swipe out simple demo
    </div>
  </Swipeout>
);

ReactDOM.render(
  <div style={{ marginBottom: 12 }}>
    <div>Basic</div>
    <SwipeDemo/>
    <div style={{height: 20}}></div>
    <div>Test scroll</div>
    <div style={{margin: 20, overflow: 'scroll', height: 500}}>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
      <SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/><SwipeDemo/>
    </div>
  </div>,
  document.getElementById('__react-content'),
);
