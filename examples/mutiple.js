webpackJsonp([2],{

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_swipeout_assets_index_less__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_swipeout_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rc_swipeout_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rc_swipeout__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom__);
/* eslint-disable no-console */
/* tslint:disable:no-console */




var SwipeoutExample = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createClass({
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

        return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'p',
                { style: { padding: '16px 30px' } },
                '\u591A\u4E2A\u5B9E\u4F8B\uFF1A'
            ),
            this.state.items.map(function (item, i) {
                return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_1_rc_swipeout__["a" /* default */],
                    { autoClose: true, key: i, right: [{
                            text: '\u5220\u9664' + item,
                            onPress: function onPress() {
                                return _this.onDelete(item);
                            },
                            style: { backgroundColor: '#F4333C', color: 'white', width: 80 }
                        }] },
                    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                        'div',
                        { style: { padding: '16px 30px', borderBottom: '1px solid #ccc' }, onClick: function onClick() {
                                console.log('pressed item ' + item);
                            } },
                        'item ',
                        item
                    )
                );
            })
        );
    }
});
__WEBPACK_IMPORTED_MODULE_3_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(SwipeoutExample, null), document.getElementById('__react-content'));

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(134);


/***/ })

},[285]);
//# sourceMappingURL=mutiple.js.map