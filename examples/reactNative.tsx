import { Text, AppRegistry } from 'react-native';
import Swipeout from '../src';
import * as React from 'react';

class SwipeoutExample extends React.Component {
  render() {
    return (
      <Swipeout
        style={{ backgroundColor: 'white' }}
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
        <Text>this is Demo</Text>
      </Swipeout>
    );
  }
}

AppRegistry.registerComponent('kitchen-sink', () => SwipeoutExample);
