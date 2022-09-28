import { dirname } from "path";
import { fileURLToPath } from "url";

export const __ = (path) => {
  const __filename = fileURLToPath(path);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
};
