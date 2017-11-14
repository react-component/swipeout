/* eslint-disable no-console */
/* tslint:disable:no-console */
import { View, Text } from 'react-native';
import Swipeout from '../src/index.native';
import React from 'react';

const SwipeoutExample = () => (
  <View style={{ marginTop: 40 }}>
    <Swipeout
      style={{ backgroundColor: '#c1c1c1' }}
      autoClose
      right={[
        {
          text: <Text style={{color: 'blue'}}>more</Text>,
          onPress: () => console.log('more'),
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
          text: 'reply',
          onPress: () => console.log('reply'),
          style: { backgroundColor: 'green', color: 'white' },
        },
      ]}
      onOpen={() => console.log('open')}
      onClose={() => console.log('close')}
    >
      <Text
        style={{
          height: 44,
          backgroundColor: '#c1c1c1',
          lineHeight: 30,
        }}
        onPress={() => {
          console.log('onPress children');
        }}
      >this is Demo</Text>
    </Swipeout>
  </View>
);

export const Demo = SwipeoutExample;
export const title = 'Simple';
