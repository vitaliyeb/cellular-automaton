/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dev/main.js":
/*!*********************!*\
  !*** ./dev/main.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CellAutomatic_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CellAutomatic.ts */ \"./dev/CellAutomatic.ts\");\n/* harmony import */ var _style_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.styl */ \"./dev/style.styl\");\n\r\n\n\n//# sourceURL=webpack://caill-automatic/./dev/main.js?");

/***/ }),

/***/ "./dev/CellAutomatic.ts":
/*!******************************!*\
  !*** ./dev/CellAutomatic.ts ***!
  \******************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _parametrs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parametrs */ \"./dev/parametrs.ts\");\n/* harmony import */ var _drawMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawMap */ \"./dev/drawMap.ts\");\n\r\n\r\nvar CellAutomatic = /** @class */ (function () {\r\n    function CellAutomatic() {\r\n        var _this = this;\r\n        this.cnv = document.getElementById('canvas');\r\n        this.ctx = this.cnv.getContext('2d');\r\n        this.changeCeillTimerId = undefined;\r\n        this.w = 0;\r\n        this.h = 0;\r\n        this.parametrs = new _parametrs__WEBPACK_IMPORTED_MODULE_0__.Parametrs();\r\n        this.drawApi = new _drawMap__WEBPACK_IMPORTED_MODULE_1__.default(this.ctx);\r\n        window.addEventListener('resize', function () { return _this.setSize(); });\r\n    }\r\n    CellAutomatic.prototype.drawTick = function () {\r\n        this.changeCellType();\r\n        this.calculationTable();\r\n        this.drawApi.drawCellMap(this.parametrs.table, this.parametrs.cellSize);\r\n    };\r\n    CellAutomatic.prototype.start = function () {\r\n        var _this = this;\r\n        if (this.changeCeillTimerId)\r\n            return;\r\n        this.changeCeillTimerId = setTimeout(function () {\r\n            _this.drawTick();\r\n            _this.changeCeillTimerId = undefined;\r\n            _this.start();\r\n        }, this.parametrs.interval);\r\n    };\r\n    CellAutomatic.prototype.pause = function () {\r\n        clearTimeout(this.changeCeillTimerId);\r\n        this.changeCeillTimerId = undefined;\r\n    };\r\n    CellAutomatic.prototype.stop = function () {\r\n        this.pause();\r\n        var table = this.parametrs.table;\r\n        this.parametrs.resetTable();\r\n        this.drawApi.drawCellMap(this.parametrs.table, this.parametrs.cellSize);\r\n    };\r\n    CellAutomatic.prototype.initEventsPanel = function () {\r\n        var _this = this;\r\n        document.querySelector('.panel').addEventListener('click', function (e) {\r\n            var methodName = e.target.getAttribute(\"data-method\");\r\n            if (methodName)\r\n                return _this[methodName](e);\r\n        });\r\n        this.cnv.addEventListener('click', function (e) {\r\n            var x = e.offsetX, y = e.offsetY, cellSize = _this.parametrs.cellSize, currentColEl = Math.ceil(x / cellSize) - 1, currentRowEl = Math.ceil(y / cellSize) - 1;\r\n            _this.parametrs.toggleTypeCell(currentRowEl, currentColEl);\r\n            _this.calculationTable();\r\n            _this.drawApi.drawCellMap(_this.parametrs.table, _this.parametrs.cellSize);\r\n        });\r\n    };\r\n    CellAutomatic.prototype.calculationTable = function () {\r\n        var table = this.parametrs.table, allRegulation = this.parametrs.regulation, сonsideredNeighbors = this.parametrs.сonsideredNeighbors, rosibleRules = сonsideredNeighbors.map(function (el, index) { return allRegulation[index]; });\r\n        var _loop_1 = function (row) {\r\n            var _loop_2 = function (col) {\r\n                var cell = table[row][col];\r\n                cell.score = 0;\r\n                rosibleRules.forEach(function (f) { return f(row, col) ? ++cell.score : false; });\r\n            };\r\n            for (var col = 0; col < table[row].length; col++) {\r\n                _loop_2(col);\r\n            }\r\n        };\r\n        for (var row = 0; row < table.length; row++) {\r\n            _loop_1(row);\r\n        }\r\n    };\r\n    CellAutomatic.prototype.changeCellType = function () {\r\n        var table = this.parametrs.table;\r\n        for (var row = 0; row < table.length; row++) {\r\n            for (var col = 0; col < table[row].length; col++) {\r\n                var cell = table[row][col];\r\n                var newType = this.parametrs.changeTypeCellFunc(cell.score, cell.type);\r\n                cell.type = newType;\r\n            }\r\n        }\r\n    };\r\n    CellAutomatic.prototype.setSize = function () {\r\n        var cellSize = this.parametrs.cellSize, w = Math.floor(document.documentElement.clientWidth / cellSize) * cellSize, h = Math.floor(document.documentElement.clientHeight / cellSize) * cellSize;\r\n        this.cnv.width = this.w = w;\r\n        this.cnv.height = this.h = h;\r\n    };\r\n    CellAutomatic.prototype.openClosePanel = function (e) {\r\n        document.querySelector('.panel').classList.toggle('panel_active');\r\n    };\r\n    CellAutomatic.prototype.init = function () {\r\n        this.setSize();\r\n        this.parametrs.createTable(this.w, this.h);\r\n        this.drawTick();\r\n        this.initEventsPanel();\r\n    };\r\n    CellAutomatic.prototype.setSelectCeill = function () {\r\n        console.log('asd');\r\n    };\r\n    return CellAutomatic;\r\n}());\r\nwindow.onload = function () {\r\n    var cellAutomatic = new CellAutomatic();\r\n    cellAutomatic.init();\r\n    console.log(cellAutomatic);\r\n};\r\n\n\n//# sourceURL=webpack://caill-automatic/./dev/CellAutomatic.ts?");

/***/ }),

/***/ "./dev/drawMap.ts":
/*!************************!*\
  !*** ./dev/drawMap.ts ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nvar DrawMap = /** @class */ (function () {\r\n    function DrawMap(ctx) {\r\n        this.ctx = ctx;\r\n    }\r\n    DrawMap.prototype.drawCellMap = function (table, cellSize) {\r\n        var ctx = this.ctx;\r\n        for (var i = 0; i < table.length; i++) {\r\n            for (var j = 0; j < table[i].length; j++) {\r\n                var item = table[i][j], x = cellSize * j, y = cellSize * i;\r\n                ctx.beginPath();\r\n                ctx.fillStyle = item.type ? '#000' : '#fff';\r\n                ctx.strokeStyle = 'green';\r\n                ctx.fillRect(x, y, cellSize, cellSize);\r\n                ctx.strokeRect(x, y, cellSize, cellSize);\r\n                ctx.font = '17px serif';\r\n                ctx.textBaseline = 'middle';\r\n                ctx.textAlign = 'center';\r\n                ctx.fillStyle = 'red';\r\n                ctx.fillText(item.score, x + cellSize / 2, y + cellSize / 2, cellSize);\r\n            }\r\n        }\r\n    };\r\n    return DrawMap;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawMap);\r\n\n\n//# sourceURL=webpack://caill-automatic/./dev/drawMap.ts?");

/***/ }),

/***/ "./dev/parametrs.ts":
/*!**************************!*\
  !*** ./dev/parametrs.ts ***!
  \**************************/
/*! namespace exports */
/*! export Cell [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Parametrs [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cell\": () => /* binding */ Cell,\n/* harmony export */   \"Parametrs\": () => /* binding */ Parametrs\n/* harmony export */ });\nvar Cell = /** @class */ (function () {\r\n    function Cell(type, score) {\r\n        this.type = type;\r\n        this.score = score;\r\n    }\r\n    return Cell;\r\n}());\r\nvar Parametrs = /** @class */ (function () {\r\n    function Parametrs() {\r\n        var _this = this;\r\n        this.cellSize = 40;\r\n        this.interval = 200;\r\n        this.table = undefined;\r\n        this.continuationlive = [2, 3];\r\n        this.birth = [3];\r\n        this.сonsideredNeighbors = [0, 1, 2, 3, 4, 5, 6, 7];\r\n        this.regulation = [\r\n            function (row, col) { var _a, _b; return ((_b = (_a = _this.table[row - 1]) === null || _a === void 0 ? void 0 : _a[col - 1]) === null || _b === void 0 ? void 0 : _b['type']) === 1; },\r\n            function (row, col) { var _a, _b; return ((_b = (_a = _this.table[row - 1]) === null || _a === void 0 ? void 0 : _a[col]) === null || _b === void 0 ? void 0 : _b['type']) === 1; },\r\n            function (row, col) { var _a, _b; return ((_b = (_a = _this.table[row - 1]) === null || _a === void 0 ? void 0 : _a[col + 1]) === null || _b === void 0 ? void 0 : _b['type']) === 1; },\r\n            function (row, col) { var _a, _b; return ((_b = (_a = _this.table[row]) === null || _a === void 0 ? void 0 : _a[col + 1]) === null || _b === void 0 ? void 0 : _b['type']) === 1; },\r\n            function (row, col) { var _a, _b; return ((_b = (_a = _this.table[row + 1]) === null || _a === void 0 ? void 0 : _a[col + 1]) === null || _b === void 0 ? void 0 : _b['type']) === 1; },\r\n            function (row, col) { var _a, _b; return ((_b = (_a = _this.table[row + 1]) === null || _a === void 0 ? void 0 : _a[col]) === null || _b === void 0 ? void 0 : _b['type']) === 1; },\r\n            function (row, col) { var _a, _b; return ((_b = (_a = _this.table[row + 1]) === null || _a === void 0 ? void 0 : _a[col - 1]) === null || _b === void 0 ? void 0 : _b['type']) === 1; },\r\n            function (row, col) { var _a, _b; return ((_b = (_a = _this.table[row]) === null || _a === void 0 ? void 0 : _a[col - 1]) === null || _b === void 0 ? void 0 : _b['type']) === 1; } //7\r\n        ];\r\n    }\r\n    Parametrs.prototype.changeTypeCellFunc = function (score, type) {\r\n        if (type && this.continuationlive.includes(score))\r\n            return 1;\r\n        if (!type && this.birth.includes(score))\r\n            return 1;\r\n        return 0;\r\n    };\r\n    Parametrs.prototype.resetTable = function () {\r\n        for (var i = 0; i < this.table.length; i++) {\r\n            var row = this.table[i];\r\n            for (var j = 0; j < row.length; j++) {\r\n                row[j].score = 0;\r\n                if (row[j].type)\r\n                    row[j].type = 0;\r\n            }\r\n        }\r\n    };\r\n    Parametrs.prototype.toggleTypeCell = function (row, col) {\r\n        var cell = this.table[row][col];\r\n        cell.type = cell.type ? 0 : 1;\r\n    };\r\n    Parametrs.prototype.createTable = function (w, h) {\r\n        var cellSize = this.cellSize;\r\n        var wDivision = Math.floor(w / cellSize), hDivision = Math.floor(h / cellSize), table = [];\r\n        for (var h_1 = 0; h_1 < hDivision; h_1++) {\r\n            var row = [];\r\n            for (var w_1 = 0; w_1 < wDivision; w_1++)\r\n                row.push(new Cell(0, 0));\r\n            table.push(row);\r\n        }\r\n        this.table = table;\r\n    };\r\n    return Parametrs;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://caill-automatic/./dev/parametrs.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/stylus-loader/dist/cjs.js!./dev/style.styl":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/stylus-loader/dist/cjs.js!./dev/style.styl ***!
  \*******************************************************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, module.id, __webpack_require__.d, __webpack_require__.*, module */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n  margin: 0;\\n}\\nbody {\\n  overflow: hidden;\\n  width: 100vw;\\n  height: 100vh;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  background-color: #c2acb5;\\n}\\n.screen {\\n  --panelWidth: clamp(10px, 100%, 320px);\\n  position: relative;\\n  overflow: hidden;\\n  display: flex;\\n}\\n.panel {\\n  position: absolute;\\n  width: var(--panelWidth);\\n  transition: right 0.5s linear;\\n  height: 100%;\\n  right: calc(-1 * var(--panelWidth));\\n  background-color: rgba(132,125,137,0.812);\\n  box-sizing: border-box;\\n  padding: 10px;\\n}\\n.panel__buttons {\\n  display: grid;\\n  grid-template-columns: repeat(3, 1fr);\\n  grid-column-gap: 10px;\\n  justify-items: center;\\n  margin-bottom: 25px;\\n}\\n.panel__buttons > p {\\n  background-color: #87afc7;\\n  line-height: 19px;\\n  cursor: pointer;\\n  border: 1px solid rgba(0,0,0,0.369);\\n  padding: 5px 12px;\\n}\\n.panel_active {\\n  right: 0;\\n}\\n.panel_active .panel__open {\\n  transform: translate(-50%, -50%) scaleX(1);\\n}\\n.panel__open {\\n  left: -10px;\\n  width: 26px;\\n  position: relative;\\n  height: 26px;\\n  border-radius: 26px;\\n  background-color: #f7f7f7;\\n  border: 2px solid #858181;\\n  box-sizing: border-box;\\n  display: inline-block;\\n  top: 50%;\\n  cursor: pointer;\\n  transform: translate(-50%, -50%) scaleX(-1);\\n}\\n.panel__open:before,\\n.panel__open:after {\\n  content: '';\\n  position: absolute;\\n  width: 10px;\\n  height: 2px;\\n  background-color: #000;\\n  left: 7px;\\n}\\n.panel__open:before {\\n  top: 7px;\\n  transform: rotate(45deg);\\n}\\n.panel__open:after {\\n  bottom: 7px;\\n  transform: rotate(-45deg);\\n}\\n.panel__setting {\\n  margin-bottom: 10px;\\n}\\n.panel__setting > p {\\n  font-size: 18px;\\n  text-align: center;\\n  font-size: 24px;\\n  font-family: 'Roboto', sans-serif;\\n}\\n.panel__setting-items svg {\\n  cursor: pointer;\\n}\\n.panel__actions {\\n  height: 100%;\\n  background-color: #f00;\\n  width: 100%;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://caill-automatic/./dev/style.styl?./node_modules/css-loader/dist/cjs.js!./node_modules/stylus-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://caill-automatic/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./dev/style.styl":
/*!************************!*\
  !*** ./dev/style.styl ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_style_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/stylus-loader/dist/cjs.js!./style.styl */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/stylus-loader/dist/cjs.js!./dev/style.styl\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_style_styl__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_style_styl__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://caill-automatic/./dev/style.styl?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__.nc, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 230:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://caill-automatic/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./dev/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;