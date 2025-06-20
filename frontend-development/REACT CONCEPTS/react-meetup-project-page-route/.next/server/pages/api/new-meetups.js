"use strict";
(() => {
var exports = {};
exports.id = 266;
exports.ids = [266];
exports.modules = {

/***/ 4604:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "NewMeetUp": () => (/* binding */ NewMeetUp),
  "default": () => (/* binding */ new_meetups)
});

;// CONCATENATED MODULE: external "mongodb"
const external_mongodb_namespaceObject = require("mongodb");
;// CONCATENATED MODULE: ./pages/api/new-meetups.js

const url = "REMOVED_SECRET/?retryWrites=true&w=majority&appName=MeetUps";
const client = new external_mongodb_namespaceObject.MongoClient(url);
async function NewMeetUp(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        try {
            await client.connect();
            const db = client.db("meetups"); //creates a database if not created;
            const meetupsCollection = db.collection("meetups");
            const result = await meetupsCollection.insertOne(data); //add only one document to the collection in meetups database
            console.log("inserted Data: ", result);
            return res.status(201).json({
                message: "Successfully added a new meetup"
            });
        } catch (error) {
            console.error("❌ MongoDB Error:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        } finally{
            await client.close();
        }
    } else {
        res.status(405).json({
            message: "Method not allowed"
        });
    }
}
/* harmony default export */ const new_meetups = (NewMeetUp); //api folder provides us with an api route. each of the file in this folder
 // provides an api route that can be used to retrieve data from and write data to the database or file.
 //files in api folder only runs on the server side none of codes written here will ever reflect on the client side
 //thus is safe to use ur credentials here.


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4604));
module.exports = __webpack_exports__;

})();