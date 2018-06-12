webpackJsonp([2],{

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(64);


/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src___ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);




/* eslint-disable no-console */
/* tslint:disable:no-console */





var SwipeoutExample = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(SwipeoutExample, _React$Component);

    function SwipeoutExample() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, SwipeoutExample);

        var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SwipeoutExample.__proto__ || Object.getPrototypeOf(SwipeoutExample)).apply(this, arguments));

        _this.state = {
            items: ['00', '01', '02', '03', '04', '05']
        };
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(SwipeoutExample, [{
        key: 'onDelete',
        value: function onDelete(value) {
            var tempArr = this.state.items;
            this.setState({
                items: tempArr.filter(function (v) {
                    return v !== value;
                })
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                'div',
                null,
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                    'p',
                    { style: { padding: '16px 30px' } },
                    '\u591A\u4E2A\u5B9E\u4F8B\uFF1A'
                ),
                this.state.items.map(function (item, i) {
                    return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__src___["a" /* default */],
                        { autoClose: true, key: i, right: [{
                                text: '\u5220\u9664' + item,
                                onPress: function onPress() {
                                    return _this2.onDelete(item);
                                },
                                style: { backgroundColor: '#F4333C', color: 'white', width: 80 }
                            }] },
                        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
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
    }]);

    return SwipeoutExample;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(SwipeoutExample, null), document.getElementById('__react-content'));

/***/ })

},[123]);
//# sourceMappingURL=mutiple.js.map