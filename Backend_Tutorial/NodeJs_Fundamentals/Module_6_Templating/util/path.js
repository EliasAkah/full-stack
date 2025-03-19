const path = require("path");

module.exports = path.dirname(require.main.filename); //fetches absolute path of the entry file and converts it into a directory
