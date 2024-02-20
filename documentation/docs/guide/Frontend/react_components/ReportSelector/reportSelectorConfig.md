# Report Selector Configuration

The `categoriesAndTypes` configuration file contains a list of report categories and types for use in the report selector component. Each category contains a list of report types with specific details such as label, description, parameters, and export options.

## Report Categories and Types

1. **Individual Project Reports**
   - **Projects Budget Summary**
     - Description: Shows deliverable amounts, budgets, amounts recovered, and remaining balance.
     - Parameters: project (required)
     - Export: PDF
   - **Project Quarterly Billing Request**
     - Description: Shows client billing information and summaries for each quarter/fiscal.
     - Parameters: project, fiscal, quarter (all required)
     - Export: PDF
   - **Project Quarterly Review**
     - Description: Project information, budget forecasting details.
     - Parameters: project (required)
     - Export: PDF
   - **Project Status (Most Recent)**
     - Description: Information on project status, sponsorship, goals, etc.
     - Parameters: project (required)
     - Export: PDF
   - **Project Status Summary**
     - Description: Summary of project status, goals, deliverables, etc.
     - Parameters: project (required)
     - Export: PDF

2. **Individual Contract Reports**
   - **Contract Summary**
     - Description: Summary report for an individual contract.
     - Parameters: contract (required)
     - Export: PDF

3. **Divisional Project Reports**
   - *Various types of reports with detailed descriptions and parameters.*

4. **Divisional Project Financials**
   - *Various types of reports with detailed descriptions and parameters.*

5. **Divisional Contract Financials**
   - *Various types of reports with detailed descriptions and parameters.*

## Usage

This configuration file can be imported and used in the report selector component to populate the category and report type options.
