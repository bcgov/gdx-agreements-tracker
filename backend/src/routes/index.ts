const allRoutes = () => {
  /*
Reference :https://gist.github.com/richmarr/1122217/578a2767ec126b9b9526b6ac6df7d9935ee190d8
*/

  let fs = require("fs");

  // Read in the libs from this directory and add them as exports
  // This way you can just reference
  fs.readdirSync("src/routes").forEach((file:any) => {
    if (file.indexOf(".js") > -1 && file !== "index.js") {
      exports[file.replace(".js", "")] = require("./" + file);
    }
  });
};

export default allRoutes;
