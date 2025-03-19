// manually defining the _dirname for EJS Modules
import path from "path";
import { fileURLToPath } from "url";

//manually creating the __dirname path
const __filename = fileURLToPath(import.meta.url);//convert full url of the current file returned by "import.meta.url" into normal path
const __dirname = path.dirname(__filename)// extract the directory path of the current file and pass to the variable __dirname

// ✅ Move up **one level** from `util/` to `ExpressJs/`
const rootDir = path.resolve(__dirname, "..");

export default rootDir;


//manually defining the _dirname for commonJs
//const path = require("path");
//module.exports = path.dirname(process.mainModule.filename) OR module.exports = path.dirname(require.main.filename)