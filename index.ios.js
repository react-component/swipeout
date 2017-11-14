import getList from 'react-native-index-page';

getList({
  demos: [
    // require('./_ts2js/examples/left'),
    // require('./_ts2js/examples/right'),
    require('./_ts2js/examples/simple'),
  ],
  title: require('./package.json').name,
});
