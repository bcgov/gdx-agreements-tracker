const fs = require("fs");

/**
 * Changes text color of console
 */
const consoleSuccessColor = "\x1b[32m"; // Green
const consoleErrorColor = "\x1b[31m"; // Red
const consoleClearColors = "\x1b[0m"; // Sets console color back to white

/**
 * initializes node cli question .
 *
 */
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const templateTypes = ["controllers", "models", "routes", "validators"];

/**
 * Create an array of the template file paths for the script to read and use to create new API files
 */

const templateFilePaths = templateTypes.map((type) => {
  return `${__dirname}/template-files/${type}/index.js`;
});

/**
 * Generic console error message
 * @param {*} message
 */
const sayError = (message) => {
  console.error(`${consoleErrorColor}${message}${consoleClearColors}`);
};

/**
 * Generic console success message
 * @param {*} message
 */
const saySuccess = (message) => {
  console.log(`${consoleSuccessColor}${message}${consoleClearColors}`);
};

/**
 * This function asks the user what the name of their database table is. Once the users inputs a value in the console and presses enter the script either creates the appropriate API files or
 * errors because the files already exists.  If there is an error because the files already exist, the script will ask again to enter the name of a database table to build the API for.
 */
class createAPIFiles {
  constructor() {
    this.databaseTableName = "";
    this.askTheQuestion();
  }

  askTheQuestion() {
    readline.question(
      "\n What is the name of the database table you'd like to create an API for? ",
      this.handleQuestionResponse.bind(this)
    );
  }

  handleQuestionResponse(databaseTableName) {
    this.databaseTableName = databaseTableName;

    if (this.checkFilesAlreadyExist()) {
      sayError(
        `Files for "${databaseTableName}" API endpoint already exist, please try again with a new name.`
      );
      this.askTheQuestion();
    } else {
      // We are done asking questions, close the readline so that we don't wait for more input.
      readline.close();
      this.generateNewFiles();
    }
  }

  checkFilesAlreadyExist() {
    for (const templateType of templateTypes) {
      if (fs.existsSync(`src/${templateType}/${this.databaseTableName}.js`)) {
        return true;
      }
    }
    return false;
  }

  generateNewFiles() {
    const mapObj = { $databaseTableName: this.databaseTableName };

    // Oldschool function declaration syntax, because we need to bind(), below.
    templateFilePaths.forEach(
      function (templateFilePath, i) {
        try {
          // Read the template file.
          let data = fs.readFileSync(templateFilePath, "utf8");

          // Replace the token in the templates.
          let variableReplacements = data.replace(
            /\$databaseTableName/gi,
            (matched) => mapObj[matched]
          );

          // Write the new file out.
          fs.appendFileSync(
            `src/${templateTypes[i]}/${this.databaseTableName}.js`,
            variableReplacements,
            "utf8"
          );
        } catch (err) {
          sayError("generateNewFiles error:" + err);
          return; // We are in a loop, move on to next file.
        }

        saySuccess(`Success! ${templateTypes[i]} created!`);
      }.bind(this)
    );
  }
}

new createAPIFiles();
