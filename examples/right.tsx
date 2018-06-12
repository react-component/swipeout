/* eslint-disable no-console */
/* tslint:disable:no-console */
import '../assets/index.less';
import Swipeout from '../src/';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div style={{ marginBottom: 12 }}>
    <Swipeout
      style={{ backgroundColor: 'white' }}
      autoClose
      right={[
        { text: 'more',
          onPress: () => console.log('more'),
          style: { backgroundColor: 'orange', color: 'white' },
        },
        { text: 'delete',
          onPress: () => console.log('delete'),
          style: { backgroundColor: 'red', color: 'white' },
        },
      ]}
      onOpen={() => console.log('open')}
      onClose={() => console.log('close')}
    >
      <div onClick={() => {
        console.log('emit an event on children element!');
      }} style={{
        height: 44,
        backgroundColor: 'white',
        lineHeight: '44px',
        borderTop: '1px solid #dedede',
        borderBottom: '1px solid #dedede',
      }}
      >swipe out simple demo</div>
    </Swipeout>
  </div>,
  document.getElementById('__react-content'),
);
