// This is a tool, of course we can use console output.
/* eslint no-console: "off" */
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

const templateTypes = ["controllers", "models", "routes"];

/**
 * Create an array of the template file paths for the script to read and use to create new API files
 */

const templateFilePaths = templateTypes.map((type) => {
  return `${__dirname}/template-files/${type}/index.js`;
});

/**
 * Generic console error message
 *
 * @param {*} message The message to print.
 */
const sayError = (message) => {
  console.log(`${consoleErrorColor}${message}${consoleClearColors}`);
};

/**
 * Generic console success message
 *
 * @param {*} message The message to print.
 */
const saySuccess = (message) => {
  console.log(`${consoleSuccessColor}${message}${consoleClearColors}`);
};

/**
 * This function asks the user what the name of their database table is. Once the users inputs a value in the console and presses enter the script either creates the appropriate API files or
 * errors because the files already exists.  If there is an error because the files already exist, the script will ask again to enter the name of a database table to build the API for.
 */
class createReportFiles {
  constructor() {
    this.reportName = "";
    this.askTheQuestion();
  }

  askTheQuestion() {
    readline.question(
      "\n What is the name of the report in format 'Tab_x_y' \nx - tab number \ny - the report\n",
      this.handleQuestionResponse.bind(this)
    );
  }

  handleQuestionResponse(reportName) {
    this.reportName = reportName;

    if (this.checkFilesAlreadyExist()) {
      sayError(
        `Files for "${reportName}" report already exist, please try again with a new name.`
      );
      this.askTheQuestion();
    } else {
      // We are done asking questions, close the readline so that we don't wait for more input.
      readline.close();
      this.generateNewFiles();
      this.generateBlankTemplates();
    }
  }

  checkFilesAlreadyExist() {
    for (const templateType of templateTypes) {
      if (fs.existsSync(`src/${templateType}/reports/${this.reportName}.js`)) {
        return true;
      }
    }
    return false;
  }

  generateBlankTemplates() {
    const blankTemplates = [
      `reports/docx/index.docx`,
      `reports/xlsx/index.xlsx`
    ];
    // Oldschool function declaration syntax, because we need to bind(), below.
    blankTemplates.forEach((templateFilePath, i) => {
      try {
        // Read the template file.
        let data = fs.readFileSync(`${__dirname}/template-files/${templateFilePath}`, "utf8");


        // Write the new file out.
        fs.appendFileSync(
          `${templateFilePath.replace(/index/,this.reportName)}`,
          data,
          "utf8"
        );
      } catch (err) {
        sayError("generateNewFiles error:" + err);
        return; // We are in a loop, move on to next file.
      }

      saySuccess(`Success! ${templateFilePath} created!`);
    });
  }

  generateNewFiles() {
    const mapObj = { $reportName: this.reportName };

    // Oldschool function declaration syntax, because we need to bind(), below.
    templateFilePaths.forEach((templateFilePath, i) => {
      try {
        // Read the template file.
        let data = fs.readFileSync(templateFilePath, "utf8");

        // Replace the token in the templates.
        let variableReplacements = data.replace(
          /\$reportName/gi,
          (matched) => mapObj[matched]
        );

        // Write the new file out.
        fs.appendFileSync(
          `src/${templateTypes[i]}/reports/${this.reportName}.js`,
          variableReplacements,
          "utf8"
        );
      } catch (err) {
        sayError("generateNewFiles error:" + err);
        return; // We are in a loop, move on to next file.
      }

      saySuccess(`Success! ${templateTypes[i]} created!`);
    });
  }
}

new createReportFiles();
