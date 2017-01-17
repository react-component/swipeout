webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(184);


/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _rcSwipeout = __webpack_require__(3);
	
	var _rcSwipeout2 = _interopRequireDefault(_rcSwipeout);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SwipeoutExample = _react2.default.createClass({
	  displayName: 'SwipeoutExample',
	  getInitialState: function getInitialState() {
	    return {
	      items: ['00', '01', '02', '03', '04', '05']
	    };
	  },
	  onDelete: function onDelete(value) {
	    var tempArr = this.state.items;
	    this.setState({
	      items: tempArr.filter(function (v) {
	        return v !== value;
	      })
	    });
	  },
	  render: function render() {
	    var _this = this;
	
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'p',
	        { style: { padding: '16px 30px' } },
	        '多个实例：'
	      ),
	      this.state.items.map(function (item, i) {
	        return _react2.default.createElement(
	          _rcSwipeout2.default,
	          {
	            autoClose: true,
	            key: i,
	            right: [{
	              text: '删除' + item,
	              onPress: function onPress() {
	                return _this.onDelete(item);
	              },
	              style: { backgroundColor: '#F4333C', color: 'white' }
	            }]
	          },
	          _react2.default.createElement(
	            'div',
	            { style: { padding: '16px 30px', borderBottom: '1px solid #ccc' }, onClick: function onClick() {
	                console.log('pressed item ' + item);
	              }
	            },
	            'item ',
	            item
	          )
	        );
	      })
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(SwipeoutExample, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=mutiple.js.map