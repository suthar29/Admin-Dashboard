/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js_components/latestWork.js":
/*!*************************************!*\
  !*** ./js_components/latestWork.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadLatestWork: () => (/* binding */ loadLatestWork)\n/* harmony export */ });\nasync function loadLatestWork() {\n  const res = await fetch('./pages/latestWork.html');\n  const html = await res.text();\n  return html;\n}\n\n//# sourceURL=webpack://dashboard-project/./js_components/latestWork.js?");

/***/ }),

/***/ "./js_components/query.js":
/*!********************************!*\
  !*** ./js_components/query.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadQuery: () => (/* binding */ loadQuery)\n/* harmony export */ });\nasync function loadQuery() {\n  const res = await fetch('./pages/query.html');\n  const html = await res.text();\n  return html;\n}\n\n//# sourceURL=webpack://dashboard-project/./js_components/query.js?");

/***/ }),

/***/ "./js_components/testimonial.js":
/*!**************************************!*\
  !*** ./js_components/testimonial.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadTestimonial: () => (/* binding */ loadTestimonial)\n/* harmony export */ });\nasync function loadTestimonial() {\n  const res = await fetch('./pages/testimonial.html');\n  const html = await res.text();\n  return html;\n}\n\n//# sourceURL=webpack://dashboard-project/./js_components/testimonial.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_components_query_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js_components/query.js */ \"./js_components/query.js\");\n/* harmony import */ var _js_components_latestWork_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js_components/latestWork.js */ \"./js_components/latestWork.js\");\n/* harmony import */ var _js_components_testimonial_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js_components/testimonial.js */ \"./js_components/testimonial.js\");\n\n\n\n\nwindow.navigateTo = async function (page) {\n  const contentDiv = document.getElementById('content');\n  switch (page) {\n    case 'query':\n      contentDiv.innerHTML = await (0,_js_components_query_js__WEBPACK_IMPORTED_MODULE_0__.loadQuery)();\n      break;\n    case 'latestWork':\n      contentDiv.innerHTML = await (0,_js_components_latestWork_js__WEBPACK_IMPORTED_MODULE_1__.loadLatestWork)();\n      break;\n    case 'testimonial':\n      contentDiv.innerHTML = await (0,_js_components_testimonial_js__WEBPACK_IMPORTED_MODULE_2__.loadTestimonial)();\n      break;\n    default:\n      contentDiv.innerHTML = '<p>Page not found</p>';\n  }\n};\n\n//# sourceURL=webpack://dashboard-project/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;