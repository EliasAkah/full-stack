//manually creating a __dirname directory path
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

//taking the file one level up that's is to the task folder level
const rootDir = path.resolve(__dirname, "..");

export default rootDir;

