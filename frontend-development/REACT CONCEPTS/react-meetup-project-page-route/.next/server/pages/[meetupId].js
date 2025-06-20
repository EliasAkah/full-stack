(() => {
var exports = {};
exports.id = 549;
exports.ids = [549];
exports.modules = {

/***/ 3780:
/***/ ((module) => {

// Exports
module.exports = {
	"detail": "MeetupDetail_detail__HjAUt"
};


/***/ }),

/***/ 8721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _meetupId_),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "mongodb"
var external_mongodb_ = __webpack_require__(8013);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./components/meetups/MeetupDetail.module.css
var MeetupDetail_module = __webpack_require__(3780);
var MeetupDetail_module_default = /*#__PURE__*/__webpack_require__.n(MeetupDetail_module);
;// CONCATENATED MODULE: ./components/meetups/MeetupDetail.js


function MeetDetail(props) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: (MeetupDetail_module_default()).detail,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                src: props.image,
                alt: props.title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                children: props.title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("address", {
                children: props.address
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: props.description
            })
        ]
    });
}
/* harmony default export */ const MeetupDetail = (MeetDetail);

;// CONCATENATED MODULE: ./pages/[meetupId]/index.js



const url = "REMOVED_SECRET/?retryWrites=true&w=majority&appName=MeetUps";
const client = new external_mongodb_.MongoClient(url);

function MeetupDetails(props) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: props.title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: props.description
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(MeetupDetail, {
                description: props.description,
                address: props.address,
                title: props.title,
                image: props.image
            })
        ]
    });
}
//function that defines all the dynmic page that are to be pregenerated during project build
async function getStaticPaths() {
    //fetch data from the server side or ApI
    await client.connect();
    const db = client.db("meetups");
    const meetupsIds = await db.collection("meetups").find({}, {
        _id: 1
    }).toArray(); //reurns an array of objects with each object containing only the id of their repective document
    console.log("these are meet up IDs:", meetupsIds);
    client.close();
    return {
        fallback: "blocking",
        paths: meetupsIds.map((meetupsId)=>({
                params: {
                    meetupId: meetupsId._id.toString()
                }
            }))
    };
}
// pre-generate page during build process
async function getStaticProps(context) {
    //fetch data from the server side or ApI
    const meetupID = context.params.meetupId;
    await client.connect();
    const db = client.db("meetups");
    const meetup = await db.collection("meetups").findOne({
        _id: new external_mongodb_.ObjectId(meetupID)
    }); //returns a document which _id === meetupID(meetupID is wrapped with ObjectId to ensure that the value corresponds with the _id in the database)
    console.log("these are meetup details:", meetup);
    client.close();
    return {
        props: {
            id: meetup._id.toString(),
            image: meetup.image,
            address: meetup.address,
            title: meetup.title,
            description: meetup.description
        }
    };
}
/* harmony default export */ const _meetupId_ = (MeetupDetails); //getStaticPaths => unction used inside a dynamic page component that defines all the dynamic page that are to be pregenerated during project build.
 //it used together only with getStaticProps();
 //it cannot be used with getServerSideProps or when neither getStaticProps() nor getServerSideProps is used.
 //fallback => use tell if all dynamic path has been listed or not
 //fallback:true => means all path has not been listed, thus nextjs is allowed to authomatically add them to the paths array.
 //fallback:false => means all path has been listed, thus nextjs is not allowed to authomatically add them to the paths array.
 //fallback:"blocking" => means all path has not been listed, thus nextjs is allowed to authomatically add them to the paths array.


/***/ }),

/***/ 8013:
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8721));
module.exports = __webpack_exports__;

})();