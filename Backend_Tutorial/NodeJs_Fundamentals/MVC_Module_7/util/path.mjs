import { fileURLToPath } from "url";
import path from "path";

const fileName = fileURLToPath(import.meta.url);
const currentfileDir = path.dirname(fileName);

const rootDir = path.join(currentfileDir, "..");


export { rootDir as __dirname };
