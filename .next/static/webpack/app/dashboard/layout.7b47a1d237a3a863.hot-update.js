"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/layout",{

/***/ "(app-pages-browser)/./src/components/Layout.tsx":
/*!***********************************!*\
  !*** ./src/components/Layout.tsx ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/client/app-dir/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _barrel_optimize_names_ArrowRightOnRectangleIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRightOnRectangleIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/ArrowRightOnRectangleIcon.js\");\n/* harmony import */ var _providers_supabase_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/providers/supabase-provider */ \"(app-pages-browser)/./src/providers/supabase-provider.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst TABLES = [\n    {\n        name: 'emails',\n        path: '/dashboard/email'\n    },\n    {\n        name: 'websites',\n        path: '/dashboard/website'\n    },\n    {\n        name: 'my_domains',\n        path: '/dashboard/domains'\n    },\n    {\n        name: 'projects',\n        path: '/dashboard/projects'\n    },\n    {\n        name: 'tools',\n        path: '/dashboard/tools'\n    }\n];\nconst Layout = (param)=>{\n    let { children, navigation } = param;\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const { supabase, user } = (0,_providers_supabase_provider__WEBPACK_IMPORTED_MODULE_4__.useSupabase)();\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname)();\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [counts, setCounts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const fetchCount = async (tableName, path)=>{\n        if (!supabase || !user) return;\n        try {\n            const { count } = await supabase.from(tableName).select('*', {\n                count: 'exact',\n                head: true\n            }).eq('user_id', user.id);\n            setCounts((prev)=>({\n                    ...prev,\n                    [path]: count || 0\n                }));\n        } catch (error) {\n            console.error(\"Error fetching count for \".concat(tableName, \":\"), error);\n        }\n    };\n    const fetchAllCounts = async ()=>{\n        if (!supabase || !user) return;\n        try {\n            const newCounts = {};\n            await Promise.all(TABLES.map(async (table)=>{\n                const { count } = await supabase.from(table.name).select('*', {\n                    count: 'exact',\n                    head: true\n                }).eq('user_id', user.id);\n                newCounts[table.path] = count || 0;\n            }));\n            setCounts(newCounts);\n        } catch (error) {\n            console.error('Error fetching all counts:', error);\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Layout.useEffect\": ()=>{\n            setMounted(true);\n            fetchAllCounts();\n            // Set up real-time subscriptions for all tables\n            const channels = TABLES.map({\n                \"Layout.useEffect.channels\": (table)=>{\n                    const channel = supabase.channel(\"\".concat(table.name, \"_changes_\").concat(Math.random()));\n                    channel.on('postgres_changes', {\n                        event: 'INSERT',\n                        schema: 'public',\n                        table: table.name,\n                        filter: \"user_id=eq.\".concat(user === null || user === void 0 ? void 0 : user.id)\n                    }, {\n                        \"Layout.useEffect.channels\": ()=>{\n                            console.log(\"INSERT detected in \".concat(table.name));\n                            fetchCount(table.name, table.path);\n                        }\n                    }[\"Layout.useEffect.channels\"]).on('postgres_changes', {\n                        event: 'DELETE',\n                        schema: 'public',\n                        table: table.name,\n                        filter: \"user_id=eq.\".concat(user === null || user === void 0 ? void 0 : user.id)\n                    }, {\n                        \"Layout.useEffect.channels\": ()=>{\n                            console.log(\"DELETE detected in \".concat(table.name));\n                            fetchCount(table.name, table.path);\n                        }\n                    }[\"Layout.useEffect.channels\"]).subscribe({\n                        \"Layout.useEffect.channels\": (status)=>{\n                            console.log(\"Subscription status for \".concat(table.name, \":\"), status);\n                        }\n                    }[\"Layout.useEffect.channels\"]);\n                    return channel;\n                }\n            }[\"Layout.useEffect.channels\"]);\n            // Cleanup subscriptions\n            return ({\n                \"Layout.useEffect\": ()=>{\n                    channels.forEach({\n                        \"Layout.useEffect\": (channel)=>{\n                            supabase.removeChannel(channel);\n                        }\n                    }[\"Layout.useEffect\"]);\n                }\n            })[\"Layout.useEffect\"];\n        }\n    }[\"Layout.useEffect\"], [\n        user === null || user === void 0 ? void 0 : user.id\n    ]);\n    const handleSignOut = async ()=>{\n        await supabase.auth.signOut();\n        router.push('/login');\n    };\n    // Prevent hydration issues by not rendering until mounted\n    if (!mounted) {\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen bg-gray-100\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex h-screen \",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-64 bg-white shadow-lg flex flex-col mt-8\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex h-16 items-center justify-center\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                className: \"text-xl font-bold text-gray-800\",\n                                children: \"Info Manager\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                lineNumber: 148,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                            lineNumber: 147,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                            className: \"mt-5 px-2 flex-1\",\n                            children: navigation.map((item)=>{\n                                const isActive = pathname === item.href;\n                                const count = counts[item.href];\n                                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    href: item.href,\n                                    className: \"group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md \".concat(isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'),\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"flex items-center\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(item.icon, {\n                                                    className: \"mr-3 h-6 w-6 \".concat(isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'),\n                                                    \"aria-hidden\": \"true\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                                    lineNumber: 165,\n                                                    columnNumber: 21\n                                                }, undefined),\n                                                item.name\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                            lineNumber: 164,\n                                            columnNumber: 19\n                                        }, undefined),\n                                        count !== undefined && count > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            className: \"ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-600 bg-gray-100 rounded-full\",\n                                            children: count\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                            lineNumber: 176,\n                                            columnNumber: 21\n                                        }, undefined)\n                                    ]\n                                }, item.name, true, {\n                                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                    lineNumber: 155,\n                                    columnNumber: 17\n                                }, undefined);\n                            })\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                            lineNumber: 150,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex-shrink-0 flex border-t border-gray-200 p-4\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: handleSignOut,\n                                className: \"flex-shrink-0 w-full group block\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex items-center\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRightOnRectangleIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                            className: \"inline-block h-5 w-5 text-gray-400 group-hover:text-gray-500\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                            lineNumber: 190,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"ml-3\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: \"text-sm font-medium text-gray-700 group-hover:text-gray-900\",\n                                                children: \"Sign Out\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                                lineNumber: 192,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                            lineNumber: 191,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                    lineNumber: 189,\n                                    columnNumber: 15\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                                lineNumber: 185,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                            lineNumber: 184,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                    lineNumber: 146,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex-1 overflow-auto\",\n                    children: children\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n                    lineNumber: 202,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n            lineNumber: 144,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\foliw\\\\CascadeProjects\\\\info-manager\\\\src\\\\components\\\\Layout.tsx\",\n        lineNumber: 143,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Layout, \"VMaCYSbc3L7pmwxtXB5lEke1cXI=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter,\n        _providers_supabase_provider__WEBPACK_IMPORTED_MODULE_4__.useSupabase,\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname\n    ];\n});\n_c = Layout;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);\nvar _c;\n$RefreshReg$(_c, \"Layout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0xheW91dC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFMkQ7QUFDOUI7QUFDZTtBQU9QO0FBQ3VCO0FBQ2Q7QUFhOUMsTUFBTU8sU0FBUztJQUNiO1FBQUVDLE1BQU07UUFBVUMsTUFBTTtJQUFtQjtJQUMzQztRQUFFRCxNQUFNO1FBQVlDLE1BQU07SUFBcUI7SUFDL0M7UUFBRUQsTUFBTTtRQUFjQyxNQUFNO0lBQXFCO0lBQ2pEO1FBQUVELE1BQU07UUFBWUMsTUFBTTtJQUFzQjtJQUNoRDtRQUFFRCxNQUFNO1FBQVNDLE1BQU07SUFBbUI7Q0FDM0M7QUFFRCxNQUFNQyxTQUEwQjtRQUFDLEVBQUVDLFFBQVEsRUFBRUMsVUFBVSxFQUFFOztJQUN2RCxNQUFNQyxTQUFTViwwREFBU0E7SUFDeEIsTUFBTSxFQUFFVyxRQUFRLEVBQUVDLElBQUksRUFBRSxHQUFHVix5RUFBV0E7SUFDdEMsTUFBTVcsV0FBV1YsNERBQVdBO0lBQzVCLE1BQU0sQ0FBQ1csU0FBU0MsV0FBVyxHQUFHbEIsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDbUIsUUFBUUMsVUFBVSxHQUFHcEIsK0NBQVFBLENBQXlCLENBQUM7SUFFOUQsTUFBTXFCLGFBQWEsT0FBT0MsV0FBbUJiO1FBQzNDLElBQUksQ0FBQ0ssWUFBWSxDQUFDQyxNQUFNO1FBRXhCLElBQUk7WUFDRixNQUFNLEVBQUVRLEtBQUssRUFBRSxHQUFHLE1BQU1ULFNBQ3JCVSxJQUFJLENBQUNGLFdBQ0xHLE1BQU0sQ0FBQyxLQUFLO2dCQUFFRixPQUFPO2dCQUFTRyxNQUFNO1lBQUssR0FDekNDLEVBQUUsQ0FBQyxXQUFXWixLQUFLYSxFQUFFO1lBRXhCUixVQUFVUyxDQUFBQSxPQUFTO29CQUNqQixHQUFHQSxJQUFJO29CQUNQLENBQUNwQixLQUFLLEVBQUVjLFNBQVM7Z0JBQ25CO1FBQ0YsRUFBRSxPQUFPTyxPQUFPO1lBQ2RDLFFBQVFELEtB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LEtBQUtFLElBQUksQ0FBQztnQ0FDL0IscUJBQ0UsOERBQUMzRCxrREFBSUE7b0NBRUgyRCxNQUFNRixLQUFLRSxJQUFJO29DQUNmTCxXQUFXLG9GQUlWLE9BSENJLFdBQ0ksOEJBQ0E7O3NEQUdOLDhEQUFDTDs0Q0FBSUMsV0FBVTs7OERBQ2IsOERBQUNHLEtBQUtHLElBQUk7b0RBQ1JOLFdBQVcsZ0JBSVYsT0FIQ0ksV0FDSSxrQkFDQTtvREFFTkcsZUFBWTs7Ozs7O2dEQUViSixLQUFLbkQsSUFBSTs7Ozs7Ozt3Q0FFWGUsVUFBVXlDLGFBQWF6QyxRQUFRLG1CQUM5Qiw4REFBQzBDOzRDQUFLVCxXQUFVO3NEQUNiakM7Ozs7Ozs7bUNBckJBb0MsS0FBS25ELElBQUk7Ozs7OzRCQTBCcEI7Ozs7OztzQ0FFRiw4REFBQytDOzRCQUFJQyxXQUFVO3NDQUNiLDRFQUFDVTtnQ0FDQ0MsU0FBU2hCO2dDQUNUSyxXQUFVOzBDQUVWLDRFQUFDRDtvQ0FBSUMsV0FBVTs7c0RBQ2IsOERBQUNwRCxtSEFBeUJBOzRDQUFDb0QsV0FBVTs7Ozs7O3NEQUNyQyw4REFBQ0Q7NENBQUlDLFdBQVU7c0RBQ2IsNEVBQUNZO2dEQUFFWixXQUFVOzBEQUE4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVVyRiw4REFBQ0Q7b0JBQUlDLFdBQVU7OEJBQ1o3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLWDtHQTdLTUQ7O1FBQ1dQLHNEQUFTQTtRQUNHRSxxRUFBV0E7UUFDckJDLHdEQUFXQTs7O0tBSHhCSTtBQStLTixpRUFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxmb2xpd1xcQ2FzY2FkZVByb2plY3RzXFxpbmZvLW1hbmFnZXJcXHNyY1xcY29tcG9uZW50c1xcTGF5b3V0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IEZDLCBSZWFjdE5vZGUsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcbmltcG9ydCB7IFxuICBFbnZlbG9wZUljb24sIFxuICBHbG9iZUFsdEljb24sIFxuICBGb2xkZXJJY29uLCBcbiAgQXJyb3dSaWdodE9uUmVjdGFuZ2xlSWNvbixcbiAgSG9tZUljb24gXG59IGZyb20gJ0BoZXJvaWNvbnMvcmVhY3QvMjQvb3V0bGluZSc7XG5pbXBvcnQgeyB1c2VTdXBhYmFzZSB9IGZyb20gJ0AvcHJvdmlkZXJzL3N1cGFiYXNlLXByb3ZpZGVyJztcbmltcG9ydCB7IHVzZVBhdGhuYW1lIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcblxuaW50ZXJmYWNlIE5hdmlnYXRpb25JdGVtIHtcbiAgbmFtZTogc3RyaW5nO1xuICBocmVmOiBzdHJpbmc7XG4gIGljb246IGFueTtcbn1cblxuaW50ZXJmYWNlIExheW91dFByb3BzIHtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgbmF2aWdhdGlvbjogTmF2aWdhdGlvbkl0ZW1bXTtcbn1cblxuY29uc3QgVEFCTEVTID0gW1xuICB7IG5hbWU6ICdlbWFpbHMnLCBwYXRoOiAnL2Rhc2hib2FyZC9lbWFpbCcgfSxcbiAgeyBuYW1lOiAnd2Vic2l0ZXMnLCBwYXRoOiAnL2Rhc2hib2FyZC93ZWJzaXRlJyB9LFxuICB7IG5hbWU6ICdteV9kb21haW5zJywgcGF0aDogJy9kYXNoYm9hcmQvZG9tYWlucycgfSxcbiAgeyBuYW1lOiAncHJvamVjdHMnLCBwYXRoOiAnL2Rhc2hib2FyZC9wcm9qZWN0cycgfSxcbiAgeyBuYW1lOiAndG9vbHMnLCBwYXRoOiAnL2Rhc2hib2FyZC90b29scycgfVxuXSBhcyBjb25zdDtcblxuY29uc3QgTGF5b3V0OiBGQzxMYXlvdXRQcm9wcz4gPSAoeyBjaGlsZHJlbiwgbmF2aWdhdGlvbiB9KSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCB7IHN1cGFiYXNlLCB1c2VyIH0gPSB1c2VTdXBhYmFzZSgpO1xuICBjb25zdCBwYXRobmFtZSA9IHVzZVBhdGhuYW1lKCk7XG4gIGNvbnN0IFttb3VudGVkLCBzZXRNb3VudGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2NvdW50cywgc2V0Q291bnRzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIG51bWJlcj4+KHt9KTtcbiAgXG4gIGNvbnN0IGZldGNoQ291bnQgPSBhc3luYyAodGFibGVOYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZykgPT4ge1xuICAgIGlmICghc3VwYWJhc2UgfHwgIXVzZXIpIHJldHVybjtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNvdW50IH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSh0YWJsZU5hbWUpXG4gICAgICAgIC5zZWxlY3QoJyonLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXG4gICAgICAgIC5lcSgndXNlcl9pZCcsIHVzZXIuaWQpO1xuXG4gICAgICBzZXRDb3VudHMocHJldiA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbcGF0aF06IGNvdW50IHx8IDBcbiAgICAgIH0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgY291bnQgZm9yICR7dGFibGVOYW1lfTpgLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZldGNoQWxsQ291bnRzID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc3VwYWJhc2UgfHwgIXVzZXIpIHJldHVybjtcbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgbmV3Q291bnRzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gICAgICBcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBUQUJMRVMubWFwKGFzeW5jICh0YWJsZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgICAuZnJvbSh0YWJsZS5uYW1lKVxuICAgICAgICAgICAgLnNlbGVjdCgnKicsIHsgY291bnQ6ICdleGFjdCcsIGhlYWQ6IHRydWUgfSlcbiAgICAgICAgICAgIC5lcSgndXNlcl9pZCcsIHVzZXIuaWQpO1xuICAgICAgICAgIG5ld0NvdW50c1t0YWJsZS5wYXRoXSA9IGNvdW50IHx8IDA7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBzZXRDb3VudHMobmV3Q291bnRzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgYWxsIGNvdW50czonLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0TW91bnRlZCh0cnVlKTtcbiAgICBmZXRjaEFsbENvdW50cygpO1xuXG4gICAgLy8gU2V0IHVwIHJlYWwtdGltZSBzdWJzY3JpcHRpb25zIGZvciBhbGwgdGFibGVzXG4gICAgY29uc3QgY2hhbm5lbHMgPSBUQUJMRVMubWFwKHRhYmxlID0+IHtcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSBzdXBhYmFzZS5jaGFubmVsKGAke3RhYmxlLm5hbWV9X2NoYW5nZXNfJHtNYXRoLnJhbmRvbSgpfWApO1xuXG4gICAgICBjaGFubmVsXG4gICAgICAgIC5vbihcbiAgICAgICAgICAncG9zdGdyZXNfY2hhbmdlcycsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZXZlbnQ6ICdJTlNFUlQnLFxuICAgICAgICAgICAgc2NoZW1hOiAncHVibGljJyxcbiAgICAgICAgICAgIHRhYmxlOiB0YWJsZS5uYW1lLFxuICAgICAgICAgICAgZmlsdGVyOiBgdXNlcl9pZD1lcS4ke3VzZXI/LmlkfWAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgSU5TRVJUIGRldGVjdGVkIGluICR7dGFibGUubmFtZX1gKTtcbiAgICAgICAgICAgIGZldGNoQ291bnQodGFibGUubmFtZSwgdGFibGUucGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC5vbihcbiAgICAgICAgICAncG9zdGdyZXNfY2hhbmdlcycsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZXZlbnQ6ICdERUxFVEUnLFxuICAgICAgICAgICAgc2NoZW1hOiAncHVibGljJyxcbiAgICAgICAgICAgIHRhYmxlOiB0YWJsZS5uYW1lLFxuICAgICAgICAgICAgZmlsdGVyOiBgdXNlcl9pZD1lcS4ke3VzZXI/LmlkfWAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgREVMRVRFIGRldGVjdGVkIGluICR7dGFibGUubmFtZX1gKTtcbiAgICAgICAgICAgIGZldGNoQ291bnQodGFibGUubmFtZSwgdGFibGUucGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKHN0YXR1cykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBTdWJzY3JpcHRpb24gc3RhdHVzIGZvciAke3RhYmxlLm5hbWV9OmAsIHN0YXR1cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY2hhbm5lbDtcbiAgICB9KTtcblxuICAgIC8vIENsZWFudXAgc3Vic2NyaXB0aW9uc1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjaGFubmVscy5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgICBzdXBhYmFzZS5yZW1vdmVDaGFubmVsKGNoYW5uZWwpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSwgW3VzZXI/LmlkXSk7XG5cbiAgY29uc3QgaGFuZGxlU2lnbk91dCA9IGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcbiAgICByb3V0ZXIucHVzaCgnL2xvZ2luJyk7XG4gIH07XG5cbiAgLy8gUHJldmVudCBoeWRyYXRpb24gaXNzdWVzIGJ5IG5vdCByZW5kZXJpbmcgdW50aWwgbW91bnRlZFxuICBpZiAoIW1vdW50ZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JheS0xMDBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLXNjcmVlbiBcIj5cbiAgICAgICAgey8qIFNpZGViYXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy02NCBiZy13aGl0ZSBzaGFkb3ctbGcgZmxleCBmbGV4LWNvbCBtdC04XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtMTYgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTgwMFwiPkluZm8gTWFuYWdlcjwvaDE+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJtdC01IHB4LTIgZmxleC0xXCI+XG4gICAgICAgICAgICB7bmF2aWdhdGlvbi5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBwYXRobmFtZSA9PT0gaXRlbS5ocmVmO1xuICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IGNvdW50c1tpdGVtLmhyZWZdO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgIGhyZWY9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGdyb3VwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0yIHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSByb3VuZGVkLW1kICR7XG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JheS0xMDAgdGV4dC1ncmF5LTkwMCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNjAwIGhvdmVyOmJnLWdyYXktNTAgaG92ZXI6dGV4dC1ncmF5LTkwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGl0ZW0uaWNvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YG1yLTMgaC02IHctNiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC1ncmF5LTUwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTQwMCBncm91cC1ob3Zlcjp0ZXh0LWdyYXktNTAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLm5hbWV9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtjb3VudCAhPT0gdW5kZWZpbmVkICYmIGNvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTIgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB4LTIgcHktMSB0ZXh0LXhzIGZvbnQtYm9sZCBsZWFkaW5nLW5vbmUgdGV4dC1ncmF5LTYwMCBiZy1ncmF5LTEwMCByb3VuZGVkLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y291bnR9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIGZsZXggYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwIHAtNFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTaWduT3V0fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctZnVsbCBncm91cCBibG9ja1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8QXJyb3dSaWdodE9uUmVjdGFuZ2xlSWNvbiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2sgaC01IHctNSB0ZXh0LWdyYXktNDAwIGdyb3VwLWhvdmVyOnRleHQtZ3JheS01MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWwtM1wiPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIGdyb3VwLWhvdmVyOnRleHQtZ3JheS05MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgU2lnbiBPdXRcbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1haW4gY29udGVudCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3ctYXV0b1wiPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExheW91dDtcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkxpbmsiLCJ1c2VSb3V0ZXIiLCJBcnJvd1JpZ2h0T25SZWN0YW5nbGVJY29uIiwidXNlU3VwYWJhc2UiLCJ1c2VQYXRobmFtZSIsIlRBQkxFUyIsIm5hbWUiLCJwYXRoIiwiTGF5b3V0IiwiY2hpbGRyZW4iLCJuYXZpZ2F0aW9uIiwicm91dGVyIiwic3VwYWJhc2UiLCJ1c2VyIiwicGF0aG5hbWUiLCJtb3VudGVkIiwic2V0TW91bnRlZCIsImNvdW50cyIsInNldENvdW50cyIsImZldGNoQ291bnQiLCJ0YWJsZU5hbWUiLCJjb3VudCIsImZyb20iLCJzZWxlY3QiLCJoZWFkIiwiZXEiLCJpZCIsInByZXYiLCJlcnJvciIsImNvbnNvbGUiLCJmZXRjaEFsbENvdW50cyIsIm5ld0NvdW50cyIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJ0YWJsZSIsImNoYW5uZWxzIiwiY2hhbm5lbCIsIk1hdGgiLCJyYW5kb20iLCJvbiIsImV2ZW50Iiwic2NoZW1hIiwiZmlsdGVyIiwibG9nIiwic3Vic2NyaWJlIiwic3RhdHVzIiwiZm9yRWFjaCIsInJlbW92ZUNoYW5uZWwiLCJoYW5kbGVTaWduT3V0IiwiYXV0aCIsInNpZ25PdXQiLCJwdXNoIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJuYXYiLCJpdGVtIiwiaXNBY3RpdmUiLCJocmVmIiwiaWNvbiIsImFyaWEtaGlkZGVuIiwidW5kZWZpbmVkIiwic3BhbiIsImJ1dHRvbiIsIm9uQ2xpY2siLCJwIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Layout.tsx\n"));

/***/ })

});