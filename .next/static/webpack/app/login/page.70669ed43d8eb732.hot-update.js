"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/login/page",{

/***/ "(app-pages-browser)/./src/app/login/page.tsx":
/*!********************************!*\
  !*** ./src/app/login/page.tsx ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Login)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _providers_supabase_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/providers/supabase-provider */ \"(app-pages-browser)/./src/providers/supabase-provider.tsx\");\n/* harmony import */ var _barrel_optimize_names_LockClosedIcon_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=LockClosedIcon!=!@heroicons/react/24/solid */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/solid/esm/LockClosedIcon.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Login() {\n    _s();\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { supabase } = (0,_providers_supabase_provider__WEBPACK_IMPORTED_MODULE_3__.useSupabase)();\n    const handleLogin = async (e)=>{\n        e.preventDefault();\n        setError('');\n        setIsLoading(true);\n        try {\n            const { data, error: signInError } = await supabase.auth.signInWithPassword({\n                email,\n                password\n            });\n            if (signInError) throw signInError;\n            if (data === null || data === void 0 ? void 0 : data.session) {\n                // Use window.location for navigation\n                window.location.href = '/dashboard';\n            }\n        } catch (error) {\n            console.error('Auth error:', error);\n            setError((error === null || error === void 0 ? void 0 : error.message) || 'Invalid email or password. Please try again.');\n        } finally{\n            setIsLoading(false);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"sm:mx-auto sm:w-full sm:max-w-md\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LockClosedIcon_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            className: \"h-6 w-6 text-indigo-600\",\n                            \"aria-hidden\": \"true\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                            lineNumber: 45,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                        lineNumber: 44,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        className: \"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900\",\n                        children: \"Welcome Back\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"mt-2 text-center text-sm text-gray-600\",\n                        children: \"Sign in to access your personal information manager\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                lineNumber: 43,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-8 sm:mx-auto sm:w-full sm:max-w-md\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10\",\n                    children: [\n                        error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"mb-4 rounded-md bg-red-50 p-4\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"ml-3\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                        className: \"text-sm font-medium text-red-800\",\n                                        children: error\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                        lineNumber: 61,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                    lineNumber: 60,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                lineNumber: 59,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                            lineNumber: 58,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                            className: \"space-y-6\",\n                            onSubmit: handleLogin,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                            htmlFor: \"email\",\n                                            className: \"block text-sm font-medium text-gray-700\",\n                                            children: \"Email address\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                            lineNumber: 69,\n                                            columnNumber: 15\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"mt-1\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                id: \"email\",\n                                                name: \"email\",\n                                                type: \"email\",\n                                                autoComplete: \"email\",\n                                                required: true,\n                                                value: email,\n                                                onChange: (e)=>setEmail(e.target.value),\n                                                className: \"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm\",\n                                                placeholder: \"Enter your email\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                                lineNumber: 73,\n                                                columnNumber: 17\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                            lineNumber: 72,\n                                            columnNumber: 15\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                    lineNumber: 68,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                            htmlFor: \"password\",\n                                            className: \"block text-sm font-medium text-gray-700\",\n                                            children: \"Password\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                            lineNumber: 88,\n                                            columnNumber: 15\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"mt-1\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                id: \"password\",\n                                                name: \"password\",\n                                                type: \"password\",\n                                                autoComplete: \"current-password\",\n                                                required: true,\n                                                value: password,\n                                                onChange: (e)=>setPassword(e.target.value),\n                                                className: \"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm\",\n                                                placeholder: \"Enter your password\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                                lineNumber: 92,\n                                                columnNumber: 17\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                            lineNumber: 91,\n                                            columnNumber: 15\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                    lineNumber: 87,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        type: \"submit\",\n                                        disabled: isLoading,\n                                        className: \"flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed\",\n                                        children: isLoading ? 'Signing in...' : 'Sign in'\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                        lineNumber: 107,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                                    lineNumber: 106,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                            lineNumber: 67,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                    lineNumber: 56,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n                lineNumber: 55,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\app\\\\login\\\\page.tsx\",\n        lineNumber: 42,\n        columnNumber: 5\n    }, this);\n}\n_s(Login, \"vQwwZ+rVF2TtRej+bmY5ctgLqds=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        _providers_supabase_provider__WEBPACK_IMPORTED_MODULE_3__.useSupabase\n    ];\n});\n_c = Login;\nvar _c;\n$RefreshReg$(_c, \"Login\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbG9naW4vcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRWlDO0FBQ1c7QUFDZ0I7QUFDRDtBQUU1QyxTQUFTSTs7SUFDdEIsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdOLCtDQUFRQSxDQUFDO0lBQ25DLE1BQU0sQ0FBQ08sVUFBVUMsWUFBWSxHQUFHUiwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNLENBQUNTLE9BQU9DLFNBQVMsR0FBR1YsK0NBQVFBLENBQUM7SUFDbkMsTUFBTSxDQUFDVyxXQUFXQyxhQUFhLEdBQUdaLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU1hLFNBQVNaLDBEQUFTQTtJQUN4QixNQUFNLEVBQUVhLFFBQVEsRUFBRSxHQUFHWix5RUFBV0E7SUFFaEMsTUFBTWEsY0FBYyxPQUFPQztRQUN6QkEsRUFBRUMsY0FBYztRQUNoQlAsU0FBUztRQUNURSxhQUFhO1FBRWIsSUFBSTtZQUNGLE1BQU0sRUFBRU0sSUFBSSxFQUFFVCxPQUFPVSxXQUFXLEVBQUUsR0FBRyxNQUFNTCxTQUFTTSxJQUFJLENBQUNDLGtCQUFrQixDQUFDO2dCQUMxRWhCO2dCQUNBRTtZQUNGO1lBRUEsSUFBSVksYUFBYSxNQUFNQTtZQUV2QixJQUFJRCxpQkFBQUEsMkJBQUFBLEtBQU1JLE9BQU8sRUFBRTtnQkFDakIscUNBQXFDO2dCQUNyQ0MsT0FBT0MsUUFBUSxDQUFDQyxJQUFJLEdBQUc7WUFDekI7UUFDRixFQUFFLE9BQU9oQixPQUFZO1lBQ25CaUIsUUFBUWpCLEtBQUssQ0FBQyxlQUFlQTtZQUM3QkMsU0FBU0QsQ0FBQUEsa0JBQUFBLDRCQUFBQSxNQUFPa0IsT0FBTyxLQUFJO1FBQzdCLFNBQVU7WUFDUmYsYUFBYTtRQUNmO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ2dCO1FBQUtDLFdBQVU7OzBCQUNkLDhEQUFDQztnQkFBSUQsV0FBVTs7a0NBQ2IsOERBQUNDO3dCQUFJRCxXQUFVO2tDQUNiLDRFQUFDMUIsc0dBQWNBOzRCQUFDMEIsV0FBVTs0QkFBMEJFLGVBQVk7Ozs7Ozs7Ozs7O2tDQUVsRSw4REFBQ0M7d0JBQUdILFdBQVU7a0NBQW1FOzs7Ozs7a0NBR2pGLDhEQUFDSTt3QkFBRUosV0FBVTtrQ0FBeUM7Ozs7Ozs7Ozs7OzswQkFLeEQsOERBQUNDO2dCQUFJRCxXQUFVOzBCQUNiLDRFQUFDQztvQkFBSUQsV0FBVTs7d0JBQ1pwQix1QkFDQyw4REFBQ3FCOzRCQUFJRCxXQUFVO3NDQUNiLDRFQUFDQztnQ0FBSUQsV0FBVTswQ0FDYiw0RUFBQ0M7b0NBQUlELFdBQVU7OENBQ2IsNEVBQUNLO3dDQUFHTCxXQUFVO2tEQUFvQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBTTFELDhEQUFDMEI7NEJBQUtOLFdBQVU7NEJBQVlPLFVBQVVyQjs7OENBQ3BDLDhEQUFDZTs7c0RBQ0MsOERBQUNPOzRDQUFNQyxTQUFROzRDQUFRVCxXQUFVO3NEQUEwQzs7Ozs7O3NEQUczRSw4REFBQ0M7NENBQUlELFdBQVU7c0RBQ2IsNEVBQUNVO2dEQUNDQyxJQUFHO2dEQUNIQyxNQUFLO2dEQUNMQyxNQUFLO2dEQUNMQyxjQUFhO2dEQUNiQyxRQUFRO2dEQUNSQyxPQUFPeEM7Z0RBQ1B5QyxVQUFVLENBQUM5QixJQUFNVixTQUFTVSxFQUFFK0IsTUFBTSxDQUFDRixLQUFLO2dEQUN4Q2hCLFdBQVU7Z0RBQ1ZtQixhQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0FLbEIsOERBQUNsQjs7c0RBQ0MsOERBQUNPOzRDQUFNQyxTQUFROzRDQUFXVCxXQUFVO3NEQUEwQzs7Ozs7O3NEQUc5RSw4REFBQ0M7NENBQUlELFdBQVU7c0RBQ2IsNEVBQUNVO2dEQUNDQyxJQUFHO2dEQUNIQyxNQUFLO2dEQUNMQyxNQUFLO2dEQUNMQyxjQUFhO2dEQUNiQyxRQUFRO2dEQUNSQyxPQUFPdEM7Z0RBQ1B1QyxVQUFVLENBQUM5QixJQUFNUixZQUFZUSxFQUFFK0IsTUFBTSxDQUFDRixLQUFLO2dEQUMzQ2hCLFdBQVU7Z0RBQ1ZtQixhQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0FLbEIsOERBQUNsQjs4Q0FDQyw0RUFBQ21CO3dDQUNDUCxNQUFLO3dDQUNMUSxVQUFVdkM7d0NBQ1ZrQixXQUFVO2tEQUVUbEIsWUFBWSxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRL0M7R0FoSHdCUDs7UUFLUEgsc0RBQVNBO1FBQ0hDLHFFQUFXQTs7O0tBTlZFIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGZvbGl3XFxDYXNjYWRlUHJvamVjdHNcXGluZm8tbWFuYWdlclxcc3JjXFxhcHBcXGxvZ2luXFxwYWdlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcbmltcG9ydCB7IHVzZVN1cGFiYXNlIH0gZnJvbSAnQC9wcm92aWRlcnMvc3VwYWJhc2UtcHJvdmlkZXInO1xuaW1wb3J0IHsgTG9ja0Nsb3NlZEljb24gfSBmcm9tICdAaGVyb2ljb25zL3JlYWN0LzI0L3NvbGlkJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTG9naW4oKSB7XG4gIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCB7IHN1cGFiYXNlIH0gPSB1c2VTdXBhYmFzZSgpO1xuXG4gIGNvbnN0IGhhbmRsZUxvZ2luID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3I6IHNpZ25JbkVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25JbldpdGhQYXNzd29yZCh7XG4gICAgICAgIGVtYWlsLFxuICAgICAgICBwYXNzd29yZCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc2lnbkluRXJyb3IpIHRocm93IHNpZ25JbkVycm9yO1xuXG4gICAgICBpZiAoZGF0YT8uc2Vzc2lvbikge1xuICAgICAgICAvLyBVc2Ugd2luZG93LmxvY2F0aW9uIGZvciBuYXZpZ2F0aW9uXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kYXNoYm9hcmQnO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0F1dGggZXJyb3I6JywgZXJyb3IpO1xuICAgICAgc2V0RXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPG1haW4gY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTAgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBweS0xMiBzbTpweC02IGxnOnB4LThcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206bXgtYXV0byBzbTp3LWZ1bGwgc206bWF4LXctbWRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJteC1hdXRvIGZsZXggaC0xMiB3LTEyIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTEwMFwiPlxuICAgICAgICAgIDxMb2NrQ2xvc2VkSWNvbiBjbGFzc05hbWU9XCJoLTYgdy02IHRleHQtaW5kaWdvLTYwMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwibXQtNiB0ZXh0LWNlbnRlciB0ZXh0LTN4bCBmb250LWJvbGQgdHJhY2tpbmctdGlnaHQgdGV4dC1ncmF5LTkwMFwiPlxuICAgICAgICAgIFdlbGNvbWUgQmFja1xuICAgICAgICA8L2gyPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0yIHRleHQtY2VudGVyIHRleHQtc20gdGV4dC1ncmF5LTYwMFwiPlxuICAgICAgICAgIFNpZ24gaW4gdG8gYWNjZXNzIHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24gbWFuYWdlclxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC04IHNtOm14LWF1dG8gc206dy1mdWxsIHNtOm1heC13LW1kXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcHktOCBweC00IHNoYWRvdyBzbTpyb3VuZGVkLWxnIHNtOnB4LTEwXCI+XG4gICAgICAgICAge2Vycm9yICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNCByb3VuZGVkLW1kIGJnLXJlZC01MCBwLTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtbC0zXCI+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXJlZC04MDBcIj57ZXJyb3J9PC9oMz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIFxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNwYWNlLXktNlwiIG9uU3VibWl0PXtoYW5kbGVMb2dpbn0+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImVtYWlsXCIgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwXCI+XG4gICAgICAgICAgICAgICAgRW1haWwgYWRkcmVzc1xuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTFcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGlkPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJibG9jayB3LWZ1bGwgYXBwZWFyYW5jZS1ub25lIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBweC0zIHB5LTIgcGxhY2Vob2xkZXItZ3JheS00MDAgc2hhZG93LXNtIGZvY3VzOmJvcmRlci1pbmRpZ28tNTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLWluZGlnby01MDAgc206dGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgZW1haWxcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGFzc3dvcmRcIiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDBcIj5cbiAgICAgICAgICAgICAgICBQYXNzd29yZFxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTFcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJjdXJyZW50LXBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrIHctZnVsbCBhcHBlYXJhbmNlLW5vbmUgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHB4LTMgcHktMiBwbGFjZWhvbGRlci1ncmF5LTQwMCBzaGFkb3ctc20gZm9jdXM6Ym9yZGVyLWluZGlnby01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctaW5kaWdvLTUwMCBzbTp0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCB3LWZ1bGwganVzdGlmeS1jZW50ZXIgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGJnLWluZGlnby02MDAgcHktMiBweC00IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC13aGl0ZSBzaGFkb3ctc20gaG92ZXI6YmctaW5kaWdvLTcwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMCBmb2N1czpyaW5nLW9mZnNldC0yIGRpc2FibGVkOm9wYWNpdHktNTAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyAnU2lnbmluZyBpbi4uLicgOiAnU2lnbiBpbid9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsInVzZVN1cGFiYXNlIiwiTG9ja0Nsb3NlZEljb24iLCJMb2dpbiIsImVtYWlsIiwic2V0RW1haWwiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwiZXJyb3IiLCJzZXRFcnJvciIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsInJvdXRlciIsInN1cGFiYXNlIiwiaGFuZGxlTG9naW4iLCJlIiwicHJldmVudERlZmF1bHQiLCJkYXRhIiwic2lnbkluRXJyb3IiLCJhdXRoIiwic2lnbkluV2l0aFBhc3N3b3JkIiwic2Vzc2lvbiIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImNvbnNvbGUiLCJtZXNzYWdlIiwibWFpbiIsImNsYXNzTmFtZSIsImRpdiIsImFyaWEtaGlkZGVuIiwiaDIiLCJwIiwiaDMiLCJmb3JtIiwib25TdWJtaXQiLCJsYWJlbCIsImh0bWxGb3IiLCJpbnB1dCIsImlkIiwibmFtZSIsInR5cGUiLCJhdXRvQ29tcGxldGUiLCJyZXF1aXJlZCIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsImJ1dHRvbiIsImRpc2FibGVkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/login/page.tsx\n"));

/***/ })

});