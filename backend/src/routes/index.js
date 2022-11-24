/*
Reference :https://gist.github.com/richmarr/1122217/578a2767ec126b9b9526b6ac6df7d9935ee190d8
*/

// let fs = require("fs");

// // Read in the libs from this directory and add them as exports
// // This way you can just reference
// fs.readdirSync("src/routes").forEach((file) => {
//   if (file.indexOf(".js") > -1 && file !== "index.js") {
//     exports[file.replace(".js", "")] = require("./" + file);
//   }
// });

const fs = require("fs");
const path = require("path");

// projects/closeout.js
// amendments.js

// const getAllFiles = function (dirPath) {
//   files = fs.readdirSync(dirPath);

//   let arrayOfFiles = [];

//   files.forEach(function (file) {
//     if (fs.statSync(dirPath + "/" + file).isDirectory()) {
//       arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
//     } else {
//       arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
//     }
//   });
//   console.log("arrayOfFiles", arrayOfFiles);

//   arrayOfFiles.forEach((file) => {
//     if (file.indexOf(".js") > -1 && file !== "index.js") {
//       exports[file.replace(".js", "")] = require("./" + file);
//     }
//   });
// };


// getAllFiles("src/routes");


files = fs.readdirSync("src/routes");

console.log('files', files)