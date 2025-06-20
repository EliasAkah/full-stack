"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/new-meetups";
exports.ids = ["pages/api/new-meetups"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "(api)/./pages/api/new-meetups.js":
/*!**********************************!*\
  !*** ./pages/api/new-meetups.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NewMeetUp\": () => (/* binding */ NewMeetUp),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst url = \"REMOVED_SECRET/?retryWrites=true&w=majority&appName=MeetUps\";\nconst client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(url);\nasync function NewMeetUp(req, res) {\n    if (req.method === \"POST\") {\n        const data = req.body;\n        try {\n            await client.connect();\n            const db = client.db(\"meetups\"); //creates a database if not created;\n            const meetupsCollection = db.collection(\"meetups\");\n            const result = await meetupsCollection.insertOne(data); //add only one document to the collection in meetups database\n            console.log(\"inserted Data: \", result);\n            return res.status(201).json({\n                message: \"Successfully added a new meetup\"\n            });\n        } catch (error) {\n            console.error(\"❌ MongoDB Error:\", error);\n            res.status(500).json({\n                message: \"Internal Server Error\"\n            });\n        } finally{\n            await client.close();\n        }\n    } else {\n        res.status(405).json({\n            message: \"Method not allowed\"\n        });\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewMeetUp); //api folder provides us with an api route. each of the file in this folder\n // provides an api route that can be used to retrieve data from and write data to the database or file.\n //files in api folder only runs on the server side none of codes written here will ever reflect on the client side\n //thus is safe to use ur credentials here.\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbmV3LW1lZXR1cHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFzQztBQUV0QyxNQUFNQyxHQUFHLEdBQ1AscUhBQXFIO0FBRXZILE1BQU1DLE1BQU0sR0FBRyxJQUFJRixnREFBVyxDQUFDQyxHQUFHLENBQUM7QUFFNUIsZUFBZUUsU0FBUyxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUN4QyxJQUFJRCxHQUFHLENBQUNFLE1BQU0sS0FBSyxNQUFNLEVBQUU7UUFDekIsTUFBTUMsSUFBSSxHQUFHSCxHQUFHLENBQUNJLElBQUk7UUFFckIsSUFBSTtZQUNGLE1BQU1OLE1BQU0sQ0FBQ08sT0FBTyxFQUFFLENBQUM7WUFDdkIsTUFBTUMsRUFBRSxHQUFHUixNQUFNLENBQUNRLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxvQ0FBb0M7WUFDckUsTUFBTUMsaUJBQWlCLEdBQUdELEVBQUUsQ0FBQ0UsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUNsRCxNQUFNQyxNQUFNLEdBQUcsTUFBTUYsaUJBQWlCLENBQUNHLFNBQVMsQ0FBQ1AsSUFBSSxDQUFDLEVBQUUsNkRBQTZEO1lBQ3JIUSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRUgsTUFBTSxDQUFDLENBQUM7WUFFdkMsT0FBT1IsR0FBRyxDQUNQWSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1hDLElBQUksQ0FBQztnQkFBRUMsT0FBTyxFQUFFLGlDQUFpQzthQUFFLENBQUMsQ0FBQztRQUMxRCxFQUFFLE9BQU9DLEtBQUssRUFBRTtZQUNkTCxPQUFPLENBQUNLLEtBQUssQ0FBQyxrQkFBa0IsRUFBRUEsS0FBSyxDQUFDLENBQUM7WUFDekNmLEdBQUcsQ0FBQ1ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUVDLE9BQU8sRUFBRSx1QkFBdUI7YUFBRSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxRQUFTO1lBQ1IsTUFBTWpCLE1BQU0sQ0FBQ21CLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxPQUFPO1FBQ0xoQixHQUFHLENBQUNZLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVDLE9BQU8sRUFBRSxvQkFBb0I7U0FBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztBQUNILENBQUM7QUFFRCxpRUFBZWhCLFNBQVMsRUFBQyxDQUV6QiwyRUFBMkU7Q0FDM0UsdUdBQXVHO0NBQ3ZHLGtIQUFrSDtDQUNsSCwwQ0FBMEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtY291cnNlLy4vcGFnZXMvYXBpL25ldy1tZWV0dXBzLmpzPzJiODMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tIFwibW9uZ29kYlwiO1xuXG5jb25zdCB1cmwgPVxuICBcIm1vbmdvZGIrc3J2Oi8vZGF2aWRha2FoOjA4MDM4ODM4NjgxJTQwRGF2QGNsdXN0ZXIxLmRtOXNncHAubW9uZ29kYi5uZXQvP3JldHJ5V3JpdGVzPXRydWUmdz1tYWpvcml0eSZhcHBOYW1lPU1lZXRVcHNcIjtcblxuY29uc3QgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVybCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBOZXdNZWV0VXAocmVxLCByZXMpIHtcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgY29uc3QgZGF0YSA9IHJlcS5ib2R5O1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNsaWVudC5jb25uZWN0KCk7XG4gICAgICBjb25zdCBkYiA9IGNsaWVudC5kYihcIm1lZXR1cHNcIik7IC8vY3JlYXRlcyBhIGRhdGFiYXNlIGlmIG5vdCBjcmVhdGVkO1xuICAgICAgY29uc3QgbWVldHVwc0NvbGxlY3Rpb24gPSBkYi5jb2xsZWN0aW9uKFwibWVldHVwc1wiKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1lZXR1cHNDb2xsZWN0aW9uLmluc2VydE9uZShkYXRhKTsgLy9hZGQgb25seSBvbmUgZG9jdW1lbnQgdG8gdGhlIGNvbGxlY3Rpb24gaW4gbWVldHVwcyBkYXRhYmFzZVxuICAgICAgY29uc29sZS5sb2coXCJpbnNlcnRlZCBEYXRhOiBcIiwgcmVzdWx0KTtcblxuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMSlcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiBcIlN1Y2Nlc3NmdWxseSBhZGRlZCBhIG5ldyBtZWV0dXBcIiB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBNb25nb0RCIEVycm9yOlwiLCBlcnJvcik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXMuc3RhdHVzKDQwNSkuanNvbih7IG1lc3NhZ2U6IFwiTWV0aG9kIG5vdCBhbGxvd2VkXCIgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV3TWVldFVwO1xuXG4vL2FwaSBmb2xkZXIgcHJvdmlkZXMgdXMgd2l0aCBhbiBhcGkgcm91dGUuIGVhY2ggb2YgdGhlIGZpbGUgaW4gdGhpcyBmb2xkZXJcbi8vIHByb3ZpZGVzIGFuIGFwaSByb3V0ZSB0aGF0IGNhbiBiZSB1c2VkIHRvIHJldHJpZXZlIGRhdGEgZnJvbSBhbmQgd3JpdGUgZGF0YSB0byB0aGUgZGF0YWJhc2Ugb3IgZmlsZS5cbi8vZmlsZXMgaW4gYXBpIGZvbGRlciBvbmx5IHJ1bnMgb24gdGhlIHNlcnZlciBzaWRlIG5vbmUgb2YgY29kZXMgd3JpdHRlbiBoZXJlIHdpbGwgZXZlciByZWZsZWN0IG9uIHRoZSBjbGllbnQgc2lkZVxuLy90aHVzIGlzIHNhZmUgdG8gdXNlIHVyIGNyZWRlbnRpYWxzIGhlcmUuXG4iXSwibmFtZXMiOlsiTW9uZ29DbGllbnQiLCJ1cmwiLCJjbGllbnQiLCJOZXdNZWV0VXAiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJkYXRhIiwiYm9keSIsImNvbm5lY3QiLCJkYiIsIm1lZXR1cHNDb2xsZWN0aW9uIiwiY29sbGVjdGlvbiIsInJlc3VsdCIsImluc2VydE9uZSIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImVycm9yIiwiY2xvc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/new-meetups.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/new-meetups.js"));
module.exports = __webpack_exports__;

})();