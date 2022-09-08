import pino from "pino";
import {parse} from "path"


const log = (filename:any) => {
  const coreLogInstance = pino({
    // Set NODE_ENV environment variable to 'production' for OpenShift
    level: "production" === process.env.NODE_ENV ? "info" : "debug",
  });

  const getLogInstance = () => {
    return filename ? coreLogInstance.child({ component: parse(filename).name }) : coreLogInstance;
  };

  return {getLogInstance}
 
}

export default log