const fs = require("fs");

const parceFile = (pathFile) => {
  let str = "";
  try {
    str = fs.readFileSync(pathFile, "utf-8");
  } catch (e) {
    return console.error(e.name + ": " + e.message);
  }
  return JSON.parse(str);
};

module.exports = parceFile;