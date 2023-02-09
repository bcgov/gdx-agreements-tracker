/*
Reference :https://gist.github.com/richmarr/1122217/578a2767ec126b9b9526b6ac6df7d9935ee190d8
*/

//* This function recursively goes through the routes directories and add each route file to fastify.  This is necessary because there are multiple layers of route folders.

const { readdirSync } = require("fs");

const getFileList = (dirName) => {
  let files = [];
  const items = readdirSync(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getFileList(`${dirName}/${item.name}`)];
    } else {
      let routeFile = `${dirName}/${item.name}`;
      routeFile = routeFile.replace("src/routes/", "");
      if ("/index.js" !== routeFile) {
        exports[routeFile.replace(".js", "")] = require("./" + routeFile);
      }
    }
  }
  return files;
};

getFileList("src/routes/");
