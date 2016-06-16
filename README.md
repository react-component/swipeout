# rc-swipeout
---

iOS-style swipeout buttons that appear from behind a component

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

[npm-image]: http://img.shields.io/npm/v/rc-swipeout.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-swipeout
[travis-image]: https://img.shields.io/travis/react-component/rc-swipeout.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/rc-swipeout

## Screenshots

![rc-swipeout](https://zos.alipayobjects.com/rmsportal/dqxQTtxrKrGMVEc.gif)

## Installation

`npm install --save rc-swipeout`

## Development

```
npm install
npm start
```

## Example

- local: http://localhost:8000/examples/
- online: http://react-component.github.io/rc-swipeout/

## Usage

```js
import Swipeout from 'rc-swipeout';

<Swipeout 
  left={[
    {
      text: 'reply',
      onPress:() => console.log('reply'),
      style: { backgroundColor: 'orange', color: 'white' }
    }
  ]} 
  right=[{
    {
      text: 'delete',
      onPress:() => console.log('delete'),
      style: { backgroundColor: 'red', color: 'white' }
    }
  }] 
  onOpen={() => console.log('open')}
  onClose={() => console.log('close')}
>
  <div style={{height: 44}}> swipeout demo </div>
</Swipeout>

```

## API

### props

| 属性        | 说明                   | 类型   | 默认值     |
|-------------|------------------------|--------|------------|
| prefixCls       | className prefix     | String | `rc-swipeout` |
| style       | swipeout style      | Object | `` |
| left       | swipeout buttons on left      | Array | `null` |
| right       | swipeout buttons on right      | Array | `null` |
| autoClose       | auto close on button press   | Boolean | `function() {}` |
| onOpen       |       | Function | `function() {}` |
| onClose       |       | Function | `function() {}` |
| disabled       |   disabled swipeout    | Boolean | `false` |

### button props

| 属性        | 说明                   | 类型   | 默认值     |
|-------------|------------------------|--------|------------|
| text       | button text     | String | `Click` |
| style       | button style     | Object | `` |
| onPress       | button press function      | Function | `function() {}` |

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

react-swipeout is released under the MIT license.
