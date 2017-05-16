/* eslint-disable no-console */
import { View, Text, AppRegistry } from 'react-native';
import Swipeout from '../src';
import React from 'react';

class SwipeoutExample extends React.Component {
  render() {
    return (
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
  }
}

AppRegistry.registerComponent('swipeout', () => SwipeoutExample);
