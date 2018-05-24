/* eslint-disable no-console */
/* tslint:disable:no-console */
import '../assets/index.less';
import Swipeout from '../src/';
import React from 'react';
import ReactDOM from 'react-dom';

class SwipeoutExample extends React.Component<any, any> {
  state = {
    items: ['00', '01', '02', '03', '04', '05'],
  };
  onDelete(value) {
    const tempArr = this.state.items;
    this.setState({
      items: tempArr.filter(v => v !== value),
    });
  }
  render() {
    return (
      <div>
        <p style={{ padding: '16px 30px' }}>多个实例：</p>
        {this.state.items.map((item, i) => <Swipeout
          autoClose
          key={i}
          right={[
            {
              text: `删除${item}`,
              onPress: () => this.onDelete(item),
              style: { backgroundColor: '#F4333C', color: 'white', width: 80 },
            },
          ]}
        >
          <div style={{ padding: '16px 30px', borderBottom: '1px solid #ccc' }} onClick={() => {
            console.log(`pressed item ${item}`);
          }}
          >
            item {item}
          </div>
        </Swipeout>,
      )}
      </div>
    );
  }
}

ReactDOM.render(<SwipeoutExample />,
  document.getElementById('__react-content'),
);
