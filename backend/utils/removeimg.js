import fs from "fs";

export const removeimg = (path) => {
  fs.unlinkSync(path);
};
