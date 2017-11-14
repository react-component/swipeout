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
export const title = 'Right';
