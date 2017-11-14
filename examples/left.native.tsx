/* eslint-disable no-console */
/* tslint:disable:no-console */
import { View, Text } from 'react-native';
import Swipeout from '../src/';
import React from 'react';

const SwipeoutExample = () => (
  <View style={{ marginTop: 40 }}>
    <Swipeout
      style={{ backgroundColor: '#c1c1c1' }}
      autoClose
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
      <Text style={{
        height: 44,
        backgroundColor: '#c1c1c1',
        lineHeight: 30,
      }}
      >this is Demo</Text>
    </Swipeout>
  </View>
);

export const Demo = SwipeoutExample;
export const title = 'Left';
