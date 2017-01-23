# rc-swipeout
---

iOS-style swipeout buttons that appear from behind a component (web & react-native support)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

[npm-image]: http://img.shields.io/npm/v/rc-swipeout.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-swipeout
[travis-image]: https://img.shields.io/travis/react-component/swipeout.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/swipeout
[coveralls-image]: https://img.shields.io/coveralls/react-component/swipeout.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/swipeout?branch=master

## Screenshots

![rc-swipeout](https://zos.alipayobjects.com/rmsportal/dqxQTtxrKrGMVEc.gif)

## Installation

`npm install --save rc-swipeout`

## Development

```
web: 
npm install
npm start

rn:
tnpm run rn-start
```

## Example

- local: http://localhost:8000/examples/
- online: http://react-component.github.io/swipeout/

## Normal usage

```js
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.less';

<Swipeout
  left={[
    {
      text: 'reply',
      onPress:() => console.log('reply'),
      style: { backgroundColor: 'orange', color: 'white' }
    }
  ]}
  right={[
    {
      text: 'delete',
      onPress:() => console.log('delete'),
      style: { backgroundColor: 'red', color: 'white' }
    }
  ]}
  onOpen={() => console.log('open')}
  onClose={() => console.log('close')}
>
  <div style={{height: 44}}> swipeout demo </div>
</Swipeout>

```

## Usage with text and Icon [React Native only for the moment]

```js
import Swipeout from 'rc-swipeout/lib';
import 'rc-swipeout/assets/index.less';

<Swipeout
  left={[
    {
      text: 'reply',
      onPress:() => console.log('reply'),
      style: { backgroundColor: 'orange', color: 'white' },
      icon: {
        name: 'clock-o',
        size: 30
      }
    }
  ]}
  right={[
    {
      text: 'delete',
      onPress:() => console.log('delete'),
      style: { backgroundColor: 'red', color: 'white' }
    }
  ]}
  onOpen={() => console.log('open')}
  onClose={() => console.log('close')}
>
  <div style={{height: 44}}> swipeout demo </div>
</Swipeout>

```

For the React Native version, use the following import statement.

```js
import Swipeout from 'rc-swipeout/lib'
```

## API

### props

| name        | description                   | type   | default    |
|-------------|------------------------|--------|------------|
| prefixCls       | className prefix     | String | `rc-swipeout` |
| style       | swipeout style      | Object | `` |
| left       | swipeout buttons on left      | Array | `[]` |
| right       | swipeout buttons on right      | Array | `[]` |
| autoClose       | auto close on button press   | Boolean | `function() {}` |
| onOpen       |       | Function | `function() {}` |
| onClose       |       | Function | `function() {}` |
| disabled       |   disabled swipeout    | Boolean | `false` |

### button props

| name        | description                   | type   | default    |
|-------------|------------------------|--------|------------|
| text       | button text     | String | `Click` |
| icon       | icon props      | Object | undefined |
| style       | button style     | Object | `` |
| onPress       | button press function      | Function | `function() {}` |

### icon props [React Native only for the moment]

| name        | description                   | type   | default    |
|-------------|------------------------|--------|------------|
| name       | font-awesome name without `fa fa-`     | String | undefined |
| color       | icon props      | String | `black` |
| style       | icon style     | Object | `` |
| size       | icon size     | number | 15 |

### Pay attention
This package depends on the beautiful [Vector Icons for React Native](https://github.com/oblador/react-native-vector-icons).

After installing NavbarNative, in order to have **icons working**, please follow instructions about [HOW TO INSTALL AND LINK VECTOR ICONS](https://github.com/oblador/react-native-vector-icons) in your project.

## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

rc-swipeout is released under the MIT license.
