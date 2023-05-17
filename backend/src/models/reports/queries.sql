--Query: _FiscalProjectBillingDraftQuery SQL:
SELECT ProjectBudget.Fiscal,
  Project.ProjectName,
  Project.ProjectNumber,
  Portfolio.PortfolioName,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount,
  ProjectBudget.DetailAmount,
  ProjectBudget.Q1_Amount,
  ProjectBudget.Q2_Amount,
  ProjectBudget.Q3_Amount,
  ProjectBudget.Q4_Amount,
  ProjectBudget.Recovered AS Expr1
FROM (
    Portfolio
    RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
  )
  LEFT JOIN (
    ProjectDeliverable
    LEFT JOIN ProjectBudget ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID;
--Query: _ProjectFinancialRecoverableBreakdownbyStob SQL:
SELECT Portfolio.PortfolioName,
  FiscalYear.FiscalYear,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.TotalProjectBudget,
  Left([projectbudget].[STOB], 2) AS 2DSTOB,
  Sum(ProjectBudget.DetailAmount) AS SumOfDetailAmount,
  ProjectBudget.STOB
FROM (
    Portfolio
    RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
  )
  RIGHT JOIN (
    ProjectDeliverable
    LEFT JOIN (
      FiscalYear
      RIGHT JOIN (
        ClientCoding
        RIGHT JOIN ProjectBudget ON ClientCoding.ID = ProjectBudget.ClientCodingID
      ) ON FiscalYear.ID = ProjectBudget.Fiscal
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
GROUP BY Portfolio.PortfolioName,
  FiscalYear.FiscalYear,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.TotalProjectBudget,
  Left([projectbudget].[STOB], 2),
  ProjectBudget.STOB
HAVING (
    (
      (FiscalYear.FiscalYear) Like "*" & [Enter Fiscal: ] & "*"
    )
    And (
      (Left(projectbudget.STOB, 2)) Like "63"
      Or (Left(projectbudget.STOB, 2)) = "88"
    )
  );
--Query: _ProjectFinancialRecoverableBreakdownbyStob_Crosstab SQL: TRANSFORM Count(
  [_ProjectFinancialRecoverableBreakdownbyStob].[FiscalYear]
) AS CountOfFiscalYear
SELECT [_ProjectFinancialRecoverableBreakdownbyStob].[ProjectNumber],
  [_ProjectFinancialRecoverableBreakdownbyStob].[ProjectName],
  Count(
    [_ProjectFinancialRecoverableBreakdownbyStob].[FiscalYear]
  ) AS [Total Of FiscalYear]
FROM _ProjectFinancialRecoverableBreakdownbyStob
GROUP BY [_ProjectFinancialRecoverableBreakdownbyStob].[ProjectNumber],
  [_ProjectFinancialRecoverableBreakdownbyStob].[ProjectName] PIVOT [_ProjectFinancialRecoverableBreakdownbyStob].[PortfolioName];
--Query: ~ sq_caaaProjectBudget ~ sq_cProjectDeliverableID SQL:
SELECT DISTINCTROW *
FROM ProjectDeliverable;
--Query: ~ sq_caaaProjectBudget ~ sq_cRecoveryArea SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_caaaProjectDeliverable1 ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_caaaProjectDeliverable1 ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_caudProjectDetail ~ sq_cClientCodingSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ClientCoding.ID,
      ClientCoding.ProjectID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      ClientCoding.ContactID,
      Contact.LastName,
      Contact.FirstName
    FROM Contact
      INNER JOIN ClientCoding ON Contact.ID = ClientCoding.ContactID
  ) AS audProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_caudProjectDetail ~ sq_cContact_Project SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Contact_Project.ContactID,
      Contact_Project.ProjectID,
      Contact_Project.ContactRole,
      Contact.LastName,
      Contact.FirstName,
      Contact.ID
    FROM Contact
      LEFT JOIN Contact_Project ON Contact.ID = Contact_Project.ContactID
    ORDER BY Contact.LastName
  ) AS audProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_caudProjectDetail ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_caudProjectDetail ~ sq_cMinistryID SQL:
SELECT Ministry.ID,
  Ministry.MinistryName
FROM Ministry
ORDER BY Ministry.MinistryShortName;
--Query: ~ sq_caudProjectDetail ~ sq_cPortfolioID SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_caudProjectDetail ~ sq_cProjectBudget Subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectDeliverable.DeliverableName,
      ProjectBudget.ID,
      ProjectBudget.Q1_Amount,
      ProjectBudget.Q2_Amount,
      ProjectBudget.Q3_Amount,
      ProjectBudget.Q4_Amount,
      ProjectBudget.Notes,
      ProjectBudget.ProjectDeliverableID,
      ProjectBudget.DetailAmount,
      ProjectBudget.RecoveryAmount,
      ProjectBudget.RecoveryArea,
      ProjectBudget.ResourceType,
      ProjectBudget.STOB,
      ProjectDeliverable.DeliverableAmount,
      ProjectDeliverable.RecoverableAmount,
      ProjectDeliverable.ProjectID,
      Portfolio.PortfolioName,
      Portfolio.ExpenseAuthority,
      Portfolio.Responsibility,
      Portfolio.ServiceLine,
      ProjectDeliverable.Fiscal
    FROM ProjectDeliverable
      RIGHT JOIN (
        Portfolio
        RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
      ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
    ORDER BY ProjectDeliverable.DeliverableName
  ) AS audProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_caudProjectDetail ~ sq_cProjectDeliverable subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectDeliverable AS audProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_caudProjectDetail ~ sq_cProjectManagerID SQL:
SELECT Contact.ID,
  [LastName] & ", " & [FirstName] AS Name
FROM Contact
ORDER BY Contact.LastName,
  Contact.FirstName;
--Query: ~ sq_cChangeRequest List subform_FORDELETION ~ sq_cFiscalYear SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cChangeRequest subform_FORDELETION ~ sq_cFiscalYear SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cChooseFiscalYear ~ sq_ccboFiscal SQL:
SELECT ID,
  CLng(ID) as FiscalYearID,
  FiscalYear
FROM FiscalYear
UNION
select -1,
  ID,
  'Current Fiscal and Active Projects'
from FiscalYear
where iscurrent <> 0
ORDER BY FiscalYear DESC;
--Query: ~ sq_cClientCodingSubform_OLD ~ sq_cAgreementID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cClientCodingSubform_OLD ~ sq_cContactID SQL:
SELECT DISTINCTROW *
FROM Contact;
--Query: ~ sq_cContact Details ~ sq_cBusinessAreaID SQL:
SELECT DISTINCTROW *
FROM BusinessArea;
--Query: ~ sq_cContact Details ~ sq_ccboGoToContact SQL:
SELECT ContactDetailsQuery.ID,
  ContactDetailsQuery.LastName,
  ContactDetailsQuery.FirstName,
  ContactDetailsQuery.Email
FROM ContactDetailsQuery
WHERE (((ContactDetailsQuery.ID) <> Nz([Form] ! [ID], 0)))
ORDER BY ContactDetailsQuery.LastName;
--Query: ~ sq_cContact Details ~ sq_cMinistryID SQL:
SELECT DISTINCTROW *
FROM Ministry;
--Query: ~ sq_cContactList_Orig ~ sq_cCity SQL:
SELECT DISTINCTROW *
FROM Contact;
--Query: ~ sq_cContactList_Orig ~ sq_cMinistryID SQL:
SELECT Ministry.*
FROM Ministry
ORDER BY Ministry.MinistryShortName;
--Query: ~ sq_cContactList_Orig ~ sq_cProject Filter SQL:
SELECT Contact.[ID],
  Contact.LastName,
  Contact.FirstName
FROM Contact
WHERE (((Contact.[ID]) <> Nz([Form] ! [ID], 0)))
ORDER BY Contact.LastName,
  Contact.FirstName;
--Query: ~ sq_cContactList ~ sq_ccboContact SQL:
SELECT Contact.ID,
  [LastName] & ", " & [FirstName] AS Expr1
FROM Contact
ORDER BY [LastName] & ", " & [FirstName];
--Query: ~ sq_cContactList ~ sq_cMinistryID SQL:
SELECT Ministry.ID,
  Ministry.MinistryName AS Ministry,
  Ministry.MinistryShortName AS [Short Name],
  IIf([IsActive] = 0, "No", "Yes") AS [Active?]
FROM Ministry
ORDER BY IIf([IsActive] = 0, "No", "Yes") DESC,
  Ministry.MinistryName;
--Query: ~ sq_cContractAmendmentSubform ~ sq_csfrmContractAmendmentType SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ContractAmendment_AmendmentType.*,
      AmendmentType.AmendmentTypeName
    FROM ContractAmendment_AmendmentType
      INNER JOIN AmendmentType ON ContractAmendment_AmendmentType.AmendmentTypeID = AmendmentType.ID
    ORDER BY AmendmentType.AmendmentTypeName
  ) AS ContractAmendmentSubform
WHERE ([__ID] = ContractAmendmentID);
--Query: ~ sq_cContractAmendmentTypeSubform ~ sq_ccboAmendmentType SQL:
SELECT AmendmentType.ID,
  AmendmentType.AmendmentTypeName AS [Amendment Type],
  IIf([AmendmentType].[Inactive] <> 0, 'Yes', 'No') AS [Inactive?]
FROM AmendmentType
ORDER BY IIf([AmendmentType].[Inactive] <> 0, 'Yes', 'No'),
  AmendmentType.AmendmentTypeName;
--Query: ~ sq_cContractAmendmentTypeSubform ~ sq_clstAmendmentType SQL:
SELECT AmendmentType.ID,
  AmendmentType.AmendmentTypeName AS [Amendment Type],
  IIf([AmendmentType].[Inactive] <> 0, 'Yes', 'No') AS Inactive
FROM AmendmentType
ORDER BY AmendmentType.AmendmentTypeName,
  IIf([AmendmentType].[Inactive] <> 0, 'Yes', 'No');
--Query: ~ sq_cContractDeliverable Subform_FORDELETTION ~ sq_cContractID SQL:
SELECT DISTINCTROW *
FROM Contract;
--Query: ~ sq_cContractDeliverable Subform_FORDELETTION ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cContractDeliverable Subform_FORDELETTION ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cContractDetail_ORIG ~ sq_cContractAmendmentSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ContractAmendment AS ContractDetail_ORIG
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail_ORIG ~ sq_cContractDeliverable SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ContractDeliverable.*,
      ProjectDeliverable.DeliverableName AS ProjectDeliverableName
    FROM ContractDeliverable
      LEFT JOIN ProjectDeliverable ON ContractDeliverable.ProjectDeliverableID = ProjectDeliverable.ID
  ) AS ContractDetail_ORIG
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail_ORIG ~ sq_cContractInvoiceFixedSubform SQL: PARAMETERS __txtInvoiceID Value;
SELECT DISTINCTROW *
FROM (
    SELECT InvoiceDetail.*,
      ContractDeliverable.IsExpense
    FROM ContractDeliverable
      INNER JOIN InvoiceDetail ON ContractDeliverable.ID = InvoiceDetail.ContractDeliverableID
    WHERE (
        (
          (InvoiceDetail.ContractDeliverableID) Is Not Null
        )
      )
  ) AS ContractDetail_ORIG
WHERE ([__txtInvoiceID] = InvoiceID);
--Query: ~ sq_cContractDetail_ORIG ~ sq_cContractInvoiceHourlySubform SQL: PARAMETERS __txtInvoiceID Value;
SELECT DISTINCTROW *
FROM (
    SELECT InvoiceDetail.*
    FROM InvoiceDetail
    WHERE (((InvoiceDetail.ContractResourceID) Is Not Null))
  ) AS ContractDetail_ORIG
WHERE ([__txtInvoiceID] = InvoiceID);
--Query: ~ sq_cContractDetail_ORIG ~ sq_cContractInvoiceSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Invoice.*
    FROM Invoice
    ORDER BY Invoice.ID
  ) AS ContractDetail_ORIG
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail_ORIG ~ sq_cContractResource SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM Contract_Resource AS ContractDetail_ORIG
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail_ORIG ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cContractDetail_ORIG ~ sq_cProcurementMethod SQL:
SELECT ProcurementMethod.ID,
  [ProcurementMethod] & " (" & [ProcurementMethodCode] & ")" AS Expr1,
  ProcurementMethod.ProcurementMethodCode
FROM ProcurementMethod;
--Query: ~ sq_cContractDetail_ORIG ~ sq_cProjectID SQL:
SELECT Project.ID,
  Project.ProjectNumber AS [Project #],
  Project.ProjectName AS [Project Name],
  Project.ProjectStatus AS Status
FROM Project
ORDER BY IIf([ProjectStatus] = 'Active', 0, 1),
  Project.ProjectNumber;
--Query: ~ sq_cContractDetail_ORIG ~ sq_csfrSubcontractor SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ContractSubcontractor AS ContractDetail_ORIG
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail_ORIG ~ sq_cSIDInternalCoding SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM SIDInternalCoding AS ContractDetail_ORIG
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail_ORIG ~ sq_cSupplierID SQL:
SELECT Supplier.ID,
  Supplier.SupplierName
FROM Supplier;
--Query: ~ sq_cContractDetail ~ sq_cContractAmendmentSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ContractAmendment AS ContractDetail
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail ~ sq_cContractDeliverable SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ContractDeliverable.*,
      ProjectDeliverable.DeliverableName AS ProjectDeliverableName
    FROM ContractDeliverable
      LEFT JOIN ProjectDeliverable ON ContractDeliverable.ProjectDeliverableID = ProjectDeliverable.ID
  ) AS ContractDetail
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail ~ sq_cContractInvoiceFixedSubform SQL: PARAMETERS __txtInvoiceID Value;
SELECT DISTINCTROW *
FROM (
    SELECT InvoiceDetail.*,
      ContractDeliverable.IsExpense
    FROM ContractDeliverable
      INNER JOIN InvoiceDetail ON ContractDeliverable.ID = InvoiceDetail.ContractDeliverableID
    WHERE (
        (
          (InvoiceDetail.ContractDeliverableID) Is Not Null
        )
      )
  ) AS ContractDetail
WHERE ([__txtInvoiceID] = InvoiceID);
--Query: ~ sq_cContractDetail ~ sq_cContractInvoiceHourlySubform SQL: PARAMETERS __txtInvoiceID Value;
SELECT DISTINCTROW *
FROM (
    SELECT InvoiceDetail.*
    FROM InvoiceDetail
    WHERE (((InvoiceDetail.ContractResourceID) Is Not Null))
  ) AS ContractDetail
WHERE ([__txtInvoiceID] = InvoiceID);
--Query: ~ sq_cContractDetail ~ sq_cContractInvoiceSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Invoice.*
    FROM Invoice
    ORDER BY Invoice.ID
  ) AS ContractDetail
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail ~ sq_cContractResource SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM Contract_Resource AS ContractDetail
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cContractDetail ~ sq_cProcurementMethod SQL:
SELECT ProcurementMethod.ID,
  [ProcurementMethod] & " (" & [ProcurementMethodCode] & ")" AS Expr1,
  ProcurementMethod.ProcurementMethodCode
FROM ProcurementMethod;
--Query: ~ sq_cContractDetail ~ sq_cProjectID SQL:
SELECT Project.ID,
  Project.ProjectNumber AS [Project #],
  Project.ProjectName AS [Project Name],
  Project.ProjectStatus AS Status
FROM Project
ORDER BY IIf([ProjectStatus] in ('Active'), 0, 1),
  Project.ProjectNumber;
--Query: ~ sq_cContractDetail ~ sq_csfrSubcontractor SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ContractSubcontractor AS ContractDetail
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail ~ sq_cSIDInternalCoding SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM SIDInternalCoding AS ContractDetail
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail ~ sq_cSupplierID SQL:
SELECT Supplier.ID,
  Supplier.SupplierName
FROM Supplier
ORDER BY Supplier.SupplierName;
--Query: ~ sq_cContractDetail1 ~ sq_cCombo42 SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cContractDetail1 ~ sq_cCombo55 SQL:
SELECT DISTINCTROW *
FROM Supplier;
--Query: ~ sq_cContractDetail1 ~ sq_cContractDeliverable Subform1 SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ContractDeliverable.ID,
      ContractDeliverable.DeliverableName,
      ContractDeliverable.Description,
      ContractDeliverable.CompletionDate,
      ContractDeliverable.DeliverableAmount,
      ContractDeliverable.Comments,
      ContractDeliverable.Fiscal,
      ContractDeliverable.DeliverableStatus,
      ContractDeliverable.ContractID,
      ContractDeliverable.ProjectDeliverableID,
      Contract.ProjectID
    FROM ContractDeliverable
      LEFT JOIN Contract ON ContractDeliverable.ContractID = Contract.ID
  ) AS ContractDetail1
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail1 ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cContractDetail1 ~ sq_cInvoice SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Supplier.SupplierName,
      Invoice.ID,
      Supplier.Address,
      Supplier.City,
      Supplier.Province,
      Supplier.PostalCode,
      Invoice.InvoiceNumber,
      Invoice.ContractID,
      Invoice.Type,
      Invoice.Fiscal,
      Invoice.InvoiceDate,
      Invoice.BillingPeriod,
      Invoice.DueDate,
      Contract.ContractNumber,
      Contract.CONumber,
      Invoice.InvoiceTotal
    FROM (
        Contract
        LEFT JOIN Supplier ON Contract.SupplierID = Supplier.ID
      )
      RIGHT JOIN Invoice ON Contract.ID = Invoice.ContractID
  ) AS ContractDetail1
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail1 ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cContractDetail1 ~ sq_cSelectResourceQuery1 SQL: PARAMETERS __ID Value,
__SupplierID Value;
SELECT DISTINCTROW *
FROM SelectResourceQuery AS ContractDetail1
WHERE (([__ID] = ContractID))
  AND ([__SupplierID] = SupplierID);
--Query: ~ sq_cContractDetail1 ~ sq_cSIDInternalCoding SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM SIDInternalCoding AS ContractDetail1
WHERE ([__ID] = ContractID);
--Query: ~ sq_cContractDetail1 ~ sq_cSupplierID SQL:
SELECT DISTINCTROW *
FROM Supplier;
--Query: ~ sq_cContractDetail1 ~ sq_cSupplierResourcesAvailable1 SQL: PARAMETERS __SupplierID Value;
SELECT DISTINCTROW *
FROM (
    SELECT SupplierRate.Rate,
      ResourceType.ResourceType,
      SupplierRate.Competency,
      Resource.ResourceLastName,
      Supplier.SupplierName,
      Resource_SupplierRates.ID,
      Resource.ResourceID,
      Resource_SupplierRates.SupplierRateID,
      Supplier.ID
    FROM Resource
      LEFT JOIN (
        Supplier
        RIGHT JOIN (
          ResourceType
          RIGHT JOIN (
            SupplierRate
            RIGHT JOIN Resource_SupplierRates ON SupplierRate.ID = Resource_SupplierRates.SupplierRateID
          ) ON ResourceType.ID = SupplierRate.ResourceTypeID
        ) ON Supplier.ID = SupplierRate.SupplierID
      ) ON Resource.ResourceID = Resource_SupplierRates.ResourceID
    ORDER BY ResourceType.ResourceType,
      SupplierRate.Competency,
      Resource.ResourceLastName
  ) AS ContractDetail1
WHERE ([__SupplierID] = SupplierID);
--Query: ~ sq_cContractList_OLD ~ sq_ccboFilterFavorites SQL:
SELECT "-1" as [ID],
  "(Manage Filters)" as [Filter Name]
FROM Filters
UNION
SELECT "0" as [ID],
  "(Clear Filter)" as [Filter Name]
FROM Filters
UNION
SELECT ID,
  [Filter Name]
FROM Filters
WHERE (
    (
      ([Object Name]) = [Application].[CurrentObjectName]
    )
  )
ORDER BY [Filter Name];
--Query: ~ sq_cContractList_OLD ~ sq_ccboReports SQL:
SELECT MSysObjects.Name
FROM MSysObjects
WHERE (
    ((MSysObjects.Name) Not Like "*Subreport*")
    AND ((MSysObjects.Type) = -32764)
  )
ORDER BY MSysObjects.Name;
--Query: ~ sq_cContractSubcontractor ~ sq_ccboSubcontractor SQL:
SELECT Subcontractor.*
FROM Subcontractor
ORDER BY Subcontractor.SubcontractorName;
--Query: ~ sq_cCopy Of JV_Detail Subform ~ sq_cDeliverableID SQL:
SELECT ProjectDeliverable.ID,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.ProjectID
FROM ProjectDeliverable
WHERE (
    (
      (ProjectDeliverable.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  );
--Query: ~ sq_cCopy Of JV_Detail Subform ~ sq_cJV_ID SQL:
SELECT DISTINCTROW *
FROM JV;
--Query: ~ sq_cCopy Of ProjectBudget subform ~ sq_cClientCodingID SQL:
SELECT ClientCoding.ID,
  [FirstName] & " " & [LastName] AS [Financial Contact],
  ClientCoding.ProjectID
FROM Contact
  RIGHT JOIN ClientCoding ON Contact.ID = ClientCoding.ContactID
WHERE (
    (
      (ClientCoding.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  );
--Query: ~ sq_cCopy Of ProjectBudget subform ~ sq_cCombo55 SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cCopy Of ProjectBudget subform ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cCopy Of ProjectBudget subform ~ sq_cProjectDeliverableID SQL:
SELECT ProjectDeliverable.ID,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.Description,
  ProjectDeliverable.StartDate,
  ProjectDeliverable.CompletionDate,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount,
  ProjectDeliverable.ProjectID,
  ProjectDeliverable.Comments,
  ProjectDeliverable.Fiscal,
  ProjectDeliverable.DeliverableStatus
FROM ProjectDeliverable
WHERE (
    (
      (ProjectDeliverable.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  )
ORDER BY ProjectDeliverable.DeliverableName;
--Query: ~ sq_cCopy Of ProjectBudget subform ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cCopy Of ProjectBudget subform ~ sq_cRecoveryArea SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_cInvoice_FORDELETION ~ sq_cContractID SQL:
SELECT DISTINCTROW *
FROM Contract;
--Query: ~ sq_cInvoice_FORDELETION ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cInvoice_FORDELETION ~ sq_cInvoiceDetail subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM InvoiceDetail AS Invoice_FORDELETION
WHERE ([__ID] = InvoiceID);
--Query: ~ sq_cJV_Detail Subform ~ sq_cDeliverableID SQL:
SELECT ProjectDeliverable.ID,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.ProjectID
FROM ProjectDeliverable
WHERE (
    (
      (ProjectDeliverable.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  );
--Query: ~ sq_cJV_Detail Subform ~ sq_cJV_ID SQL:
SELECT DISTINCTROW *
FROM JV;
--Query: ~ sq_cJV_Query1_KEEP ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cJV ~ sq_cClientCodingID SQL:
SELECT ClientCoding.ID,
  Nz([ProgramArea], [FirstName] & " " & [LastName]) AS Description,
  [FirstName] & " " & [LastName] AS [Finacial Contact],
  Ministry.MinistryShortName AS Ministry
FROM (
    Contact
    RIGHT JOIN ClientCoding ON Contact.ID = ClientCoding.ContactID
  )
  LEFT JOIN Ministry ON Contact.MinistryID = Ministry.ID
WHERE (
    (
      (ClientCoding.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  );
--Query: ~ sq_cJV ~ sq_cFiscalYearID SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cJV ~ sq_cJV_Detail_Subform SQL: PARAMETERS __ProjectID Value,
__FiscalYearID Value;
SELECT DISTINCTROW *
FROM JV_Detail_Query AS JV
WHERE (([__ProjectID] = ProjectID))
  AND ([__FiscalYearID] = Fiscal);
--Query: ~ sq_cJV1_KEEP ~ sq_cCombo13 SQL:
SELECT [Project].[ID],
  [Project].[ProjectNumber],
  [Project].[ProjectName]
FROM Project
ORDER BY [ProjectName];
--Query: ~ sq_cJV1_KEEP ~ sq_cCombo15 SQL:
SELECT ClientCoding.ID,
  ClientCoding.ContactID,
  ClientCoding.ProjectID
FROM ClientCoding
WHERE (((ClientCoding.ProjectID) = [Combo13]));
--Query: ~ sq_cJV1_KEEP ~ sq_cCombo17 SQL:
SELECT DISTINCT FiscalYear.ID,
  FiscalYear.FiscalYear,
  ProjectDeliverable.ProjectID
FROM ProjectDeliverable
  RIGHT JOIN (
    FiscalYear
    RIGHT JOIN ProjectBudget ON FiscalYear.ID = ProjectBudget.Fiscal
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
WHERE (((ProjectDeliverable.ProjectID) = [Combo13]));
--Query: ~ sq_cNavigation Form_OLD ~ sq_csfrmContractList SQL:
SELECT Contract.ID,
  Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Supplier.SupplierName,
  RecordsetToString(
    "select SubcontractorName from ContractSubcontractor inner join Subcontractor on ContractSubcontractor.SubcontractorID = Subcontractor.ID where ContractID = " & [Contract].[ID],
    "",
    ", "
  ) AS Subcontractors,
  Contract.StartDate,
  Contract.EndDate,
  [TotalFeeAmount] + [TotalExpenseAmount] AS TotalPayable,
  [TotalFeeAmount] + [TotalExpenseAmount] - Nz(Sum([UnitAmount] * [Rate]), 0) AS Remaining,
  Contract.Status,
  FiscalYear.FiscalYear,
  Contract.Fiscal,
  Project.ProjectNumber,
  Project.ID AS ProjectID,
  RecordsetToString(
    "select PortfolioAbbrev from SIDInternalCoding inner join Portfolio on SIDInternalCoding.PortfolioID = Portfolio.ID where ContractID = " & [Contract].[ID],
    "",
    ", "
  ) AS Portfolios
FROM (
    (
      Supplier
      RIGHT JOIN (
        (
          Contract
          LEFT JOIN Project ON Contract.ProjectID = Project.ID
        )
        INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
      ) ON Supplier.ID = Contract.SupplierID
    )
    LEFT JOIN Invoice ON Contract.ID = Invoice.ContractID
  )
  LEFT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
GROUP BY Contract.ID,
  Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Supplier.SupplierName,
  RecordsetToString(
    "select SubcontractorName from ContractSubcontractor inner join Subcontractor on ContractSubcontractor.SubcontractorID = Subcontractor.ID where ContractID = " & [Contract].[ID],
    "",
    ", "
  ),
  Contract.StartDate,
  Contract.EndDate,
  [TotalFeeAmount] + [TotalExpenseAmount],
  Contract.Status,
  FiscalYear.FiscalYear,
  Contract.Fiscal,
  Project.ProjectNumber,
  Project.ID,
  RecordsetToString(
    "select PortfolioAbbrev from SIDInternalCoding inner join Portfolio on SIDInternalCoding.PortfolioID = Portfolio.ID where ContractID = " & [Contract].[ID],
    "",
    ", "
  ),
  IIf(
    [Contract].[Status] = 'Complete'
    Or [Contract].[Status] = 'Cancelled',
    1,
    0
  ),
  Contract.CONumber
ORDER BY IIf(
    [Contract].[Status] = 'Complete'
    Or [Contract].[Status] = 'Cancelled',
    1,
    0
  ),
  Contract.CONumber;
--Query: ~ sq_cNavigation Form_OLD ~ sq_csfrmProjectList SQL:
SELECT Project.Fiscal,
  Project.ID,
  FiscalYear.FiscalYear,
  Project.ProjectNumber,
  Project.ProjectVersion,
  Project.ProjectName,
  [FirstName] & " " & [LastName] AS [Project Manager],
  Portfolio.PortfolioName,
  Project.Classification,
  Project.ProjectType,
  Project.Funding,
  Project.Recoverable,
  Project.MinistryID,
  Project.AgreementType,
  Project.AgreementStartDate,
  Project.AgreementEndDate,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  Project.Description,
  Project.InitiationDate,
  Project.Lead,
  Project.Notes,
  Project.ProjectStatus,
  Project.PlannedStartDate,
  Project.PlannedEndDate,
  Project.AgreementSignedDate
FROM Contact
  RIGHT JOIN (
    Portfolio
    RIGHT JOIN (
      FiscalYear
      RIGHT JOIN Project ON FiscalYear.ID = Project.Fiscal
    ) ON Portfolio.ID = Project.PortfolioID
  ) ON Contact.ID = Project.ProjectManager
ORDER BY IIf([ProjectStatus] = "Active", 0, 1),
  Project.ProjectNumber;
--Query: ~ sq_cNextAvailableNumberTest ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cNextAvailableNumberTest ~ sq_cMinistryID SQL:
SELECT DISTINCTROW *
FROM Ministry;
--Query: ~ sq_cNextAvailableNumberTest ~ sq_cPortfolioID SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_cNextAvailableNumberTest ~ sq_cProjectManager SQL:
SELECT DISTINCTROW *
FROM Contact;
--Query: ~ sq_cProjectBilling subform ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectBilling subform ~ sq_cProjectDeliverableID SQL:
SELECT ProjectDeliverable.ID,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.Description,
  ProjectDeliverable.StartDate,
  ProjectDeliverable.CompletionDate,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount,
  ProjectDeliverable.ProjectID,
  ProjectDeliverable.Comments,
  ProjectDeliverable.Fiscal,
  ProjectDeliverable.DeliverableStatus
FROM ProjectDeliverable
WHERE (
    (
      (ProjectDeliverable.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  )
ORDER BY ProjectDeliverable.DeliverableName;
--Query: ~ sq_cProjectBilling subform ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cProjectBilling subform ~ sq_cRecoveryArea SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_cProjectBudget Query1 Subform ~ sq_cClientCodingID SQL:
SELECT DISTINCTROW *
FROM ClientCoding;
--Query: ~ sq_cProjectBudget Query1 Subform ~ sq_cProjectDeliverableID SQL:
SELECT DISTINCTROW *
FROM ProjectDeliverable;
--Query: ~ sq_cProjectBudget subform ~ sq_cClientCodingID SQL:
SELECT ClientCoding.ID,
  Nz([ProgramArea], [FirstName] & " " & [LastName]) AS [Program Area],
  [FirstName] & " " & [LastName] AS [Financial Contact],
  Ministry.MinistryShortName AS Ministry
FROM (
    Contact
    RIGHT JOIN ClientCoding ON Contact.ID = ClientCoding.ContactID
  )
  LEFT JOIN Ministry ON Contact.MinistryID = Ministry.ID
WHERE (
    (
      (ClientCoding.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  );
--Query: ~ sq_cProjectBudget subform ~ sq_cCombo55 SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cProjectBudget subform ~ sq_cContractID SQL:
SELECT Contract.ID,
  Contract.CONumber AS [CO Number],
  Contract.COversion AS [Amendment #],
  Contract.ContractNumber AS [Contract Number]
FROM Contract
WHERE (
    (
      (Contract.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  )
ORDER BY Contract.CONumber;
--Query: ~ sq_cProjectBudget subform ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectBudget subform ~ sq_cProjectDeliverableID SQL:
SELECT ProjectDeliverable.ID,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.Description,
  ProjectDeliverable.StartDate,
  ProjectDeliverable.CompletionDate,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount,
  ProjectDeliverable.ProjectID,
  ProjectDeliverable.Comments,
  ProjectDeliverable.Fiscal,
  ProjectDeliverable.DeliverableStatus
FROM ProjectDeliverable
WHERE (
    (
      (ProjectDeliverable.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  )
ORDER BY ProjectDeliverable.DeliverableName;
--Query: ~ sq_cProjectBudget subform ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cProjectBudget subform ~ sq_cRecoveryArea SQL:
SELECT Portfolio.ID,
  Portfolio.PortfolioName AS Portfolio,
  Portfolio.PortfolioAbbrev AS Code,
  IIf([Inactive] = 0, "No", "Yes") AS [Inactive?]
FROM Portfolio
ORDER BY IIf([Inactive] = 0, "No", "Yes"),
  Portfolio.PortfolioAbbrev;
--Query: ~ sq_cProjectBudget ~ sq_cClientCodingID SQL:
SELECT DISTINCTROW *
FROM ClientCoding;
--Query: ~ sq_cProjectBudget ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectBudget ~ sq_cJV Subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM JV AS ProjectBudget
WHERE ([__ID] = ProjectBudgetID);
--Query: ~ sq_cProjectBudget ~ sq_cProjectDeliverableID SQL:
SELECT DISTINCTROW *
FROM ProjectDeliverable;
--Query: ~ sq_cProjectBudget ~ sq_cRecoveryArea SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_cProjectBudget3 ~ sq_cClientCodingID SQL:
SELECT DISTINCTROW *
FROM ClientCoding;
--Query: ~ sq_cProjectBudget3 ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectBudget3 ~ sq_cProjectDeliverableID SQL:
SELECT DISTINCTROW *
FROM ProjectDeliverable;
--Query: ~ sq_cProjectBudget3 ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cProjectBudget3 ~ sq_cRecoveryArea SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_cProjectBudgetDeliverableTotals ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cProjectBudgetFiscalTotals ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectBudgetFiscalTotals ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cProjectBudgetQuery subform ~ sq_cCombo54 SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_cProjectBudgetQuery subform ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectBudgetQuery subform ~ sq_cProjectDeliverableID SQL:
SELECT DISTINCTROW *
FROM ProjectDeliverable;
--Query: ~ sq_cProjectBudgetQuery subform ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cProjectBudgetRecoverableAreaTotals ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cProjectChangeRequestSubform_OLD ~ sq_cFiscalYear SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectChangeRequestSubform ~ sq_cFiscalYear SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectChangeRequestSubform ~ sq_csfrmChangeRequestType SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ChangeRequest_CRType.ChangeRequestID,
      ChangeRequest_CRType.CRTypeID,
      CRType.CRTypeName
    FROM ChangeRequest_CRType
      INNER JOIN CRType ON ChangeRequest_CRType.CRTypeID = CRType.ID
    ORDER BY CRType.CRTypeName
  ) AS ProjectChangeRequestSubform
WHERE ([__ID] = ChangeRequestID);
--Query: ~ sq_cProjectChangeRequestTypeSubform ~ sq_ccboCRType SQL:
SELECT CRType.ID,
  CRType.CRTypeName AS Type,
  IIf([CRType].[Inactive] <> 0, 'Yes', 'No') AS [Inactive?]
FROM CRType
ORDER BY IIf([CRType].[Inactive] <> 0, 'Yes', 'No'),
  CRType.CRTypeName;
--Query: ~ sq_cProjectDeliverable subform_old ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectDeliverable subform_old ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cProjectDeliverable subform ~ sq_ccboHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  HealthIndicator.Inactive AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectDeliverable subform ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectDeliverable ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectDeliverable ~ sq_cProjectBudget Subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectBudget.ProjectDeliverableID,
      ProjectDeliverable.DeliverableName,
      ProjectBudget.ID,
      ProjectBudget.Q1_Amount,
      ProjectBudget.Q1_Recovered,
      ProjectBudget.Q2_Amount,
      ProjectBudget.Q2_Recovered,
      ProjectBudget.Q3_Amount,
      ProjectBudget.Q3_Recovered,
      ProjectBudget.Q4_Amount,
      ProjectBudget.Q4_Recovered,
      ProjectBudget.Notes,
      ProjectBudget.DetailAmount,
      ProjectBudget.RecoveryArea,
      ProjectBudget.ResourceType,
      ProjectBudget.STOB,
      ProjectDeliverable.DeliverableAmount,
      ProjectDeliverable.ProjectID,
      Portfolio.PortfolioName,
      Portfolio.ExpenseAuthority,
      Portfolio.Responsibility,
      Portfolio.ServiceLine,
      ProjectBudget.Fiscal,
      ProjectBudget.ClientCodingID,
      ProjectDeliverable.RecoverableAmount
    FROM ProjectDeliverable
      RIGHT JOIN (
        Portfolio
        RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
      ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
    ORDER BY ProjectBudget.Fiscal,
      ProjectDeliverable.DeliverableName
  ) AS ProjectDeliverable
WHERE ([__ID] = ProjectDeliverableID);
--Query: ~ sq_cProjectDetail_old ~ sq_cChangeRequest subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ChangeRequest AS ProjectDetail_old
WHERE ([__ID] = LinkID);
--Query: ~ sq_cProjectDetail_old ~ sq_cClientCodingSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ClientCoding.ID,
      ClientCoding.ProjectID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      ClientCoding.ContactID,
      ClientCoding.ClientAmount,
      ClientCoding.[ProgramArea]
    FROM ClientCoding
  ) AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cCombo307 SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectDetail_old ~ sq_cContact_Project SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Contact_Project.ContactID,
      Contact_Project.ProjectID,
      Contact_Project.ContactRole,
      Contact.LastName,
      Contact.FirstName,
      Contact_Project.ID
    FROM Contact
      LEFT JOIN Contact_Project ON Contact.ID = Contact_Project.ContactID
    ORDER BY Contact.LastName
  ) AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cFiscal SQL:
SELECT FiscalYear.*
FROM FiscalYear
ORDER BY FiscalYear.FiscalYear;
--Query: ~ sq_cProjectDetail_old ~ sq_cJV SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT JV.ID AS JV_ID,
      JV.JVNumber,
      JV.BilledDate,
      JV.Amount,
      JV.Quarter,
      JV.FiscalYearID,
      JV.ClientCodingID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      Contact.[FirstName] & " " & [LastName] AS [Financial Contact],
      ClientCoding.ClientAmount,
      JV.ProjectID
    FROM Contact
      RIGHT JOIN (
        ClientCoding
        INNER JOIN JV ON ClientCoding.[ID] = JV.[ClientCodingID]
      ) ON Contact.ID = ClientCoding.ContactID
  ) AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cJV_Summary SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT JV.JVNumber,
      JV.BilledDate,
      JV.Amount,
      JV.Quarter,
      JV.ProjectID,
      JV.FiscalYearID,
      JV.ClientCodingID,
      ClientCoding.ID,
      ClientCoding.ProjectID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      ClientCoding.ContactID,
      ClientCoding.ClientAmount,
      [FirstName] & " " & [LastName] AS [Financial Contact]
    FROM (
        ClientCoding
        LEFT JOIN Contact ON ClientCoding.ContactID = Contact.ID
      )
      RIGHT JOIN JV ON ClientCoding.ID = JV.ClientCodingID
  ) AS ProjectDetail_old
WHERE ([__ID] = JV.ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cMinistryID SQL:
SELECT Ministry.ID,
  Ministry.MinistryName
FROM Ministry
ORDER BY Ministry.MinistryShortName;
--Query: ~ sq_cProjectDetail_old ~ sq_cPortfolioID SQL:
SELECT Portfolio.ID,
  Portfolio.PortfolioName,
  Portfolio.ExpenseAuthority,
  Portfolio.Responsibility,
  Portfolio.ServiceLine
FROM Portfolio
ORDER BY Portfolio.PortfolioName;
--Query: ~ sq_cProjectDetail_old ~ sq_cProjectBudget Subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectBudget.ProjectDeliverableID,
      ProjectDeliverable.DeliverableName,
      ProjectBudget.ID,
      ProjectBudget.Q1_Amount,
      ProjectBudget.Q1_Recovered,
      ProjectBudget.Q2_Amount,
      ProjectBudget.Q2_Recovered,
      ProjectBudget.Q3_Amount,
      ProjectBudget.Q3_Recovered,
      ProjectBudget.Q4_Amount,
      ProjectBudget.Q4_Recovered,
      ProjectBudget.Notes,
      ProjectBudget.DetailAmount,
      ProjectBudget.RecoveryArea,
      ProjectBudget.ResourceType,
      ProjectBudget.STOB,
      ProjectDeliverable.DeliverableAmount,
      ProjectDeliverable.ProjectID,
      Portfolio.PortfolioName,
      Portfolio.ExpenseAuthority,
      Portfolio.Responsibility,
      Portfolio.ServiceLine,
      ProjectBudget.Fiscal,
      ProjectBudget.ClientCodingID,
      ProjectDeliverable.RecoverableAmount,
      ProjectBudget.ContractID
    FROM ProjectDeliverable
      INNER JOIN (
        Portfolio
        RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
      ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
    ORDER BY ProjectBudget.Fiscal,
      ProjectDeliverable.DeliverableName
  ) AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cProjectBudgetDeliverableTotals SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectBudgetDeliverableTotals AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cProjectBudgetFiscalTotals SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectBudgetFiscalTotals AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cProjectBudgetRecoverableTotals SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectBudgetRecoverableAreaTotals AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cProjectDeliverable subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectDeliverable AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cProjectDeliverableTotalsByFiscalForm SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectDeliverableTotalsByFiscal AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_old ~ sq_cProjectManagerID SQL:
SELECT Contact.ID,
  [LastName] & ", " & [FirstName] AS Name
FROM Contact
ORDER BY Contact.LastName,
  Contact.FirstName;
--Query: ~ sq_cProjectDetail_old ~ sq_cProjectRisk SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectRisk.*,
      RiskFactor.SortOrder
    FROM RiskFactor
      INNER JOIN ProjectRisk ON RiskFactor.ID = ProjectRisk.RiskFactorID
  ) AS ProjectDetail_old
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cChangeRequest subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ChangeRequest AS ProjectDetail_Orig
WHERE ([__ID] = LinkID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cChild505 SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectMilestone AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cClientCodingSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ClientCoding.ID,
      ClientCoding.ProjectID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      ClientCoding.ContactID,
      ClientCoding.ClientAmount,
      ClientCoding.[ProgramArea]
    FROM ClientCoding
  ) AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cCombo307 SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectDetail_Orig ~ sq_cContact_Project SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Contact_Project.ContactID,
      Contact_Project.ProjectID,
      Contact_Project.ContactRole,
      Contact.LastName,
      Contact.FirstName,
      Contact.ID
    FROM Contact
      LEFT JOIN Contact_Project ON Contact.ID = Contact_Project.ContactID
    ORDER BY Contact.LastName
  ) AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cFiscal SQL:
SELECT FiscalYear.*
FROM FiscalYear
ORDER BY FiscalYear.FiscalYear;
--Query: ~ sq_cProjectDetail_Orig ~ sq_cFiscalYear SQL:
SELECT Contact.ID,
  [FirstName] & " " & [LastName] AS Name,
  Contact.LastName AS [Last Name],
  Contact.FirstName AS [First Name],
  Ministry.MinistryShortName AS Ministry
FROM Contact
  LEFT JOIN Ministry ON Contact.MinistryID = Ministry.ID
ORDER BY Contact.LastName,
  Contact.FirstName;
--Query: ~ sq_cProjectDetail_Orig ~ sq_cJV SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT JV.ID AS JV_ID,
      JV.JVNumber,
      JV.BilledDate,
      JV.Amount,
      JV.Quarter,
      JV.FiscalYearID,
      JV.ClientCodingID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      Contact.[FirstName] & " " & [LastName] AS [Financial Contact],
      ClientCoding.ClientAmount,
      JV.ProjectID
    FROM Contact
      RIGHT JOIN (
        ClientCoding
        INNER JOIN JV ON ClientCoding.[ID] = JV.[ClientCodingID]
      ) ON Contact.ID = ClientCoding.ContactID
  ) AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cJV_Summary SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT JV.JVNumber,
      JV.BilledDate,
      JV.Amount,
      JV.Quarter,
      JV.ProjectID,
      JV.FiscalYearID,
      JV.ClientCodingID,
      ClientCoding.ID,
      ClientCoding.ProjectID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      ClientCoding.ContactID,
      ClientCoding.ClientAmount,
      [FirstName] & " " & [LastName] AS [Financial Contact]
    FROM (
        ClientCoding
        LEFT JOIN Contact ON ClientCoding.ContactID = Contact.ID
      )
      RIGHT JOIN JV ON ClientCoding.ID = JV.ClientCodingID
  ) AS ProjectDetail_Orig
WHERE ([__ID] = JV.ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cMinistryID SQL:
SELECT Ministry.ID,
  Ministry.MinistryName
FROM Ministry
ORDER BY Ministry.MinistryShortName;
--Query: ~ sq_cProjectDetail_Orig ~ sq_cPortfolioID SQL:
SELECT Portfolio.ID,
  Portfolio.PortfolioName,
  Portfolio.ExpenseAuthority,
  Portfolio.Responsibility,
  Portfolio.ServiceLine
FROM Portfolio
ORDER BY Portfolio.PortfolioName;
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectBudget Subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectBudget.ProjectDeliverableID,
      ProjectDeliverable.DeliverableName,
      ProjectBudget.ID,
      ProjectBudget.Q1_Amount,
      ProjectBudget.Q1_Recovered,
      ProjectBudget.Q2_Amount,
      ProjectBudget.Q2_Recovered,
      ProjectBudget.Q3_Amount,
      ProjectBudget.Q3_Recovered,
      ProjectBudget.Q4_Amount,
      ProjectBudget.Q4_Recovered,
      ProjectBudget.Notes,
      ProjectBudget.DetailAmount,
      ProjectBudget.RecoveryArea,
      ProjectBudget.ResourceType,
      ProjectBudget.STOB,
      ProjectDeliverable.DeliverableAmount,
      ProjectDeliverable.ProjectID,
      Portfolio.PortfolioName,
      Portfolio.ExpenseAuthority,
      Portfolio.Responsibility,
      Portfolio.ServiceLine,
      ProjectBudget.Fiscal,
      ProjectBudget.ClientCodingID,
      ProjectDeliverable.RecoverableAmount,
      ProjectBudget.ContractID
    FROM ProjectDeliverable
      RIGHT JOIN (
        Portfolio
        RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
      ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
    ORDER BY ProjectBudget.Fiscal,
      ProjectDeliverable.DeliverableName
  ) AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectBudgetDeliverableTotals SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectBudgetDeliverableTotals AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectBudgetFiscalTotals SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectBudgetFiscalTotals AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectBudgetRecoverableTotals SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectBudgetRecoverableAreaTotals AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectDeliverable subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectDeliverable AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectDeliverableTotalsByFiscalForm SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectDeliverableTotalsByFiscal AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectLessonSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectLesson AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectManagerID SQL:
SELECT Contact.ID,
  [LastName] & ", " & [FirstName] AS Name
FROM Contact
ORDER BY Contact.LastName,
  Contact.FirstName;
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectRisk SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectRisk.*,
      RiskFactor.SortOrder
    FROM RiskFactor
      INNER JOIN ProjectRisk ON RiskFactor.ID = ProjectRisk.RiskFactorID
  ) AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_cProjectStatusSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectStatus AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_csfrmMilestonesOnStatus SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectMilestone.ID,
      ProjectMilestone.ProjectID,
      ProjectMilestone.Description,
      FiscalYear.FiscalYear,
      ProjectMilestone.TargetCompletionDate,
      ProjectMilestone.ActualCompletionDate,
      ProjectMilestone.Status,
      ProjectMilestone.HealthID
    FROM FiscalYear
      INNER JOIN ProjectMilestone ON FiscalYear.ID = ProjectMilestone.FiscalID
    ORDER BY ProjectMilestone.ActualCompletionDate DESC,
      ProjectMilestone.TargetCompletionDate DESC
  ) AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_csfrmProjectDeliverablesOnStatus SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectDeliverable.ID,
      ProjectDeliverable.ProjectID,
      ProjectDeliverable.DeliverableName,
      ProjectDeliverable.StartDate,
      ProjectDeliverable.CompletionDate,
      ProjectDeliverable.PercentComplete,
      ProjectDeliverable.DeliverableStatus,
      ProjectDeliverable.HealthID
    FROM ProjectDeliverable
    WHERE (((Nz([IsExpense], False)) = False))
  ) AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail_Orig ~ sq_csfrmStrategicAlignment SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectStrategicAlignment.*
    FROM StrategicAlignment
      INNER JOIN ProjectStrategicAlignment ON StrategicAlignment.ID = ProjectStrategicAlignment.StrategicAlignmentID
    ORDER BY StrategicAlignment.SortOrder
  ) AS ProjectDetail_Orig
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cChangeRequest subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ChangeRequest AS ProjectDetail
WHERE ([__ID] = LinkID);
--Query: ~ sq_cProjectDetail ~ sq_cChild505 SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectMilestone AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cClientCodingSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ClientCoding.ID,
      ClientCoding.ProjectID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      ClientCoding.ContactID,
      ClientCoding.ClientAmount,
      ClientCoding.ProgramArea,
      ClientCoding.ExpenseAuthorityName
    FROM ClientCoding
  ) AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cContact_Project SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Contact_Project.ContactID,
      Contact_Project.ProjectID,
      Contact_Project.ContactRole,
      Contact.LastName,
      Contact.FirstName,
      Contact_Project.ID
    FROM Contact
      LEFT JOIN Contact_Project ON Contact.ID = Contact_Project.ContactID
    ORDER BY Contact.LastName
  ) AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cJV SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT JV.ID AS JV_ID,
      JV.JVNumber,
      JV.BilledDate,
      JV.Amount,
      JV.Quarter,
      JV.FiscalYearID,
      JV.ClientCodingID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      Contact.[FirstName] & " " & [LastName] AS [Financial Contact],
      ClientCoding.ClientAmount,
      JV.ProjectID
    FROM Contact
      RIGHT JOIN (
        ClientCoding
        INNER JOIN JV ON ClientCoding.[ID] = JV.[ClientCodingID]
      ) ON Contact.ID = ClientCoding.ContactID
  ) AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cJV_Summary SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT JV.JVNumber,
      JV.BilledDate,
      JV.Amount,
      JV.Quarter,
      JV.ProjectID,
      JV.FiscalYearID,
      JV.ClientCodingID,
      ClientCoding.ID,
      ClientCoding.ProjectID,
      ClientCoding.Client,
      ClientCoding.ResponsibilityCentre,
      ClientCoding.ServiceLine,
      ClientCoding.STOB,
      ClientCoding.ProjectCode,
      ClientCoding.ContactID,
      ClientCoding.ClientAmount,
      [FirstName] & " " & [LastName] AS [Financial Contact]
    FROM (
        ClientCoding
        LEFT JOIN Contact ON ClientCoding.ContactID = Contact.ID
      )
      RIGHT JOIN JV ON ClientCoding.ID = JV.ClientCodingID
  ) AS ProjectDetail
WHERE ([__ID] = JV.ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectBudget Subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectBudget.ProjectDeliverableID,
      ProjectDeliverable.DeliverableName,
      ProjectBudget.ID,
      ProjectBudget.Q1_Amount,
      ProjectBudget.Q1_Recovered,
      ProjectBudget.Q2_Amount,
      ProjectBudget.Q2_Recovered,
      ProjectBudget.Q3_Amount,
      ProjectBudget.Q3_Recovered,
      ProjectBudget.Q4_Amount,
      ProjectBudget.Q4_Recovered,
      ProjectBudget.Notes,
      ProjectBudget.DetailAmount,
      ProjectBudget.RecoveryArea,
      ProjectBudget.ResourceType,
      ProjectBudget.STOB,
      ProjectDeliverable.DeliverableAmount,
      ProjectDeliverable.ProjectID,
      Portfolio.PortfolioName,
      Portfolio.ExpenseAuthority,
      Portfolio.Responsibility,
      Portfolio.ServiceLine,
      ProjectBudget.Fiscal,
      ProjectBudget.ClientCodingID,
      ProjectDeliverable.RecoverableAmount,
      ProjectBudget.ContractID
    FROM ProjectDeliverable
      INNER JOIN (
        Portfolio
        RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
      ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
    ORDER BY ProjectBudget.Fiscal,
      ProjectDeliverable.DeliverableName
  ) AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectBudgetDeliverableTotals SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectBudgetDeliverableTotals AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectBudgetFiscalTotals SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectBudgetFiscalTotals AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectBudgetRecoverableTotals SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectBudgetRecoverableAreaTotals AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectDeliverable subform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectDeliverable AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectDeliverableTotalsByFiscalForm SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectDeliverableTotalsByFiscal AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectEngagement SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectEngagement AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectLessonSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectLesson AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectRisk SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectRisk.*,
      RiskFactor.SortOrder
    FROM RiskFactor
      INNER JOIN ProjectRisk ON RiskFactor.ID = ProjectRisk.RiskFactorID
  ) AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_cProjectStatusSubform SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ProjectStatus AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_csfrmMilestonesOnStatus SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectMilestone.ID,
      ProjectMilestone.ProjectID,
      ProjectMilestone.Description,
      FiscalYear.FiscalYear,
      ProjectMilestone.TargetCompletionDate,
      ProjectMilestone.ActualCompletionDate,
      ProjectMilestone.Status,
      ProjectMilestone.HealthID
    FROM FiscalYear
      INNER JOIN ProjectMilestone ON FiscalYear.ID = ProjectMilestone.FiscalID
    ORDER BY ProjectMilestone.ActualCompletionDate DESC,
      ProjectMilestone.TargetCompletionDate DESC
  ) AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_csfrmProjectDeliverablesOnStatus SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectDeliverable.ID,
      ProjectDeliverable.ProjectID,
      ProjectDeliverable.DeliverableName,
      ProjectDeliverable.StartDate,
      ProjectDeliverable.CompletionDate,
      ProjectDeliverable.PercentComplete,
      ProjectDeliverable.DeliverableStatus,
      ProjectDeliverable.HealthID
    FROM ProjectDeliverable
    WHERE (((Nz([IsExpense], False)) = False))
  ) AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectDetail ~ sq_csfrmStrategicAlignment SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectStrategicAlignment.*
    FROM StrategicAlignment
      INNER JOIN ProjectStrategicAlignment ON StrategicAlignment.ID = ProjectStrategicAlignment.StrategicAlignmentID
    ORDER BY StrategicAlignment.SortOrder
  ) AS ProjectDetail
WHERE ([__ID] = ProjectID);
--Query: ~ sq_cProjectEngagement ~ sq_ccboBudgetHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  HealthIndicator.Inactive AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectEngagement ~ sq_ccboHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  IIf(HealthIndicator.Inactive, "Yes", "No") AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectEngagement ~ sq_ccboPhase SQL:
SELECT EngagementPhase.ID,
  EngagementPhase.Description,
  IIf([Inactive], "Yes", "No") AS [Inactive?]
FROM EngagementPhase
ORDER BY IIf([Inactive], "Yes", "No"),
  EngagementPhase.SortOrderForms;
--Query: ~ sq_cProjectEngagement ~ sq_ccboScheduleHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  HealthIndicator.Inactive AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectEngagement ~ sq_ccboTeamHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  HealthIndicator.Inactive AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectEngagement ~ sq_cFiscalYear SQL:
SELECT Contact.ID,
  [FirstName] & " " & [LastName] AS Name,
  Contact.LastName AS [Last Name],
  Contact.FirstName AS [First Name],
  Ministry.MinistryShortName AS Ministry
FROM Contact
  LEFT JOIN Ministry ON Contact.MinistryID = Ministry.ID
ORDER BY Contact.LastName,
  Contact.FirstName;
--Query: ~ sq_cProjectEngagement ~ sq_csfrmProjectEngagementChecklist SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectEngagementChecklistItem.*,
      EngagementChecklistItem.SortOrder
    FROM ProjectEngagementChecklistItem
      INNER JOIN EngagementChecklistItem ON ProjectEngagementChecklistItem.EngagementChecklistItemID = EngagementChecklistItem.ID
  ) AS ProjectEngagement
WHERE ([__ID] = ProjectEngagementID);
--Query: ~ sq_cProjectLessonSubform ~ sq_ccboLessonCategory SQL:
SELECT LessonCategory.ID,
  LessonCategory.LessonCategoryName AS Category,
  LessonCategory.Inactive
FROM LessonCategory
ORDER BY LessonCategory.Inactive DESC,
  LessonCategory.LessonCategoryName;
--Query: ~ sq_cProjectLessonSubform ~ sq_ccboLessonCategoryList SQL:
SELECT LessonCategory.ID,
  LessonCategory.LessonCategoryName AS Category,
  LessonCategory.Inactive
FROM LessonCategory
ORDER BY LessonCategory.Inactive DESC,
  LessonCategory.LessonCategoryName;
--Query: ~ sq_cProjectMilestoneSubform ~ sq_ccboHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  HealthIndicator.Inactive AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectMilestoneSubform ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cProjectStatusSubform ~ sq_ccboBudgetHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  HealthIndicator.Inactive AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectStatusSubform ~ sq_ccboHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  HealthIndicator.Inactive AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectStatusSubform ~ sq_ccboPhase SQL:
SELECT ProjectPhase.ID,
  ProjectPhase.PhaseName AS Phase,
  ProjectPhase.Inactive AS [Inactive?]
FROM ProjectPhase
ORDER BY ProjectPhase.Inactive DESC,
  ProjectPhase.SortOrder;
--Query: ~ sq_cProjectStatusSubform ~ sq_ccboScheduleHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  HealthIndicator.Inactive AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectStatusSubform ~ sq_ccboTeamHealthID SQL:
SELECT HealthIndicator.ID,
  HealthIndicator.HealthName AS [Health Indicator],
  HealthIndicator.Inactive AS [Inactive?]
FROM HealthIndicator
ORDER BY HealthIndicator.Inactive DESC,
  HealthIndicator.SortOrder;
--Query: ~ sq_cProjectStatusSubform ~ sq_cFiscalYear SQL:
SELECT Contact.ID,
  [FirstName] & " " & [LastName] AS Name,
  Contact.LastName AS [Last Name],
  Contact.FirstName AS [First Name],
  Ministry.MinistryShortName AS Ministry
FROM Contact
  LEFT JOIN Ministry ON Contact.MinistryID = Ministry.ID
ORDER BY Contact.LastName,
  Contact.FirstName;
--Query: ~ sq_cReportLauncher ~ sq_ccboEndFiscal SQL:
SELECT FiscalYear.ID,
  FiscalYear.FiscalYear
FROM FiscalYear
ORDER BY FiscalYear.FiscalYear DESC;
--Query: ~ sq_cReportLauncher ~ sq_ccboFiscalYear SQL:
SELECT FiscalYear.ID,
  FiscalYear.FiscalYear
FROM FiscalYear
ORDER BY FiscalYear.FiscalYear DESC;
--Query: ~ sq_cReportLauncher ~ sq_ccboReportCategory SQL:
SELECT ReportCategory.ID,
  ReportCategory.ReportCategoryName
FROM ReportCategory
WHERE (((ReportCategory.Inactive) = False))
ORDER BY ReportCategory.SortOrder,
  ReportCategory.ReportCategoryName;
--Query: ~ sq_cReportLauncher ~ sq_clstPortfolio SQL:
SELECT Portfolio.ID,
  [PortfolioAbbrev] & IIf([Inactive], " (Inactive)", "") AS Expr1
FROM Portfolio
ORDER BY Portfolio.Inactive,
  Portfolio.PortfolioAbbrev;
--Query: ~ sq_cReportLauncher ~ sq_csfrmReports SQL: PARAMETERS __cboReportCategory Value;
SELECT DISTINCTROW *
FROM (
    SELECT ID,
      ReportCategoryID,
      ReportName,
      ReportObjectName,
      SortOrder
    FROM Report
    WHERE Inactive = 0
    ORDER BY SortOrder
  ) AS ReportLauncher
WHERE ([__cboReportCategory] = ReportCategoryID);
--Query: ~ sq_cReportSpec ~ sq_ccboReportCategory SQL:
SELECT ReportCategory.ID,
  ReportCategory.ReportCategoryName AS Category,
  IIf([Inactive] = 0, "No", "Yes") AS [Inactive?]
FROM ReportCategory
ORDER BY IIf([Inactive] = 0, "No", "Yes"),
  ReportCategory.SortOrder;
--Query: ~ sq_cReportSpec ~ sq_ccboReportLookup SQL:
SELECT Report.ReportObjectName,
  Report.ReportName,
  Report.ID,
  1 As Sort
FROM Report
UNION
SELECT TOP 1 "All",
  "All",
  0,
  0
FROM MSysObjects
ORDER BY Sort,
  Report.ReportObjectName;
--Query: ~ sq_cReportSpec ~ sq_cChild10 SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM ReportControlField AS ReportSpec
WHERE ([__ID] = ReportID);
--Query: ~ sq_cReportSpecSubform ~ sq_ccboControl SQL:
SELECT ReportControl.ID,
  ReportControl.ControlName AS Control,
  IIf([Inactive] = 0, "No", "Yes") AS [Inactive?]
FROM ReportControl
ORDER BY IIf([Inactive] = 0, "No", "Yes"),
  ReportControl.ControlName;
--Query: ~ sq_cReportSpecSubform ~ sq_ccboField SQL:
SELECT ReportField.ID,
  ReportField.FieldName AS Field,
  ReportField.Delimiter,
  IIf([Inactive] = 0, "No", "Yes") AS [Inactive?]
FROM ReportField
ORDER BY IIf([Inactive] = 0, "No", "Yes"),
  ReportField.FieldName;
--Query: ~ sq_cResource_SupplierRates Subform1 ~ sq_cCombo9 SQL:
SELECT Resource.ResourceID,
  Resource.ResourceLastName,
  SupplierRate.SupplierID
FROM Resource
  LEFT JOIN (
    SupplierRate
    RIGHT JOIN Resource_SupplierRates ON SupplierRate.ID = Resource_SupplierRates.SupplierRateID
  ) ON Resource.ResourceID = Resource_SupplierRates.ResourceID
WHERE (
    (
      (SupplierRate.SupplierID) = [Forms] ! [SupplierRate] ! [SupplierID]
    )
  )
ORDER BY Resource.ResourceLastName;
--Query: ~ sq_cResource_SupplierRates Subform1 ~ sq_cResourceID SQL:
SELECT DISTINCTROW *
FROM Resource;
--Query: ~ sq_cResource_SupplierRates Subform1 ~ sq_cSubContractor SQL:
SELECT DISTINCT SubContractor
FROM Resource;
--Query: ~ sq_cResource_SupplierRates Subform1 ~ sq_cSupplierRateID SQL:
SELECT DISTINCTROW *
FROM SupplierRate;
--Query: ~ sq_cResource ~ sq_ccboSubcontractorFilter SQL:
SELECT Subcontractor.ID,
  Subcontractor.SubcontractorName
FROM Subcontractor
ORDER BY Subcontractor.SubcontractorName;
--Query: ~ sq_cResource ~ sq_ccboSubcontractorID SQL:
SELECT Subcontractor.ID,
  Subcontractor.SubcontractorName
FROM Subcontractor
ORDER BY Subcontractor.SubcontractorName;
--Query: ~ sq_cResource ~ sq_ccboSupplierFilter SQL:
SELECT Supplier.ID,
  Supplier.SupplierName AS Name,
  Supplier.SupplierNumber AS [Supp #]
FROM Supplier
ORDER BY Supplier.SupplierName;
--Query: ~ sq_cResource ~ sq_ccboSupplierID SQL:
SELECT Supplier.ID,
  Supplier.SupplierName AS Name,
  Supplier.SupplierNumber AS [Supp #]
FROM Supplier
ORDER BY Supplier.SupplierName;
--Query: ~ sq_cSave ProjectBudget subform ~ sq_cCombo54 SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_cSave ProjectBudget subform ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cSIDInternalCoding_OLD ~ sq_cPortfolioIDctl SQL:
SELECT Portfolio.ID,
  Portfolio.PortfolioName AS Name,
  Portfolio.Responsibility,
  Portfolio.ServiceLine AS [Service Line],
  Portfolio.ExpenseAuthority AS [Expense Authority]
FROM Portfolio
ORDER BY Portfolio.PortfolioName;
--Query: ~ sq_cSIDInternalCoding ~ sq_csfrmRecoveryInfo SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT SIDInternalCoding_RecoveryType.SIDInternalCodingID,
      SIDInternalCoding_RecoveryType.RecoveryTypeID,
      RecoveryType.RecoveryTypeName
    FROM SIDInternalCoding_RecoveryType
      INNER JOIN RecoveryType ON SIDInternalCoding_RecoveryType.RecoveryTypeID = RecoveryType.ID
  ) AS SIDInternalCoding
WHERE ([__ID] = SIDInternalCodingID);
--Query: ~ sq_cSupplierRateSubform ~ sq_cResourceTypeID SQL:
SELECT ResourceType.*,
  *
FROM ResourceType
ORDER BY ResourceType.ResourceType;
--Query: ~ sq_cSupplierRateSubform ~ sq_cSupplierID SQL:
SELECT DISTINCTROW *
FROM Supplier;
--Query: ~ sq_cSupplierResourcesAvailable2 ~ sq_cCombo24 SQL:
SELECT [SupplierResourcesAvailable2].[ResourceLastName]
FROM SupplierResourcesAvailable2;
--Query: ~ sq_cSuppliers ~ sq_ccboSupplier SQL:
SELECT Supplier.ID,
  Supplier.SupplierName AS Name,
  Supplier.SupplierLegalName AS [Legal Name],
  Supplier.SupplierNumber AS [Supplier #]
FROM Supplier
ORDER BY Supplier.SupplierName;
--Query: ~ sq_cSuppliers ~ sq_cChild33 SQL: PARAMETERS __ID Long;
SELECT DISTINCTROW *
FROM SupplierRate AS Suppliers
WHERE ([__ID] = SupplierID);
--Query: ~ sq_cTest ProjectBudget subform ~ sq_cClientCodingID SQL:
SELECT ClientCoding.ID,
  [FirstName] & " " & [LastName] AS [Financial Contact],
  ClientCoding.ProjectID
FROM Contact
  RIGHT JOIN ClientCoding ON Contact.ID = ClientCoding.ContactID
WHERE (
    (
      (ClientCoding.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  );
--Query: ~ sq_cTest ProjectBudget subform ~ sq_cCombo55 SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cTest ProjectBudget subform ~ sq_cFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_cTest ProjectBudget subform ~ sq_cProjectDeliverableID SQL:
SELECT ProjectDeliverable.ID,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.Description,
  ProjectDeliverable.StartDate,
  ProjectDeliverable.CompletionDate,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount,
  ProjectDeliverable.ProjectID,
  ProjectDeliverable.Comments,
  ProjectDeliverable.Fiscal,
  ProjectDeliverable.DeliverableStatus
FROM ProjectDeliverable
WHERE (
    (
      (ProjectDeliverable.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  )
ORDER BY ProjectDeliverable.DeliverableName;
--Query: ~ sq_cTest ProjectBudget subform ~ sq_cProjectID SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_cTest ProjectBudget subform ~ sq_cRecoveryArea SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_drpt_C_Summary_ORIG ~ sq_dChild90 SQL: PARAMETERS __ContractID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Contract.ID AS ContractID,
      FiscalYear.FiscalYear,
      Contract.CONumber,
      Invoice.InvoiceDate,
      Invoice.BillingPeriod,
      Invoice.InvoiceNumber,
      Sum([Rate] * [UnitAmount]) AS Amount
    FROM (
        (
          Contract
          LEFT JOIN Invoice ON Contract.ID = Invoice.ContractID
        )
        LEFT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
      )
      LEFT JOIN FiscalYear ON Invoice.Fiscal = FiscalYear.ID
    GROUP BY Contract.ID,
      FiscalYear.FiscalYear,
      Contract.CONumber,
      Invoice.InvoiceDate,
      Invoice.BillingPeriod,
      Invoice.InvoiceNumber
  ) AS rpt_C_Summary_ORIG
WHERE ([__ContractID] = ContractID);
--Query: ~ sq_drpt_C_Summary_ORIG ~ sq_dChild92 SQL: PARAMETERS __ContractID Value;
SELECT DISTINCTROW *
FROM qry_C_Summary_Amendments AS rpt_C_Summary_ORIG
WHERE ([__ContractID] = ContractID);
--Query: ~ sq_drpt_C_Summary_WORKING ~ sq_dChild113 SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM qry_C_Summary_Amendments AS rpt_C_Summary_WORKING
WHERE ([__ID] = ContractID);
--Query: ~ sq_drpt_C_Summary_WORKING ~ sq_dChild90 SQL: PARAMETERS __ID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Contract.ID AS ContractID,
      Contract.CONumber,
      Invoice.InvoiceDate,
      Invoice.BillingPeriod,
      Invoice.InvoiceNumber,
      Sum([Rate] * [UnitAmount]) AS Amount
    FROM (
        Contract
        LEFT JOIN Invoice ON Contract.ID = Invoice.ContractID
      )
      LEFT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
    GROUP BY Contract.ID,
      Contract.CONumber,
      Invoice.InvoiceDate,
      Invoice.BillingPeriod,
      Invoice.InvoiceNumber
  ) AS rpt_C_Summary_WORKING
WHERE ([__ID] = ContractID);
--Query: ~ sq_drpt_C_Summary ~ sq_dChild112 SQL: PARAMETERS __ContractID Value;
SELECT DISTINCTROW *
FROM __LOCAL_C_SUMMARY_PAYMENTSUMMARY AS rpt_C_Summary
WHERE ([__ContractID] = ContractID);
--Query: ~ sq_drpt_C_Summary ~ sq_dChild90 SQL: PARAMETERS __ContractID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Contract.ID AS ContractID,
      FiscalYear.FiscalYear,
      Contract.CONumber,
      Invoice.InvoiceDate,
      Invoice.BillingPeriod,
      Invoice.InvoiceNumber,
      Sum([Rate] * [UnitAmount]) AS Amount
    FROM (
        (
          Contract
          LEFT JOIN Invoice ON Contract.ID = Invoice.ContractID
        )
        LEFT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
      )
      LEFT JOIN FiscalYear ON Invoice.Fiscal = FiscalYear.ID
    GROUP BY Contract.ID,
      FiscalYear.FiscalYear,
      Contract.CONumber,
      Invoice.InvoiceDate,
      Invoice.BillingPeriod,
      Invoice.InvoiceNumber
  ) AS rpt_C_Summary
WHERE ([__ContractID] = ContractID);
--Query: ~ sq_drpt_C_Summary ~ sq_dChild92 SQL: PARAMETERS __ContractID Value;
SELECT DISTINCTROW *
FROM qry_C_Summary_Amendments AS rpt_C_Summary
WHERE ([__ContractID] = ContractID);
--Query: ~ sq_drpt_P_BudgetSummary ~ sq_dChild63 SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Project.ID AS ProjectID,
      v_ChangeRequest_Denormalized.Version,
      v_ChangeRequest_Denormalized.InitiationDate,
      v_ChangeRequest_Denormalized.InitiatedBy,
      v_ChangeRequest_Denormalized.CRTypes,
      v_ChangeRequest_Denormalized.Summary
    FROM Project
      LEFT JOIN v_ChangeRequest_Denormalized ON Project.ID = v_ChangeRequest_Denormalized.LinkID
  ) AS rpt_P_BudgetSummary
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_drpt_P_BudgetSummary ~ sq_dsrpt_ProjectSummary_Contractsnew SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM v_rpt_ProjectSummary_Contracts AS rpt_P_BudgetSummary
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_drpt_P_EngagementStatus ~ sq_dsrpt_P_EngagementStatus SQL: PARAMETERS __ProjectEngagementID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectEngagementChecklistItem.ProjectEngagementID,
      EngagementChecklistItem.Description,
      ProjectEngagementChecklistItem.Checked,
      ProjectEngagementChecklistItem.DateChecked,
      EngagementChecklistItem.SortOrder
    FROM ProjectEngagementChecklistItem
      INNER JOIN EngagementChecklistItem ON ProjectEngagementChecklistItem.EngagementChecklistItemID = EngagementChecklistItem.ID
  ) AS rpt_P_EngagementStatus
WHERE ([__ProjectEngagementID] = ProjectEngagementID);
--Query: ~ sq_drpt_P_QuarterlyReview ~ sq_dProjectManager SQL:
SELECT Contact.ID,
  [FirstName] & " " & [LastName] AS Expr1
FROM Contact;
--Query: ~ sq_drpt_P_Status_MostRecent ~ sq_dsrpt_P_Status_Deliverables SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectDeliverable.ID,
      Project.ID AS ProjectID,
      IIf(
        [ProjectDeliverable].[ID] Is Null,
        "No Deliverables",
        [ProjectDeliverable].[DeliverableName]
      ) AS DeliverableName,
      ProjectDeliverable.StartDate,
      ProjectDeliverable.CompletionDate,
      ProjectDeliverable.DeliverableAmount,
      ProjectDeliverable.PercentComplete,
      HealthIndicator.ColourRed,
      HealthIndicator.ColourGreen,
      HealthIndicator.ColourBlue,
      ProjectDeliverable.DeliverableStatus
    FROM Project
      LEFT JOIN (
        HealthIndicator
        RIGHT JOIN ProjectDeliverable ON HealthIndicator.ID = ProjectDeliverable.HealthID
      ) ON Project.ID = ProjectDeliverable.ProjectID
    WHERE (
        (
          (ProjectDeliverable.IsExpense) = False
          Or (ProjectDeliverable.IsExpense) Is Null
        )
      )
  ) AS rpt_P_Status_MostRecent
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_drpt_P_Status_MostRecent ~ sq_dsrpt_P_Status_Milestones SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectMilestone.ID,
      Project.ID AS ProjectID,
      IIf(
        [ProjectMilestone].[ID] Is Null,
        "No Milestones",
        [ProjectMilestone].[Description]
      ) AS Description,
      ProjectMilestone.TargetCompletionDate,
      ProjectMilestone.Status,
      ProjectMilestone.ActualCompletionDate,
      HealthIndicator.ColourRed,
      HealthIndicator.ColourGreen,
      HealthIndicator.ColourBlue
    FROM Project
      LEFT JOIN (
        HealthIndicator
        RIGHT JOIN ProjectMilestone ON HealthIndicator.ID = ProjectMilestone.HealthID
      ) ON Project.ID = ProjectMilestone.ProjectID
  ) AS rpt_P_Status_MostRecent
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_drpt_P_StatusSummary ~ sq_dsrpt_P_Status_Deliverables SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectDeliverable.ID,
      Project.ID AS ProjectID,
      IIf(
        [ProjectDeliverable].[ID] Is Null,
        "No Deliverables",
        [ProjectDeliverable].[DeliverableName]
      ) AS DeliverableName,
      ProjectDeliverable.StartDate,
      ProjectDeliverable.CompletionDate,
      ProjectDeliverable.DeliverableAmount,
      ProjectDeliverable.PercentComplete,
      HealthIndicator.ColourRed,
      HealthIndicator.ColourGreen,
      HealthIndicator.ColourBlue,
      ProjectDeliverable.DeliverableStatus
    FROM Project
      LEFT JOIN (
        HealthIndicator
        RIGHT JOIN ProjectDeliverable ON HealthIndicator.ID = ProjectDeliverable.HealthID
      ) ON Project.ID = ProjectDeliverable.ProjectID
    WHERE (
        (
          (ProjectDeliverable.IsExpense) = False
          Or (ProjectDeliverable.IsExpense) Is Null
        )
      )
  ) AS rpt_P_StatusSummary
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_drpt_P_StatusSummary ~ sq_dsrpt_P_Status_Milestones SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectMilestone.ID,
      Project.ID AS ProjectID,
      IIf(
        [ProjectMilestone].[ID] Is Null,
        "No Milestones",
        [ProjectMilestone].[Description]
      ) AS Description,
      ProjectMilestone.TargetCompletionDate,
      ProjectMilestone.Status,
      ProjectMilestone.ActualCompletionDate,
      HealthIndicator.ColourRed,
      HealthIndicator.ColourGreen,
      HealthIndicator.ColourBlue
    FROM Project
      LEFT JOIN (
        HealthIndicator
        RIGHT JOIN ProjectMilestone ON HealthIndicator.ID = ProjectMilestone.HealthID
      ) ON Project.ID = ProjectMilestone.ProjectID
  ) AS rpt_P_StatusSummary
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_drpt_P_StatusSummary ~ sq_dsrpt_P_Status_StrategicAlignment SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM (
    SELECT ProjectStrategicAlignment.ProjectID,
      StrategicAlignment.Description,
      StrategicAlignment.ShortDescription
    FROM StrategicAlignment
      INNER JOIN ProjectStrategicAlignment ON StrategicAlignment.ID = ProjectStrategicAlignment.StrategicAlignmentID
    WHERE (((ProjectStrategicAlignment.Checked) = True))
  ) AS rpt_P_StatusSummary
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_drpt_P_StatusSummary ~ sq_dsrpt_P_StatusSummary SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM (
    SELECT Project.ID AS ProjectID,
      ProjectLesson.LessonCategoryID,
      ProjectLesson.LessonSubCategory,
      ProjectLesson.Lesson,
      ProjectLesson.Recommendations,
      LessonCategory.LessonCategoryName
    FROM Project
      LEFT JOIN (
        LessonCategory
        RIGHT JOIN ProjectLesson ON LessonCategory.ID = ProjectLesson.LessonCategoryID
      ) ON Project.ID = ProjectLesson.ProjectID
  ) AS rpt_P_StatusSummary
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_drpt_PA_ActiveProjectsbyPortfolio ~ sq_dProjectManager SQL:
SELECT Contact.ID,
  [FirstName] & " " & [LastName] AS Expr1
FROM Contact;
--Query: ~ sq_drpt_PA_Fiscal_Registry ~ sq_dProjectManager SQL:
SELECT Contact.ID,
  [FirstName] & " " & [LastName] AS Expr1
FROM Contact;
--Query: ~ sq_drpt_PA_InformationSecurity ~ sq_dFiscal SQL:
SELECT DISTINCTROW *
FROM FiscalYear;
--Query: ~ sq_drpt_PA_InformationSecurity ~ sq_dProjectManager SQL:
SELECT DISTINCTROW *
FROM Contact;
--Query: ~ sq_drpt_PA_Ministry ~ sq_dProjectManager SQL:
SELECT Contact.ID,
  [FirstName] & " " & [LastName] AS Expr1
FROM Contact;
--Query: ~ sq_drpt_PA_ProjectswithContracts ~ sq_dsfrmContracts SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM v_rpt_ProjectSummary_Contracts AS rpt_PA_ProjectswithContracts
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_drpt_PA_Registered ~ sq_dProjectManager SQL:
SELECT Contact.ID,
  [FirstName] & " " & [LastName] AS Expr1
FROM Contact;
--Query: ~ sq_drpt_PA_Risk ~ sq_dsrpt_ProjectRisk SQL:
SELECT DISTINCTROW *
FROM RiskProfile;
--Query: ~ sq_drpt_PF_NetRecoveries ~ sq_dsrpt_PF_NetRecoveries SQL:
SELECT *
FROM qry_PF_PortfolioStobRecoveries
WHERE [Fiscal] = 5
  and [PortfolioID] in (14, 9, 4);
--Query: ~ sq_drpt_ProjectSummary_Report ~ sq_dChild65 SQL: PARAMETERS __ProjectID Value;
SELECT DISTINCTROW *
FROM qry_ProjectSummary_Contracts AS rpt_ProjectSummary_Report
WHERE ([__ProjectID] = ProjectID);
--Query: ~ sq_fClientCodingSubform_OLD SQL:
SELECT ClientCoding.ID,
  ClientCoding.ProjectID,
  ClientCoding.Client,
  ClientCoding.ResponsibilityCentre,
  ClientCoding.ServiceLine,
  ClientCoding.STOB,
  ClientCoding.ProjectCode,
  ClientCoding.ContactID,
  Contact.LastName,
  Contact.FirstName,
  Contact.ID,
  ClientCoding.ClientAmount
FROM Contact
  INNER JOIN ClientCoding ON Contact.ID = ClientCoding.ContactID;
--Query: ~ sq_fContactList SQL:
SELECT DISTINCTROW *
FROM Contact;
--Query: ~ sq_fContactList_Orig SQL:
SELECT Contact.ID,
  Contact.LastName,
  Contact.FirstName,
  Contact.Email,
  Contact.ContactPhone,
  Contact.ContactTitle,
  Contact.MinistryID,
  Contact.BusinessAreaID,
  Contact.Address,
  Contact.City,
  Contact.Province,
  Contact.Postal,
  Contact.Country,
  Contact.Website,
  Contact.Mobile,
  Contact.Fax,
  Contact.Notes
FROM Contact
ORDER BY Contact.LastName,
  Contact.FirstName;
--Query: ~ sq_fContractAmendmentSubform_OLD SQL:
SELECT DISTINCTROW *
FROM ContractAmendment;
--Query: ~ sq_fContractAmendmentTypeSubform SQL:
SELECT ContractAmendment_AmendmentType.*,
  AmendmentType.AmendmentTypeName
FROM ContractAmendment_AmendmentType
  INNER JOIN AmendmentType ON ContractAmendment_AmendmentType.AmendmentTypeID = AmendmentType.ID
ORDER BY AmendmentType.AmendmentTypeName;
--Query: ~ sq_fContractDetail SQL:
SELECT DISTINCTROW *
FROM Contract;
--Query: ~ sq_fContractDetail_ORIG SQL:
SELECT DISTINCTROW *
FROM Contract;
--Query: ~ sq_fContractInvoiceExpenseSubform SQL:
SELECT InvoiceDetail.*
FROM InvoiceDetail
WHERE (((InvoiceDetail.Type) = "Expense"));
--Query: ~ sq_fContractList_OLD SQL:
SELECT Contract.ID,
  Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Supplier.SupplierName,
  RecordsetToString(
    "select SubcontractorName from ContractSubcontractor inner join Subcontractor on ContractSubcontractor.SubcontractorID = Subcontractor.ID where ContractID = " & [Contract].[ID],
    "",
    ", "
  ) AS Subcontractors,
  Contract.StartDate,
  Contract.EndDate,
  [TotalFeeAmount] + [TotalExpenseAmount] AS TotalPayable,
  [TotalFeeAmount] + [TotalExpenseAmount] - Nz(Sum([UnitAmount] * [Rate]), 0) AS Remaining,
  Contract.Status,
  FiscalYear.FiscalYear,
  Contract.Fiscal,
  Project.ProjectNumber,
  Project.ID AS ProjectID,
  RecordsetToString(
    "select PortfolioAbbrev from SIDInternalCoding inner join Portfolio on SIDInternalCoding.PortfolioID = Portfolio.ID where ContractID = " & [Contract].[ID],
    "",
    ", "
  ) AS Portfolios
FROM (
    (
      Supplier
      RIGHT JOIN (
        (
          Contract
          LEFT JOIN Project ON Contract.ProjectID = Project.ID
        )
        INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
      ) ON Supplier.ID = Contract.SupplierID
    )
    LEFT JOIN Invoice ON Contract.ID = Invoice.ContractID
  )
  LEFT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
GROUP BY Contract.ID,
  Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Supplier.SupplierName,
  RecordsetToString(
    "select SubcontractorName from ContractSubcontractor inner join Subcontractor on ContractSubcontractor.SubcontractorID = Subcontractor.ID where ContractID = " & [Contract].[ID],
    "",
    ", "
  ),
  Contract.StartDate,
  Contract.EndDate,
  [TotalFeeAmount] + [TotalExpenseAmount],
  Contract.Status,
  FiscalYear.FiscalYear,
  Contract.Fiscal,
  Project.ProjectNumber,
  Project.ID,
  RecordsetToString(
    "select PortfolioAbbrev from SIDInternalCoding inner join Portfolio on SIDInternalCoding.PortfolioID = Portfolio.ID where ContractID = " & [Contract].[ID],
    "",
    ", "
  ),
  IIf(
    [Contract].[Status] = 'Complete'
    Or [Contract].[Status] = 'Cancelled',
    1,
    0
  ),
  Contract.CONumber
ORDER BY IIf(
    [Contract].[Status] = 'Complete'
    Or [Contract].[Status] = 'Cancelled',
    1,
    0
  ),
  Contract.CONumber;
--Query: ~ sq_fContractSubcontractor SQL:
SELECT DISTINCTROW *
FROM ContractSubcontractor;
--Query: ~ sq_fJV SQL:
SELECT JV.ID AS JV_ID,
  JV.JVNumber,
  JV.BilledDate,
  JV.Amount,
  JV.Quarter,
  JV.FiscalYearID,
  JV.ClientCodingID,
  ClientCoding.Client,
  ClientCoding.ResponsibilityCentre,
  ClientCoding.ServiceLine,
  ClientCoding.STOB,
  ClientCoding.ProjectCode,
  Contact.[FirstName] & " " & [LastName] AS [Financial Contact],
  ClientCoding.ClientAmount,
  JV.ProjectID
FROM Contact
  RIGHT JOIN (
    ClientCoding
    INNER JOIN JV ON ClientCoding.[ID] = JV.[ClientCodingID]
  ) ON Contact.ID = ClientCoding.ContactID;
--Query: ~ sq_fLessonCategoryForm SQL:
SELECT DISTINCTROW *
FROM LessonCategory;
--Query: ~ sq_fMinistryForm SQL:
SELECT DISTINCTROW *
FROM Ministry;
--Query: ~ sq_fProjectBilling subform SQL:
SELECT ProjectDeliverable.DeliverableName,
  ProjectBudget.ID,
  ProjectBudget.Q1_Amount,
  ProjectBudget.Q1_Recovered,
  ProjectBudget.Q2_Amount,
  ProjectBudget.Q2_Recovered,
  ProjectBudget.Q3_Amount,
  ProjectBudget.Q3_Recovered,
  ProjectBudget.Q4_Amount,
  ProjectBudget.Q4_Recovered,
  ClientCoding.Client,
  ClientCoding.ResponsibilityCentre,
  ClientCoding.ServiceLine,
  ClientCoding.STOB,
  ClientCoding.ProjectCode,
  ProjectBudget.Notes,
  ProjectBudget.ProjectDeliverableID,
  ProjectBudget.DetailAmount,
  ProjectBudget.RecoveryArea,
  ProjectBudget.ResourceType,
  ProjectBudget.STOB,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.ProjectID,
  ProjectBudget.Fiscal,
  ProjectBudget.ClientCodingID,
  JV.JVNumber,
  JV.BilledDate,
  JV.Amount,
  JV.Quarter,
  Contact.LastName
FROM (
    ClientCoding
    LEFT JOIN (
      JV
      RIGHT JOIN (
        ProjectDeliverable
        RIGHT JOIN ProjectBudget ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
      ) ON JV.ProjectBudgetID = ProjectBudget.ID
    ) ON ClientCoding.ID = ProjectBudget.ClientCodingID
  )
  LEFT JOIN Contact ON ClientCoding.ContactID = Contact.ID
ORDER BY ProjectDeliverable.DeliverableName;
--Query: ~ sq_fProjectBudget SQL:
SELECT DISTINCTROW *
FROM ProjectBudget;
--Query: ~ sq_fProjectBudget subform SQL:
SELECT ProjectBudget.ProjectDeliverableID,
  ProjectDeliverable.DeliverableName,
  ProjectBudget.ID,
  ProjectBudget.Q1_Amount,
  ProjectBudget.Q1_Recovered,
  ProjectBudget.Q2_Amount,
  ProjectBudget.Q2_Recovered,
  ProjectBudget.Q3_Amount,
  ProjectBudget.Q3_Recovered,
  ProjectBudget.Q4_Amount,
  ProjectBudget.Q4_Recovered,
  ProjectBudget.Notes,
  ProjectBudget.DetailAmount,
  ProjectBudget.RecoveryArea,
  ProjectBudget.ResourceType,
  ProjectBudget.STOB,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.ProjectID,
  Portfolio.PortfolioName,
  Portfolio.ExpenseAuthority,
  Portfolio.Responsibility,
  Portfolio.ServiceLine,
  ProjectBudget.Fiscal,
  ProjectBudget.ClientCodingID,
  ProjectDeliverable.RecoverableAmount,
  ProjectBudget.ContractID
FROM ProjectDeliverable
  INNER JOIN (
    Portfolio
    RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
ORDER BY ProjectBudget.Fiscal,
  ProjectDeliverable.DeliverableName;
--Query: ~ sq_fProjectChangeRequestSubform SQL:
SELECT DISTINCTROW *
FROM ChangeRequest;
--Query: ~ sq_fProjectChangeRequestSubform_OLD SQL:
SELECT DISTINCTROW *
FROM ChangeRequest;
--Query: ~ sq_fProjectChangeRequestTypeSubform SQL:
SELECT ChangeRequest_CRType.ChangeRequestID,
  ChangeRequest_CRType.CRTypeID,
  CRType.CRTypeName
FROM ChangeRequest_CRType
  INNER JOIN CRType ON ChangeRequest_CRType.CRTypeID = CRType.ID
ORDER BY CRType.CRTypeName;
--Query: ~ sq_fProjectDeliverable SQL:
SELECT DISTINCTROW *
FROM ProjectDeliverable;
--Query: ~ sq_fProjectDeliverable subform SQL:
SELECT DISTINCTROW *
FROM ProjectDeliverable;
--Query: ~ sq_fProjectDeliverable subform_old SQL:
SELECT DISTINCTROW *
FROM ProjectDeliverable;
--Query: ~ sq_fProjectDeliverablesReadonlySubform SQL:
SELECT ProjectDeliverable.ID,
  ProjectDeliverable.ProjectID,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.StartDate,
  ProjectDeliverable.CompletionDate,
  ProjectDeliverable.PercentComplete,
  ProjectDeliverable.DeliverableStatus,
  ProjectDeliverable.HealthID
FROM ProjectDeliverable
WHERE (((Nz([IsExpense], False)) = False));
--Query: ~ sq_fProjectDetail_old SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_fProjectDetail_Orig SQL:
SELECT DISTINCTROW *
FROM Project;
--Query: ~ sq_fProjectEngagement SQL:
SELECT DISTINCTROW *
FROM ProjectEngagement;
--Query: ~ sq_fProjectLessonSubform SQL:
SELECT DISTINCTROW *
FROM ProjectLesson;
--Query: ~ sq_fProjectMilestoneReadonlySubform SQL:
SELECT ProjectMilestone.ID,
  ProjectMilestone.ProjectID,
  ProjectMilestone.Description,
  FiscalYear.FiscalYear,
  ProjectMilestone.TargetCompletionDate,
  ProjectMilestone.ActualCompletionDate,
  ProjectMilestone.Status,
  ProjectMilestone.HealthID
FROM FiscalYear
  INNER JOIN ProjectMilestone ON FiscalYear.ID = ProjectMilestone.FiscalID
ORDER BY ProjectMilestone.ActualCompletionDate DESC,
  ProjectMilestone.TargetCompletionDate DESC;
--Query: ~ sq_fProjectMilestoneSubform SQL:
SELECT DISTINCTROW *
FROM ProjectMilestone;
--Query: ~ sq_fProjectStatusSubform SQL:
SELECT DISTINCTROW *
FROM ProjectStatus;
--Query: ~ sq_fReportLauncherSubform SQL:
SELECT ID,
  ReportCategoryID,
  ReportName,
  ReportObjectName,
  SortOrder
FROM Report
WHERE Inactive = 0
ORDER BY SortOrder;
--Query: ~ sq_fReportSpec SQL:
SELECT DISTINCTROW *
FROM Report;
--Query: ~ sq_fReportSpecCategory SQL:
SELECT DISTINCTROW *
FROM ReportCategory;
--Query: ~ sq_fReportSpecControl SQL:
SELECT DISTINCTROW *
FROM ReportControl;
--Query: ~ sq_fReportSpecField SQL:
SELECT DISTINCTROW *
FROM ReportField;
--Query: ~ sq_fReportSpecSubform SQL:
SELECT DISTINCTROW *
FROM ReportControlField;
--Query: ~ sq_fResource SQL:
SELECT DISTINCTROW *
FROM Resource;
--Query: ~ sq_fSIDInternalCoding_OLD SQL:
SELECT DISTINCTROW *
FROM SIDInternalCoding;
--Query: ~ sq_fSubcontractorForm SQL:
SELECT DISTINCTROW *
FROM Subcontractor;
--Query: ~ sq_fSupplierRateSubform SQL:
SELECT DISTINCTROW *
FROM SupplierRate;
--Query: ~ sq_fSuppliers SQL:
SELECT DISTINCTROW *
FROM Supplier;
--Query: ~ sq_fTest ProjectBudget subform SQL:
SELECT ProjectDeliverable.DeliverableName,
  ProjectBudget.ID,
  ProjectBudget.Q1_Amount,
  ProjectBudget.Q1_Recovered,
  ProjectBudget.Q2_Amount,
  ProjectBudget.Q2_Recovered,
  ProjectBudget.Q3_Amount,
  ProjectBudget.Q3_Recovered,
  ProjectBudget.Q4_Amount,
  ProjectBudget.Q4_Recovered,
  ProjectBudget.Notes,
  ProjectBudget.ProjectDeliverableID,
  ProjectBudget.DetailAmount,
  ProjectBudget.RecoveryAmount,
  ProjectBudget.RecoveryArea,
  ProjectBudget.ResourceType,
  ProjectBudget.STOB,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount,
  ProjectDeliverable.ProjectID,
  Portfolio.PortfolioName,
  Portfolio.ExpenseAuthority,
  Portfolio.Responsibility,
  Portfolio.ServiceLine,
  ProjectBudget.Fiscal,
  ProjectBudget.ClientCodingID
FROM ProjectDeliverable
  RIGHT JOIN (
    Portfolio
    RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
ORDER BY ProjectDeliverable.DeliverableName;
--Query: ~ sq_rrpt_CA_ALL_SupplierFYUseagebyPortfolio SQL: TRANSFORM Sum(qry_ContractSupplier_Utilization.TotalInvoiced) AS SumOfTotalInvoiced
SELECT qry_ContractSupplier_Utilization.Fiscal,
  qry_ContractSupplier_Utilization.FiscalYear,
  qry_ContractSupplier_Utilization.SupplierID,
  qry_ContractSupplier_Utilization.SupplierName
FROM qry_ContractSupplier_Utilization
WHERE (
    (
      (qry_ContractSupplier_Utilization.FiscalYear) = [Enter Fiscal Year]
    )
  )
GROUP BY qry_ContractSupplier_Utilization.Fiscal,
  qry_ContractSupplier_Utilization.FiscalYear,
  qry_ContractSupplier_Utilization.SupplierID,
  qry_ContractSupplier_Utilization.SupplierName PIVOT qry_ContractSupplier_Utilization.Portfolio In ("BCS", "COS", "EDS", "PMO", "SDT", "CTZE");
--Query: ~ sq_rrpt_CA_AmendmentTypes - FY - Summary SQL:
SELECT qry_ContractAmendmentTypesByFiscal.FiscalYear,
  Count(*) AS ContractCount,
  qry_ContractAmendmentTypesByFiscal.AmendmentCount,
  Sum(qry_ContractAmendmentTypesByFiscal.Resources) AS Resources,
  Sum(qry_ContractAmendmentTypesByFiscal.Scope) AS Scope,
  Sum(qry_ContractAmendmentTypesByFiscal.Budget) AS Budget,
  Sum(qry_ContractAmendmentTypesByFiscal.Hours) AS Hours,
  Sum(qry_ContractAmendmentTypesByFiscal.Timelines) AS Timelines,
  Sum(qry_ContractAmendmentTypesByFiscal.[End Date]) AS [End Date],
  Sum(qry_ContractAmendmentTypesByFiscal.Expenses) AS Expenses,
  Sum(qry_ContractAmendmentTypesByFiscal.Admin) AS Admin
FROM qry_ContractAmendmentTypesByFiscal
GROUP BY qry_ContractAmendmentTypesByFiscal.FiscalYear,
  qry_ContractAmendmentTypesByFiscal.AmendmentCount;
--Query: ~ sq_rrpt_CA_ConsultingServiceUtilization - FY - Summary SQL:
SELECT *
FROM qry_ContractorResourceUtilization
WHERE FiscalYear = [Enter Fiscal Year];
--Query: ~ sq_rrpt_CA_ContractsbyContractor SQL:
SELECT qry_Contractor_Resource_COs.FiscalYear,
  qry_Contractor_Resource_COs.ResourceFirstName,
  qry_Contractor_Resource_COs.ResourceLastName,
  qry_Contractor_Resource_COs.ProjectNumber,
  qry_Contractor_Resource_COs.CONumber,
  qry_Contractor_Resource_COs.COversion,
  qry_Contractor_Resource_COs.Description,
  qry_Contractor_Resource_COs.StartDate,
  qry_Contractor_Resource_COs.EndDate,
  qry_Contractor_Resource_COs.Status,
  qry_Contractor_Resource_COs.TotalContractAmt
FROM qry_Contractor_Resource_COs
WHERE (
    (
      (qry_Contractor_Resource_COs.ResourceLastName) = [Enter Last Name]
    )
  )
UNION
SELECT FiscalYear.FiscalYear,
  Resource.ResourceFirstName,
  Resource.ResourceLastName,
  Historical_Contracts.ProjectNumber,
  Historical_Contracts.CONumber,
  IIf(
    Historical_Contracts.AmmendmentCount <> 0,
    "A" & Historical_Contracts.AmmendmentCount,
    ""
  ),
  "Historical Contract" AS Expr1,
  Historical_Contracts.StartDate,
  Historical_Contracts.EndDate,
  "Complete" AS Status,
  Historical_Contracts.TotalContractAmount
FROM Resource
  INNER JOIN (
    FiscalYear
    INNER JOIN (
      Historical_Contracts
      INNER JOIN Historical_ContractAssignments ON Historical_Contracts.CONumber = Historical_ContractAssignments.CONumber
    ) ON FiscalYear.ID = Historical_Contracts.FiscalYear
  ) ON Resource.ResourceID = Historical_ContractAssignments.ResourceID
WHERE (((Resource.ResourceLastName) = [Enter Last Name]));
--Query: ~ sq_rrpt_CA_ContractsbySubcontractor SQL:
SELECT FiscalYear.FiscalYear,
  Subcontractor.SubcontractorName,
  Project.ProjectNumber,
  Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Status,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount] AS TotalContractAmt
FROM Subcontractor
  INNER JOIN (
    (
      Project
      INNER JOIN (
        Contract
        INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
      ) ON Project.ID = Contract.ProjectID
    )
    INNER JOIN ContractSubcontractor ON Contract.ID = ContractSubcontractor.ContractID
  ) ON Subcontractor.ID = ContractSubcontractor.SubcontractorID
WHERE (
    (
      (Subcontractor.SubcontractorName) = [Enter Subcontractor Name]
    )
  )
UNION
SELECT FiscalYear.FiscalYear,
  Subcontractor.SubcontractorName,
  Historical_Contracts.ProjectNumber,
  Historical_Contracts.CONumber,
  IIf(
    Historical_Contracts.AmmendmentCount <> 0,
    "A" & Historical_Contracts.AmmendmentCount,
    ""
  ) AS Expr1,
  "Historical Contract" AS Expr2,
  Historical_Contracts.StartDate,
  Historical_Contracts.EndDate,
  "Complete" AS Status,
  Historical_Contracts.TotalContractAmount
FROM Subcontractor
  INNER JOIN (
    FiscalYear
    INNER JOIN Historical_Contracts ON FiscalYear.ID = Historical_Contracts.FiscalYear
  ) ON Subcontractor.ID = Historical_Contracts.SubcontractorID
WHERE (
    (
      (Subcontractor.SubcontractorName) = [Enter Subcontractor Name]
    )
  );
--Query: ~ sq_rrpt_CA_MultiYrStats_ConsultingServicesbyPortfolio SQL:
SELECT *
FROM qry_HistoricalContractsResourceAllocationXTab
WHERE (
    (
      (qry_HistoricalContractsResourceAllocationXTab.FY) >= "19-20"
    )
  );
--Query: ~ sq_rrpt_CA_MultiYrStats_ConsultingServicesbyPortfolio_OXTB SQL:
SELECT *
FROM qry_HistoricalContractsResourceAllocationXTab
WHERE FY between '10-11' and '18-19';
--Query: ~ sq_rrpt_CA_SRI_SupplierFYUseagebyPortfolio SQL: TRANSFORM Sum(qry_ContractSupplier_Utilization.TotalInvoiced) AS SumOfTotalInvoiced
SELECT qry_ContractSupplier_Utilization.Fiscal,
  qry_ContractSupplier_Utilization.FiscalYear,
  qry_ContractSupplier_Utilization.SupplierID,
  qry_ContractSupplier_Utilization.SupplierName
FROM qry_ContractSupplier_Utilization
WHERE (
    (
      (qry_ContractSupplier_Utilization.FiscalYear) = [Enter Fiscal Year]
    )
    AND (
      (qry_ContractSupplier_Utilization.SupplierName) In ("CGI", "Sierra", "Fujitsu")
    )
  )
GROUP BY qry_ContractSupplier_Utilization.Fiscal,
  qry_ContractSupplier_Utilization.FiscalYear,
  qry_ContractSupplier_Utilization.SupplierID,
  qry_ContractSupplier_Utilization.SupplierName PIVOT qry_ContractSupplier_Utilization.Portfolio In (
    "OSS",
    "DES",
    "DMS",
    "DP",
    "ANA",
    "SD",
    "CE",
    "EDS",
    "BCS",
    "DIV",
    "GC"
  );
--Query: ~ sq_rrpt_CA_SRI_SupplierFYUseagebyPortfolio_OXTB SQL: TRANSFORM Sum(qry_ContractSupplier_Utilization.TotalInvoiced) AS SumOfTotalInvoiced
SELECT qry_ContractSupplier_Utilization.Fiscal,
  qry_ContractSupplier_Utilization.FiscalYear,
  qry_ContractSupplier_Utilization.SupplierID,
  qry_ContractSupplier_Utilization.SupplierName
FROM qry_ContractSupplier_Utilization
WHERE (
    (
      (qry_ContractSupplier_Utilization.FiscalYear) = [Enter Fiscal Year]
    )
    AND (
      (qry_ContractSupplier_Utilization.SupplierName) In ("CGI", "Sierra", "Fujitsu")
    )
  )
GROUP BY qry_ContractSupplier_Utilization.Fiscal,
  qry_ContractSupplier_Utilization.FiscalYear,
  qry_ContractSupplier_Utilization.SupplierID,
  qry_ContractSupplier_Utilization.SupplierName PIVOT qry_ContractSupplier_Utilization.Portfolio In (
    "OSS",
    "SIPS",
    "DMS",
    "DP",
    "ANA",
    "SD",
    "CE",
    "EDS",
    "BCS",
    "DIV"
  );
--Query: ~ sq_rrpt_PA_MultiYrStats_ChangeRequest SQL:
SELECT qry_ChangeRequest_XTab.FiscalYear AS FiscalYear,
  qry_ChangeRequest_XTab.InitiatedBy AS InitiatedBy,
  Sum(qry_ChangeRequestCountByInitiatedBy.CRCount) AS CRCount,
  Sum(qry_ChangeRequest_XTab.Budget) AS Budget,
  Sum(qry_ChangeRequest_XTab.Schedule) AS Schedule,
  Sum(qry_ChangeRequest_XTab.Scope) AS Scope,
  Sum(qry_ChangeRequest_XTab.None) AS None
FROM qry_ChangeRequestCountByInitiatedBy
  INNER JOIN qry_ChangeRequest_XTab ON (
    qry_ChangeRequestCountByInitiatedBy.FiscalYearID = qry_ChangeRequest_XTab.FiscalYearID
  )
  AND (
    qry_ChangeRequestCountByInitiatedBy.ProjectID = qry_ChangeRequest_XTab.ProjectID
  )
  AND (
    qry_ChangeRequestCountByInitiatedBy.InitiatedBy = qry_ChangeRequest_XTab.InitiatedBy
  )
GROUP BY qry_ChangeRequest_XTab.FiscalYear,
  qry_ChangeRequest_XTab.InitiatedBy;
--Query: ~ sq_rrpt_PA_ProjectswithContracts SQL:
SELECT DISTINCT Project.ID AS ProjectID,
  Project.Fiscal,
  Project.ProjectNumber,
  Project.ProjectVersion,
  Project.ProjectName,
  Project.ProjectManager,
  Project.PortfolioID,
  Project.Classification,
  Project.ProjectType,
  Project.Funding,
  Project.Recoverable,
  Project.MinistryID,
  Project.AgreementType,
  Project.AgreementStartDate,
  Project.AgreementEndDate,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  Project.Description,
  Project.InitiationDate,
  Project.Lead,
  Project.Notes,
  Project.ProjectStatus,
  Project.PlannedStartDate,
  Project.PlannedEndDate,
  Project.PlannedBudget,
  Project.AgreementSignedDate
FROM Contract
  INNER JOIN Project ON Contract.ProjectID = Project.ID
WHERE (
    (
      (
        [Type ALL for all Projects, any other value (or blank) for Active Projects only]
      ) = "ALL"
    )
  )
  OR (((Project.ProjectStatus) = "ACTIVE"));
--Query: ~ sq_rrpt_PF_ADI_Export SQL:
SELECT DISTINCTROW *
FROM Portfolio;
--Query: ~ sq_rsrpt_C_Summary_PaymentSummary SQL:
SELECT DISTINCTROW *
FROM __LOCAL_C_SUMMARY_PAYMENTSUMMARY;
--Query: ~ sq_rsrpt_P_BudgetSummary_ChangeRequest SQL:
SELECT Project.ID AS ProjectID,
  v_ChangeRequest_Denormalized.Version,
  v_ChangeRequest_Denormalized.InitiationDate,
  v_ChangeRequest_Denormalized.InitiatedBy,
  v_ChangeRequest_Denormalized.CRTypes,
  v_ChangeRequest_Denormalized.Summary
FROM Project
  LEFT JOIN v_ChangeRequest_Denormalized ON Project.ID = v_ChangeRequest_Denormalized.LinkID;
--Query: ~ sq_rsrpt_P_EngagementStatus SQL:
SELECT ProjectEngagementChecklistItem.ProjectEngagementID,
  EngagementChecklistItem.Description,
  ProjectEngagementChecklistItem.Checked,
  ProjectEngagementChecklistItem.DateChecked,
  EngagementChecklistItem.SortOrder
FROM ProjectEngagementChecklistItem
  INNER JOIN EngagementChecklistItem ON ProjectEngagementChecklistItem.EngagementChecklistItemID = EngagementChecklistItem.ID;
--Query: ~ sq_rsrpt_P_StatusSummary SQL:
SELECT Project.ID AS ProjectID,
  ProjectLesson.LessonCategoryID,
  ProjectLesson.LessonSubCategory,
  ProjectLesson.Lesson,
  ProjectLesson.Recommendations,
  LessonCategory.LessonCategoryName
FROM Project
  LEFT JOIN (
    LessonCategory
    RIGHT JOIN ProjectLesson ON LessonCategory.ID = ProjectLesson.LessonCategoryID
  ) ON Project.ID = ProjectLesson.ProjectID;
--Query: AssignedResourcesQuery SQL:
SELECT Resource.ResourceLastName,
  Contract_Resource.AssignmentRate,
  ResourceType.ResourceType,
  SupplierRate.Competency,
  SupplierRate.ResourceTypeID,
  Resource.ResourceID,
  Contract_Resource.ContractID
FROM Resource
  RIGHT JOIN (
    ResourceType
    RIGHT JOIN (
      SupplierRate
      RIGHT JOIN (
        Resource_SupplierRates
        RIGHT JOIN Contract_Resource ON Resource_SupplierRates.ID = Contract_Resource.ResourceSupplierRateID
      ) ON SupplierRate.ID = Resource_SupplierRates.SupplierRateID
    ) ON ResourceType.ID = SupplierRate.ResourceTypeID
  ) ON Resource.ResourceID = Resource_SupplierRates.ResourceID
WHERE (
    (
      (Contract_Resource.ContractID) = [Forms] ! [ContractDetail] ! [Invoice].[Form] ! [ContractID]
    )
  );
--Query: ContactDetailsQuery SQL:
SELECT Contact.ID,
  [FirstName] & " " & [LastName] AS FullName,
  Contact.LastName,
  Contact.FirstName,
  Contact.Email,
  Contact.ContactPhone,
  Contact.ContactTitle,
  Contact.MinistryID,
  Contact.BusinessAreaID,
  Contact.Address,
  Contact.City,
  Contact.Province,
  Contact.Postal,
  Contact.Country,
  Contact.Website,
  Contact.Mobile,
  Contact.Fax,
  Contact.Notes
FROM Contact
ORDER BY Contact.LastName;
--Query: Contract Query SQL:
SELECT Contract.ID AS Contract_ID,
  Contract.COversion,
  ContractAmendment.ID AS ContractAmendment_ID,
  ContractAmendment.ContractID,
  ContractAmendment.AmendmentNumber,
  ContractAmendment.AmendmentDate,
  ContractAmendment.AmendmentType,
  ContractAmendment.AmendmentType.Value,
  ContractAmendment.Description
FROM Contract
  INNER JOIN ContractAmendment ON Contract.[ID] = ContractAmendment.[ContractID];
--Query: ContractDetailForm_ContractTotals SQL: with curFY as (
  select *
  from FiscalYear
  where IsCurrent = 1
),
nextFY as (
  select top 1 FiscalYear.*
  from FiscalYear,
    curFY
  where FiscalYear.FiscalYear > curFY.FiscalYear
  order by FiscalYear.FiscalYear
),
fy as (
  select *
  from curFY
  union all
  select *
  from nextFY
),
fyc as (
  select fy.*,
    Contract.ID ContractID
  from fy
    cross join Contract
),
cr as (
  select fyc.ContractID,
    fyc.FiscalYear,
    fyc.IsCurrent,
    sum(cr.Hours) TotalHours,
    sum(cr.Hours * cr.AssignmentRate) TotalDollars
  from Contract_Resource cr
    right join fyc on cr.Fiscal = fyc.ID
    and cr.ContractID = fyc.ContractID
  group by fyc.ContractID,
    fyc.FiscalYear,
    fyc.IsCurrent
),
d as (
  select fyc.ContractID,
    fyc.FiscalYear,
    fyc.IsCurrent,
    sum(
      case
        when isnull(cd.IsExpense, 0) = 0 then cd.DeliverableAmount
        else 0
      end
    ) TotalDeliverable,
    sum(
      case
        when isnull(cd.IsExpense, 0) = 1 then cd.DeliverableAmount
        else 0
      end
    ) TotalExpenses
  from ContractDeliverable cd
    right join fyc on cd.Fiscal = fyc.ID
    and cd.ContractID = fyc.ContractID
  group by fyc.ContractID,
    fyc.FiscalYear,
    fyc.IsCurrent
),
inv as (
  select fyc.ContractID,
    fyc.FiscalYear,
    fyc.IsCurrent,
    sum(id.UnitAmount * id.Rate) TotalInvoiced,
    sum(
      case
        when id.ContractResourceID is not null then id.UnitAmount
        else 0
      end
    ) HoursInvoiced,
    sum(
      case
        when isnull(cd.IsExpense, 0) = 1 then id.UnitAmount * id.Rate
        else 0
      end
    ) ExpensesInvoiced,
    sum(
      case
        when isnull(cd.IsExpense, 0) = 0 then id.UnitAmount * id.Rate
        else 0
      end
    ) FeesInvoiced
  from fyc
    left join Invoice i on fyc.ID = i.Fiscal
    and fyc.ContractID = i.ContractID
    left join InvoiceDetail id on i.ID = id.InvoiceID
    left join ContractDeliverable cd on id.ContractDeliverableID = cd.ID
  group by fyc.ContractID,
    fyc.FiscalYear,
    fyc.IsCurrent
)
select cr.ContractID,
  cr.FiscalYear,
  cr.IsCurrent,
  isnull(cr.TotalHours, 0) TotalHours,
  isnull(cr.TotalDollars, 0) + isnull(d.TotalDeliverable, 0) TotalFees,
  isnull(d.TotalExpenses, 0) TotalExpenses,
  isnull(inv.HoursInvoiced, 0) HoursInvoiced,
  isnull(inv.FeesInvoiced, 0) FeesInvoiced,
  isnull(inv.ExpensesInvoiced, 0) ExpensesInvoiced
from cr
  inner join d on cr.ContractID = d.ContractID
  and cr.FiscalYear = d.FiscalYear
  inner join inv on cr.ContractID = inv.ContractID
  and cr.FiscalYear = inv.FiscalYear --Query: ContractResourceSubform_ResourceID SQL:
select r.ResourceID,
  r.SupplierID,
  r.ResourceLastName + ', ' + r.ResourceFirstName [Resource Name],
  s.SupplierName Supplier,
  sc.SubcontractorName Subcontractor,
  cs.ContractID
from [Resource] r
  left join Subcontractor sc on r.SubcontractorID = sc.ID
  left join Supplier s on r.SupplierID = s.ID
  left join ContractSubcontractor cs on r.SubcontractorID = cs.SubcontractorID
order by r.ResourceLastName,
  r.ResourceFirstName --Query: Copy Of qry_FinancialRecoveryByPortfolioAndStob SQL: TRANSFORM Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYTotalRecoverable
  ) AS SumOfCurrentFYTotalRecoverable1
SELECT [qry_CurrentYearRecoveries-STOB].ProjectID,
  [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].PortfolioID,
  [qry_CurrentYearRecoveries-STOB].PortfolioName,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB].FiscalYear,
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[6398] AS 6398Recovered,
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[8807] AS 8807Recovered,
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[8809] AS 8809Recovered,
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[5798] AS 5798Recovered,
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[6598] AS 6598Recovered,
  qry_FinancialRecoveryByPortfolioAndStobRecovered.Other AS OtherRecovered,
  Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYRecoveredToDate
  ) AS CYRecoveredToDate,
  Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYTotalRecoverable
  ) AS CYTotalRecoverable
FROM qry_FinancialRecoveryByPortfolioAndStobRecovered
  INNER JOIN [qry_CurrentYearRecoveries-STOB] ON (
    qry_FinancialRecoveryByPortfolioAndStobRecovered.FiscalYear = [qry_CurrentYearRecoveries-STOB].FiscalYear
  )
  AND (
    qry_FinancialRecoveryByPortfolioAndStobRecovered.PortfolioID = [qry_CurrentYearRecoveries-STOB].PortfolioID
  )
  AND (
    qry_FinancialRecoveryByPortfolioAndStobRecovered.ProjectID = [qry_CurrentYearRecoveries-STOB].ProjectID
  )
GROUP BY [qry_CurrentYearRecoveries-STOB].ProjectID,
  [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].PortfolioID,
  [qry_CurrentYearRecoveries-STOB].PortfolioName,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  [TotalProjectBudget] - [RecoverableAmount],
  [qry_CurrentYearRecoveries-STOB].FiscalYear,
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[6398],
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[8807],
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[8809],
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[5798],
  qry_FinancialRecoveryByPortfolioAndStobRecovered.[6598],
  qry_FinancialRecoveryByPortfolioAndStobRecovered.Other PIVOT IIf(
    [qry_CurrentYearRecoveries-STOB].[STOB] In ("6398", "8807", "8809", "5798", "6598"),
    [qry_CurrentYearRecoveries-STOB].[STOB],
    "Other"
  ) In ("6398", "8807", "8809", "5798", "6598", "Other");
--Query: draftqry_ContractsSummaryCOS SQL:
SELECT Contract.ID,
  FiscalYear.FiscalYear,
  Contract.CONumber,
  Contract.COversion,
  Project.ProjectNumber,
  First([ResourceFirstName] & " " & [ResourceLastName]) AS ResourceName,
  Supplier.SupplierName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Description,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount] AS TotalContractPayable,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  SIDInternalCoding.STOB,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.AssetTag,
  SIDInternalCoding.CASProjectNumber,
  SIDInternalCoding.QualifiedReceiver,
  Portfolio.ServiceLine,
  Portfolio.Responsibility,
  Contract.Status,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
FROM Resource
  RIGHT JOIN (
    Project
    INNER JOIN (
      Portfolio
      INNER JOIN (
        (
          (
            Supplier
            RIGHT JOIN (
              (
                Contract
                INNER JOIN qry_InvoiceTotals ON Contract.ID = qry_InvoiceTotals.ContractID
              )
              INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
            ) ON Supplier.ID = Contract.SupplierID
          )
          INNER JOIN Contract_Resource ON Contract.ID = Contract_Resource.ContractID
        )
        INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
      ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
    ) ON Project.ID = Contract.ProjectID
  ) ON Resource.ResourceID = Contract_Resource.ResourceID
GROUP BY Contract.ID,
  FiscalYear.FiscalYear,
  Contract.CONumber,
  Contract.COversion,
  Project.ProjectNumber,
  Supplier.SupplierName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Description,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount],
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  SIDInternalCoding.STOB,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.AssetTag,
  SIDInternalCoding.CASProjectNumber,
  SIDInternalCoding.QualifiedReceiver,
  Portfolio.ServiceLine,
  Portfolio.Responsibility,
  Contract.Status,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
HAVING (
    ((FiscalYear.FiscalYear) = [Enter Fiscal Year])
    AND (
      (Portfolio.PortfolioAbbrev) = "COS"
      Or (Portfolio.PortfolioAbbrev) = "BCS"
    )
    AND ((SIDInternalCoding.STOB) = "2000")
  );
--Query: GetCurrentFiscal SQL:
SELECT FiscalYear.FiscalYear
FROM FiscalYear
WHERE (((FiscalYear.IsCurrent) = True));
--Query: InvoiceQuery SQL:
SELECT Invoice.InvoiceNumber,
  Invoice.Type AS Expr1,
  Invoice.Fiscal AS Expr2,
  Invoice.InvoiceDate,
  Invoice.BillingPeriod,
  Invoice.DueDate,
  InvoiceDetail.ID,
  InvoiceDetail.AssignedResource AS Expr3,
  InvoiceDetail.InvoiceID,
  InvoiceDetail.UnitAmount,
  InvoiceDetail.Qty AS Expr4,
  InvoiceDetail.Type AS Expr5,
  InvoiceDetail.Notes
FROM Invoice
  RIGHT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID;
--Query: JV_Detail_Query SQL:
SELECT ProjectDeliverable.DeliverableName,
  Sum(
    IIf(
      [Parent] ! [JV] ! [Quarter] = 1
      And ([Q1_Recovered] = True),
      [Q1_Amount],
(
        IIf(
          [Parent] ! [JV] ! [Quarter] = 2
          And ([Q2_Recovered] = True),
          [Q2_Amount],
(
            IIf(
              [Parent] ! [JV] ! [Quarter] = 3
              And ([Q3_Recovered] = True),
              [Q3_Amount],
              IIf(
                [Parent] ! [JV] ! [Quarter] = 4
                And ([Q4_Recovered] = True),
                [Q4_Amount],
                0
              )
            )
          )
        )
      )
    )
  ) AS TotalAll,
  ProjectDeliverable.ProjectID,
  ProjectBudget.ClientCodingID,
  Contact.LastName,
  ProjectBudget.ID,
  ProjectBudget.Fiscal
FROM ProjectDeliverable
  RIGHT JOIN (
    (
      ClientCoding
      LEFT JOIN ProjectBudget ON ClientCoding.ID = ProjectBudget.ClientCodingID
    )
    LEFT JOIN Contact ON ClientCoding.ContactID = Contact.ID
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
GROUP BY ProjectDeliverable.DeliverableName,
  ProjectDeliverable.ProjectID,
  ProjectBudget.ClientCodingID,
  Contact.LastName,
  ProjectBudget.ID,
  ProjectBudget.Fiscal
HAVING (
    (
      (
        Sum(
          IIf(
            [Parent] ! [JV] ! [Quarter] = 1
            And ([Q1_Recovered] = True),
            [Q1_Amount],
(
              IIf(
                [Parent] ! [JV] ! [Quarter] = 2
                And ([Q2_Recovered] = True),
                [Q2_Amount],
(
                  IIf(
                    [Parent] ! [JV] ! [Quarter] = 3
                    And ([Q3_Recovered] = True),
                    [Q3_Amount],
                    IIf(
                      [Parent] ! [JV] ! [Quarter] = 4
                      And ([Q4_Recovered] = True),
                      [Q4_Amount],
                      0
                    )
                  )
                )
              )
            )
          )
        )
      ) > 0
    )
  );
--Query: NavigationForm_ContractList SQL:
select c.ID,
  c.CONumber,
  c.COVersion,
  c.Description,
  s.SupplierName,
  sc_list.Subcontractors,
  c.StartDate,
  c.EndDate,
  c.TotalFeeAmount + c.TotalExpenseAmount TotalPayable,
  c.TotalFeeAmount + c.TotalExpenseAmount - isnull(sum(id.UnitAmount * id.Rate), 0) Remaining,
  c.Status,
  fy.FiscalYear,
  c.Fiscal,
  p.ProjectNumber,
  p.ID ProjectID,
  po_list.Portfolios
from Contract c
  inner join FiscalYear fy on c.Fiscal = fy.ID
  cross apply (
    select stuff(
        scl.xmlDoc.value('.', 'varchar(max)'),
        1,
        2,
        ''
      ) Subcontractors
    from (
        select ', ' + sc.SubcontractorName
        from ContractSubcontractor csc
          inner join Subcontractor sc on csc.SubcontractorID = sc.ID
        where csc.ContractID = c.ID
        order by sc.SubcontractorName for xml path(''),
          type
      ) scl(xmlDoc)
  ) sc_list
  cross apply (
    select stuff(
        pl.xmlDoc.value('.', 'varchar(max)'),
        1,
        2,
        ''
      ) Portfolios
    from (
        select ', ' + po.PortfolioAbbrev
        from SIDInternalCoding sidic
          inner join Portfolio po on sidic.PortfolioID = po.ID
        where sidic.ContractID = c.ID
        order by po.PortfolioAbbrev for xml path(''),
          type
      ) pl(xmlDoc)
  ) po_list
  left join Project p on c.ProjectID = p.ID
  left join Supplier s on c.SupplierID = s.ID
  left join Invoice i on c.ID = i.ContractID
  left join InvoiceDetail id on i.ID = id.InvoiceID
group by c.ID,
  c.CONumber,
  c.COVersion,
  c.Description,
  s.SupplierName,
  sc_list.Subcontractors,
  c.StartDate,
  c.EndDate,
  c.TotalFeeAmount + c.TotalExpenseAmount,
  c.Status,
  fy.FiscalYear,
  c.Fiscal,
  p.ProjectNumber,
  p.ID,
  po_list.Portfolios,
  case
    when c.Status = 'Complete'
    or c.Status = 'Cancelled' then 1
    else 0
  end
order by case
    when c.Status = 'Complete'
    or c.Status = 'Cancelled' then 1
    else 0
  end,
  c.CONumber --Query: NavigationForm_ProjectList SQL:
select p.Fiscal,
  p.ID,
  fy.FiscalYear,
  p.ProjectNumber,
  p.ProjectVersion,
  p.ProjectName,
  c.FirstName + ' ' + c.LastName [Project Manager],
  po.PortfolioName,
  p.Classification,
  p.ProjectType,
  p.Funding,
  p.Recoverable,
  p.MinistryID,
  p.AgreementType,
  p.AgreementStartDate,
  p.AgreementEndDate,
  p.TotalProjectBudget,
  p.RecoverableAmount,
  p.Description,
  p.InitiationDate,
  p.Lead,
  p.ProjectStatus,
  p.PlannedStartDate,
  p.PlannedEndDate,
  p.AgreementSignedDate
from Project p
  left join FiscalYear fy on p.Fiscal = fy.ID
  left join Portfolio po on p.PortfolioID = po.ID
  left join Contact c on p.ProjectManager = c.ID
order by case
    when p.ProjectStatus = 'Active' then 0
    else 1
  end,
  p.ProjectNumber --Query: Project Query SQL:
SELECT Project.ID,
  Project.ProjectNumber,
  Project.ProjectName,
  Contract.CONumber,
  Contract.ProjectID,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount
FROM Project
  INNER JOIN Contract ON Project.[ID] = Contract.[ProjectID];
--Query: ProjectBudget Query1 SQL:
SELECT ProjectBudget.ClientCodingID,
  ProjectBudget.ProjectDeliverableID,
  Sum(ProjectBudget.Q1_Amount) AS SumOfQ1_Amount,
  Sum(ProjectBudget.Q2_Amount) AS SumOfQ2_Amount,
  Sum(ProjectBudget.Q3_Amount) AS SumOfQ3_Amount,
  Sum(ProjectBudget.Q4_Amount) AS SumOfQ4_Amount,
  ProjectBudget.RecoveryAmount AS Expr1,
  Contact.LastName,
  Project.ID,
  Project.ProjectName
FROM Project
  LEFT JOIN (
    ProjectDeliverable
    LEFT JOIN (
      Contact
      RIGHT JOIN (
        ProjectBudget
        LEFT JOIN ClientCoding ON ProjectBudget.ClientCodingID = ClientCoding.ID
      ) ON Contact.ID = ClientCoding.ContactID
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
GROUP BY ProjectBudget.ClientCodingID,
  ProjectBudget.ProjectDeliverableID,
  ProjectBudget.RecoveryAmount,
  Contact.LastName,
  Project.ID,
  Project.ProjectName;
--Query: ProjectBudgetDeliverableTotals SQL:
SELECT ProjectDeliverable.ProjectID,
  ProjectDeliverable.DeliverableName,
  Sum(ProjectBudget.DetailAmount) AS SumOfDetailAmount,
  Sum(
    (
      IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
    )
  ) AS RecoveredAmount,
  Sum([DetailAmount]) -(
    Sum(
      (
        IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
      )
    )
  ) AS BalanceRemaining
FROM ProjectDeliverable
  INNER JOIN (
    Portfolio
    RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
GROUP BY ProjectDeliverable.ProjectID,
  ProjectDeliverable.DeliverableName;
--Query: ProjectBudgetFiscalTotals SQL:
SELECT ProjectDeliverable.ProjectID,
  ProjectDeliverable.Fiscal,
  Sum(ProjectBudget.DetailAmount) AS SumOfDetailAmount,
  Sum(
    (
      IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
    )
  ) AS RecoveredAmount,
  Sum(Nz([DetailAmount], 0)) -(
    Sum(
      (
        IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
      )
    )
  ) AS BalanceRemaining,
  Sum(IIf([Q1_Recovered], Nz([Q1_Amount], 0), 0)) AS Q1,
  Sum(IIf([Q2_Recovered], Nz([Q2_Amount], 0), 0)) AS Q2,
  Sum(IIf([Q3_Recovered], Nz([Q3_Amount], 0), 0)) AS Q3,
  Sum(IIf([Q4_Recovered], Nz([Q4_Amount], 0), 0)) AS Q4
FROM ProjectDeliverable
  INNER JOIN (
    Portfolio
    RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
GROUP BY ProjectDeliverable.ProjectID,
  ProjectDeliverable.Fiscal;
--Query: ProjectBudgetQuery SQL:
SELECT ProjectBudget.ID,
  ProjectBudget.Q1_Amount,
  ProjectBudget.Q2_Amount,
  ProjectBudget.Q3_Amount,
  ProjectBudget.Q4_Amount,
  ProjectBudget.Notes,
  ProjectBudget.ProjectDeliverableID,
  ProjectBudget.DetailAmount,
  ProjectBudget.RecoveryAmount AS Expr1,
  ProjectBudget.RecoveryArea,
  ProjectBudget.ResourceType,
  ProjectBudget.STOB,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount,
  ProjectDeliverable.Fiscal,
  ProjectDeliverable.ProjectID,
  Portfolio.PortfolioName,
  Portfolio.Responsibility,
  Portfolio.ServiceLine
FROM ProjectDeliverable
  RIGHT JOIN (
    Portfolio
    RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID;
--Query: ProjectBudgetRecoverableAreaTotals SQL:
SELECT ProjectDeliverable.ProjectID,
  Portfolio.PortfolioName,
  Sum(ProjectBudget.DetailAmount) AS SumOfDetailAmount,
  Sum(
    (
      IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
    )
  ) AS RecoveredAmount,
  Sum([DetailAmount]) -(
    Sum(
      (
        IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
      )
    )
  ) AS BalanceRemaining
FROM ProjectDeliverable
  INNER JOIN (
    Portfolio
    RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
GROUP BY ProjectDeliverable.ProjectID,
  Portfolio.PortfolioName;
--Query: ProjectDeliverableQuery SQL:
SELECT ProjectQuery.ProjectNumber AS [Project Number],
  ProjectQuery.ProjectVersion AS Version,
  ProjectQuery.ProjectName AS [Project Name],
  ProjectQuery.Fiscal,
  ProjectQuery.PortfolioName AS Portfolio,
  ProjectQuery.ExpenseAuthority AS [Expense Authority],
  ProjectQuery.Responsibility,
  ProjectQuery.ServiceLine,
  ProjectQuery.Classification,
  ProjectQuery.ProjectType AS [Project Type],
  ProjectQuery.Funding,
  ProjectQuery.Recoverable,
  ProjectQuery.MinistryName AS Ministry,
  ProjectQuery.AgreementType AS [Agreement Type],
  ProjectQuery.AgreementStartDate,
  ProjectQuery.AgreementEndDate,
  ProjectQuery.TotalProjectBudget,
  ProjectQuery.RecoverableAmount,
  ProjectQuery.Description,
  ProjectQuery.InitiationDate,
  ProjectQuery.ProjectStatus,
  ProjectQuery.PlannedStartDate,
  ProjectQuery.PlannedEndDate,
  ProjectQuery.AgreementSignedDate,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.Description,
  ProjectDeliverable.StartDate,
  ProjectDeliverable.CompletionDate,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount,
  ProjectDeliverable.Comments,
  ProjectDeliverable.Fiscal,
  ProjectDeliverable.DeliverableStatus
FROM ProjectDeliverable
  RIGHT JOIN ProjectQuery ON ProjectDeliverable.ProjectID = ProjectQuery.ID;
--Query: ProjectDeliverableTotalsByFiscal SQL:
SELECT ProjectDeliverable.ProjectID,
  Sum(ProjectDeliverable.DeliverableAmount) AS SumOfDeliverableAmount,
  Sum(ProjectDeliverable.RecoverableAmount) AS SumOfRecoverableAmount,
  First(ProjectDeliverable.ProjectID) AS FirstOfProjectID,
  FiscalYear.FiscalYear
FROM ProjectDeliverable
  LEFT JOIN FiscalYear ON ProjectDeliverable.Fiscal = FiscalYear.ID
GROUP BY ProjectDeliverable.ProjectID,
  FiscalYear.FiscalYear;
--Query: ProjectQuery SQL:
SELECT Project.ID,
  Project.ProjectNumber,
  Project.ProjectVersion,
  Project.ProjectName,
  Project.Fiscal,
  Portfolio.PortfolioName,
  Portfolio.ExpenseAuthority,
  Portfolio.Responsibility,
  Portfolio.ServiceLine,
  Project.Classification,
  Project.ProjectType,
  Project.Funding,
  Project.Recoverable,
  Ministry.MinistryName,
  Project.AgreementType,
  Project.AgreementStartDate,
  Project.AgreementEndDate,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  Project.Description,
  Project.InitiationDate,
  Project.ProjectStatus,
  Project.PlannedStartDate,
  Project.PlannedEndDate,
  Project.AgreementSignedDate
FROM (
    Portfolio
    RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
  )
  LEFT JOIN Ministry ON Project.MinistryID = Ministry.ID;
--Query: ProjectQueryforSDT SQL:
SELECT Portfolio.PortfolioAbbrev,
  Project.Fiscal,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.ProjectManager,
  Project.AgreementStartDate,
  Project.AgreementEndDate,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  Project.Description,
  Ministry.MinistryName,
  qry_P_Sponsors.ClientSponsor,
  qry_P_Sponsors.ClientContact,
  qry_P_Sponsors.SIDSponsor,
  qry_P_Sponsors.SIDContact
FROM (
    (
      Portfolio
      RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
    )
    LEFT JOIN Ministry ON Project.MinistryID = Ministry.ID
  )
  INNER JOIN qry_P_Sponsors ON Project.ID = qry_P_Sponsors.ProjectID
WHERE (((Portfolio.PortfolioAbbrev) = "sdt"));
--Query: ProjectRecoverytoDateDetail SQL:
SELECT ProjectDeliverable.ProjectID,
  Portfolio.PortfolioName,
  Sum(ProjectBudget.DetailAmount) AS SumOfDetailAmount,
  Sum(
    (
      IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
    )
  ) AS RecoveredAmount,
  Sum([DetailAmount]) -(
    Sum(
      (
        IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
      )
    )
  ) AS BalanceRemaining
FROM ProjectDeliverable
  RIGHT JOIN (
    Portfolio
    RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
GROUP BY ProjectDeliverable.ProjectID,
  Portfolio.PortfolioName;
--Query: qry_ ProjectDeliverablesfor Jason SQL:
SELECT ProjectQuery.Fiscal,
  ProjectQuery.ProjectNumber AS [Project Number],
  ProjectQuery.ProjectName AS [Project Name],
  Project.ProjectManager,
  ProjectQuery.AgreementStartDate,
  ProjectQuery.AgreementEndDate,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.Description
FROM (
    ProjectDeliverable
    RIGHT JOIN ProjectQuery ON ProjectDeliverable.ProjectID = ProjectQuery.ID
  )
  INNER JOIN Project ON ProjectQuery.ID = Project.ID
ORDER BY ProjectQuery.ProjectNumber;
--Query: qry_ActiveContractsMissingInvoice SQL: PARAMETERS [Fiscal Year xx-xx] Text (255),
[Billing Period] Text (255);
SELECT Contract.CONumber,
  Contract.Description,
  Supplier.SupplierName,
  FiscalYear.FiscalYear
FROM Supplier
  INNER JOIN (
    Contract
    INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
  ) ON Supplier.ID = Contract.SupplierID
WHERE (
    ((FiscalYear.FiscalYear) = [Fiscal Year xx-xx])
    AND (
      (
        Exists (
          select ID
          from Invoice
          where ContractID = Contract.ID
            and BillingPeriod = [Billing Period]
        )
      ) = False
    )
    AND ((Contract.Status) = "Active")
  );
--Query: qry_billing_sheet2 SQL:
SELECT Project.ProjectNumber,
  Project.ProjectName,
  Project.ProjectManager,
  Project.ProjectStatus,
  ClientCoding.Client,
  ClientCoding.ResponsibilityCentre,
  ClientCoding.ServiceLine,
  ClientCoding.STOB,
  [FirstName] & " " & [LastName] AS Contact,
  ClientCoding.Client,
  Contact.Email,
  Contact.ContactPhone,
  Contact.ContactTitle,
  ClientCoding.ResponsibilityCentre,
  ClientCoding.ServiceLine,
  ClientCoding.STOB,
  ClientCoding.ProjectCode,
  JV.BilledDate,
  JV.Quarter,
  JV.Amount
FROM (
    (
      Project
      LEFT JOIN Contact_Project ON Project.ID = Contact_Project.ProjectID
    )
    LEFT JOIN Contact ON Contact_Project.ContactID = Contact.ID
  )
  RIGHT JOIN (
    ClientCoding
    INNER JOIN JV ON ClientCoding.ID = JV.ClientCodingID
  ) ON Project.ID = JV.ProjectID
WHERE (((Project.ProjectNumber) = [TYPE PROJECT NUMBER]));
--Query: qry_C_Summary SQL:
SELECT Contract.ID AS ContractID,
  Contract.CONumber,
  Supplier.SupplierName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Description,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount] AS TotalContractPayable,
  Portfolio.PortfolioName,
  v_SIDInternalCoding_Denormalized.STOB,
  v_SIDInternalCoding_Denormalized.WIPNo,
  v_SIDInternalCoding_Denormalized.AssetTag,
  v_SIDInternalCoding_Denormalized.CASProjectNumber,
  v_SIDInternalCoding_Denormalized.QualifiedReceiver,
  Portfolio.ServiceLine,
  Portfolio.Responsibility,
  v_SIDInternalCoding_Denormalized.RecoveryTypes,
  Contract.Status,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
FROM v_SIDInternalCoding_Denormalized
  INNER JOIN (
    Portfolio
    INNER JOIN (
      (
        Supplier
        RIGHT JOIN (
          Contract
          INNER JOIN qry_InvoiceTotals ON Contract.ID = qry_InvoiceTotals.ContractID
        ) ON Supplier.ID = Contract.SupplierID
      )
      INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
    ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
  ) ON (
    v_SIDInternalCoding_Denormalized.PortfolioID = Portfolio.ID
  )
  AND (
    v_SIDInternalCoding_Denormalized.ContractID = Contract.ID
  );
--Query: qry_C_Summary_Amendments SQL:
SELECT Contract.ID AS ContractID,
  Contract.CONumber,
  v_ContractAmendment_Denormalized.AmendmentNumber,
  v_ContractAmendment_Denormalized.AmendmentDate,
  v_ContractAmendment_Denormalized.AmendmentTypes,
  v_ContractAmendment_Denormalized.Description
FROM Contract
  LEFT JOIN v_ContractAmendment_Denormalized ON Contract.ID = v_ContractAmendment_Denormalized.ContractID;
--Query: qry_C_Summary_PaymentSummaryBase SQL: with ct as (
  select ContractID,
    Fiscal FiscalID,
    sum(TotalFees) TotalFees,
    sum(TotalExpenses) TotalExpenses
  from (
      select ContractID,
        Fiscal,
        sum(
          case
            when isnull(IsExpense, 0) = 0 then DeliverableAmount
            else 0
          end
        ) TotalFees,
        sum(
          case
            when isnull(IsExpense, 0) = 1 then DeliverableAmount
            else 0
          end
        ) TotalExpenses
      from ContractDeliverable
      group by ContractID,
        Fiscal
      union all
      select ContractID,
        Fiscal,
        sum(Hours * AssignmentRate) TotalFees,
        0 TotalExpenses
      from Contract_Resource
      group by ContractID,
        Fiscal
    ) c
  group by ContractID,
    Fiscal
),
inv as (
  select i.ContractID,
    i.Fiscal,
    sum(
      case
        when isnull(cd.IsExpense, 0) = 1 then id.UnitAmount * id.Rate
        else 0
      end
    ) ExpensesInvoiced,
    sum(
      case
        when isnull(cd.IsExpense, 0) = 0 then id.UnitAmount * id.Rate
        else 0
      end
    ) FeesInvoiced
  from Invoice i
    inner join InvoiceDetail id on i.ID = id.InvoiceID
    left join ContractDeliverable cd on id.ContractDeliverableID = cd.ID
  group by i.ContractID,
    i.Fiscal
)
select c.ID ContractID,
  isnull(ct.FiscalID, c.Fiscal) FiscalID,
  isnull(fy.FiscalYear, fy_d.FiscalYear) FiscalYear,
  isnull(ct.TotalFees, c.TotalFeeAmount) TotalFees,
  isnull(ct.TotalExpenses, c.TotalExpenseAmount) TotalExpenses,
  isnull(inv.ExpensesInvoiced, 0) ExpensesInvoiced,
  isnull(inv.FeesInvoiced, 0) FeesInvoiced,
  c.Status,
  count(1) over (partition by c.ID) NumRec
from Contract c
  left join ct on c.ID = ct.ContractID
  left join FiscalYear fy on ct.FiscalID = fy.ID
  left join FiscalYear fy_d on c.Fiscal = fy_d.ID
  left join inv on ct.ContractID = inv.ContractID
  and ct.FiscalID = inv.Fiscal --Query: qry_CA_ActiveContractorList SQL:
SELECT Contract.Fiscal,
  FiscalYear.FiscalYear,
  Resource.ResourceLastName,
  Resource.ResourceFirstName,
  Supplier.SupplierName,
  Contract.CONumber,
  Contract.Status,
  Contract.EndDate,
  Portfolio.PortfolioName,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount] AS TotalContractAmount,
  CCur([qry_InvoiceTotals].[TotalInvoiced]) AS TotalInvoiced,
  qry_InvoiceTotals.TotalRemaining,
  SIDInternalCoding.QualifiedReceiver
FROM (
    Portfolio
    INNER JOIN (
      (
        Supplier
        INNER JOIN (
          qry_InvoiceTotals
          INNER JOIN (
            Resource
            INNER JOIN (
              Contract
              INNER JOIN Contract_Resource ON Contract.[ID] = Contract_Resource.[ContractID]
            ) ON Resource.[ResourceID] = Contract_Resource.[ResourceID]
          ) ON qry_InvoiceTotals.ContractID = Contract.ID
        ) ON Supplier.ID = Contract.SupplierID
      )
      INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
    ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
  )
  INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
WHERE (((Contract.Status) = "Active"))
ORDER BY Resource.ResourceLastName,
  Contract.EndDate DESC;
--Query: qry_CA_CapitalContractsEDS SQL:
SELECT Contract.ID,
  FiscalYear.FiscalYear,
  Contract.CONumber,
  Contract.COversion,
  Project.ProjectNumber,
  First([ResourceFirstName] & " " & [ResourceLastName]) AS ResourceName,
  Supplier.SupplierName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Description,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount] AS TotalContractPayable,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  SIDInternalCoding.STOB,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.AssetTag,
  SIDInternalCoding.CASProjectNumber,
  SIDInternalCoding.QualifiedReceiver,
  Portfolio.ServiceLine,
  Portfolio.Responsibility,
  Contract.Status,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
FROM Resource
  RIGHT JOIN (
    Project
    INNER JOIN (
      Portfolio
      INNER JOIN (
        (
          (
            Supplier
            RIGHT JOIN (
              (
                Contract
                INNER JOIN qry_InvoiceTotals ON Contract.ID = qry_InvoiceTotals.ContractID
              )
              INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
            ) ON Supplier.ID = Contract.SupplierID
          )
          INNER JOIN Contract_Resource ON Contract.ID = Contract_Resource.ContractID
        )
        INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
      ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
    ) ON Project.ID = Contract.ProjectID
  ) ON Resource.ResourceID = Contract_Resource.ResourceID
GROUP BY Contract.ID,
  FiscalYear.FiscalYear,
  Contract.CONumber,
  Contract.COversion,
  Project.ProjectNumber,
  Supplier.SupplierName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Description,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount],
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  SIDInternalCoding.STOB,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.AssetTag,
  SIDInternalCoding.CASProjectNumber,
  SIDInternalCoding.QualifiedReceiver,
  Portfolio.ServiceLine,
  Portfolio.Responsibility,
  Contract.Status,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
HAVING (
    ((FiscalYear.FiscalYear) = [Enter Fiscal Year])
    AND ((Portfolio.PortfolioAbbrev) = "EDS")
    AND ((SIDInternalCoding.STOB) = "2000")
  );
--Query: qry_CA_CapitalContractsGDX SQL:
SELECT Contract.ID,
  FiscalYear.FiscalYear,
  Contract.Fiscal,
  Contract.CONumber,
  Contract.COversion,
  Project.ProjectNumber,
  First([ResourceFirstName] & " " & [ResourceLastName]) AS ResourceName,
  Supplier.SupplierName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Description,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount] AS TotalContractPayable,
  Portfolio.ID AS PortfolioID,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  SIDInternalCoding.STOB,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.AssetTag,
  SIDInternalCoding.CASProjectNumber,
  SIDInternalCoding.QualifiedReceiver,
  Portfolio.ServiceLine,
  Portfolio.Responsibility,
  Contract.Status,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
FROM Resource
  RIGHT JOIN (
    Project
    INNER JOIN (
      Portfolio
      INNER JOIN (
        (
          (
            Supplier
            RIGHT JOIN (
              (
                Contract
                INNER JOIN qry_InvoiceTotals ON Contract.ID = qry_InvoiceTotals.ContractID
              )
              INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
            ) ON Supplier.ID = Contract.SupplierID
          )
          INNER JOIN Contract_Resource ON Contract.ID = Contract_Resource.ContractID
        )
        INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
      ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
    ) ON Project.ID = Contract.ProjectID
  ) ON Resource.ResourceID = Contract_Resource.ResourceID
GROUP BY Contract.ID,
  FiscalYear.FiscalYear,
  Contract.Fiscal,
  Contract.CONumber,
  Contract.COversion,
  Project.ProjectNumber,
  Supplier.SupplierName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Description,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount],
  Portfolio.ID,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  SIDInternalCoding.STOB,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.AssetTag,
  SIDInternalCoding.CASProjectNumber,
  SIDInternalCoding.QualifiedReceiver,
  Portfolio.ServiceLine,
  Portfolio.Responsibility,
  Contract.Status,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
HAVING (((SIDInternalCoding.STOB) = "2000"));
--Query: qry_Capital_Projects SQL:
SELECT Project.Funding,
  Portfolio.PortfolioName AS Portfolio,
  Project.Fiscal,
  Ministry.MinistryShortName AS Ministry,
  Project.ProjectNumber AS [#],
  Project.ProjectName AS Name,
  Project.ProjectManager,
  Project.Description,
  Project.PlannedStartDate AS [Start Date],
  Project.PlannedEndDate AS [End Date],
  Project.PlannedBudget,
  Project.ProjectType
FROM (
    Portfolio
    RIGHT JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
  )
  INNER JOIN Ministry ON Project.MinistryID = Ministry.ID
WHERE (
    (
      (Project.Funding) = "Capital"
      Or (Project.Funding) = "Combination"
    )
  )
ORDER BY Project.Fiscal,
  Project.ProjectNumber;
--Query: qry_CF_PortfolioSummary SQL:
SELECT Contract.ID AS ContractID,
  Contract.CONumber,
  Project.ProjectNumber,
  Contract.COversion,
  Contract.Status,
  qry_ContractBalanceByFiscalBase.Fiscal,
  qry_ContractBalanceByFiscalBase.FiscalYear,
  Contract.ContractType,
  Supplier.SupplierName,
  Portfolio.ID AS PortfolioID,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Contract.StartDate,
  Contract.EndDate,
  qry_ContractBalanceByFiscalBase.TotalFeeAmount,
  qry_ContractBalanceByFiscalBase.TotalExpenseAmount,
  [qry_ContractBalanceByFiscalBase].[TotalFeeAmount] + [qry_ContractBalanceByFiscalBase].[TotalExpenseAmount] AS MaximumPayable,
  IIf(Sum([Amount]) Is Null, 0, Sum([Amount])) AS TotalInvoiced,
  [qry_ContractBalanceByFiscalBase].[TotalFeeAmount] + [qry_ContractBalanceByFiscalBase].[TotalExpenseAmount] - Nz(Sum([qry_InvoiceProcessingByFiscal].[Amount]), 0) AS TotalRemaining
FROM (
    (
      (
        (
          Portfolio
          INNER JOIN (
            (
              Supplier
              INNER JOIN Contract ON Supplier.ID = Contract.SupplierID
            )
            INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
          ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
        )
        INNER JOIN Project ON Contract.ProjectID = Project.ID
      )
      INNER JOIN qry_ContractBalanceByFiscalBase ON Contract.ID = qry_ContractBalanceByFiscalBase.ContractID
    )
    LEFT JOIN qry_InvoiceProcessingByFiscal ON (
      qry_ContractBalanceByFiscalBase.Fiscal = qry_InvoiceProcessingByFiscal.Fiscal
    )
    AND (
      qry_ContractBalanceByFiscalBase.ContractID = qry_InvoiceProcessingByFiscal.ContractID
    )
  )
  INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
GROUP BY Contract.ID,
  Contract.CONumber,
  Project.ProjectNumber,
  Contract.COversion,
  Contract.Status,
  qry_ContractBalanceByFiscalBase.Fiscal,
  qry_ContractBalanceByFiscalBase.FiscalYear,
  Contract.ContractType,
  Supplier.SupplierName,
  Portfolio.ID,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Contract.StartDate,
  Contract.EndDate,
  qry_ContractBalanceByFiscalBase.TotalFeeAmount,
  qry_ContractBalanceByFiscalBase.TotalExpenseAmount,
  [qry_ContractBalanceByFiscalBase].[TotalFeeAmount] + [qry_ContractBalanceByFiscalBase].[TotalExpenseAmount];
--Query: qry_ChangeRequest_XTab SQL: TRANSFORM Sum(qry_ChangeRequestBase.CountByType) AS SumOfCountByType
SELECT qry_ChangeRequestBase.FiscalYearID AS FiscalYearID,
  qry_ChangeRequestBase.FiscalYear AS FiscalYear,
  qry_ChangeRequestBase.ProjectNumber AS ProjectNumber,
  qry_ChangeRequestBase.ProjectID AS ProjectID,
  qry_ChangeRequestBase.ProjectName AS ProjectName,
  qry_ChangeRequestBase.InitiatedBy AS InitiatedBy
FROM qry_ChangeRequestBase
GROUP BY qry_ChangeRequestBase.FiscalYearID,
  qry_ChangeRequestBase.FiscalYear,
  qry_ChangeRequestBase.ProjectNumber,
  qry_ChangeRequestBase.ProjectID,
  qry_ChangeRequestBase.ProjectName,
  qry_ChangeRequestBase.InitiatedBy PIVOT qry_ChangeRequestBase.CRType In ("Budget", "Schedule", "Scope", "None");
--Query: qry_ChangeRequestBase SQL:
SELECT FiscalYear.ID AS FiscalYearID,
  FiscalYear.FiscalYear,
  Project.ID AS ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  Nz([ChangeRequest].[InitiatedBy], "None") AS InitiatedBy,
  Nz([CRType].[CRTypeName], "None") AS CRType,
  Count(*) AS CountByType
FROM (
    ChangeRequest_CRType
    RIGHT JOIN (
      (
        ChangeRequest
        INNER JOIN FiscalYear ON ChangeRequest.FiscalYear = FiscalYear.ID
      )
      INNER JOIN Project ON ChangeRequest.LinkID = Project.ID
    ) ON ChangeRequest_CRType.ChangeRequestID = ChangeRequest.ID
  )
  LEFT JOIN CRType ON ChangeRequest_CRType.CRTypeID = CRType.ID
GROUP BY FiscalYear.ID,
  FiscalYear.FiscalYear,
  Project.ID,
  Project.ProjectNumber,
  Project.ProjectName,
  Nz([ChangeRequest].[InitiatedBy], "None"),
  Nz([CRType].[CRTypeName], "None");
--Query: qry_ChangeRequestCountByInitiatedBy SQL:
SELECT ChangeRequest.FiscalYear AS FiscalYearID,
  ChangeRequest.LinkID AS ProjectID,
  Nz([ChangeRequest].[InitiatedBy], "None") AS InitiatedBy,
  Count(*) AS CRCount
FROM ChangeRequest
GROUP BY ChangeRequest.FiscalYear,
  ChangeRequest.LinkID,
  Nz([ChangeRequest].[InitiatedBy], "None");
--Query: qry_ChangeRequestCountByProject SQL:
SELECT ChangeRequest.LinkID AS ProjectID,
  Count(*) AS CRCount
FROM ChangeRequest
GROUP BY ChangeRequest.LinkID;
--Query: qry_Contract_CGI_Deliverables SQL:
SELECT Contract.CONumber,
  Project.ProjectNumber,
  Project.Description,
  Contract.TotalFeeAmount,
  Supplier.SupplierName,
  Contract.StartDate,
  Contract.EndDate,
  ContractDeliverable.DeliverableName
FROM (
    Supplier
    RIGHT JOIN (
      (
        (
          Portfolio
          INNER JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
        )
        INNER JOIN Contract ON Project.[ID] = Contract.[ProjectID]
      )
      INNER JOIN ContractDeliverable ON Contract.[ID] = ContractDeliverable.[ContractID]
    ) ON Supplier.ID = Contract.SupplierID
  )
  INNER JOIN SIDInternalCoding ON (Portfolio.ID = SIDInternalCoding.PortfolioID)
  AND (Contract.ID = SIDInternalCoding.ContractID)
WHERE (
    ((Supplier.SupplierName) = "CGI")
    AND (
      (Contract.StartDate) > #4/1/2014#) AND ((ContractDeliverable.IsExpense)=False));
      --Query: qry_Contract_DeliverablesDue SQL:
      SELECT Contract.CONumber,
        SIDInternalCoding.QualifiedReceiver,
        Supplier.SupplierName,
        ContractDeliverable.CompletionDate,
        ContractDeliverable.DeliverableName,
        Project.ProjectNumber,
        Project.ProjectName,
        Portfolio.PortfolioName
      FROM (
          Supplier
          RIGHT JOIN (
            (
              (
                Portfolio
                INNER JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
              )
              INNER JOIN Contract ON Project.[ID] = Contract.[ProjectID]
            )
            INNER JOIN ContractDeliverable ON Contract.[ID] = ContractDeliverable.[ContractID]
          ) ON Supplier.ID = Contract.SupplierID
        )
        INNER JOIN SIDInternalCoding ON (Portfolio.ID = SIDInternalCoding.PortfolioID)
        AND (Contract.ID = SIDInternalCoding.ContractID)
      WHERE (
          (
            (ContractDeliverable.CompletionDate) Between [Start Date mm/dd/yyyy] And [End Date mm/dd/yyyy]
          )
          AND ((Contract.Status) = "Active")
          AND ((ContractDeliverable.IsExpense) = False)
        )
      ORDER BY SIDInternalCoding.QualifiedReceiver,
        ContractDeliverable.CompletionDate;
--Query: qry_ContractAmendmentsByFiscal SQL:
SELECT Contract.Fiscal AS FiscalYearID,
  Count(*) AS AmendmentCount,
  Contract.ContractType
FROM Contract
  INNER JOIN ContractAmendment ON Contract.ID = ContractAmendment.ContractID
WHERE (((Contract.ContractType) = "ChangeOrder"))
GROUP BY Contract.Fiscal,
  Contract.ContractType;
--Query: qry_ContractAmendmentTypesByFiscal SQL: TRANSFORM Count(*) AS Expr1
SELECT FiscalYear.FiscalYear,
  Contract.CONumber,
  qry_ContractAmendmentsByFiscal.AmendmentCount
FROM (
    ContractAmendment_AmendmentType
    LEFT JOIN AmendmentType ON ContractAmendment_AmendmentType.AmendmentTypeID = AmendmentType.ID
  )
  RIGHT JOIN (
    (
      qry_ContractAmendmentsByFiscal
      INNER JOIN (
        Contract
        INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
      ) ON qry_ContractAmendmentsByFiscal.FiscalYearID = FiscalYear.ID
    )
    LEFT JOIN ContractAmendment ON Contract.ID = ContractAmendment.ContractID
  ) ON ContractAmendment_AmendmentType.ContractAmendmentID = ContractAmendment.ID
GROUP BY FiscalYear.FiscalYear,
  Contract.CONumber,
  qry_ContractAmendmentsByFiscal.AmendmentCount PIVOT AmendmentType.AmendmentTypeName In (
    "Resources",
    "Scope",
    "Budget",
    "Hours",
    "Timelines",
    "End Date",
    "Expenses",
    "Admin"
  );
--Query: qry_ContractAmendmentTypesByFiscalIT SQL: TRANSFORM Count(*) AS Expr1
SELECT FiscalYear.FiscalYear,
  Contract.CONumber,
  qry_ContractAmendmentsByFiscal.AmendmentCount
FROM (
    qry_ContractAmendmentsByFiscal
    INNER JOIN (
      Contract
      INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
    ) ON qry_ContractAmendmentsByFiscal.FiscalYearID = FiscalYear.ID
  )
  LEFT JOIN ContractAmendment ON Contract.ID = ContractAmendment.ContractID
GROUP BY FiscalYear.FiscalYear,
  Contract.CONumber,
  qry_ContractAmendmentsByFiscal.AmendmentCount,
  Contract.ContractType PIVOT ContractAmendment.AmendmentType.Value In (
    "Resources",
    "Scope",
    "Budget",
    "Hours",
    "Timelines",
    "End Date",
    "Expenses",
    "Admin"
  );
--Query: qry_ContractBalanceBase SQL:
select c.Fiscal,
  fy.FiscalYear,
  sic.PortfolioID,
  po.PortfolioName,
  po.PortfolioAbbrev,
  c.ID ContractID,
  c.CONumber,
  c.StartDate,
  p.ProjectNumber,
  c.EndDate,
  c.Status,
  c.TotalFeeAmount,
  c.TotalExpenseAmount
from Contract c
  inner join FiscalYear fy on c.Fiscal = fy.ID
  left join Project p on c.ProjectID = p.ID
  outer apply (
    select top 1 PortfolioID
    from SIDInternalCoding
    where ContractID = c.ID
  ) sic
  left join Portfolio po on sic.PortfolioID = po.ID --Query: qry_ContractBalanceByFiscalBase SQL:
select c.ID ContractID,
  c.CONumber,
  isnull(t.Fiscal, c.Fiscal) Fiscal,
  isnull(fy.FiscalYear, fy_d.FiscalYear) FiscalYear,
  sic.PortfolioID,
  po.PortfolioName,
  po.PortfolioAbbrev,
  c.StartDate,
  p.ProjectNumber,
  c.EndDate,
  c.Status,
  isnull(t.TotalFeeAmount, c.TotalFeeAmount) TotalFeeAmount,
  isnull(t.TotalExpenseAmount, c.TotalExpenseAmount) TotalExpenseAmount
from Contract c
  inner join FiscalYear fy_d on c.Fiscal = fy_d.ID
  left join (
    select ContractID,
      Fiscal,
      sum(TotalFeeAmount) TotalFeeAmount,
      sum(TotalExpenseAmount) TotalExpenseAmount
    from (
        select ContractID,
          Fiscal,
          sum(Hours * AssignmentRate) TotalFeeAmount,
          null TotalExpenseAmount
        from Contract_Resource
        group by ContractID,
          Fiscal
        union
        select ContractID,
          Fiscal,
          sum(
            case
              when IsExpense = 0 then DeliverableAmount
              else 0
            end
          ),
          sum(
            case
              when IsExpense = 1 then DeliverableAmount
              else 0
            end
          )
        from ContractDeliverable
        group by ContractID,
          Fiscal
      ) t_sub
    group by ContractID,
      Fiscal
  ) t on c.ID = t.ContractID
  left join FiscalYear fy on t.Fiscal = fy.ID
  left join Project p on c.ProjectID = p.ID
  outer apply (
    select top 1 PortfolioID
    from SIDInternalCoding
    where ContractID = c.ID
  ) sic
  left join Portfolio po on sic.PortfolioID = po.ID --Query: qry_ContractBalances SQL:
SELECT FiscalYear.FiscalYear,
  Min(Portfolio.PortfolioName) AS PortfolioName,
  Min(Portfolio.PortfolioAbbrev) AS PortfolioAbbrev,
  Contract.ID AS ContractID,
  Contract.CONumber,
  Contract.StartDate,
  Project.ProjectNumber,
  Contract.EndDate,
  Contract.Status,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
FROM qry_InvoiceTotals
  INNER JOIN (
    Project
    RIGHT JOIN (
      (
        SIDInternalCoding
        LEFT JOIN Portfolio ON SIDInternalCoding.PortfolioID = Portfolio.ID
      )
      RIGHT JOIN (
        Contract
        INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
      ) ON SIDInternalCoding.ContractID = Contract.ID
    ) ON Project.ID = Contract.ProjectID
  ) ON qry_InvoiceTotals.ContractID = Contract.ID
GROUP BY FiscalYear.FiscalYear,
  Contract.ID,
  Contract.CONumber,
  Contract.StartDate,
  Project.ProjectNumber,
  Contract.EndDate,
  Contract.Status,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
HAVING (((FiscalYear.FiscalYear) = [Entering FY xx-xx]));
--Query: qry_ContractBalances_NoParameter SQL:
SELECT qry_ContractBalanceBase.Fiscal,
  qry_ContractBalanceBase.FiscalYear,
  qry_ContractBalanceBase.PortfolioID,
  qry_ContractBalanceBase.PortfolioName,
  qry_ContractBalanceBase.PortfolioAbbrev,
  qry_ContractBalanceBase.ContractID,
  qry_ContractBalanceBase.CONumber,
  qry_ContractBalanceBase.StartDate,
  qry_ContractBalanceBase.ProjectNumber,
  qry_ContractBalanceBase.EndDate,
  qry_ContractBalanceBase.Status,
  qry_ContractBalanceBase.TotalFeeAmount,
  qry_ContractBalanceBase.TotalExpenseAmount,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
FROM qry_ContractBalanceBase
  INNER JOIN qry_InvoiceTotals ON qry_ContractBalanceBase.ContractID = qry_InvoiceTotals.ContractID;
--Query: qry_ContractDeliverableFeeTotal SQL:
SELECT ContractDeliverable.ContractID,
  Sum(ContractDeliverable.DeliverableAmount) AS DeliverableTotal
FROM ContractDeliverable
WHERE (
    (
      (ContractDeliverable.DeliverableAmount) Is Not Null
    )
    AND ((ContractDeliverable.IsExpense) = False)
  )
GROUP BY ContractDeliverable.ContractID;
--Query: qry_ContractFixedPriceInvoicedTotal SQL:
SELECT Invoice.ContractID,
  Sum([UnitAmount] * [Rate]) AS FixedPriceAmount
FROM ContractDeliverable
  INNER JOIN (
    Invoice
    INNER JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
  ) ON ContractDeliverable.ID = InvoiceDetail.ContractDeliverableID
GROUP BY Invoice.ContractID,
  ContractDeliverable.IsExpense
HAVING (((ContractDeliverable.IsExpense) = False));
--Query: qry_ContractFixedPriceInvoicedTotalExpense SQL:
SELECT Invoice.ContractID,
  Sum([UnitAmount] * [Rate]) AS FixedPriceAmount
FROM Invoice
  INNER JOIN (
    ContractDeliverable
    INNER JOIN InvoiceDetail ON ContractDeliverable.ID = InvoiceDetail.ContractDeliverableID
  ) ON Invoice.ID = InvoiceDetail.InvoiceID
GROUP BY Invoice.ContractID,
  ContractDeliverable.IsExpense
HAVING (((ContractDeliverable.IsExpense) = True));
--Query: qry_Contractor_Resource_COs SQL:
SELECT FiscalYear.FiscalYear,
  Resource.ResourceFirstName,
  Resource.ResourceLastName,
  Project.ProjectNumber,
  Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Status,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount] AS TotalContractAmt
FROM Project
  INNER JOIN (
    (
      Resource
      INNER JOIN (
        Contract
        INNER JOIN Contract_Resource ON Contract.[ID] = Contract_Resource.[ContractID]
      ) ON Resource.[ResourceID] = Contract_Resource.[ResourceID]
    )
    INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
  ) ON Project.ID = Contract.ProjectID
ORDER BY Resource.ResourceLastName,
  Contract.EndDate DESC;
--Query: qry_ContractorFixedPriceResourceCount SQL:
SELECT Contract_Resource.ContractID,
  Count(Contract_Resource.ID) AS FixedPriceResourceCount
FROM Contract_Resource
WHERE (((Contract_Resource.Hours) Is Null))
GROUP BY Contract_Resource.ContractID;
--Query: qry_ContractorResourceUtilization SQL: with FixedPriceResourceCount as (
  select ContractID,
    count(*) FixedPriceResourceCount
  from Contract_Resource
  where Hours is null
  group by ContractID
),
FixedPriceInvoiceTotal as (
  select i.ContractID,
    sum(id.UnitAmount * id.Rate) FixedPriceAmount
  from Invoice i
    inner join InvoiceDetail id on i.ID = id.InvoiceID
    inner join ContractDeliverable cd on id.ContractDeliverableID = cd.ID
  where cd.IsExpense = 0
  group by i.ContractID
),
ContractDeliverableFeeTotal as (
  select ContractID,
    sum(DeliverableAmount) DeliverableTotal
  from ContractDeliverable
  where DeliverableAmount is not null
    and IsExpense = 0
  group by ContractID
),
ContractPortfolio as (
  select ContractID,
    min(PortfolioID) PortID
  from SIDInternalCoding
  group by ContractID
)
select cr.ContractID,
  c.CONumber,
  c.TotalFeeAmount,
  po.PortfolioName,
  po.PortfolioAbbrev,
  rt.ResourceType,
  fy.FiscalYear,
  case
    when cr.Hours is null then -1
    else 0
  end Fixed,
  sum(id.UnitAmount * id.Rate) HourlyFees,
  fpit.FixedPriceAmount,
  count(*) ResourceCount,
  fprc.FixedPriceResourceCount,
  fpit.FixedPriceAmount * cast(count(*) as float) / fprc.FixedPriceResourceCount AllocatedDeliverableTotal
from Contract c
  inner join FiscalYear fy on c.Fiscal = fy.ID
  inner join Contract_Resource cr on c.ID = cr.ContractID
  inner join SupplierRate sr on cr.SupplierRateId = sr.ID
  inner join ResourceType rt on sr.ResourceTypeID = rt.ID
  inner join ContractPortfolio cp on c.ID = cp.ContractID
  inner join Portfolio po on cp.PortID = po.ID
  left join InvoiceDetail id on cr.ID = id.ContractResourceID
  left join FixedPriceResourceCount fprc on c.ID = fprc.ContractID
  left join FixedPriceInvoiceTotal fpit on c.ID = fpit.ContractID
  left join ContractDeliverableFeeTotal cdft on c.ID = cdft.ContractID
group by cr.ContractID,
  c.CONumber,
  c.TotalFeeAmount,
  po.PortfolioName,
  po.PortfolioAbbrev,
  rt.ResourceType,
  fy.FiscalYear,
  case
    when cr.Hours is null then -1
    else 0
  end,
  fpit.FixedPriceAmount,
  fprc.FixedPriceResourceCount --Query: qry_ContractorResourceUtilization_Crosstab SQL: TRANSFORM Sum(
    Nz([HourlyFees], 0) + Nz([AllocatedDeliverableTotal], 0)
  ) AS Expr1
SELECT qry_ContractorResourceUtilization.FiscalYear,
  qry_ContractorResourceUtilization.ResourceType
FROM qry_ContractorResourceUtilization
WHERE (
    (
      (qry_ContractorResourceUtilization.FiscalYear) = [Enter Fiscal Year]
    )
  )
GROUP BY qry_ContractorResourceUtilization.FiscalYear,
  qry_ContractorResourceUtilization.ResourceType PIVOT qry_ContractorResourceUtilization.PortfolioAbbrev In (
    "OSS",
    "DES",
    "DMS",
    "DP",
    "ANA",
    "SD",
    "CE",
    "EDS",
    "BCS",
    "DIV",
    "GC"
  );
--Query: qry_ContractorResourceUtilization_ITcontracts SQL:
SELECT Contract_Resource.ContractID,
  Contract.CONumber,
  Contract.TotalFeeAmount,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  ResourceType.ResourceType,
  FiscalYear.FiscalYear,
  IIf([Contract_Resource].[Hours] Is Null, True, False) AS Fixed,
  Sum(
    [InvoiceDetail].[UnitAmount] * [InvoiceDetail].[Rate]
  ) AS HourlyFees,
  qry_ContractFixedPriceInvoicedTotal.FixedPriceAmount,
  Count(Contract_Resource.ID) AS ResourceCount,
  qry_ContractorFixedPriceResourceCount.FixedPriceResourceCount,
  [FixedPriceAmount] * Count([Contract_Resource].[ID]) / [FixedPriceResourceCount] AS AllocatedDeliverableTotal
FROM (
    ResourceType
    INNER JOIN SupplierRate ON ResourceType.ID = SupplierRate.ResourceTypeID
  )
  INNER JOIN (
    (
      (
        (
          qry_ContractPortfolio
          INNER JOIN Portfolio ON qry_ContractPortfolio.PortID = Portfolio.ID
        )
        INNER JOIN (
          (
            (
              Contract
              INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
            )
            LEFT JOIN qry_ContractDeliverableFeeTotal ON Contract.ID = qry_ContractDeliverableFeeTotal.ContractID
          )
          LEFT JOIN qry_ContractorFixedPriceResourceCount ON Contract.ID = qry_ContractorFixedPriceResourceCount.ContractID
        ) ON qry_ContractPortfolio.ContractID = Contract.ID
      )
      LEFT JOIN qry_ContractFixedPriceInvoicedTotal ON Contract.ID = qry_ContractFixedPriceInvoicedTotal.ContractID
    )
    INNER JOIN (
      Contract_Resource
      LEFT JOIN InvoiceDetail ON Contract_Resource.ID = InvoiceDetail.ContractResourceID
    ) ON Contract.ID = Contract_Resource.ContractID
  ) ON SupplierRate.ID = Contract_Resource.SupplierRateID
WHERE (
    (
      (Contract.ContractType) = "IT General Service Agreement"
    )
  )
GROUP BY Contract_Resource.ContractID,
  Contract.CONumber,
  Contract.TotalFeeAmount,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  ResourceType.ResourceType,
  FiscalYear.FiscalYear,
  IIf([Contract_Resource].[Hours] Is Null, True, False),
  qry_ContractFixedPriceInvoicedTotal.FixedPriceAmount,
  qry_ContractorFixedPriceResourceCount.FixedPriceResourceCount;
--Query: qry_ContractorResourceUtilization_LOCAL SQL:
SELECT Contract_Resource.ContractID,
  Contract.CONumber,
  Contract.TotalFeeAmount,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  ResourceType.ResourceType,
  FiscalYear.FiscalYear,
  IIf([Contract_Resource].[Hours] Is Null, True, False) AS Fixed,
  Sum(
    [InvoiceDetail].[UnitAmount] * [InvoiceDetail].[Rate]
  ) AS HourlyFees,
  qry_ContractFixedPriceInvoicedTotal.FixedPriceAmount,
  Count(Contract_Resource.ID) AS ResourceCount,
  qry_ContractorFixedPriceResourceCount.FixedPriceResourceCount,
  [FixedPriceAmount] * Count([Contract_Resource].[ID]) / [FixedPriceResourceCount] AS AllocatedDeliverableTotal
FROM (
    ResourceType
    INNER JOIN SupplierRate ON ResourceType.ID = SupplierRate.ResourceTypeID
  )
  INNER JOIN (
    (
      (
        (
          qry_ContractPortfolio
          INNER JOIN Portfolio ON qry_ContractPortfolio.PortID = Portfolio.ID
        )
        INNER JOIN (
          (
            (
              Contract
              INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
            )
            LEFT JOIN qry_ContractDeliverableFeeTotal ON Contract.ID = qry_ContractDeliverableFeeTotal.ContractID
          )
          LEFT JOIN qry_ContractorFixedPriceResourceCount ON Contract.ID = qry_ContractorFixedPriceResourceCount.ContractID
        ) ON qry_ContractPortfolio.ContractID = Contract.ID
      )
      LEFT JOIN qry_ContractFixedPriceInvoicedTotal ON Contract.ID = qry_ContractFixedPriceInvoicedTotal.ContractID
    )
    INNER JOIN (
      Contract_Resource
      LEFT JOIN InvoiceDetail ON Contract_Resource.ID = InvoiceDetail.ContractResourceID
    ) ON Contract.ID = Contract_Resource.ContractID
  ) ON SupplierRate.ID = Contract_Resource.SupplierRateID
GROUP BY Contract_Resource.ContractID,
  Contract.CONumber,
  Contract.TotalFeeAmount,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  ResourceType.ResourceType,
  FiscalYear.FiscalYear,
  IIf([Contract_Resource].[Hours] Is Null, True, False),
  qry_ContractFixedPriceInvoicedTotal.FixedPriceAmount,
  qry_ContractorFixedPriceResourceCount.FixedPriceResourceCount;
--Query: qry_ContractorResourceUtilization2 SQL:
SELECT Contract_Resource.ContractID,
  Contract.CONumber,
  Contract.TotalFeeAmount,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  ResourceType.ResourceType,
  FiscalYear.FiscalYear,
  IIf([Contract_Resource].[Hours] Is Null, True, False) AS Fixed,
  Sum(
    [InvoiceDetail].[UnitAmount] * [InvoiceDetail].[Rate]
  ) AS HourlyFees,
  qry_ContractFixedPriceInvoicedTotal.FixedPriceAmount,
  Count(Contract_Resource.ID) AS ResourceCount,
  qry_ContractorFixedPriceResourceCount.FixedPriceResourceCount,
  [FixedPriceAmount] * Count([Contract_Resource].[ID]) / [FixedPriceResourceCount] AS AllocatedDeliverableTotal
FROM (
    ResourceType
    INNER JOIN SupplierRate ON ResourceType.ID = SupplierRate.ResourceTypeID
  )
  INNER JOIN (
    (
      (
        (
          qry_ContractPortfolio
          INNER JOIN Portfolio ON qry_ContractPortfolio.PortID = Portfolio.ID
        )
        INNER JOIN (
          (
            (
              Contract
              INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
            )
            LEFT JOIN qry_ContractDeliverableFeeTotal ON Contract.ID = qry_ContractDeliverableFeeTotal.ContractID
          )
          LEFT JOIN qry_ContractorFixedPriceResourceCount ON Contract.ID = qry_ContractorFixedPriceResourceCount.ContractID
        ) ON qry_ContractPortfolio.ContractID = Contract.ID
      )
      LEFT JOIN qry_ContractFixedPriceInvoicedTotal ON Contract.ID = qry_ContractFixedPriceInvoicedTotal.ContractID
    )
    INNER JOIN (
      Contract_Resource
      LEFT JOIN InvoiceDetail ON Contract_Resource.ID = InvoiceDetail.ContractResourceID
    ) ON Contract.ID = Contract_Resource.ContractID
  ) ON SupplierRate.ID = Contract_Resource.SupplierRateID
WHERE (((Contract.ContractType) = "ChangeOrder"))
GROUP BY Contract_Resource.ContractID,
  Contract.CONumber,
  Contract.TotalFeeAmount,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  ResourceType.ResourceType,
  FiscalYear.FiscalYear,
  IIf([Contract_Resource].[Hours] Is Null, True, False),
  qry_ContractFixedPriceInvoicedTotal.FixedPriceAmount,
  qry_ContractorFixedPriceResourceCount.FixedPriceResourceCount;
--Query: qry_ContractPortfolio SQL:
SELECT SIDInternalCoding.ContractID,
  Min(SIDInternalCoding.PortfolioID) AS PortID
FROM SIDInternalCoding
GROUP BY SIDInternalCoding.ContractID;
--Query: qry_ContractsOver50K SQL:
SELECT Contract.Fiscal,
  Contract.ID,
  Contract.CONumber,
  Supplier.SupplierName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Description,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  [Contract].[TotalFeeAmount] + [Contract].[TotalExpenseAmount] AS TotalContractPayable,
  Portfolio.PortfolioName,
  SIDInternalCoding.STOB,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.AssetTag,
  SIDInternalCoding.CASProjectNumber,
  SIDInternalCoding.QualifiedReceiver,
  Portfolio.ServiceLine,
  Portfolio.Responsibility,
  SIDInternalCoding.RecoveryInfo,
  Contract.Status,
  qry_InvoiceTotals.FeesInvoiced,
  qry_InvoiceTotals.ExpensesInvoiced,
  qry_InvoiceTotals.TotalInvoiced,
  qry_InvoiceTotals.FeesRemaining,
  qry_InvoiceTotals.ExpensesRemaining,
  qry_InvoiceTotals.TotalRemaining
FROM Portfolio
  INNER JOIN (
    (
      Supplier
      RIGHT JOIN (
        Contract
        INNER JOIN qry_InvoiceTotals ON Contract.ID = qry_InvoiceTotals.ContractID
      ) ON Supplier.ID = Contract.SupplierID
    )
    INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
  ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
WHERE (((qry_InvoiceTotals.TotalInvoiced) > 50000));
--Query: qry_ContractSupplier_Utilization SQL:
SELECT Contract.Fiscal,
  FiscalYear.FiscalYear,
  Contract.SupplierID,
  Supplier.SupplierName,
  Portfolio.PortfolioAbbrev AS Portfolio,
  Contract.CONumber,
  Sum([UnitAmount] * [Rate]) AS TotalInvoiced
FROM (
    Portfolio
    INNER JOIN (
      (
        (
          (
            Supplier
            RIGHT JOIN Contract ON Supplier.ID = Contract.SupplierID
          )
          INNER JOIN Invoice ON Contract.ID = Invoice.ContractID
        )
        INNER JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
      )
      INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
    ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
  )
  INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
GROUP BY Contract.Fiscal,
  FiscalYear.FiscalYear,
  Contract.SupplierID,
  Supplier.SupplierName,
  Contract.CONumber,
  Portfolio.PortfolioAbbrev
UNION
SELECT Historical_Contracts.FiscalYear,
  FiscalYear.FiscalYear,
  Historical_Contracts.SupplierID,
  Supplier.SupplierName,
  Portfolio.PortfolioAbbrev,
  Historical_Contracts.CONumber,
  Historical_Contracts.Invoiced
FROM (
    Supplier
    INNER JOIN (
      FiscalYear
      INNER JOIN Historical_Contracts ON FiscalYear.ID = Historical_Contracts.FiscalYear
    ) ON Supplier.ID = Historical_Contracts.SupplierID
  )
  INNER JOIN Portfolio ON Historical_Contracts.PortfolioID = Portfolio.ID;
--Query: qry_ContractSupplier_Utilizationbydate SQL:
SELECT Contract.Fiscal,
  FiscalYear.FiscalYear,
  Contract.SupplierID,
  Supplier.SupplierName,
  Portfolio.PortfolioAbbrev AS Portfolio,
  Contract.CONumber,
  Sum([UnitAmount] * [Rate]) AS TotalInvoiced
FROM (
    Portfolio
    INNER JOIN (
      (
        (
          (
            Supplier
            RIGHT JOIN Contract ON Supplier.ID = Contract.SupplierID
          )
          INNER JOIN Invoice ON Contract.ID = Invoice.ContractID
        )
        INNER JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
      )
      INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
    ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
  )
  INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
GROUP BY Contract.Fiscal,
  FiscalYear.FiscalYear,
  Contract.SupplierID,
  Supplier.SupplierName,
  Contract.CONumber,
  Portfolio.PortfolioAbbrev
UNION
SELECT Historical_Contracts.FiscalYear,
  FiscalYear.FiscalYear,
  Historical_Contracts.SupplierID,
  Supplier.SupplierName,
  Portfolio.PortfolioAbbrev,
  Historical_Contracts.CONumber,
  Historical_Contracts.Invoiced
FROM (
    Supplier
    INNER JOIN (
      FiscalYear
      INNER JOIN Historical_Contracts ON FiscalYear.ID = Historical_Contracts.FiscalYear
    ) ON Supplier.ID = Historical_Contracts.SupplierID
  )
  INNER JOIN Portfolio ON Historical_Contracts.PortfolioID = Portfolio.ID;
--Query: qry_CurrentYearRecoveries SQL: PARAMETERS [Enter Fiscal:] Text (255);
SELECT Project.ID AS ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  Sum([Q1_Amount] + [Q2_Amount] + [Q3_Amount] + [Q4_Amount]) AS CurrentFYTotalRecoverable,
  Sum(
    IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
  ) AS CurrentFYRecoveredToDate,
  qry_Project_Contracts.Fees,
  qry_Project_Contracts.Expenses,
  qry_Project_Contracts.[Total Contract],
  ProjectDeliverable.Fiscal,
  FiscalYear.FiscalYear
FROM Project
  RIGHT JOIN (
    (
      (
        FiscalYear
        RIGHT JOIN ProjectDeliverable ON FiscalYear.ID = ProjectDeliverable.Fiscal
      )
      LEFT JOIN qry_Project_Contracts ON (
        ProjectDeliverable.Fiscal = qry_Project_Contracts.Fiscal
      )
      AND (
        ProjectDeliverable.ProjectID = qry_Project_Contracts.ProjectID
      )
    )
    RIGHT JOIN (
      Portfolio
      RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
GROUP BY Project.ID,
  Project.ProjectNumber,
  Project.ProjectName,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  qry_Project_Contracts.Fees,
  qry_Project_Contracts.Expenses,
  qry_Project_Contracts.[Total Contract],
  ProjectDeliverable.Fiscal,
  FiscalYear.FiscalYear
HAVING (((FiscalYear.FiscalYear) = [Enter Fiscal:]));
--Query: qry_CurrentYearRecoveries - STOB
-- SQL: PARAMETERS [Enter Fiscal:] Text (255);
SELECT [qry_CurrentYearRecoveries-STOB_Base].ProjectID,
  [qry_CurrentYearRecoveries-STOB_Base].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB_Base].ProjectName,
  [qry_CurrentYearRecoveries-STOB_Base].Recoverable,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioAbbrev,
  [qry_CurrentYearRecoveries-STOB_Base].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB_Base].RecoverableAmount,
  [qry_CurrentYearRecoveries-STOB_Base].STOB,
  Sum([Q1_Amount] + [Q2_Amount] + [Q3_Amount] + [Q4_Amount]) AS CurrentFYTotalRecoverable,
  Sum(
    IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
  ) AS CurrentFYRecoveredToDate,
  [qry_CurrentYearRecoveries-STOB_Base].FiscalYear
FROM [qry_CurrentYearRecoveries-STOB_Base]
GROUP BY [qry_CurrentYearRecoveries-STOB_Base].ProjectID,
  [qry_CurrentYearRecoveries-STOB_Base].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB_Base].ProjectName,
  [qry_CurrentYearRecoveries-STOB_Base].Recoverable,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioAbbrev,
  [qry_CurrentYearRecoveries-STOB_Base].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB_Base].RecoverableAmount,
  [qry_CurrentYearRecoveries-STOB_Base].STOB,
  [qry_CurrentYearRecoveries-STOB_Base].FiscalYear
HAVING (
    (
      ([qry_CurrentYearRecoveries-STOB_Base].FiscalYear) = [Enter Fiscal:]
    )
  );
--Query: qry_CurrentYearRecoveries - STOB_88_PMO SQL: PARAMETERS [Enter Fiscal:] Text (255);
SELECT Project.ID AS ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.Recoverable,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Project.TotalProjectBudget,
  qry_Project_Contracts.[Total Contract],
  Project.RecoverableAmount,
  ProjectBudget.STOB,
  Sum([Q1_Amount] + [Q2_Amount] + [Q3_Amount] + [Q4_Amount]) AS CurrentFYTotalRecoverable,
  Sum(
    IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
  ) AS CurrentFYRecoveredToDate,
  FiscalYear.FiscalYear
FROM (
    (
      FiscalYear
      RIGHT JOIN ProjectDeliverable ON FiscalYear.ID = ProjectDeliverable.Fiscal
    )
    INNER JOIN (
      qry_Project_Contracts
      INNER JOIN Project ON qry_Project_Contracts.ProjectID = Project.ID
    ) ON (Project.ID = ProjectDeliverable.ProjectID)
    AND (
      ProjectDeliverable.Fiscal = qry_Project_Contracts.Fiscal
    )
  )
  INNER JOIN (
    Portfolio
    RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
GROUP BY Project.ID,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.Recoverable,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Project.TotalProjectBudget,
  qry_Project_Contracts.[Total Contract],
  Project.RecoverableAmount,
  ProjectBudget.STOB,
  FiscalYear.FiscalYear
HAVING (((FiscalYear.FiscalYear) = [Enter Fiscal:]));
--Query: qry_CurrentYearRecoveries - STOB_Base SQL:
select p.ID ProjectID,
  p.ProjectNumber,
  p.ProjectName,
  p.Recoverable,
  po.ID PortfolioID,
  po.PortfolioName,
  po.PortfolioAbbrev,
  p.TotalProjectBudget,
  p.RecoverableAmount,
  pb.STOB,
  pb.Q1_Recovered,
  pb.Q1_Amount,
  pb.Q2_Recovered,
  pb.Q2_Amount,
  pb.Q3_Recovered,
  pb.Q3_Amount,
  pb.Q4_Recovered,
  pb.Q4_Amount,
  fy.FiscalYear,
  pd.Fiscal
from ProjectBudget pb
  left join ProjectDeliverable pd on pb.ProjectDeliverableId = pd.ID
  left join Project p on pd.ProjectID = p.ID
  left join FiscalYear fy on pd.Fiscal = fy.ID
  left join Portfolio po on pb.RecoveryArea = po.ID --Query: qry_CurrentYearRecoveries - STOB_LOCAL SQL: PARAMETERS [Enter Fiscal:] Text (255);
SELECT Project.ID AS ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.Recoverable,
  Portfolio.ID AS PortfolioID,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  ProjectBudget.STOB,
  Sum([Q1_Amount] + [Q2_Amount] + [Q3_Amount] + [Q4_Amount]) AS CurrentFYTotalRecoverable,
  Sum(
    IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
  ) AS CurrentFYRecoveredToDate,
  FiscalYear.FiscalYear
FROM Project
  RIGHT JOIN (
    (
      FiscalYear
      RIGHT JOIN ProjectDeliverable ON FiscalYear.ID = ProjectDeliverable.Fiscal
    )
    RIGHT JOIN (
      Portfolio
      RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
GROUP BY Project.ID,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.Recoverable,
  Portfolio.ID,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  ProjectBudget.STOB,
  FiscalYear.FiscalYear
HAVING (((FiscalYear.FiscalYear) = [Enter Fiscal:]));
--Query: qry_CurrentYearRecoveries -STOB_NoParam
-- SQL:
SELECT [qry_CurrentYearRecoveries-STOB_Base].ProjectID,
  [qry_CurrentYearRecoveries-STOB_Base].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB_Base].ProjectName,
  [qry_CurrentYearRecoveries-STOB_Base].Recoverable,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioAbbrev,
  [qry_CurrentYearRecoveries-STOB_Base].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB_Base].RecoverableAmount,
  [qry_CurrentYearRecoveries-STOB_Base].STOB,
  Sum([Q1_Amount] + [Q2_Amount] + [Q3_Amount] + [Q4_Amount]) AS CurrentFYTotalRecoverable,
  Sum(
    IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
  ) AS CurrentFYRecoveredToDate,
  [qry_CurrentYearRecoveries-STOB_Base].FiscalYear,
  [qry_CurrentYearRecoveries-STOB_Base].Fiscal
FROM [qry_CurrentYearRecoveries-STOB_Base]
GROUP BY [qry_CurrentYearRecoveries-STOB_Base].ProjectID,
  [qry_CurrentYearRecoveries-STOB_Base].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB_Base].ProjectName,
  [qry_CurrentYearRecoveries-STOB_Base].Recoverable,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioAbbrev,
  [qry_CurrentYearRecoveries-STOB_Base].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB_Base].RecoverableAmount,
  [qry_CurrentYearRecoveries-STOB_Base].STOB,
  [qry_CurrentYearRecoveries-STOB_Base].FiscalYear,
  [qry_CurrentYearRecoveries-STOB_Base].Fiscal;

--Query: qry_FinancialRecoveryByPortfolioAndStobRecovered SQL: TRANSFORM Sum(
  [qry_CurrentYearRecoveries-STOB].CurrentFYRecoveredToDate
) AS SumOfCurrentFYRecoveredToDate
SELECT [qry_CurrentYearRecoveries-STOB].ProjectID,
  [qry_CurrentYearRecoveries-STOB].PortfolioID,
  [qry_CurrentYearRecoveries-STOB].FiscalYear
FROM [qry_CurrentYearRecoveries-STOB]
GROUP BY [qry_CurrentYearRecoveries-STOB].ProjectID,
  [qry_CurrentYearRecoveries-STOB].PortfolioID,
  [qry_CurrentYearRecoveries-STOB].FiscalYear PIVOT IIf(
    [qry_CurrentYearRecoveries-STOB].[STOB] In ("6398", "8807", "8809", "5798", "6598"),
    [qry_CurrentYearRecoveries-STOB].[STOB],
    "Other"
  ) In ("6398", "8807", "8809", "5798", "6598", "Other");
--Query: qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam SQL: TRANSFORM Sum(
  [qry_CurrentYearRecoveries-STOB_NoParam].CurrentFYRecoveredToDate
) AS SumOfCurrentFYRecoveredToDate
SELECT [qry_CurrentYearRecoveries-STOB_NoParam].ProjectID,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_NoParam].FiscalYear
FROM [qry_CurrentYearRecoveries-STOB_NoParam]
GROUP BY [qry_CurrentYearRecoveries-STOB_NoParam].ProjectID,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_NoParam].FiscalYear PIVOT IIf(
    [qry_CurrentYearRecoveries-STOB_NoParam].[STOB] In ("6309", "6310", "6001", "6002", "6398"),
    "ContractCosts",
    IIf(
      [qry_CurrentYearRecoveries-STOB_NoParam].[STOB] Like "57*",
      "TravelCosts",
      IIf(
        [qry_CurrentYearRecoveries-STOB_NoParam].[STOB] Like "65*",
        "BusinessExpenses",
        IIf(
          [qry_CurrentYearRecoveries-STOB_NoParam].[STOB] Like "88*",
          "StaffRecoveries",
          "Other"
        )
      )
    )
  ) In (
    "ContractCosts",
    "TravelCosts",
    "BusinessExpenses",
    "StaffRecoveries",
    "Other"
  );
--Query: qry_ForecastProjectRecoveriesbyQuarter_old SQL: TRANSFORM Sum(
  [qry_CurrentYearRecoveries-STOB].CurrentFYTotalRecoverable
) AS SumOfCurrentFYTotalRecoverable1
SELECT [qry_CurrentYearRecoveries-STOB].ProjectID,
  [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].Recoverable,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  ProjectDeliverableTotalsByFiscal.SumOfDeliverableAmount AS CYBudgetAmount,
  [SumOfDeliverableAmount] - [SumOfRecoverableAmount] AS CYNonrecoverableAmount,
  [qry_CurrentYearRecoveries-STOB].FiscalYear,
  ProjectBudget.Fiscal,
  ProjectBudget.Q1_Amount,
  ProjectBudget.Q2_Amount,
  ProjectBudget.Q3_Amount,
  ProjectBudget.Q4_Amount,
  ([Q1_Amount] + [Q2_Amount] + [Q3_Amount] + [Q4_Amount]) AS TotalForecast,
  Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYTotalRecoverable
  ) AS CYTotalRecoverable,
  Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYRecoveredToDate
  ) AS CYRecoveredToDate
FROM ProjectBudget
  RIGHT JOIN (
    ProjectDeliverableTotalsByFiscal
    RIGHT JOIN [qry_CurrentYearRecoveries-STOB] ON (
      ProjectDeliverableTotalsByFiscal.FiscalYear = [qry_CurrentYearRecoveries-STOB].FiscalYear
    )
    AND (
      ProjectDeliverableTotalsByFiscal.ProjectID = [qry_CurrentYearRecoveries-STOB].ProjectID
    )
  ) ON ProjectBudget.ID = ProjectDeliverableTotalsByFiscal.ProjectID
GROUP BY [qry_CurrentYearRecoveries-STOB].ProjectID,
  [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].Recoverable,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  ProjectDeliverableTotalsByFiscal.SumOfDeliverableAmount,
  [SumOfDeliverableAmount] - [SumOfRecoverableAmount],
  [qry_CurrentYearRecoveries-STOB].FiscalYear,
  ProjectBudget.Fiscal,
  ProjectBudget.Q1_Amount,
  ProjectBudget.Q2_Amount,
  ProjectBudget.Q3_Amount,
  ProjectBudget.Q4_Amount,
  ([Q1_Amount] + [Q2_Amount] + [Q3_Amount] + [Q4_Amount]) PIVOT IIf(
    [qry_CurrentYearRecoveries-STOB].[STOB] In ("6398", "8807", "8809", "5798", "6598"),
    [qry_CurrentYearRecoveries-STOB].[STOB],
    "Other"
  ) In ("6398", "8807", "8809", "5798", "6598", "Other");
--Query: qry_HistoricalContractAllocation SQL:
select FiscalYearID,
  FiscalYear,
  CONumber,
  PortfolioAbbrev,
  ResourceType,
  ResourceCount,
  Invoiced / sum(ResourceCount) over (partition by CONumber) * ResourceCount AllocatedContractAmount
from (
    select fy.ID FiscalYearID,
      fy.FiscalYear,
      c.CONumber,
      po.PortfolioAbbrev,
      rt.ResourceType,
      count(*) ResourceCount,
      c.Invoiced
    from Historical_Contracts c
      inner join Historical_ContractAssignments ca on c.CONumber = ca.CONumber
      inner join ResourceType rt on ca.ResourceTypeID = rt.ID
      inner join Portfolio po on c.PortfolioID = po.ID
      inner join FiscalYear fy on c.FiscalYear = fy.ID
    group by fy.ID,
      fy.FiscalYear,
      c.CONumber,
      po.PortfolioAbbrev,
      rt.ResourceType,
      c.Invoiced
  ) a
order by CONumber --Query: qry_HistoricalContractResourceAllocationBase SQL:
SELECT FiscalYear.ID AS FiscalYearID,
  FiscalYear.FiscalYear AS FY,
  qry_ContractorResourceUtilization.CONumber,
  qry_ContractorResourceUtilization.PortfolioAbbrev,
  qry_ContractorResourceUtilization.ResourceType,
  qry_ContractorResourceUtilization.ResourceCount,
  Nz([HourlyFees], 0) + Nz([AllocatedDeliverableTotal], 0) AS AllocatedAmount
FROM (
    qry_ContractorResourceUtilization
    INNER JOIN Contract ON qry_ContractorResourceUtilization.ContractID = Contract.ID
  )
  INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
UNION
SELECT FiscalYearID,
  FiscalYear,
  CONumber,
  PortfolioAbbrev,
  ResourceType,
  ResourceCount,
  AllocatedContractAmount
from qry_HistoricalContractAllocation;
--Query: qry_HistoricalContractResourceAllocationBase_OLD SQL:
SELECT FiscalYear.ID AS FiscalYearID,
  FiscalYear.FiscalYear AS FY,
  qry_ContractorResourceUtilization.CONumber,
  qry_ContractorResourceUtilization.PortfolioAbbrev,
  qry_ContractorResourceUtilization.ResourceType,
  qry_ContractorResourceUtilization.ResourceCount,
  Nz([HourlyFees], 0) + Nz([AllocatedDeliverableTotal], 0) AS AllocatedAmount
FROM (
    qry_ContractorResourceUtilization
    INNER JOIN Contract ON qry_ContractorResourceUtilization.ContractID = Contract.ID
  )
  INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID;
UNION
SELECT FiscalYear.ID AS FiscalYearID,
  FiscalYear.FiscalYear,
  Historical_Contracts.CONumber,
  Portfolio.PortfolioAbbrev,
  ResourceType.ResourceType,
  Count(*) AS ResourceCount,
  Sum(CCur([Invoiced] / [ContractResourceCount])) AS AllocatedContractAmount
FROM (
    ResourceType
    INNER JOIN (
      (
        FiscalYear
        INNER JOIN (
          Historical_Contracts
          INNER JOIN qry_HistoricalContractResourceCount ON Historical_Contracts.CONumber = qry_HistoricalContractResourceCount.CONumber
        ) ON FiscalYear.ID = Historical_Contracts.FiscalYear
      )
      INNER JOIN Historical_ContractAssignments ON Historical_Contracts.CONumber = Historical_ContractAssignments.CONumber
    ) ON ResourceType.ID = Historical_ContractAssignments.ResourceTypeID
  )
  INNER JOIN Portfolio ON Historical_Contracts.PortfolioID = Portfolio.ID
GROUP BY FiscalYear.ID,
  FiscalYear.FiscalYear,
  Historical_Contracts.CONumber,
  Portfolio.PortfolioAbbrev,
  ResourceType.ResourceType;
--Query: qry_HistoricalContractResourceCount SQL:
SELECT Historical_ContractAssignments.CONumber,
  Count(*) AS ContractResourceCount
FROM Historical_ContractAssignments
GROUP BY Historical_ContractAssignments.CONumber;
--Query: qry_HistoricalContractsBase SQL:
SELECT FiscalYear.ID AS FiscalYearID,
  FiscalYear.FiscalYear,
  Contract.CONumber,
  [TotalFeeAmount] + [TotalExpenseAmount] AS TotalFeesAndExpenses,
  DateDiff("d", [Contract].[StartDate], [Contract].[EndDate]) AS Duration,
  CLng(
    Right(Nz([COversion], "A0"), Len(Nz([COversion], "A0")) -1)
  ) AS AmmendmentCount,
  Count(*) AS ResourceCount
FROM (
    Contract
    INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
  )
  LEFT JOIN Contract_Resource ON Contract.ID = Contract_Resource.ContractID
GROUP BY FiscalYear.ID,
  FiscalYear.FiscalYear,
  Contract.CONumber,
  [TotalFeeAmount] + [TotalExpenseAmount],
  DateDiff("d", [Contract].[StartDate], [Contract].[EndDate]),
  CLng(
    Right(Nz([COversion], "A0"), Len(Nz([COversion], "A0")) -1)
  )
UNION ALL
SELECT FiscalYear.ID,
  FiscalYear.FiscalYear,
  Historical_Contracts.CONumber,
  Historical_Contracts.TotalContractAmount AS TotalFeesAndExpenses,
  DateDiff("d", [StartDate], [EndDate]) AS Duration,
  Historical_Contracts.AmmendmentCount,
  Count(*) AS ResourceCount
FROM (
    FiscalYear
    INNER JOIN Historical_Contracts ON FiscalYear.ID = Historical_Contracts.FiscalYear
  )
  LEFT JOIN Historical_ContractAssignments ON Historical_Contracts.CONumber = Historical_ContractAssignments.CONumber
GROUP BY FiscalYear.ID,
  FiscalYear.FiscalYear,
  Historical_Contracts.CONumber,
  Historical_Contracts.TotalContractAmount,
  DateDiff("d", [StartDate], [EndDate]),
  Historical_Contracts.AmmendmentCount;
--Query: qry_HistoricalContractsByFiscalBase SQL:
SELECT c.Fiscal AS FiscalYearID,
  c.FiscalYear,
  c.CONumber,
  [c].[TotalFeeAmount] + [c].[TotalExpenseAmount] AS TotalFeesAndExpenses,
  DateDiff("d", [c].[StartDate], [c].[EndDate]) AS Duration,
  CLng(
    Right(Nz([COversion], "A0"), Len(Nz([COversion], "A0")) -1)
  ) AS AmmendmentCount,
  Count(*) AS ResourceCount
FROM (
    qry_ContractBalanceByFiscalBase AS c
    LEFT JOIN Contract_Resource ON (c.Fiscal = Contract_Resource.Fiscal)
    AND (c.ContractID = Contract_Resource.ContractID)
  )
  INNER JOIN Contract ON c.ContractID = Contract.ID
GROUP BY c.Fiscal,
  c.FiscalYear,
  c.CONumber,
  [c].[TotalFeeAmount] + [c].[TotalExpenseAmount],
  DateDiff("d", [c].[StartDate], [c].[EndDate]),
  CLng(
    Right(Nz([COversion], "A0"), Len(Nz([COversion], "A0")) -1)
  )
UNION ALL
SELECT FiscalYear.ID,
  FiscalYear.FiscalYear,
  Historical_Contracts.CONumber,
  Historical_Contracts.TotalContractAmount AS TotalFeesAndExpenses,
  DateDiff("d", [StartDate], [EndDate]) AS Duration,
  Historical_Contracts.AmmendmentCount,
  Count(*) AS ResourceCount
FROM (
    FiscalYear
    INNER JOIN Historical_Contracts ON FiscalYear.ID = Historical_Contracts.FiscalYear
  )
  LEFT JOIN Historical_ContractAssignments ON Historical_Contracts.CONumber = Historical_ContractAssignments.CONumber
GROUP BY FiscalYear.ID,
  FiscalYear.FiscalYear,
  Historical_Contracts.CONumber,
  Historical_Contracts.TotalContractAmount,
  DateDiff("d", [StartDate], [EndDate]),
  Historical_Contracts.AmmendmentCount;
--Query: qry_HistoricalContractsResourceAllocationXTab SQL: TRANSFORM Round(Sum([AllocatedAmount]), 2) AS TotalAllocatedAmount
SELECT qry_HistoricalContractResourceAllocationBase.FiscalYearID,
  qry_HistoricalContractResourceAllocationBase.FY,
  qry_HistoricalContractResourceAllocationBase.ResourceType,
  Sum(
    qry_HistoricalContractResourceAllocationBase.ResourceCount
  ) AS TotalResourceCount
FROM qry_HistoricalContractResourceAllocationBase
GROUP BY qry_HistoricalContractResourceAllocationBase.FiscalYearID,
  qry_HistoricalContractResourceAllocationBase.FY,
  qry_HistoricalContractResourceAllocationBase.ResourceType PIVOT qry_HistoricalContractResourceAllocationBase.PortfolioAbbrev In (
    "OSS",
    "DES",
    "DMS",
    "DP",
    "ANA",
    "SD",
    "CE",
    "EDS",
    "BCS",
    "DIV",
    "GC"
  );
--Query: qry_HistoricalContractsRollup SQL:
SELECT qry_HistoricalContractsBase.FiscalYearID,
  qry_HistoricalContractsBase.FiscalYear,
  Count(*) AS ContractCount,
  Sum(qry_HistoricalContractsBase.TotalFeesAndExpenses) AS TotalFeesAndExpenses,
  Round(Avg([Duration]), 0) AS AverageDuration,
  Sum(qry_HistoricalContractsBase.AmmendmentCount) AS TotalContractAmmendments,
  Sum(IIf([AmmendmentCount] = 0, 0, 1)) AS ContractsWithAmmendments,
  Round(
    [TotalContractAmmendments] / [ContractsWithAmmendments],
    2
  ) AS AverageAmmendmentsPerContract,
  Sum(qry_HistoricalContractsBase.ResourceCount) AS ResourceCount
FROM qry_HistoricalContractsBase
GROUP BY qry_HistoricalContractsBase.FiscalYearID,
  qry_HistoricalContractsBase.FiscalYear;
--Query: qry_HistoricalContractsRollupByFiscal SQL:
SELECT qry_HistoricalContractsByFiscalBase.FiscalYearID,
  qry_HistoricalContractsByFiscalBase.FiscalYear,
  Count(*) AS ContractCount,
  Sum(
    qry_HistoricalContractsByFiscalBase.TotalFeesAndExpenses
  ) AS TotalFeesAndExpenses,
  Round(Avg([Duration]), 0) AS AverageDuration,
  Sum(
    qry_HistoricalContractsByFiscalBase.AmmendmentCount
  ) AS TotalContractAmmendments,
  Sum(IIf([AmmendmentCount] = 0, 0, 1)) AS ContractsWithAmmendments,
  Round(
    [TotalContractAmmendments] / [ContractsWithAmmendments],
    2
  ) AS AverageAmmendmentsPerContract,
  Sum(
    qry_HistoricalContractsByFiscalBase.ResourceCount
  ) AS ResourceCount
FROM qry_HistoricalContractsByFiscalBase
GROUP BY qry_HistoricalContractsByFiscalBase.FiscalYearID,
  qry_HistoricalContractsByFiscalBase.FiscalYear;
--Query: qry_HistoricalOfficeData SQL:
SELECT FiscalYear.FiscalYear,
  Historical_OfficeData.PMOStaff AS DMSStaff,
  Historical_OfficeData.DivisionFTE,
  Historical_OfficeData.SalariesAndBenefits,
  Historical_OfficeData.OperatingCosts,
  Historical_OfficeData.TargetRecoveries,
  CCur(
    Nz(
      [Historical_OfficeData].[Recoveries],
      Sum(
        IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
      )
    )
  ) AS Recoveries,
  Round(([Recoveries] / [TargetRecoveries] -1) * 100, 2) AS TargetOverUnder,
  Historical_OfficeData.UniqueClients
FROM FiscalYear
  INNER JOIN (
    (
      Historical_OfficeData
      LEFT JOIN ProjectDeliverable ON Historical_OfficeData.FiscalYear = ProjectDeliverable.Fiscal
    )
    LEFT JOIN (
      ProjectBudget
      LEFT JOIN Portfolio ON ProjectBudget.RecoveryArea = Portfolio.ID
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON FiscalYear.ID = Historical_OfficeData.FiscalYear
WHERE (
    ((Nz([PortfolioAbbrev], "PMO")) = "DMS")
    AND ((Nz([STOB], "8807")) In ("8809", "8807"))
  )
GROUP BY FiscalYear.FiscalYear,
  Historical_OfficeData.PMOStaff,
  Historical_OfficeData.DivisionFTE,
  Historical_OfficeData.SalariesAndBenefits,
  Historical_OfficeData.OperatingCosts,
  Historical_OfficeData.TargetRecoveries,
  Round(([Recoveries] / [TargetRecoveries] -1) * 100, 2),
  Historical_OfficeData.UniqueClients,
  Historical_OfficeData.Recoveries;
--Query: qry_HistoricalProjects SQL:
SELECT ProjectNumber,
  ProjectName,
  TotalProjectBudget,
  BudgetFiscal,
  Q1,
  Q2,
  Q3,
  Q4,
  Nz([Q1], 0) + Nz([Q2], 0) + Nz([Q3], 0) + Nz([Q4], 0) AS TotalRecovered
FROM qry_ProjectRecoveryHistorical
UNION ALL
SELECT ProjectNumber,
  ProjectName,
  TotalProjectBudget,
  FiscalYear,
  Q1,
  Q2,
  Q3,
  Q4,
  TotalRecovered
FROM qry_ProjectRecovery;
--Query: qry_HistoricalProjectStats SQL:
SELECT qry_HistoricalProjectStatsBase.FY,
  Count(*) AS ProjectCount,
  Sum(
    qry_HistoricalProjectStatsBase.TotalProjectBudget
  ) AS TotalProjectBudget,
  Sum(qry_HistoricalProjectStatsBase.TotalRecovered) AS TotalRecovered,
  Round(
    Avg(
      DateDiff("d", [PlannedStartDate], [PlannedEndDate])
    ),
    0
  ) AS AverageDuration,
  Sum(qry_HistoricalProjectStatsBase.CRCount) AS ChangeRequestCount,
  Sum(IIf([CRCount] <> 0, 1, Null)) AS ProjectsWithCRs,
  Round(
    Sum([CRCount]) / Nz(Sum(IIf([CRCount] <> 0, 1, Null)), 1),
    2
  ) AS AverageCRPerProject,
  Sum(IIf([ProjectType] = "Internal", 1, 0)) AS InternalProjects,
  Sum(IIf([ProjectType] = "External", 1, 0)) AS ExternalProjects,
  Sum(IIf([ProjectType] = "Social Media", 1, 0)) AS SocialMediaProjects,
  Sum(IIf([ProjectType] = "Service", 1, 0)) AS ServiceProjects,
  qry_UniqueClientsPerFiscal.UniqueClientCount
FROM qry_HistoricalProjectStatsBase
  LEFT JOIN qry_UniqueClientsPerFiscal ON qry_HistoricalProjectStatsBase.FYID = qry_UniqueClientsPerFiscal.FiscalYearID
GROUP BY qry_HistoricalProjectStatsBase.FY,
  qry_UniqueClientsPerFiscal.UniqueClientCount;
--Query: qry_HistoricalProjectStatsBase SQL:
SELECT Project.Fiscal As FYID,
  FiscalYear.FiscalYear As FY,
  Project.ProjectNumber,
  Project.TotalProjectBudget,
  qry_ProjectRecovery.TotalRecovered,
  qry_ChangeRequestCountByProject.CRCount,
  Project.ProjectType,
  Project.PlannedStartDate,
  Project.PlannedEndDate
FROM qry_ProjectRecovery
  RIGHT JOIN (
    (
      Project
      INNER JOIN FiscalYear ON Project.Fiscal = FiscalYear.ID
    )
    LEFT JOIN qry_ChangeRequestCountByProject ON Project.ID = qry_ChangeRequestCountByProject.ProjectID
  ) ON qry_ProjectRecovery.ProjectID = Project.ID
WHERE Project.ProjectStatus <> "Cancelled"
  and Project.PlannedStartDate is not null
  and Project.PlannedEndDate Is not null
GROUP BY Project.Fiscal,
  FiscalYear.FiscalYear,
  Project.ProjectNumber,
  Project.TotalProjectBudget,
  qry_ProjectRecovery.TotalRecovered,
  qry_ChangeRequestCountByProject.CRCount,
  Project.ProjectType,
  Project.PlannedStartDate,
  Project.PlannedEndDate
UNION
SELECT Historical_Projects.FiscalYear As FYID,
  FiscalYear.FiscalYear,
  Historical_Projects.ProjectNumber,
  Historical_Projects.TotalProjectBudget,
  qry_ProjectRecoveryHistorical.TotalRecovered,
  Historical_Projects.ChangeRequestCount,
  Historical_Projects.ProjectType,
  Historical_Projects.StartDate,
  Historical_Projects.EndDate
FROM FiscalYear
  INNER JOIN (
    Historical_Projects
    LEFT JOIN qry_ProjectRecoveryHistorical ON Historical_Projects.ProjectNumber = qry_ProjectRecoveryHistorical.ProjectNumber
  ) ON FiscalYear.ID = Historical_Projects.FiscalYear;
--Query: qry_InvoiceProcessing SQL:
select c.ID ContractID,
  c.CONumber,
  i.InvoiceDate,
  i.BillingPeriod,
  i.InvoiceNumber,
  sum(id.Rate * id.UnitAmount) Amount,
  c.Status,
  s.SupplierName
from Contract c
  left join Invoice i on c.ID = i.ContractID
  left join InvoiceDetail id on i.ID = id.InvoiceID
  left join Supplier s on c.SupplierID = s.ID
group by c.ID,
  c.CONumber,
  i.InvoiceDate,
  i.BillingPeriod,
  i.InvoiceNumber,
  c.Status,
  s.SupplierName --Query: qry_InvoiceProcessing_Crosstab SQL: TRANSFORM Sum(qry_InvoiceProcessing.Amount) AS SumOfAmount
SELECT qry_CF_PortfolioSummary.PortfolioName,
  qry_CF_PortfolioSummary.StartDate,
  qry_CF_PortfolioSummary.EndDate,
  qry_CF_PortfolioSummary.Status,
  qry_CF_PortfolioSummary.TotalFeeAmount,
  qry_CF_PortfolioSummary.TotalExpenseAmount,
  qry_InvoiceProcessing.CONumber,
  qry_CF_PortfolioSummary.TotalRemaining,
  Sum(qry_InvoiceProcessing.Amount) AS [Total Of Amount]
FROM qry_InvoiceProcessing
  RIGHT JOIN qry_CF_PortfolioSummary ON qry_InvoiceProcessing.ContractID = qry_CF_PortfolioSummary.ContractID
GROUP BY qry_CF_PortfolioSummary.PortfolioName,
  qry_CF_PortfolioSummary.StartDate,
  qry_CF_PortfolioSummary.EndDate,
  qry_CF_PortfolioSummary.Status,
  qry_CF_PortfolioSummary.TotalFeeAmount,
  qry_CF_PortfolioSummary.TotalExpenseAmount,
  qry_InvoiceProcessing.CONumber,
  qry_CF_PortfolioSummary.TotalRemaining PIVOT qry_InvoiceProcessing.BillingPeriod In (
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar"
  );
--Query: qry_InvoiceProcessing_Crosstab2a SQL: TRANSFORM Sum(qry_InvoiceProcessing.Amount) AS SumOfAmount
SELECT qry_ContractBalances.FiscalYear,
  qry_ContractBalances.PortfolioName,
  qry_ContractBalances.StartDate,
  qry_ContractBalances.ProjectNumber,
  qry_ContractBalances.EndDate,
  qry_ContractBalances.Status,
  qry_ContractBalances.TotalFeeAmount,
  qry_ContractBalances.TotalExpenseAmount,
  qry_InvoiceProcessing.CONumber,
  qry_ContractBalances.TotalRemaining,
  Sum(qry_InvoiceProcessing.Amount) AS [Total Of Amount]
FROM qry_ContractBalances
  INNER JOIN qry_InvoiceProcessing ON qry_ContractBalances.ContractID = qry_InvoiceProcessing.ContractID
WHERE (
    (
      (qry_ContractBalances.PortfolioAbbrev) = IIf(
        [Enter Portfolio Abbreviation or "All"] = "All",
        [qry_ContractBalances].[PortfolioAbbrev],
        [Enter Portfolio Abbreviation or "All"]
      )
    )
  )
GROUP BY qry_ContractBalances.FiscalYear,
  qry_ContractBalances.PortfolioName,
  qry_ContractBalances.PortfolioAbbrev,
  qry_ContractBalances.StartDate,
  qry_ContractBalances.ProjectNumber,
  qry_ContractBalances.EndDate,
  qry_ContractBalances.Status,
  qry_ContractBalances.TotalFeeAmount,
  qry_ContractBalances.TotalExpenseAmount,
  qry_InvoiceProcessing.CONumber,
  qry_ContractBalances.TotalRemaining PIVOT qry_InvoiceProcessing.BillingPeriod In (
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar"
  );
--Query: qry_InvoiceProcessing_Crosstab2a_NoParameters SQL: TRANSFORM Sum(qry_InvoiceProcessing.Amount) AS SumOfAmount
SELECT qry_ContractBalances_NoParameter.Fiscal,
  qry_ContractBalances_NoParameter.FiscalYear,
  qry_ContractBalances_NoParameter.PortfolioID,
  qry_ContractBalances_NoParameter.PortfolioName,
  qry_ContractBalances_NoParameter.StartDate,
  qry_ContractBalances_NoParameter.ProjectNumber,
  qry_ContractBalances_NoParameter.EndDate,
  qry_ContractBalances_NoParameter.Status,
  qry_ContractBalances_NoParameter.TotalFeeAmount,
  qry_ContractBalances_NoParameter.TotalExpenseAmount,
  qry_InvoiceProcessing.CONumber,
  qry_ContractBalances_NoParameter.TotalRemaining,
  Sum(qry_InvoiceProcessing.Amount) AS [Total Of Amount]
FROM qry_ContractBalances_NoParameter
  INNER JOIN qry_InvoiceProcessing ON qry_ContractBalances_NoParameter.ContractID = qry_InvoiceProcessing.ContractID
GROUP BY qry_ContractBalances_NoParameter.Fiscal,
  qry_ContractBalances_NoParameter.FiscalYear,
  qry_ContractBalances_NoParameter.PortfolioID,
  qry_ContractBalances_NoParameter.PortfolioName,
  qry_ContractBalances_NoParameter.PortfolioAbbrev,
  qry_ContractBalances_NoParameter.StartDate,
  qry_ContractBalances_NoParameter.ProjectNumber,
  qry_ContractBalances_NoParameter.EndDate,
  qry_ContractBalances_NoParameter.Status,
  qry_ContractBalances_NoParameter.TotalFeeAmount,
  qry_ContractBalances_NoParameter.TotalExpenseAmount,
  qry_InvoiceProcessing.CONumber,
  qry_ContractBalances_NoParameter.TotalRemaining PIVOT qry_InvoiceProcessing.BillingPeriod In (
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar"
  );
--Query: qry_InvoiceProcessing_LOCAL SQL:
SELECT Contract.ID AS ContractID,
  Contract.CONumber,
  Invoice.InvoiceDate,
  Invoice.BillingPeriod,
  Invoice.InvoiceNumber,
  Sum([Rate] * [UnitAmount]) AS Amount,
  Contract.Status,
  Supplier.SupplierName
FROM Supplier
  RIGHT JOIN (
    (
      Contract
      LEFT JOIN Invoice ON Contract.ID = Invoice.ContractID
    )
    LEFT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
  ) ON Supplier.ID = Contract.SupplierID
GROUP BY Contract.ID,
  Contract.CONumber,
  Invoice.InvoiceDate,
  Invoice.BillingPeriod,
  Invoice.InvoiceNumber,
  Contract.Status,
  Supplier.SupplierName;
--Query: qry_InvoiceProcessingByFiscal SQL:
select c.ID ContractID,
  c.CONumber,
  i.Fiscal,
  fy.FiscalYear,
  i.InvoiceDate,
  i.BillingPeriod,
  i.InvoiceNumber,
  sum(id.Rate * id.UnitAmount) Amount,
  c.Status,
  s.SupplierName
from Contract c
  left join Invoice i on c.ID = i.ContractID
  left join FiscalYear fy on i.Fiscal = fy.ID
  left join InvoiceDetail id on i.ID = id.InvoiceID
  left join Supplier s on c.SupplierID = s.ID
group by c.ID,
  c.CONumber,
  i.Fiscal,
  fy.FiscalYear,
  i.InvoiceDate,
  i.BillingPeriod,
  i.InvoiceNumber,
  c.Status,
  s.SupplierName --Query: qry_InvoiceProcessingByFiscal_Crosstab2a_NoParameters SQL: TRANSFORM Sum(qry_InvoiceProcessingByFiscal.Amount) AS SumOfAmount
SELECT qry_ContractBalanceByFiscalBase.Fiscal,
  qry_ContractBalanceByFiscalBase.FiscalYear,
  qry_ContractBalanceByFiscalBase.PortfolioID,
  qry_ContractBalanceByFiscalBase.PortfolioName,
  qry_ContractBalanceByFiscalBase.StartDate,
  qry_ContractBalanceByFiscalBase.ProjectNumber,
  qry_ContractBalanceByFiscalBase.EndDate,
  qry_ContractBalanceByFiscalBase.Status,
  qry_ContractBalanceByFiscalBase.TotalFeeAmount,
  qry_ContractBalanceByFiscalBase.TotalExpenseAmount,
  qry_ContractBalanceByFiscalBase.CONumber,
  [TotalFeeAmount] + [TotalExpenseAmount] - Sum([Amount]) AS TotalRemaining,
  Sum(qry_InvoiceProcessingByFiscal.Amount) AS [Total Of Amount]
FROM qry_ContractBalanceByFiscalBase
  LEFT JOIN qry_InvoiceProcessingByFiscal ON (
    qry_ContractBalanceByFiscalBase.Fiscal = qry_InvoiceProcessingByFiscal.Fiscal
  )
  AND (
    qry_ContractBalanceByFiscalBase.ContractID = qry_InvoiceProcessingByFiscal.ContractID
  )
GROUP BY qry_ContractBalanceByFiscalBase.Fiscal,
  qry_ContractBalanceByFiscalBase.FiscalYear,
  qry_ContractBalanceByFiscalBase.PortfolioID,
  qry_ContractBalanceByFiscalBase.PortfolioName,
  qry_ContractBalanceByFiscalBase.PortfolioAbbrev,
  qry_ContractBalanceByFiscalBase.StartDate,
  qry_ContractBalanceByFiscalBase.ProjectNumber,
  qry_ContractBalanceByFiscalBase.EndDate,
  qry_ContractBalanceByFiscalBase.Status,
  qry_ContractBalanceByFiscalBase.TotalFeeAmount,
  qry_ContractBalanceByFiscalBase.TotalExpenseAmount,
  qry_ContractBalanceByFiscalBase.CONumber PIVOT qry_InvoiceProcessingByFiscal.BillingPeriod In (
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar"
  );
--Query: qry_InvoiceProcessingforaccruals SQL:
SELECT Supplier.SupplierName,
  Contract.CONumber,
  Invoice.InvoiceDate,
  Invoice.BillingPeriod,
  Invoice.InvoiceNumber,
  Sum([Rate] * [UnitAmount]) AS Amount
FROM (
    (
      Supplier
      RIGHT JOIN Contract ON Supplier.ID = Contract.SupplierID
    )
    LEFT JOIN Invoice ON Contract.ID = Invoice.ContractID
  )
  LEFT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
GROUP BY Supplier.SupplierName,
  Contract.CONumber,
  Invoice.InvoiceDate,
  Invoice.BillingPeriod,
  Invoice.InvoiceNumber
HAVING (((Invoice.BillingPeriod) Like "Mar"));
--Query: qry_InvoiceTotals SQL:
select ContractID,
  CONumber,
  TotalFeeAmount,
  TotalExpenseAmount,
  FeesInvoiced,
  ExpensesInvoiced,
  TotalInvoiced,
  TotalFeeAmount - FeesInvoiced FeesRemaining,
  TotalExpenseAmount - ExpensesInvoiced ExpensesRemaining,
  TotalFeeAmount + TotalExpenseAmount - TotalInvoiced TotalRemaining
from (
    select c.ID ContractID,
      c.CONumber,
      c.TotalFeeAmount,
      c.TotalExpenseAmount,
      sum(
        isnull(
          case
            when isnull(cd.IsExpense, 0) <> 0 then 0
            else id.UnitAmount * id.Rate
          end,
          0
        )
      ) FeesInvoiced,
      sum(
        isnull(
          case
            when isnull(cd.IsExpense, 0) <> 0 then id.UnitAmount * id.Rate
          end,
          0
        )
      ) ExpensesInvoiced,
      sum(isnull(id.UnitAmount * id.Rate, 0)) TotalInvoiced
    from Contract c
      left join Invoice i on c.ID = i.ContractID
      left join InvoiceDetail id on i.ID = id.InvoiceID
      left join ContractDeliverable cd on id.ContractDeliverableID = cd.ID
    group by c.ID,
      c.CONumber,
      c.TotalFeeAmount,
      c.TotalExpenseAmount
  ) a --Query: qry_InvoiceTotals_LOCAL SQL:
SELECT Contract.ID AS ContractID,
  Contract.CONumber,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount,
  Sum(Nz(IIf([IsExpense], 0, [UnitAmount] * [Rate]), 0)) AS FeesInvoiced,
  Sum(
    Nz(
      IIf(Not Nz([IsExpense], False), 0, [UnitAmount] * [Rate]),
      0
    )
  ) AS ExpensesInvoiced,
  Sum(Nz([UnitAmount] * [Rate], 0)) AS TotalInvoiced,
  [TotalFeeAmount] - Sum(Nz(IIf([IsExpense], 0, [UnitAmount] * [Rate]), 0)) AS FeesRemaining,
  [TotalExpenseAmount] - Sum(
    Nz(
      IIf(Not Nz([IsExpense], False), 0, [UnitAmount] * [Rate]),
      0
    )
  ) AS ExpensesRemaining,
  [TotalFeeAmount] + [TotalExpenseAmount] - Nz(Sum([UnitAmount] * [Rate]), 0) AS TotalRemaining
FROM Contract
  LEFT JOIN (
    ContractDeliverable
    RIGHT JOIN (
      Invoice
      LEFT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
    ) ON ContractDeliverable.ID = InvoiceDetail.ContractDeliverableID
  ) ON Contract.ID = Invoice.ContractID
GROUP BY Contract.ID,
  Contract.CONumber,
  Contract.TotalFeeAmount,
  Contract.TotalExpenseAmount;
--Query: qry_MostRecentProjectStatus SQL:
SELECT ProjectStatus_P.*
FROM ProjectStatus AS ProjectStatus_P
WHERE (
    (
      (ProjectStatus_P.ID) =(
        select max(ID)
        from ProjectStatus s
        where s.ProjectID = ProjectStatus_P.ProjectID
      )
    )
  );
--Query: qry_P_BudgetSummary SQL:
SELECT FiscalYear.FiscalYear,
  ProjectDeliverable.ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  Ministry.MinistryName,
  Project.Description,
  Project.Recoverable,
  Project.Funding,
  Project.AgreementStartDate,
  Project.AgreementEndDate,
  [FirstName] & " " & [LastName] AS PMName,
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount,
  Sum(
    (
      IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
    )
  ) AS RecoveredAmount,
  [ProjectDeliverable].[RecoverableAmount] -(
    Sum(
      (
        IIf([Q1_Recovered], [Q1_Amount], 0) + IIf([Q2_Recovered], [Q2_Amount], 0) + IIf([Q3_Recovered], [Q3_Amount], 0) + IIf([Q4_Recovered], [Q4_Amount], 0)
      )
    )
  ) AS BalanceRemaining
FROM (
    (
      Project
      INNER JOIN Contact ON Project.ProjectManager = Contact.ID
    )
    INNER JOIN Ministry ON Project.MinistryID = Ministry.ID
  )
  INNER JOIN (
    (
      ProjectDeliverable
      INNER JOIN FiscalYear ON ProjectDeliverable.Fiscal = FiscalYear.ID
    )
    LEFT JOIN ProjectBudget ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
GROUP BY FiscalYear.FiscalYear,
  ProjectDeliverable.ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  Ministry.MinistryName,
  Project.Description,
  Project.Recoverable,
  Project.Funding,
  Project.AgreementStartDate,
  Project.AgreementEndDate,
  [FirstName] & " " & [LastName],
  ProjectDeliverable.DeliverableName,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.RecoverableAmount;
--Query: qry_P_EngagementStatus SQL:
SELECT Project.ID AS ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  [Contact].[FirstName] & " " & [Contact].[LastName] AS ProjectManager,
  Portfolio.PortfolioName,
  Project.TotalProjectBudget,
  qry_P_Sponsors.SIDSponsor,
  Nz([AgreementStartDate], [PlannedStartDate]) AS StartDate,
  Nz([AgreementEndDate], [PlannedEndDate]) AS EndDate,
  qry_P_Sponsors.ClientSponsor,
  qry_P_Sponsors.ClientContact,
  qry_P_Sponsors.CommsLead,
  Ministry.MinistryName,
  Project.Description,
  ProjectEngagement.ID AS ProjectEngagementID,
  EngagementPhase.Description AS Phase,
  ProjectEngagement.Status,
  ProjectEngagement.Notes,
  ProjectEngagement.Effort,
  ProjectEngagement.SiteAddress,
  ProjectEngagement.AnticipatedSiteLaunchDate,
  ProjectEngagement.ActualSiteLaunchDate,
  ProjectEngagement.AnticipatedSiteCloseDate,
  ProjectEngagement.ActualSiteCloseDate,
  ProjectEngagement.PartnershipAgreementSentDate,
  ProjectEngagement.PartnershipAgreementSignedDate,
  ProjectEngagement.GraphicsRequestSubmittedDate,
  ProjectEngagement.PiaSentToOcioDate,
  HealthIndicator.ColourRed,
  HealthIndicator.ColourGreen,
  HealthIndicator.ColourBlue
FROM (
    (
      ProjectEngagement
      INNER JOIN (
        (
          (
            (
              (
                Portfolio
                RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
              )
              LEFT JOIN Ministry ON Project.MinistryID = Ministry.ID
            )
            LEFT JOIN Contact ON Project.ProjectManager = Contact.ID
          )
          LEFT JOIN qry_P_Sponsors ON Project.ID = qry_P_Sponsors.ProjectID
        )
        LEFT JOIN Contact AS Contact_1 ON Project.CompletedByContactID = Contact_1.ID
      ) ON ProjectEngagement.ProjectID = Project.ID
    )
    INNER JOIN HealthIndicator ON ProjectEngagement.HealthID = HealthIndicator.ID
  )
  INNER JOIN EngagementPhase ON ProjectEngagement.EngagementPhaseID = EngagementPhase.ID;
--Query: qry_P_QuarterlyReview SQL:
SELECT Project.ProjectNumber,
  Project.ProjectName,
  Project.ProjectManager,
  Project.AgreementStartDate,
  Project.AgreementEndDate,
  ProjectBudget.ProjectDeliverableID,
  ProjectDeliverable.DeliverableName,
  ProjectBudget.ID,
  ProjectBudget.Q1_Amount,
  ProjectBudget.Q1_Recovered,
  ProjectBudget.Q2_Amount,
  ProjectBudget.Q2_Recovered,
  ProjectBudget.Q3_Amount,
  ProjectBudget.Q3_Recovered,
  ProjectBudget.Q4_Amount,
  ProjectBudget.Q4_Recovered,
  ProjectBudget.Notes,
  ProjectBudget.DetailAmount,
  ProjectBudget.RecoveryArea,
  ProjectBudget.ResourceType,
  ProjectBudget.STOB,
  ProjectDeliverable.DeliverableAmount,
  ProjectDeliverable.ProjectID,
  Portfolio.PortfolioAbbrev,
  Portfolio.ExpenseAuthority,
  Portfolio.Responsibility,
  Portfolio.ServiceLine,
  ProjectBudget.Fiscal,
  FiscalYear.FiscalYear,
  ProjectBudget.ClientCodingID,
  Contact.LastName,
  Contact.FirstName,
  ProjectDeliverable.RecoverableAmount,
  ProjectBudget.ContractID
FROM Project
  INNER JOIN (
    ProjectDeliverable
    INNER JOIN (
      (
        (
          (
            Portfolio
            RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
          )
          INNER JOIN FiscalYear ON ProjectBudget.Fiscal = FiscalYear.ID
        )
        LEFT JOIN ClientCoding ON ProjectBudget.ClientCodingID = ClientCoding.ID
      )
      LEFT JOIN Contact ON ClientCoding.ContactID = Contact.ID
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
ORDER BY ProjectBudget.Fiscal,
  ProjectDeliverable.DeliverableName;
--Query: qry_P_Sponsors SQL:
SELECT a.ProjectID,
  Max(
    IIf(
      [RoleType] = "GDXSponsor",
      [FirstName] & " " & [LastName],
      Null
    )
  ) AS SIDSponsor,
  Max(
    IIf(
      [RoleType] = "GDXContact",
      [FirstName] & " " & [LastName],
      Null
    )
  ) AS SIDContact,
  Max(
    IIf(
      [RoleType] = "ClientSponsor",
      [FirstName] & " " & [LastName],
      Null
    )
  ) AS ClientSponsor,
  Max(
    IIf(
      [RoleType] = "ClientContact",
      [FirstName] & " " & [LastName],
      Null
    )
  ) AS ClientContact,
  Max(
    IIf(
      [RoleType] = "ProjectManager",
      [FirstName] & " " & [LastName],
      Null
    )
  ) AS ProjectManager,
  Max(
    IIf(
      [RoleType] = "CommsLead",
      [FirstName] & " " & [LastName],
      Null
    )
  ) AS CommsLead
FROM (
    SELECT Contact_Project.ProjectID,
      ContactRole.RoleType,
      First(Contact_Project.ContactID) AS FirstContactID
    FROM Contact_Project
      INNER JOIN ContactRole ON Contact_Project.ContactRole = ContactRole.ID
    GROUP BY Contact_Project.ProjectID,
      ContactRole.RoleType
  ) AS a
  INNER JOIN Contact ON a.FirstContactID = Contact.ID
GROUP BY a.ProjectID;
--Query: qry_P_Status SQL:
SELECT Project.ID AS ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  [Contact].[FirstName] & " " & [Contact].[LastName] AS ProjectManager,
  Portfolio.PortfolioName,
  Project.TotalProjectBudget,
  qry_P_Sponsors.SIDSponsor,
  Nz([AgreementStartDate], [PlannedStartDate]) AS StartDate,
  Nz([AgreementEndDate], [PlannedEndDate]) AS EndDate,
  qry_P_Sponsors.ClientSponsor,
  Ministry.MinistryName,
  Project.Description,
  Project.ProjectGoals,
  ProjectStatus.StatusDate,
  ProjectStatus.ID AS ProjectStatusID,
  [Contact_PS].[FirstName] & " " & [Contact_PS].[LastName] AS ReportedBy,
  ProjectPhase.PhaseName,
  HealthIndicator.ColourRed,
  HealthIndicator.ColourGreen,
  HealthIndicator.ColourBlue,
  HealthIndicator_Schedule.ColourRed AS ColourRedSchedule,
  HealthIndicator_Schedule.ColourGreen AS ColourGreenSchedule,
  HealthIndicator_Schedule.ColourBlue AS ColourBlueSchedule,
  HealthIndicator_Budget.ColourRed AS ColourRedBudget,
  HealthIndicator_Budget.ColourGreen AS ColourGreenBudget,
  HealthIndicator_Budget.ColourBlue AS ColourBlueBudget,
  HealthIndicator_Team.ColourRed AS ColourRedTeam,
  HealthIndicator_Team.ColourGreen AS ColourGreenTeam,
  HealthIndicator_Team.ColourBlue AS ColourBlueTeam,
  ProjectStatus.GeneralProgressComments,
  ProjectStatus.IssuesAndDecisions,
  ProjectStatus.ForecastAndNextSteps,
  ProjectStatus.IdentifiedRisk,
  Project.CloseOutDate,
  [Contact_1].[FirstName] & " " & [Contact_1].[LastName] AS CompletedBy,
  Project.ActualCompletionDate,
  Project.HandOffToOperations,
  Project.RecordsFiled,
  Project.ContractEvCompleted,
  Project.ContractorSecurityTerminated
FROM (
    (
      (
        (
          (
            Portfolio
            RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
          )
          LEFT JOIN Ministry ON Project.MinistryID = Ministry.ID
        )
        LEFT JOIN Contact ON Project.ProjectManager = Contact.ID
      )
      LEFT JOIN qry_P_Sponsors ON Project.ID = qry_P_Sponsors.ProjectID
    )
    LEFT JOIN Contact AS Contact_1 ON Project.CompletedByContactID = Contact_1.ID
  )
  LEFT JOIN (
    ProjectPhase
    RIGHT JOIN (
      HealthIndicator
      RIGHT JOIN (
        (
          (
            (
              ProjectStatus
              LEFT JOIN Contact AS Contact_PS ON ProjectStatus.ReportedByContactID = Contact_PS.ID
            )
            LEFT JOIN HealthIndicator AS HealthIndicator_Schedule ON ProjectStatus.ScheduleHealthID = HealthIndicator_Schedule.ID
          )
          LEFT JOIN HealthIndicator AS HealthIndicator_Budget ON ProjectStatus.BudgetHealthID = HealthIndicator_Budget.ID
        )
        LEFT JOIN HealthIndicator AS HealthIndicator_Team ON ProjectStatus.TeamHealthID = HealthIndicator_Team.ID
      ) ON HealthIndicator.ID = ProjectStatus.HealthID
    ) ON ProjectPhase.ID = ProjectStatus.ProjectPhaseID
  ) ON Project.ID = ProjectStatus.ProjectID;
--Query: qry_P_StrategicAlignmentStats SQL:
SELECT Project.Fiscal,
  Project.ProjectNumber,
  Project.ProjectName,
  ProjectStrategicAlignment.StrategicAlignmentID,
  ProjectStrategicAlignment.Checked,
  StrategicAlignment.Description,
  Project.PortfolioID
FROM Project
  INNER JOIN (
    StrategicAlignment
    INNER JOIN ProjectStrategicAlignment ON StrategicAlignment.[ID] = ProjectStrategicAlignment.[StrategicAlignmentID]
  ) ON Project.ID = ProjectStrategicAlignment.ProjectID
WHERE (
    ((Project.Fiscal) = 7)
    AND ((ProjectStrategicAlignment.Checked) = True)
  );
--Query: qry_P_Summary_Status SQL:
SELECT ProjectStatus.ProjectID,
  ProjectStatus.StatusDate,
  ProjectPhase.PhaseName,
  HealthIndicator.ColourRed,
  HealthIndicator.ColourGreen,
  HealthIndicator.ColourBlue,
  HealthIndicator_Schedule.ColourRed AS ColourRedSchedule,
  HealthIndicator_Schedule.ColourGreen AS ColourGreenSchedule,
  HealthIndicator_Schedule.ColourBlue AS ColourBlueSchedule,
  HealthIndicator_Budget.ColourRed AS ColourRedBudget,
  HealthIndicator_Budget.ColourGreen AS ColourGreenBudget,
  HealthIndicator_Budget.ColourBlue AS ColourBlueBudget,
  HealthIndicator_Team.ColourRed AS ColourRedTeam,
  HealthIndicator_Team.ColourGreen AS ColourGreenTeam,
  HealthIndicator_Team.ColourBlue AS ColourBlueTeam
FROM ProjectPhase
  INNER JOIN (
    HealthIndicator
    INNER JOIN (
      (
        (
          ProjectStatus
          LEFT JOIN HealthIndicator AS HealthIndicator_Schedule ON ProjectStatus.ScheduleHealthID = HealthIndicator_Schedule.ID
        )
        LEFT JOIN HealthIndicator AS HealthIndicator_Budget ON ProjectStatus.BudgetHealthID = HealthIndicator_Budget.ID
      )
      LEFT JOIN HealthIndicator AS HealthIndicator_Team ON ProjectStatus.TeamHealthID = HealthIndicator_Team.ID
    ) ON HealthIndicator.ID = ProjectStatus.HealthID
  ) ON ProjectPhase.ID = ProjectStatus.ProjectPhaseID;
--Query: qry_PA_ActiveProjectsbyPortfolio SQL:
SELECT Project.PortfolioID,
  Portfolio.PortfolioName AS Portfolio,
  Portfolio.PortfolioAbbrev,
  Project.Fiscal,
  Ministry.MinistryShortName AS Ministry,
  Project.ProjectNumber AS [#],
  Project.ProjectName AS Name,
  Project.ProjectManager,
  Project.Description,
  Project.PlannedStartDate AS [Start Date],
  Project.PlannedEndDate AS [End Date],
  Project.PlannedBudget,
  Project.ProjectType,
  Project.ProjectStatus
FROM (
    Portfolio
    RIGHT JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
  )
  INNER JOIN Ministry ON Project.MinistryID = Ministry.ID
WHERE (((Project.ProjectStatus) = "Active"))
ORDER BY Portfolio.PortfolioName,
  Project.Fiscal DESC,
  Project.ProjectNumber DESC;
--Query: qry_PA_ActiveProjectsbyPortfolio - old SQL:
SELECT Portfolio.PortfolioName AS Portfolio,
  Portfolio.PortfolioAbbrev,
  Project.Fiscal,
  Ministry.MinistryShortName AS Ministry,
  Project.ProjectNumber AS [#],
  Project.ProjectName AS Name,
  Project.ProjectManager,
  Project.Description,
  Project.PlannedStartDate AS [Start Date],
  Project.PlannedEndDate AS [End Date],
  Project.PlannedBudget,
  Project.ProjectType,
  Project.ProjectStatus
FROM (
    Portfolio
    RIGHT JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
  )
  INNER JOIN Ministry ON Project.MinistryID = Ministry.ID
WHERE (
    (
      (Portfolio.PortfolioAbbrev) = IIf(
        [Enter Portfolio Abbreviation or "All"] = "All",
        [Portfolio].[PortfolioAbbrev],
        [Enter Portfolio Abbreviation or "All"]
      )
    )
    AND ((Project.ProjectStatus) = "Active")
  )
ORDER BY Portfolio.PortfolioName,
  Project.Fiscal DESC,
  Project.ProjectNumber DESC;
--Query: qry_PA_ActiveProjectsbyPortfoliotmp SQL:
SELECT Portfolio.PortfolioAbbrev,
  Project.Fiscal,
  Ministry.MinistryShortName AS Ministry,
  Project.ProjectNumber AS [#],
  Project.ProjectName AS Name,
  Project.ProjectVersion,
  Project.PlannedStartDate AS [Start Date],
  Project.AgreementEndDate,
  Project.TotalProjectBudget,
  Project.ProjectStatus,
  Contact.Email,
  Contact_Project.ContactRole,
  "*" & IIf(
    Len(
      [Enter a list of Portfolio Abbreviations (leave blank for all)] & ""
    ) = 0,
    [Portfolio].[PortfolioAbbrev],
    [Enter a list of Portfolio Abbreviations (leave blank for all)]
  ) & "*" AS Expr1
FROM (
    Contact_Project
    INNER JOIN (
      (
        Portfolio
        RIGHT JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
      )
      INNER JOIN Ministry ON Project.MinistryID = Ministry.ID
    ) ON Contact_Project.ProjectID = Project.ID
  )
  INNER JOIN Contact ON Contact_Project.ContactID = Contact.ID
WHERE (
    ((Project.ProjectStatus) = "Active")
    AND (
      (
        "*" & IIf(
          Len(
            [Enter a list of Portfolio Abbreviations (leave blank for all)] & ""
          ) = 0,
          [Portfolio].[PortfolioAbbrev],
          [Enter a list of Portfolio Abbreviations (leave blank for all)]
        ) & "*"
      ) Like "*" & [Portfolio].[PortfolioAbbrev] & "*"
    )
  )
ORDER BY Project.Fiscal DESC,
  Project.ProjectNumber DESC;
--Query: qry_PA_AnnualBubbleChartData SQL:
SELECT Project.Fiscal,
  Project.ID,
  Project.ProjectNumber,
  Project.ProjectVersion,
  Project.ProjectName,
  Portfolio.PortfolioAbbrev,
  qry_ProjectRisk.RiskTotal,
  Project.Classification,
  Project.ProjectType,
  Project.Funding,
  Project.Recoverable,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  Project.Description
FROM (
    Portfolio
    RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
  )
  INNER JOIN qry_ProjectRisk ON Project.ProjectNumber = qry_ProjectRisk.ProjectNumber;
--Query: qry_PA_Billed SQL: TRANSFORM Sum(JV.Amount) AS SumOfAmount
SELECT JV.FiscalYearID AS Fiscal,
  FiscalYear.FiscalYear,
  Project.ProjectNumber,
  Project.ProjectName
FROM FiscalYear
  INNER JOIN (
    Project
    RIGHT JOIN JV ON Project.[ID] = JV.[ProjectID]
  ) ON FiscalYear.ID = JV.FiscalYearID
GROUP BY JV.FiscalYearID,
  FiscalYear.FiscalYear,
  Project.ProjectNumber,
  Project.ProjectName
ORDER BY Project.ProjectNumber PIVOT JV.Quarter In (1, 2, 3, 4);
--Query: qry_PA_ChangeRequestTypes - FY - Summary SQL:
SELECT qry_ChangeRequest_XTab.FiscalYear AS FiscaclYear,
  qry_ChangeRequest_XTab.ProjectNumber AS ProjectNumber,
  qry_ChangeRequest_XTab.ProjectName AS ProjectName,
  qry_ChangeRequest_XTab.FiscalYear AS FiscalYear,
  qry_ChangeRequest_XTab.InitiatedBy AS InitiatedBy,
  qry_ChangeRequestCountByInitiatedBy.CRCount AS CRCount,
  qry_ChangeRequest_XTab.Budget AS Budget,
  qry_ChangeRequest_XTab.Schedule AS Schedule,
  qry_ChangeRequest_XTab.Scope AS Scope,
  qry_ChangeRequest_XTab.None AS None
FROM qry_ChangeRequestCountByInitiatedBy
  INNER JOIN qry_ChangeRequest_XTab ON (
    qry_ChangeRequestCountByInitiatedBy.InitiatedBy = qry_ChangeRequest_XTab.InitiatedBy
  )
  AND (
    qry_ChangeRequestCountByInitiatedBy.ProjectID = qry_ChangeRequest_XTab.ProjectID
  )
  AND (
    qry_ChangeRequestCountByInitiatedBy.FiscalYearID = qry_ChangeRequest_XTab.FiscalYearID
  )
WHERE (
    (
      (
        Exists (
          SELECT *
          FROM ProjectDeliverable
            INNER JOIN (
              ProjectBudget
              INNER JOIN FiscalYear AS FY_sub ON ProjectBudget.Fiscal = FY_sub.ID
            ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
          WHERE (
              ((FY_sub.FiscalYear) = [Enter Fiscal Year])
              AND (
                (ProjectDeliverable.ProjectID) = qry_ChangeRequest_XTab.ProjectID
              )
            )
        )
      ) <> False
    )
  );
--Query: qry_PA_ChangeRequestTypes - FY - SummaryEDS SQL:
SELECT qry_ChangeRequest_XTab.FiscalYear AS FiscaclYear,
  qry_ChangeRequest_XTab.ProjectNumber AS ProjectNumber,
  qry_ChangeRequest_XTab.ProjectName AS ProjectName,
  qry_ChangeRequest_XTab.FiscalYear AS FiscalYear,
  qry_ChangeRequest_XTab.InitiatedBy AS InitiatedBy,
  qry_ChangeRequestCountByInitiatedBy.CRCount AS CRCount,
  qry_ChangeRequest_XTab.Budget AS Budget,
  qry_ChangeRequest_XTab.Schedule AS Schedule,
  qry_ChangeRequest_XTab.Scope AS Scope,
  qry_ChangeRequest_XTab.None AS None,
  Portfolio.PortfolioAbbrev
FROM (
    qry_ChangeRequestCountByInitiatedBy
    INNER JOIN qry_ChangeRequest_XTab ON (
      qry_ChangeRequestCountByInitiatedBy.InitiatedBy = qry_ChangeRequest_XTab.InitiatedBy
    )
    AND (
      qry_ChangeRequestCountByInitiatedBy.ProjectID = qry_ChangeRequest_XTab.ProjectID
    )
    AND (
      qry_ChangeRequestCountByInitiatedBy.FiscalYearID = qry_ChangeRequest_XTab.FiscalYearID
    )
  )
  INNER JOIN (
    Portfolio
    RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
  ) ON qry_ChangeRequestCountByInitiatedBy.ProjectID = Project.ID
WHERE (
    ((Portfolio.PortfolioAbbrev) = "eds")
    AND (
      (
        Exists (
          SELECT *
          FROM ProjectDeliverable
            INNER JOIN (
              ProjectBudget
              INNER JOIN FiscalYear AS FY_sub ON ProjectBudget.Fiscal = FY_sub.ID
            ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
          WHERE (
              ((FY_sub.FiscalYear) = [Enter Fiscal Year])
              AND (
                (ProjectDeliverable.ProjectID) = qry_ChangeRequest_XTab.ProjectID
              )
            )
        )
      ) <> False
    )
  );
--Query: qry_PA_CTZE_DeliverableAMT_Crosstab SQL: TRANSFORM Sum(ProjectDeliverableQuery.[DeliverableAmount]) AS SumOfDeliverableAmount
SELECT ProjectDeliverableQuery.[Project Number],
  ProjectDeliverableQuery.[Project Name],
  Sum(ProjectDeliverableQuery.[DeliverableAmount]) AS [Total Of DeliverableAmount]
FROM ProjectDeliverableQuery
  INNER JOIN Portfolio ON ProjectDeliverableQuery.Portfolio = Portfolio.PortfolioName
WHERE (((Portfolio.PortfolioAbbrev) = "ctze"))
GROUP BY ProjectDeliverableQuery.[Project Number],
  ProjectDeliverableQuery.[Project Name],
  Portfolio.PortfolioAbbrev
ORDER BY ProjectDeliverableQuery.[Project Number] PIVOT ProjectDeliverableQuery.[DeliverableName];
--Query: qry_PA_EngagementRollup SQL:
SELECT Project.ID AS ProjectID,
  EngagementPhase.Description AS Phase,
  Project.PortfolioID,
  Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.Description AS ProjectDescription,
  Ministry.MinistryShortName,
  ProjectEngagement.AnticipatedSiteLaunchDate,
  ProjectEngagement.ActualSiteLaunchDate,
  ProjectEngagement.ActualSiteCloseDate,
  qry_P_Sponsors.CommsLead,
  qry_P_Sponsors.ClientContact,
  [Contact].[FirstName] & " " & [Contact].[LastName] AS ProjectManager,
  ProjectEngagement.Status,
  ProjectEngagement.Effort,
  HealthIndicator.ColourRed,
  HealthIndicator.ColourGreen,
  HealthIndicator.ColourBlue,
  FiscalYear.ID AS Fiscal,
  FiscalYear.FiscalYear,
  EngagementPhase.SortOrderReports
FROM (
    (
      (
        ProjectEngagement
        INNER JOIN (
          (
            (
              (
                Portfolio
                RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
              )
              INNER JOIN FiscalYear ON Project.Fiscal = FiscalYear.ID
            )
            LEFT JOIN Contact ON Project.ProjectManager = Contact.ID
          )
          INNER JOIN Ministry ON Project.MinistryID = Ministry.ID
        ) ON ProjectEngagement.ProjectID = Project.ID
      )
      INNER JOIN EngagementPhase ON ProjectEngagement.EngagementPhaseID = EngagementPhase.ID
    )
    INNER JOIN HealthIndicator ON ProjectEngagement.HealthID = HealthIndicator.ID
  )
  LEFT JOIN qry_P_Sponsors ON Project.ID = qry_P_Sponsors.ProjectID
WHERE (((EngagementPhase.ExcludeFromReports) = False));
--Query: qry_PA_Fiscal_Registry SQL:
SELECT Portfolio.PortfolioName AS Portfolio,
  FiscalYear.FiscalYear,
  Project.Fiscal,
  Ministry.MinistryShortName AS Ministry,
  Project.ProjectNumber AS [#],
  Project.ProjectName AS Name,
  Project.ProjectManager,
  Project.Description,
  Project.PlannedStartDate AS [Start Date],
  Project.PlannedEndDate AS [End Date],
  Project.PlannedBudget,
  Project.ProjectType
FROM FiscalYear
  INNER JOIN (
    (
      Portfolio
      RIGHT JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
    )
    INNER JOIN Ministry ON Project.MinistryID = Ministry.ID
  ) ON FiscalYear.ID = Project.Fiscal
WHERE (((FiscalYear.FiscalYear) = [Enter Fiscal]))
ORDER BY Portfolio.PortfolioName,
  Project.ProjectNumber DESC;
--Query: qry_PA_Gantt SQL:
SELECT Project.ID AS ProjectID,
  FiscalYear.FiscalYear,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.PortfolioID,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Project.AgreementStartDate,
  Project.AgreementEndDate,
  HI_ProjectStatus.ColourRed,
  HI_ProjectStatus.ColourGreen,
  HI_ProjectStatus.ColourBlue
FROM (
    (
      qry_MostRecentProjectStatus
      RIGHT JOIN (
        Portfolio
        RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
      ) ON qry_MostRecentProjectStatus.ProjectID = Project.ID
    )
    LEFT JOIN HealthIndicator AS HI_ProjectStatus ON qry_MostRecentProjectStatus.HealthID = HI_ProjectStatus.ID
  )
  INNER JOIN FiscalYear ON Project.Fiscal = FiscalYear.ID
WHERE (((Project.ProjectStatus) = "Active"))
  OR (((FiscalYear.IsCurrent) = True));
--Query: qry_PA_InformationSecurity SQL:
SELECT Project.ID,
  Project.Fiscal,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.ProjectManager,
  Project.Description,
  Project.PlannedStartDate,
  Project.PlannedEndDate,
  Project.FunctionalChangesRequired,
  Project.HasPublicData
FROM Project
WHERE (
    ((Project.FunctionalChangesRequired) = "yes")
    AND ((Project.HasPublicData) = "yes")
  );
--Query: qry_PA_LessonsLearned SQL:
SELECT Project.ID,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.Classification,
  Project.Lesson1 AS Expr1,
  Project.Lesson2 AS Expr2,
  Project.Lesson3 AS Expr3
FROM Project;
--Query: qry_PA_LessonsLearnedbyCategory SQL:
SELECT LessonCategory.ID AS LessonCategory_ID,
  LessonCategory.LessonCategoryName,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.ID AS ProjectID,
  Project.Fiscal,
  ProjectLesson.Lesson,
  ProjectLesson.Recommendations,
  ProjectLesson.LessonSubCategory,
  Portfolio.PortfolioAbbrev,
  Portfolio.PortfolioName,
  Project.PortfolioID
FROM (
    Portfolio
    INNER JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
  )
  INNER JOIN (
    LessonCategory
    INNER JOIN ProjectLesson ON LessonCategory.[ID] = ProjectLesson.[LessonCategoryID]
  ) ON Project.[ID] = ProjectLesson.[ProjectID];
--Query: qry_PA_LessonsLearnedbyPortfolio SQL:
SELECT LessonCategory.ID AS LessonCategory_ID,
  LessonCategory.LessonCategoryName,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.ID AS Project_ID,
  ProjectLesson.Lesson,
  ProjectLesson.Recommendations,
  ProjectLesson.LessonSubCategory,
  Portfolio.PortfolioAbbrev,
  Portfolio.PortfolioName,
  "*" & IIf(
    Len(
      [Enter a list of Portfolio Abbreviations (leave blank for all)] & ""
    ) = 0,
    [Portfolio].[PortfolioAbbrev],
    [Enter a list of Portfolio Abbreviations (leave blank for all)]
  ) & "*" AS Expr1
FROM (
    Portfolio
    INNER JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
  )
  INNER JOIN (
    LessonCategory
    INNER JOIN ProjectLesson ON LessonCategory.[ID] = ProjectLesson.[LessonCategoryID]
  ) ON Project.[ID] = ProjectLesson.[ProjectID]
WHERE (
    (
      (
        "*" & IIf(
          Len(
            [Enter a list of Portfolio Abbreviations (leave blank for all)] & ""
          ) = 0,
          Portfolio.PortfolioAbbrev,
          [Enter a list of Portfolio Abbreviations (leave blank for all)]
        ) & "*"
      ) Like "*" & Portfolio.PortfolioAbbrev & "*"
    )
  )
  Or (
    (
      (
        "*" & IIf(
          Len(
            [Enter a list of Portfolio Abbreviations (leave blank for all)] & ""
          ) = 0,
          Portfolio.PortfolioAbbrev,
          [Enter a list of Portfolio Abbreviations (leave blank for all)]
        ) & "*"
      ) Like "*" & Portfolio.PortfolioAbbrev & "*"
    )
  );
--Query: qry_PA_LessonsLearnedbyPortfolio - old SQL:
SELECT LessonCategory.ID AS LessonCategory_ID,
  LessonCategory.LessonCategoryName,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.ID AS Project_ID,
  ProjectLesson.Lesson,
  ProjectLesson.Recommendations,
  ProjectLesson.LessonSubCategory,
  Portfolio.PortfolioAbbrev,
  Portfolio.PortfolioName
FROM (
    Portfolio
    INNER JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
  )
  INNER JOIN (
    LessonCategory
    INNER JOIN ProjectLesson ON LessonCategory.[ID] = ProjectLesson.[LessonCategoryID]
  ) ON Project.[ID] = ProjectLesson.[ProjectID]
WHERE (
    (
      (Portfolio.PortfolioAbbrev) = IIf(
        [Enter Portfolio Abbreviation or "All"] = "All",
        [Portfolio].[PortfolioAbbrev],
        [Enter Portfolio Abbreviation or "All"]
      )
    )
  );
--Query: qry_PA_Milestone SQL:
SELECT Project.ID AS ProjectID,
  FiscalYear.FiscalYear,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.PortfolioID,
  Portfolio.PortfolioName,
  Portfolio.PortfolioAbbrev,
  Project.PlannedStartDate,
  Project.PlannedEndDate,
  [Contact].[FirstName] & " " & [Contact].[LastName] AS ProjectManager,
  HI_ProjectStatus.ColourRed,
  HI_ProjectStatus.ColourGreen,
  HI_ProjectStatus.ColourBlue,
  ProjectMilestone.ID AS MilestoneID,
  ProjectMilestone.Description AS MilestoneDescription,
  ProjectMilestone.TargetCompletionDate,
  HI_Milestone.ColourRed AS MilestoneColourRed,
  HI_Milestone.ColourGreen AS MilestoneColourGreen,
  HI_Milestone.ColourBlue AS MilestoneColourBlue,
  FiscalYear_1.IsCurrent
FROM (
    (
      (
        (
          qry_MostRecentProjectStatus
          RIGHT JOIN (
            Portfolio
            RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
          ) ON qry_MostRecentProjectStatus.ProjectID = Project.ID
        )
        LEFT JOIN HealthIndicator AS HI_ProjectStatus ON qry_MostRecentProjectStatus.HealthID = HI_ProjectStatus.ID
      )
      LEFT JOIN Contact ON Project.ProjectManager = Contact.ID
    )
    INNER JOIN FiscalYear ON Project.Fiscal = FiscalYear.ID
  )
  LEFT JOIN (
    (
      ProjectMilestone
      LEFT JOIN HealthIndicator AS HI_Milestone ON ProjectMilestone.HealthID = HI_Milestone.ID
    )
    LEFT JOIN FiscalYear AS FiscalYear_1 ON ProjectMilestone.FiscalID = FiscalYear_1.ID
  ) ON Project.ID = ProjectMilestone.ProjectID
WHERE (
    (
      (FiscalYear_1.IsCurrent) = True
      Or (FiscalYear_1.IsCurrent) Is Null
    )
    AND ((Project.ProjectStatus) = "Active")
  )
  OR (
    (
      (FiscalYear_1.IsCurrent) = True
      Or (FiscalYear_1.IsCurrent) Is Null
    )
    AND ((FiscalYear.IsCurrent) = True)
  );
--Query: qry_PA_Registered SQL: PARAMETERS [Enter Date dd-mmm-yyyy] DateTime;
SELECT Project.InitiationDate,
  Portfolio.PortfolioName AS Portfolio,
  Project.Fiscal,
  Ministry.MinistryShortName AS Ministry,
  Project.ProjectNumber AS [#],
  Project.ProjectName AS Name,
  Project.ProjectManager,
  Project.Description,
  Project.PlannedStartDate AS [Start Date],
  Project.PlannedEndDate AS [End Date],
  Project.PlannedBudget,
  [Enter Date dd-mmm-yyyy] AS AsOfDate,
  Project.ProjectType
FROM (
    Portfolio
    RIGHT JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
  )
  INNER JOIN Ministry ON Project.MinistryID = Ministry.ID
WHERE (
    (
      (Project.InitiationDate) >= [Enter Date dd-mmm-yyyy]
    )
  )
ORDER BY Portfolio.PortfolioName,
  Project.Fiscal DESC,
  Project.ProjectNumber DESC;
--Query: qry_PA_StatusPortfolioRollup SQL: with q as (
  select p.ID ProjectID,
    po.PortfolioName,
    p.ProjectNumber,
    p.ProjectName,
    fy.FiscalYear,
    c.FirstName + ' ' + c.LastName ProjectManager,
    isnull(p.AgreementStartDate, p.PlannedStartDate) StartDate,
    isnull(p.AgreementEndDate, p.PlannedEndDate) EndDate,
    ps.StatusDate,
    ps.ID ProjectStatusID,
    pp.PhaseName,
    ps.IssuesAndDecisions,
    ps.ForecastAndNextSteps,
    hi.ColourRed,
    hi.ColourGreen,
    hi.ColourBlue,
    hi_sched.ColourRed ColourRedSchedule,
    hi_sched.ColourGreen ColourGreenSchedule,
    hi_sched.ColourBlue ColourBlueSchedule,
    hi_budg.ColourRed ColourRedBudget,
    hi_budg.ColourGreen ColourGreenBudget,
    hi_budg.ColourBlue ColourBlueBudget,
    hi_team.ColourRed ColourRedTeam,
    hi_team.ColourGreen ColourGreenTeam,
    hi_team.ColourBlue ColourBlueTeam,
    m.MinistryName,
    p.PortfolioID,
    row_number() over (
      partition by p.ID
      order by ps.StatusDate desc,
        ps.ID desc
    ) r
  from Project p
    inner join FiscalYear fy on p.Fiscal = fy.ID
    inner join Ministry m on p.MinistryID = m.ID
    left join Contact c on p.ProjectManager = c.ID
    left join Portfolio po on p.PortfolioID = po.ID
    left join ProjectStatus ps on p.ID = ps.ProjectID
    left join ProjectPhase pp on ps.ProjectPhaseID = pp.ID
    left join HealthIndicator hi on ps.HealthID = hi.ID
    left join HealthIndicator hi_sched on ps.ScheduleHealthID = hi_sched.ID
    left join HealthIndicator hi_budg on ps.BudgetHealthID = hi_budg.ID
    left join HealthIndicator hi_team on ps.TeamHealthID = hi_team.ID
  where fy.IsCurrent <> 0
    or p.ProjectStatus = 'Active'
)
select *
from q
where r = 1
  and PhaseName <> 'Archive' --Query: qry_PA_StatusPortfolioRollup_OLD SQL:
SELECT Project.ID AS ProjectID,
  Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  FiscalYear.FiscalYear,
  [Contact].[FirstName] & " " & [Contact].[LastName] AS ProjectManager,
  Nz([AgreementStartDate], [PlannedStartDate]) AS StartDate,
  Nz([AgreementEndDate], [PlannedEndDate]) AS EndDate,
  ProjectStatus.StatusDate,
  ProjectStatus.ID AS ProjectStatusID,
  ProjectPhase.PhaseName,
  ProjectStatus.IssuesAndDecisions,
  ProjectStatus.ForecastAndNextSteps,
  HealthIndicator.ColourRed,
  HealthIndicator.ColourGreen,
  HealthIndicator.ColourBlue,
  HealthIndicator_Schedule.ColourRed AS ColourRedSchedule,
  HealthIndicator_Schedule.ColourGreen AS ColourGreenSchedule,
  HealthIndicator_Schedule.ColourBlue AS ColourBlueSchedule,
  HealthIndicator_Team.ColourRed AS ColourRedBudget,
  HealthIndicator_Team.ColourGreen AS ColourGreenBudget,
  HealthIndicator_Team.ColourBlue AS ColourBlueBudget,
  HealthIndicator_Budget.ColourRed AS ColourRedTeam,
  HealthIndicator_Budget.ColourGreen AS ColourGreenTeam,
  HealthIndicator_Budget.ColourBlue AS ColourBlueTeam,
  Ministry.MinistryShortName,
  Project.PortfolioID
FROM (
    (
      (
        (
          Portfolio
          RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
        )
        INNER JOIN FiscalYear ON Project.Fiscal = FiscalYear.ID
      )
      LEFT JOIN Contact ON Project.ProjectManager = Contact.ID
    )
    INNER JOIN Ministry ON Project.MinistryID = Ministry.ID
  )
  LEFT JOIN (
    ProjectPhase
    RIGHT JOIN (
      HealthIndicator
      RIGHT JOIN (
        (
          (
            ProjectStatus
            LEFT JOIN HealthIndicator AS HealthIndicator_Schedule ON ProjectStatus.ScheduleHealthID = HealthIndicator_Schedule.ID
          )
          LEFT JOIN HealthIndicator AS HealthIndicator_Budget ON ProjectStatus.BudgetHealthID = HealthIndicator_Budget.ID
        )
        LEFT JOIN HealthIndicator AS HealthIndicator_Team ON ProjectStatus.TeamHealthID = HealthIndicator_Team.ID
      ) ON HealthIndicator.ID = ProjectStatus.HealthID
    ) ON ProjectPhase.ID = ProjectStatus.ProjectPhaseID
  ) ON Project.ID = ProjectStatus.ProjectID
WHERE (
    ((ProjectPhase.PhaseName) <> "Archive")
    AND ((FiscalYear.IsCurrent) = True)
  )
  OR (((Project.ProjectStatus) = "Active"));
--Query: qry_PF_ADI_Export SQL:;
with ProjectBudget_Normalized as (
  select ID,
    ProjectDeliverableID,
    Fiscal,
    ClientCodingID,
    ContractID,
    Notes,
    DetailAmount,
    RecoveryArea,
    ResourceType,
    STOB,
    1 Quarter,
    Q1_Recovered Recovered,
    Q1_Amount Amount
  from ProjectBudget
  union all
  select ID,
    ProjectDeliverableID,
    Fiscal,
    ClientCodingID,
    ContractID,
    Notes,
    DetailAmount,
    RecoveryArea,
    ResourceType,
    STOB,
    2 Quarter,
    Q2_Recovered Recovered,
    Q2_Amount Amount
  from ProjectBudget
  union all
  select ID,
    ProjectDeliverableID,
    Fiscal,
    ClientCodingID,
    ContractID,
    Notes,
    DetailAmount,
    RecoveryArea,
    ResourceType,
    STOB,
    3 Quarter,
    Q3_Recovered Recovered,
    Q3_Amount Amount
  from ProjectBudget
  union all
  select ID,
    ProjectDeliverableID,
    Fiscal,
    ClientCodingID,
    ContractID,
    Notes,
    DetailAmount,
    RecoveryArea,
    ResourceType,
    STOB,
    4 Quarter,
    Q4_Recovered Recovered,
    Q4_Amount Amount
  from ProjectBudget
)
select p.ID ProjectID,
  pb.Fiscal,
  fy.FiscalYear,
  pb.Quarter,
  pb.RecoveryArea,
  po.PortfolioAbbrev Portfolio,
  null Category,
  dateadd(
    m,
    pb.Quarter - 1,
    cast(
      '20' + left(fy.FiscalYear, 2) + '0401' as datetime
    )
  ) - 1 [Accounting Date],
  null Period,
  null [Batch Name],
  null [Batch Description],
  null [Journal Name],
  'GDXProjectBilling_' + fy.FiscalYear + '_' + cast(pb.Quarter as varchar(max)) [Journal Description],
  null Preparer,
  case
    when p.grp is null then cc.ExpenseAuthorityName
    else po.ExpenseAuthority
  end [Expense Authority Name],
  case
    when p.grp is null then cc.Client
    else po.Client
  end Cl,
  case
    when p.grp is null then cc.ResponsibilityCentre
    else po.Responsibility
  end Rsp,
  case
    when p.grp is null then cc.ServiceLine
    else po.ServiceLine
  end Srvc,
  case
    when p.grp is null then cc.STOB
    else pb.STOB
  end STOB,
  case
    when p.grp is null then cc.ProjectCode
    else po.CASProjectCode
  end Proj,
  '000000' Loc,
  '0000' Fut,
  case
    when p.grp is null then sum(Amount)
    else null
  end Debit,
  case
    when p.grp is not null then sum(Amount)
    else null
  end Credit,
  'Q' + cast(pb.Quarter as varchar(max)) + ' ' + p.ProjectNumber + ' ' + p.ProjectName [Line Description]
from ProjectBudget_Normalized pb
  inner join ProjectDeliverable pd on pb.ProjectDeliverableID = pd.ID
  inner join FiscalYear fy on pb.Fiscal = fy.ID
  inner join Portfolio po on pb.RecoveryArea = po.ID
  inner join ClientCoding cc on pb.ClientCodingID = cc.ID
  inner join (
    select *,
      ID grp
    from Project
  ) p on cc.ProjectID = p.ID
where pb.Recovered = 1
group by grouping sets (
    (
      pb.Fiscal,
      fy.FiscalYear,
      pb.Quarter,
      pb.RecoveryArea,
      po.PortfolioAbbrev,
      po.ExpenseAuthority,
      cc.ExpenseAuthorityName,
      cc.Client,
      cc.ResponsibilityCentre,
      cc.ServiceLine,
      cc.STOB,
      cc.ProjectCode,
      po.Client,
      po.Responsibility,
      po.ServiceLine,
      pb.STOB,
      po.CASProjectCode,
      p.ProjectNumber,
      p.ProjectName,
      p.ID,
      p.grp
    ),
    (
      pb.Fiscal,
      fy.FiscalYear,
      pb.Quarter,
      pb.RecoveryArea,
      po.PortfolioAbbrev,
      po.ExpenseAuthority,
      cc.ExpenseAuthorityName,
      cc.Client,
      cc.ResponsibilityCentre,
      cc.ServiceLine,
      cc.STOB,
      cc.ProjectCode,
      p.ProjectNumber,
      p.ProjectName,
      p.ID
    )
  )
order by fy.FiscalYear,
  pb.Quarter,
  po.PortfolioAbbrev,
  p.ProjectNumber,
  case
    when p.grp is null then 0
    else 1
  end --Query: qry_PF_BudgetbySTOB SQL: TRANSFORM Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYTotalRecoverable
  ) AS SumOfCurrentFYTotalRecoverable1
SELECT [qry_CurrentYearRecoveries-STOB].ProjectID,
  [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].Recoverable,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  ProjectDeliverableTotalsByFiscal.SumOfDeliverableAmount AS CYBudgetAmount,
  [SumOfDeliverableAmount] - [SumOfRecoverableAmount] AS CYNonrecoverableAmount,
  [qry_CurrentYearRecoveries-STOB].FiscalYear,
  Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYTotalRecoverable
  ) AS CYTotalRecoverable,
  Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYRecoveredToDate
  ) AS CYRecoveredToDate
FROM ProjectDeliverableTotalsByFiscal
  RIGHT JOIN [qry_CurrentYearRecoveries-STOB] ON (
    ProjectDeliverableTotalsByFiscal.FiscalYear = [qry_CurrentYearRecoveries-STOB].FiscalYear
  )
  AND (
    ProjectDeliverableTotalsByFiscal.ProjectID = [qry_CurrentYearRecoveries-STOB].ProjectID
  )
GROUP BY [qry_CurrentYearRecoveries-STOB].ProjectID,
  [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].Recoverable,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  ProjectDeliverableTotalsByFiscal.SumOfDeliverableAmount,
  [SumOfDeliverableAmount] - [SumOfRecoverableAmount],
  [qry_CurrentYearRecoveries-STOB].FiscalYear PIVOT IIf(
    [qry_CurrentYearRecoveries-STOB].[STOB] In ("6398", "8807", "8809", "5798", "6598"),
    [qry_CurrentYearRecoveries-STOB].[STOB],
    "Other"
  ) In ("6398", "8807", "8809", "5798", "6598", "Other");

--Query: qry_PF_FinanceRecoverySummary
-- SQL:
TRANSFORM Sum(
  [qry_CurrentYearRecoveries-STOB_NoParam].CurrentFYTotalRecoverable
) AS SumOfCurrentFYTotalRecoverable
SELECT [qry_CurrentYearRecoveries-STOB_NoParam].ProjectID,
  [qry_CurrentYearRecoveries-STOB_NoParam].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB_NoParam].ProjectName,
  [qry_CurrentYearRecoveries-STOB_NoParam].Fiscal,
  [qry_CurrentYearRecoveries-STOB_NoParam].FiscalYear,
  [qry_CurrentYearRecoveries-STOB_NoParam].Recoverable,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioAbbrev,
  [qry_CurrentYearRecoveries-STOB_NoParam].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB_NoParam].RecoverableAmount,
  [qry_CurrentYearRecoveries-STOB_NoParam].CurrentFYTotalRecoverable
FROM [qry_CurrentYearRecoveries-STOB_NoParam]
GROUP BY [qry_CurrentYearRecoveries-STOB_NoParam].ProjectID,
  [qry_CurrentYearRecoveries-STOB_NoParam].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB_NoParam].ProjectName,
  [qry_CurrentYearRecoveries-STOB_NoParam].Fiscal,
  [qry_CurrentYearRecoveries-STOB_NoParam].FiscalYear,
  [qry_CurrentYearRecoveries-STOB_NoParam].Recoverable,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioAbbrev,
  [qry_CurrentYearRecoveries-STOB_NoParam].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB_NoParam].RecoverableAmount,
  [qry_CurrentYearRecoveries-STOB_NoParam].CurrentFYTotalRecoverable PIVOT IIf(
    [STOB] In ('6309', '6310', '6001', '6002', '8807', '8809', '6531')
    Or [STOB] Like '57*',
    IIf([STOB] Like '57*', '57XX', [STOB]),
    "Other"
  ) In (
    6309,
    6310,
    6001,
    6002,
    "57XX",
    8807,
    8809,
    6531,
    "Other"
  );
--Query: qry_PF_JVsforFiscal - Quarter SQL:
SELECT JV.ProjectID,
  JV.JVNumber,
  JV.BilledDate,
  Project.ProjectNumber,
  Project.ProjectName,
  JV.Amount,
  FiscalYear.FiscalYear,
  JV.FiscalYearID AS Fiscal,
  JV.Quarter
FROM FiscalYear
  INNER JOIN (
    Project
    RIGHT JOIN JV ON Project.[ID] = JV.[ProjectID]
  ) ON FiscalYear.ID = JV.FiscalYearID
ORDER BY Project.ProjectNumber;
--Query: qry_PF_NetRecoverySummaryByQuarter SQL:
SELECT [qry_CurrentYearRecoveries-STOB_Base].FiscalYear,
  [qry_CurrentYearRecoveries-STOB_Base].Fiscal,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioAbbrev,
  Sum([qry_CurrentYearRecoveries-STOB_Base].Q1_Amount) AS Q1_Amount,
  Sum(
    IIf(
      Left([stob], 2) In ('57', '65', '63', '60'),
      [qry_CurrentYearRecoveries-STOB_Base].[Q1_Amount],
      0
    )
  ) AS Q1_Expenses,
  Sum([qry_CurrentYearRecoveries-STOB_Base].Q2_Amount) AS Q2_Amount,
  Sum(
    IIf(
      Left([stob], 2) In ('57', '65', '63', '60'),
      [qry_CurrentYearRecoveries-STOB_Base].[Q2_Amount],
      0
    )
  ) AS Q2_Expenses,
  Sum([qry_CurrentYearRecoveries-STOB_Base].Q3_Amount) AS Q3_Amount,
  Sum(
    IIf(
      Left([stob], 2) In ('57', '65', '63', '60'),
      [qry_CurrentYearRecoveries-STOB_Base].[Q3_Amount],
      0
    )
  ) AS Q3_Expenses,
  Sum([qry_CurrentYearRecoveries-STOB_Base].Q4_Amount) AS Q4_Amount,
  Sum(
    IIf(
      Left([stob], 2) In ('57', '65', '63', '60'),
      [qry_CurrentYearRecoveries-STOB_Base].[Q4_Amount],
      0
    )
  ) AS Q4_Expenses
FROM [qry_CurrentYearRecoveries-STOB_Base]
GROUP BY [qry_CurrentYearRecoveries-STOB_Base].FiscalYear,
  [qry_CurrentYearRecoveries-STOB_Base].Fiscal,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_Base].PortfolioAbbrev;
--Query: qry_PF_PortfolioAdminFees SQL:
SELECT Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  FiscalYear.FiscalYear,
  Sum(ProjectBudget.Q1_Amount) AS SumOfQ1_Amount,
  Sum(ProjectBudget.Q2_Amount) AS SumOfQ2_Amount,
  Sum(ProjectBudget.Q3_Amount) AS SumOfQ3_Amount,
  Sum(ProjectBudget.Q4_Amount) AS SumOfQ4_Amount,
  ProjectBudget.RecoveryArea,
  ProjectBudget.STOB,
  Project.PortfolioID,
  Portfolio.PortfolioAbbrev
FROM Project
  RIGHT JOIN (
    (
      FiscalYear
      RIGHT JOIN ProjectDeliverable ON FiscalYear.ID = ProjectDeliverable.Fiscal
    )
    RIGHT JOIN (
      Portfolio
      RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
WHERE (
    (
      (Left([projectbudget].[STOB], 2)) Not In ("63", "57")
    )
  )
GROUP BY Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  FiscalYear.FiscalYear,
  ProjectBudget.RecoveryArea,
  ProjectBudget.STOB,
  Project.PortfolioID,
  Portfolio.PortfolioAbbrev
HAVING (
    (
      (FiscalYear.FiscalYear) Like "*" & [Enter Fiscal: ] & "*"
    )
    And ((ProjectBudget.STOB) = "8809")
    And (
      (Portfolio.PortfolioAbbrev) = IIf(
        [Enter Portfolio Abbreviation or "All"] = "All",
        Portfolio.PortfolioAbbrev,
        [Enter Portfolio Abbreviation or "All"]
      )
    )
  );
--Query: qry_PF_PortfolioForecastAll SQL:
SELECT qry_PF_PortfolioForecastAllBase.PortfolioName,
  qry_PF_PortfolioForecastAllBase.ProjectNumber,
  qry_PF_PortfolioForecastAllBase.ProjectName,
  qry_PF_PortfolioForecastAllBase.FiscalYear,
  Sum(qry_PF_PortfolioForecastAllBase.Q1_Amount) AS SumOfQ1_Amount,
  Sum(qry_PF_PortfolioForecastAllBase.Q2_Amount) AS SumOfQ2_Amount,
  Sum(qry_PF_PortfolioForecastAllBase.Q3_Amount) AS SumOfQ3_Amount,
  Sum(qry_PF_PortfolioForecastAllBase.Q4_Amount) AS SumOfQ4_Amount,
  qry_PF_PortfolioForecastAllBase.PortfolioAbbrev
FROM qry_PF_PortfolioForecastAllBase
GROUP BY qry_PF_PortfolioForecastAllBase.PortfolioName,
  qry_PF_PortfolioForecastAllBase.ProjectNumber,
  qry_PF_PortfolioForecastAllBase.ProjectName,
  qry_PF_PortfolioForecastAllBase.FiscalYear,
  qry_PF_PortfolioForecastAllBase.PortfolioAbbrev
HAVING (
    (
      (qry_PF_PortfolioForecastAllBase.FiscalYear) Like "*" & [Enter Fiscal: ] & "*"
    )
    AND (
      (qry_PF_PortfolioForecastAllBase.PortfolioAbbrev) = IIf(
        [Enter Portfolio Abbreviation or "All"] = "All",
        [PortfolioAbbrev],
        [Enter Portfolio Abbreviation or "All"]
      )
    )
  );
--Query: qry_PF_PortfolioForecastAll_LOCAL SQL:
SELECT Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  FiscalYear.FiscalYear,
  Sum(ProjectBudget.Q1_Amount) AS SumOfQ1_Amount,
  Sum(ProjectBudget.Q2_Amount) AS SumOfQ2_Amount,
  Sum(ProjectBudget.Q3_Amount) AS SumOfQ3_Amount,
  Sum(ProjectBudget.Q4_Amount) AS SumOfQ4_Amount,
  Portfolio.PortfolioAbbrev
FROM Project
  RIGHT JOIN (
    (
      FiscalYear
      RIGHT JOIN ProjectDeliverable ON FiscalYear.ID = ProjectDeliverable.Fiscal
    )
    RIGHT JOIN (
      Portfolio
      RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
GROUP BY Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  FiscalYear.FiscalYear,
  Portfolio.PortfolioAbbrev
HAVING (
    (
      (FiscalYear.FiscalYear) Like "*" & [Enter Fiscal: ] & "*"
    )
    And (
      (Portfolio.PortfolioAbbrev) = IIf(
        [Enter Portfolio Abbreviation or "All"] = "All",
        Portfolio.PortfolioAbbrev,
        [Enter Portfolio Abbreviation or "All"]
      )
    )
  );
--Query: qry_PF_PortfolioForecastAllBase SQL:
select po.PortfolioName,
  p.ProjectNumber,
  p.ProjectName,
  fy.FiscalYear,
  pb.Q1_Amount,
  pb.Q2_Amount,
  pb.Q3_Amount,
  pb.Q4_Amount,
  po.PortfolioAbbrev
from ProjectBudget pb
  left join ProjectDeliverable pd on pb.ProjectDeliverableId = pd.ID
  left join Project p on pd.ProjectID = p.ID
  left join FiscalYear fy on pd.Fiscal = fy.ID
  left join Portfolio po on pb.RecoveryArea = po.ID --Query: qry_PF_PortfolioStaffRecoveries SQL:
SELECT Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  FiscalYear.FiscalYear,
  Sum(ProjectBudget.Q1_Amount) AS SumOfQ1_Amount,
  Sum(ProjectBudget.Q2_Amount) AS SumOfQ2_Amount,
  Sum(ProjectBudget.Q3_Amount) AS SumOfQ3_Amount,
  Sum(ProjectBudget.Q4_Amount) AS SumOfQ4_Amount,
  ProjectBudget.RecoveryArea,
  Portfolio.PortfolioAbbrev
FROM Project
  RIGHT JOIN (
    (
      FiscalYear
      RIGHT JOIN ProjectDeliverable ON FiscalYear.ID = ProjectDeliverable.Fiscal
    )
    RIGHT JOIN (
      Portfolio
      RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
WHERE (((Left([projectbudget].[STOB], 2)) = 88))
GROUP BY Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  FiscalYear.FiscalYear,
  ProjectBudget.RecoveryArea,
  Portfolio.PortfolioAbbrev
HAVING (
    (
      (FiscalYear.FiscalYear) Like "*" & [Enter Fiscal: ] & "*"
    )
    And (
      (Portfolio.PortfolioAbbrev) = IIf(
        [Enter Portfolio Abbreviation or "All"] = "All",
        Portfolio.PortfolioAbbrev,
        [Enter Portfolio Abbreviation or "All"]
      )
    )
  );
--Query: qry_PF_PortfolioStobRecoveries SQL: TRANSFORM Sum(
  [qry_CurrentYearRecoveries-STOB_NoParam].CurrentFYTotalRecoverable
) AS SumOfCurrentFYTotalRecoverable1
SELECT [qry_CurrentYearRecoveries-STOB_NoParam].ProjectID,
  [qry_CurrentYearRecoveries-STOB_NoParam].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB_NoParam].ProjectName,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_NoParam].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB_NoParam].FiscalYear AS FY,
  [qry_CurrentYearRecoveries-STOB_NoParam].Fiscal,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.ContractCosts AS ContractRecovered,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.TravelCosts AS TravelRecovered,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.BusinessExpenses AS BusinessExpenseRecovered,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.StaffRecoveries AS StaffRecoveriesRecovered,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.Other AS OtherRecovered,
  Sum(
    [qry_CurrentYearRecoveries-STOB_NoParam].CurrentFYRecoveredToDate
  ) AS CYRecoveredToDate,
  Sum(
    [qry_CurrentYearRecoveries-STOB_NoParam].CurrentFYTotalRecoverable
  ) AS CYTotalRecoverable
FROM qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam
  INNER JOIN [qry_CurrentYearRecoveries-STOB_NoParam] ON (
    qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.FiscalYear = [qry_CurrentYearRecoveries-STOB_NoParam].FiscalYear
  )
  AND (
    qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.PortfolioID = [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioID
  )
  AND (
    qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.ProjectID = [qry_CurrentYearRecoveries-STOB_NoParam].ProjectID
  )
GROUP BY [qry_CurrentYearRecoveries-STOB_NoParam].ProjectID,
  [qry_CurrentYearRecoveries-STOB_NoParam].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB_NoParam].ProjectName,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioID,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioName,
  [qry_CurrentYearRecoveries-STOB_NoParam].PortfolioAbbrev,
  [qry_CurrentYearRecoveries-STOB_NoParam].TotalProjectBudget,
  [TotalProjectBudget] - [RecoverableAmount],
  [qry_CurrentYearRecoveries-STOB_NoParam].FiscalYear,
  [qry_CurrentYearRecoveries-STOB_NoParam].Fiscal,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.ContractCosts,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.TravelCosts,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.BusinessExpenses,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.StaffRecoveries,
  qry_FinancialRecoveryByPortfolioAndStobRecovered_NoParam.Other PIVOT IIf(
    [qry_CurrentYearRecoveries-STOB_NoParam].[STOB] In ("6309", "6310", "6001", "6002", "6398"),
    "ContractCosts",
    IIf(
      [qry_CurrentYearRecoveries-STOB_NoParam].[STOB] Like "57*",
      "TravelCosts",
      IIf(
        [qry_CurrentYearRecoveries-STOB_NoParam].[STOB] Like "65*",
        "BusinessExpenses",
        IIf(
          [qry_CurrentYearRecoveries-STOB_NoParam].[STOB] Like "88*",
          "StaffRecoveries",
          "Other"
        )
      )
    )
  ) In (
    "ContractCosts",
    "TravelCosts",
    "BusinessExpenses",
    "StaffRecoveries",
    "Other"
  );
--Query: qry_PF_RecoveryForecast SQL:
SELECT ProjectDeliverable.ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.Recoverable,
  Project.ProjectStatus,
  ProjectBudget.Fiscal,
  FiscalYear.FiscalYear,
  Sum(ProjectBudget.Q1_Amount) AS Q1_Amount,
  Sum(ProjectBudget.Q2_Amount) AS Q2_Amount,
  Sum(ProjectBudget.Q3_Amount) AS Q3_Amount,
  Sum(ProjectBudget.Q4_Amount) AS Q4_Amount
FROM Project
  INNER JOIN (
    ProjectDeliverable
    INNER JOIN (
      ProjectBudget
      INNER JOIN FiscalYear ON ProjectBudget.Fiscal = FiscalYear.ID
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
GROUP BY ProjectDeliverable.ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.Recoverable,
  Project.ProjectStatus,
  ProjectBudget.Fiscal,
  FiscalYear.FiscalYear;
--Query: qry_Project Recoveries SQL: TRANSFORM IIf(
  Sum(
    IIf(
      [STOBBreakdown] <> "63",
      [CurrentFYTotalRecoverable],
      0
    )
  ) = 0,
  Null,
  Sum(
    IIf(
      [STOBBreakdown] <> "63",
      [CurrentFYTotalRecoverable],
      0
    )
  )
) AS NonContract
SELECT [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].Recoverable,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB].FiscalYear,
  qry_Project_TotalContracts.[Total Contract],
  qry_Project_TotalContracts.Fiscal,
  IIf(
    Sum(
      IIf(
        [STOBBreakdown] = "63",
        [CurrentFYTotalRecoverable],
        0
      )
    ) = 0,
    Null,
    Sum(
      IIf(
        [STOBBreakdown] = "63",
        [CurrentFYTotalRecoverable],
        0
      )
    )
  ) AS Contracts,
  Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYTotalRecoverable
  ) AS CYTotalRecoverable
FROM qry_Project_TotalContracts
  RIGHT JOIN [qry_CurrentYearRecoveries-STOB] ON qry_Project_TotalContracts.ProjectID = [qry_CurrentYearRecoveries-STOB].ProjectID
GROUP BY [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].Recoverable,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB].FiscalYear,
  qry_Project_TotalContracts.[Total Contract],
  qry_Project_TotalContracts.Fiscal PIVOT [qry_CurrentYearRecoveries-STOB].PortfolioAbbrev In ("COS", "PMO", "SDT", "CTZE", "EDS");
--Query: qry_Project_clients SQL:
SELECT Project.ProjectNumber,
  Project.ProjectName,
  Project.Description,
  Project.MinistryID,
  Project.PlannedStartDate,
  Project.PlannedEndDate,
  Project.TotalProjectBudget
FROM Project;
--Query: qry_Project_clients_budget SQL:
SELECT Project.ProjectNumber,
  Project.ProjectName,
  Portfolio.PortfolioAbbrev,
  Project.Description,
  Project.MinistryID,
  Ministry.MinistryName,
  Ministry.MinistryShortName,
  Project.PlannedStartDate,
  Project.PlannedEndDate,
  IIf(
    [ClientCoding].[ClientAmount] Is Null,
    [Project].[TotalProjectBudget],
    [ClientCoding].[ClientAmount]
  ) AS TotalProjectBudget,
  Portfolio.PortfolioName,
  Project.ProjectManager,
  IIf(
    [ClientCoding].[ClientAmount] Is Null,
    GetProjectContacts([Project].[ID], "ClientSponsor"),
    [Contact].[FirstName] & " " & [Contact].[LastName]
  ) AS ClientSponsor,
  FiscalYear.FiscalYear,
  Project.ProjectType
FROM (
    ClientCoding
    RIGHT JOIN (
      (
        (
          Portfolio
          RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
        )
        LEFT JOIN FiscalYear ON Project.Fiscal = FiscalYear.ID
      )
      LEFT JOIN Ministry ON Project.MinistryID = Ministry.ID
    ) ON ClientCoding.ProjectID = Project.ID
  )
  LEFT JOIN Contact ON ClientCoding.ContactID = Contact.ID
WHERE FiscalYear.FiscalYear = [Enter Fiscal Year yy-yy]
  and Project.ProjectType = IIf(
    [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "E",
    "External",
    IIf(
      [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "I",
      "Internal",
      IIf(
        [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "M",
        "Social Media",
        IIf(
          [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "S",
          "Service",
          Project.ProjectType
        )
      )
    )
  )
UNION ALL
SELECT Historical_Projects.ProjectNumber,
  Historical_Projects.ProjectName,
  Portfolio.PortfolioAbbrev,
  Historical_Projects.Description,
  Historical_Projects.MinistryID,
  Ministry.MinistryName,
  Ministry.MinistryShortName,
  Historical_Projects.StartDate,
  Historical_Projects.EndDate,
  Historical_Projects.TotalProjectBudget,
  Portfolio.PortfolioName,
  Historical_Projects.ProjectManager,
  Null AS ClientSponsor,
  FiscalYear.FiscalYear,
  Historical_Projects.ProjectType
FROM FiscalYear
  INNER JOIN (
    Ministry
    INNER JOIN (
      Portfolio
      INNER JOIN Historical_Projects ON Portfolio.ID = Historical_Projects.PortfolioID
    ) ON Ministry.ID = Historical_Projects.MinistryID
  ) ON FiscalYear.ID = Historical_Projects.FiscalYear
WHERE FiscalYear.FiscalYear = [Enter Fiscal Year yy-yy]
  and Historical_Projects.ProjectType = IIf(
    [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "E",
    "External",
    IIf(
      [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "I",
      "Internal",
      IIf(
        [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "M",
        "Social Media",
        IIf(
          [(E)xternal, (I)nternal, Social (M)edia, (S)ervice, or (A)ll?] = "S",
          "Service",
          Historical_Projects.ProjectType
        )
      )
    )
  );
--Query: qry_Project_clients_budget_allClientsDRAFT SQL:
SELECT Project.ProjectNumber,
  Project.ProjectName,
  Portfolio.PortfolioAbbrev,
  Project.Description,
  Project.MinistryID,
  Ministry.MinistryName,
  Ministry.MinistryShortName,
  Project.PlannedStartDate,
  Project.PlannedEndDate,
  IIf(
    [ClientCoding].[ClientAmount] Is Null,
    [Project].[TotalProjectBudget],
    [ClientCoding].[ClientAmount]
  ) AS TotalProjectBudget,
  Portfolio.PortfolioName,
  Project.ProjectManager,
  IIf(
    [ClientCoding].[ClientAmount] Is Null,
    GetProjectContacts([Project].[ID], "ClientSponsor"),
    [Contact].[FirstName] & " " & [Contact].[LastName]
  ) AS ClientSponsor,
  FiscalYear.FiscalYear,
  Project.ProjectType
FROM (
    ClientCoding
    RIGHT JOIN (
      (
        (
          Portfolio
          RIGHT JOIN Project ON Portfolio.ID = Project.PortfolioID
        )
        LEFT JOIN FiscalYear ON Project.Fiscal = FiscalYear.ID
      )
      LEFT JOIN Ministry ON Project.MinistryID = Ministry.ID
    ) ON ClientCoding.ProjectID = Project.ID
  )
  LEFT JOIN Contact ON ClientCoding.ContactID = Contact.ID
WHERE FiscalYear.FiscalYear = [Enter Fiscal Year yy-yy]
  and Project.ProjectType = IIf(
    [(E)xternal or (I)nternal?] = "E",
    "External",
    IIf(
      [(E)xternal or (I)nternal?] = "I",
      "Internal",
      "```"
    )
  )
UNION
SELECT Historical_Projects.ProjectNumber,
  Historical_Projects.ProjectName,
  Portfolio.PortfolioAbbrev,
  Historical_Projects.Description,
  Historical_Projects.MinistryID,
  Ministry.MinistryName,
  Ministry.MinistryShortName,
  Historical_Projects.StartDate,
  Historical_Projects.EndDate,
  Historical_Projects.TotalProjectBudget,
  Portfolio.PortfolioName,
  Historical_Projects.ProjectManager,
  Null AS ClientSponsor,
  FiscalYear.FiscalYear,
  Historical_Projects.ProjectType
FROM FiscalYear
  INNER JOIN (
    Ministry
    INNER JOIN (
      Portfolio
      INNER JOIN Historical_Projects ON Portfolio.ID = Historical_Projects.PortfolioID
    ) ON Ministry.ID = Historical_Projects.MinistryID
  ) ON FiscalYear.ID = Historical_Projects.FiscalYear
WHERE FiscalYear.FiscalYear = [Enter Fiscal Year yy-yy]
  and Historical_Projects.ProjectType = IIf(
    [(E)xternal or (I)nternal?] = "E",
    "External",
    IIf(
      [(E)xternal or (I)nternal?] = "I",
      "Internal",
      "```"
    )
  );
--Query: qry_Project_clients_Tran SQL:
SELECT Project.ProjectNumber,
  Project.ProjectName,
  Project.Description,
  Project.MinistryID,
  Ministry.MinistryShortName,
  Project.PlannedStartDate,
  Project.PlannedEndDate,
  Project.TotalProjectBudget
FROM Ministry
  INNER JOIN Project ON Ministry.ID = Project.MinistryID;
--Query: qry_project_contactlist SQL:
SELECT Project.ProjectNumber,
  Project.ProjectName,
  Project.Description,
  [FirstName] & " " & [LastName] AS Contact,
  Contact_Project.ContactRole,
  Contact.ContactTitle,
  Contact.Email,
  Contact.ContactPhone,
  Ministry.MinistryName
FROM Ministry
  RIGHT JOIN (
    (
      (
        Project
        LEFT JOIN Contact_Project ON Project.ID = Contact_Project.ProjectID
      )
      LEFT JOIN Contact ON Contact_Project.ContactID = Contact.ID
    )
    RIGHT JOIN (
      ClientCoding
      INNER JOIN JV ON ClientCoding.ID = JV.ClientCodingID
    ) ON Project.ID = JV.ProjectID
  ) ON Ministry.ID = Contact.MinistryID;
--Query: qry_Project_Contracts SQL:
SELECT Contract.ProjectID,
  Contract.Fiscal,
  Sum(Contract.TotalFeeAmount) AS Fees,
  Sum(Contract.TotalExpenseAmount) AS Expenses,
  Sum([TotalFeeAmount] + [TotalExpenseAmount]) AS [Total Contract]
FROM Contract
GROUP BY Contract.ProjectID,
  Contract.Fiscal
HAVING (((Contract.ProjectID) Is Not Null));
--Query: qry_Project_Contracts_recoveries SQL:
SELECT Contract.ProjectID,
  Contract.Fiscal,
  Sum(Contract.TotalFeeAmount) AS Fees,
  Sum(Contract.TotalExpenseAmount) AS Expenses,
  Sum([TotalFeeAmount] + [TotalExpenseAmount]) AS [Total Contract],
  InvoiceDetail.UnitAmount
FROM (
    Contract
    INNER JOIN Invoice ON Contract.ID = Invoice.ContractID
  )
  INNER JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
GROUP BY Contract.ProjectID,
  Contract.Fiscal,
  InvoiceDetail.UnitAmount
HAVING (((Contract.ProjectID) Is Not Null));
--Query: qry_Project_ContractswSTOB2000 SQL:
SELECT Contract.ProjectID,
  Contract.CONumber,
  Contract.Fiscal,
  Sum(Contract.TotalFeeAmount) AS Fees,
  Sum(Contract.TotalExpenseAmount) AS Expenses,
  Sum([TotalFeeAmount] + [TotalExpenseAmount]) AS [Total Contract],
  SIDInternalCoding.STOB,
  Portfolio.PortfolioAbbrev
FROM Portfolio
  INNER JOIN (
    Contract
    INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
  ) ON Portfolio.ID = SIDInternalCoding.PortfolioID
GROUP BY Contract.ProjectID,
  Contract.CONumber,
  Contract.Fiscal,
  SIDInternalCoding.STOB,
  Portfolio.PortfolioAbbrev
HAVING (
    ((Contract.ProjectID) Is Not Null)
    AND ((SIDInternalCoding.STOB) = "2000")
  );
--Query: qry_Project_Financial Coding SQL:;
with ProjectBudget_Normalized as (
  select ID,
    ProjectDeliverableID,
    Fiscal,
    ClientCodingID,
    ContractID,
    Notes,
    DetailAmount,
    RecoveryArea,
    ResourceType,
    STOB,
    1 Quarter,
    Q1_Recovered Recovered,
    Q1_Amount Amount
  from ProjectBudget
  union all
  select ID,
    ProjectDeliverableID,
    Fiscal,
    ClientCodingID,
    ContractID,
    Notes,
    DetailAmount,
    RecoveryArea,
    ResourceType,
    STOB,
    2 Quarter,
    Q2_Recovered Recovered,
    Q2_Amount Amount
  from ProjectBudget
  union all
  select ID,
    ProjectDeliverableID,
    Fiscal,
    ClientCodingID,
    ContractID,
    Notes,
    DetailAmount,
    RecoveryArea,
    ResourceType,
    STOB,
    3 Quarter,
    Q3_Recovered Recovered,
    Q3_Amount Amount
  from ProjectBudget
  union all
  select ID,
    ProjectDeliverableID,
    Fiscal,
    ClientCodingID,
    ContractID,
    Notes,
    DetailAmount,
    RecoveryArea,
    ResourceType,
    STOB,
    4 Quarter,
    Q4_Recovered Recovered,
    Q4_Amount Amount
  from ProjectBudget
)
select p.ProjectNumber,
  p.ProjectName,
  cast(
    case
      when ProjectStatus = 'Complete' then 1
      else 0
    end as bit
  ) Completed,
  cc.ID ClientCodingID,
  cc.ProjectID,
  pb.ProjectDeliverableID,
  pd.DeliverableName,
  fy.FiscalYear,
  pd.Fiscal,
  pb.Quarter,
  cc.Client,
  cc.ResponsibilityCentre,
  cc.ServiceLine,
  cc.STOB,
  cc.ProjectCode,
  c.LastName,
  c.FirstName,
  isnull(c.FirstName, '') + ' ' + isnull(c.LastName, '') [Full Name],
  c.Email,
  c.ContactPhone,
  c.ContactTitle,
  cc.ContactID,
  case
    when pb.Recovered = 1 then Amount
    else 0
  end Amount
from ProjectBudget_Normalized pb
  inner join ProjectDeliverable pd on pb.ProjectDeliverableID = pd.ID
  inner join FiscalYear fy on pd.Fiscal = fy.ID
  inner join ClientCoding cc on pb.ClientCodingID = cc.ID
  inner join Contact c on cc.ContactID = c.ID
  inner join Project p on cc.ProjectID = p.ID
where pb.Recovered = 1
  and pb.Amount <> 0 --Query: qry_Project_Financial Coding_LOCAL SQL: PARAMETERS [Quarter (Q1, Q2, Q3, Q4)] Text (255);
SELECT Project.ProjectNumber,
  Project.ProjectName,
  IIf([ProjectStatus] = "Complete", True, False) AS Completed,
  ClientCoding.ID AS ClientCodingID,
  ClientCoding.ProjectID,
  ProjectBudget.ProjectDeliverableID,
  ProjectDeliverable.DeliverableName,
  FiscalYear.FiscalYear,
  ProjectDeliverable.Fiscal,
  [Quarter (Q1, Q2, Q3, Q4)] AS Quarter,
  ClientCoding.Client,
  ClientCoding.ResponsibilityCentre,
  ClientCoding.ServiceLine,
  ClientCoding.STOB,
  ClientCoding.ProjectCode,
  Contact.LastName,
  Contact.FirstName,
  [Contact].[FirstName] & " " & [Contact].[LastName] AS [Full Name],
  Contact.Email,
  Contact.ContactPhone,
  Contact.ContactTitle,
  ClientCoding.ContactID,
  IIf(
    [Quarter (Q1, Q2, Q3, Q4)] = "Q1"
    And [ProjectBudget].[Q1_Recovered],
    [ProjectBudget].[Q1_Amount],
    IIf(
      [Quarter (Q1, Q2, Q3, Q4)] = "Q2"
      And [ProjectBudget].[Q2_Recovered],
      [ProjectBudget].[Q2_Amount],
      IIf(
        [Quarter (Q1, Q2, Q3, Q4)] = "Q3"
        And [ProjectBudget].[Q3_Recovered],
        [ProjectBudget].[Q3_Amount],
        IIf(
          [Quarter (Q1, Q2, Q3, Q4)] = "Q4"
          And [ProjectBudget].[Q4_Recovered],
          [ProjectBudget].[Q4_Amount],
          0
        )
      )
    )
  ) AS Amount
FROM (
    ProjectDeliverable
    INNER JOIN FiscalYear ON ProjectDeliverable.Fiscal = FiscalYear.ID
  )
  INNER JOIN (
    ProjectBudget
    INNER JOIN (
      (
        ClientCoding
        INNER JOIN Contact ON ClientCoding.ContactID = Contact.ID
      )
      INNER JOIN Project ON ClientCoding.ProjectID = Project.ID
    ) ON ProjectBudget.ClientCodingID = ClientCoding.ID
  ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
WHERE (
    (
      (
        IIf(
          [Quarter (Q1, Q2, Q3, Q4)] = "Q1"
          And [ProjectBudget].[Q1_Recovered],
          [ProjectBudget].[Q1_Amount],
          IIf(
            [Quarter (Q1, Q2, Q3, Q4)] = "Q2"
            And [ProjectBudget].[Q2_Recovered],
            [ProjectBudget].[Q2_Amount],
            IIf(
              [Quarter (Q1, Q2, Q3, Q4)] = "Q3"
              And [ProjectBudget].[Q3_Recovered],
              [ProjectBudget].[Q3_Amount],
              IIf(
                [Quarter (Q1, Q2, Q3, Q4)] = "Q4"
                And [ProjectBudget].[Q4_Recovered],
                [ProjectBudget].[Q4_Amount],
                0
              )
            )
          )
        )
      ) <> 0
    )
  );
--Query: qry_Project_TotalContracts SQL:
SELECT Contract.ProjectID,
  Project.ProjectNumber,
  Contract.Fiscal,
  Sum(Contract.TotalFeeAmount) AS Fees,
  Sum(Contract.TotalExpenseAmount) AS Expenses,
  Sum([TotalFeeAmount] + [TotalExpenseAmount]) AS [Total Contract]
FROM Project
  INNER JOIN Contract ON Project.ID = Contract.ProjectID
GROUP BY Contract.ProjectID,
  Project.ProjectNumber,
  Contract.Fiscal;
--Query: qry_Project_TotalContractsList SQL:
SELECT Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Supplier.SupplierName,
  Subcontractor.SubcontractorName,
  Contract.StartDate,
  Contract.EndDate,
  Sum(Contract.TotalFeeAmount) AS Fees,
  Sum(Contract.TotalExpenseAmount) AS Expenses,
  Sum([TotalFeeAmount] + [TotalExpenseAmount]) AS [Total Contract],
  Contract.Status,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.STOB,
  SIDInternalCoding.RecoveryInfo.Value,
  Project.ProjectNumber,
  Project.ProjectName
FROM Project
  INNER JOIN (
    (
      (
        Subcontractor
        RIGHT JOIN Supplier ON Subcontractor.ID = Supplier.ID
      )
      RIGHT JOIN Contract ON Supplier.ID = Contract.SupplierID
    )
    INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
  ) ON Project.ID = Contract.ProjectID
GROUP BY Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Supplier.SupplierName,
  Subcontractor.SubcontractorName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Status,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.STOB,
  SIDInternalCoding.RecoveryInfo.Value,
  Project.ProjectNumber,
  Project.ProjectName,
  Contract.ProjectID,
  Contract.Fiscal
HAVING (
    (
      (Project.ProjectNumber) Like "15-004"
      Or (Project.ProjectNumber) = "15-038"
      Or (Project.ProjectNumber) = "15-023"
    )
  );
--Query: qry_Project_TotalContractsListAll SQL:
SELECT Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Supplier.SupplierName,
  Subcontractor.SubcontractorName,
  Contract.StartDate,
  Contract.EndDate,
  Sum(Contract.TotalFeeAmount) AS Fees,
  Sum(Contract.TotalExpenseAmount) AS Expenses,
  Sum([TotalFeeAmount] + [TotalExpenseAmount]) AS [Total Contract],
  Contract.Status,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.STOB,
  SIDInternalCoding.RecoveryInfo.Value,
  Project.ProjectNumber,
  Project.ProjectName
FROM Project
  INNER JOIN (
    (
      (
        Subcontractor
        RIGHT JOIN Supplier ON Subcontractor.ID = Supplier.ID
      )
      RIGHT JOIN Contract ON Supplier.ID = Contract.SupplierID
    )
    INNER JOIN SIDInternalCoding ON Contract.ID = SIDInternalCoding.ContractID
  ) ON Project.ID = Contract.ProjectID
GROUP BY Contract.CONumber,
  Contract.COversion,
  Contract.Description,
  Supplier.SupplierName,
  Subcontractor.SubcontractorName,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Status,
  SIDInternalCoding.WIPNo,
  SIDInternalCoding.STOB,
  SIDInternalCoding.RecoveryInfo.Value,
  Project.ProjectNumber,
  Project.ProjectName,
  Contract.ProjectID,
  Contract.Fiscal;
--Query: qry_ProjectClientSponsor SQL:
SELECT Contact_Project.ProjectID,
  Contact.LastName,
  Contact.FirstName,
  [FirstName] & " " & [LastName] AS FullName
FROM (
    Contact_Project
    INNER JOIN ContactRole ON Contact_Project.ContactRole = ContactRole.ID
  )
  INNER JOIN Contact ON Contact_Project.ContactID = Contact.ID
WHERE (((ContactRole.RoleType) = "ClientSponsor"));
--Query: qry_ProjectContactLookup SQL:
SELECT Project.ID,
  Project.ProjectNumber,
  Project.ProjectName,
  Contact.FirstName,
  Contact.LastName,
  ContactRole.RoleType
FROM ContactRole
  INNER JOIN (
    Project
    INNER JOIN (
      Contact
      INNER JOIN Contact_Project ON Contact.[ID] = Contact_Project.[ContactID]
    ) ON Project.[ID] = Contact_Project.[ProjectID]
  ) ON ContactRole.ID = Contact_Project.ContactRole
WHERE (((Contact.LastName) = [Enter Last Name]));
--Query: qry_ProjectDeliverableAmts SQL:
SELECT Project.ProjectNumber,
  Project.ProjectName,
  ProjectBudgetDeliverableTotals.DeliverableName,
  ProjectBudgetDeliverableTotals.SumOfDetailAmount,
  ProjectBudgetDeliverableTotals.RecoveredAmount,
  ProjectBudgetDeliverableTotals.BalanceRemaining,
  Project.Fiscal
FROM Project
  LEFT JOIN ProjectBudgetDeliverableTotals ON Project.[ID] = ProjectBudgetDeliverableTotals.[ProjectID]
ORDER BY Project.ProjectNumber;
--Query: qry_ProjectList - budget - class SQL:
SELECT Project.Fiscal,
  Project.ProjectNumber AS [#],
  Project.ProjectName AS Name,
  Portfolio.PortfolioName AS Portfolio,
  Project.Classification,
  Project.ProjectType,
  Project.TotalProjectBudget,
  Project.PlannedStartDate AS [Start Date],
  Project.PlannedEndDate AS [End Date]
FROM Portfolio
  RIGHT JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
ORDER BY Project.Fiscal DESC,
  Project.ProjectNumber DESC;
--Query: qry_ProjectMasterList SQL:
SELECT Project.Fiscal,
  Project.ProjectNumber AS [#],
  Project.ProjectName AS Name,
  Project.Description,
  Project.ProjectManager AS [Project Manager],
  Portfolio.PortfolioName AS Portfolio,
  Project.PlannedStartDate AS [Start Date],
  Project.PlannedEndDate AS [End Date],
  Project.ProjectStatus,
  Project.Classification
FROM Portfolio
  RIGHT JOIN Project ON Portfolio.[ID] = Project.[PortfolioID]
ORDER BY Project.Fiscal DESC,
  Project.ProjectNumber DESC;
--Query: qry_ProjectQuarterComplete SQL:
SELECT Project.*,
  Month([AgreementEndDate]) AS Expr1,
  Project.ProjectStatus
FROM Project
WHERE (
    ((Month([AgreementEndDate])) In (4, 5, 6))
    AND ((Project.ProjectStatus) = "Complete")
  );
--Query: qry_ProjectRecovery SQL:
SELECT Project.ID AS ProjectID,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.TotalProjectBudget,
  FiscalYear.FiscalYear,
  Sum(IIf([Quarter] = "1", [Amount], Null)) AS Q1,
  Sum(IIf([Quarter] = "2", [Amount], Null)) AS Q2,
  Sum(IIf([Quarter] = "3", [Amount], Null)) AS Q3,
  Sum(IIf([Quarter] = "4", [Amount], Null)) AS Q4,
  Sum(JV.Amount) AS TotalRecovered
FROM FiscalYear
  INNER JOIN (
    Project
    INNER JOIN JV ON Project.[ID] = JV.[ProjectID]
  ) ON FiscalYear.ID = JV.FiscalYearID
GROUP BY Project.ID,
  Project.ProjectNumber,
  Project.ProjectName,
  Project.TotalProjectBudget,
  FiscalYear.FiscalYear;
--Query: qry_ProjectRecoveryHistorical SQL:
SELECT Historical_Projects.ProjectNumber,
  Historical_Projects.ProjectName,
  Historical_Projects.TotalProjectBudget,
  FiscalYear.FiscalYear AS BudgetFiscal,
  Historical_ProjectBilling.Q1,
  Historical_ProjectBilling.Q2,
  Historical_ProjectBilling.Q3,
  Historical_ProjectBilling.Q4,
  CCur(Nz([Q1], 0) + Nz([Q2], 0) + Nz([Q3], 0) + Nz([Q4], 0)) AS TotalRecovered
FROM Historical_Projects
  INNER JOIN (
    FiscalYear
    INNER JOIN Historical_ProjectBilling ON FiscalYear.ID = Historical_ProjectBilling.FiscalYear
  ) ON Historical_Projects.ProjectNumber = Historical_ProjectBilling.ProjectNumber
GROUP BY Historical_Projects.ProjectNumber,
  Historical_Projects.ProjectName,
  Historical_Projects.TotalProjectBudget,
  FiscalYear.FiscalYear,
  Historical_ProjectBilling.Q1,
  Historical_ProjectBilling.Q2,
  Historical_ProjectBilling.Q3,
  Historical_ProjectBilling.Q4;
--Query: qry_ProjectRisk SQL: TRANSFORM Sum(qry_ProjectRiskBase.RiskScoreID) AS SumOfRiskScoreID
SELECT qry_ProjectRiskBase.ProjectNumber,
  qry_ProjectRiskBase.ProjectName,
  qry_ProjectRiskBase.PortfolioName,
  qry_ProjectRiskBase.PortfolioAbbrev,
  qry_ProjectRiskBase.FiscalYearID,
  qry_ProjectRiskBase.FiscalYear,
  qry_ProjectRiskBase.ProjectType,
  qry_ProjectRiskBase.ProjectStatus,
  Sum(qry_ProjectRiskBase.RiskScoreID) AS RiskTotal
FROM qry_ProjectRiskBase
GROUP BY qry_ProjectRiskBase.ProjectNumber,
  qry_ProjectRiskBase.ProjectName,
  qry_ProjectRiskBase.PortfolioName,
  qry_ProjectRiskBase.PortfolioAbbrev,
  qry_ProjectRiskBase.FiscalYearID,
  qry_ProjectRiskBase.FiscalYear,
  qry_ProjectRiskBase.ProjectType,
  qry_ProjectRiskBase.ProjectStatus PIVOT qry_ProjectRiskBase.RiskFactor;
--Query: qry_ProjectRiskBase SQL:
select p.ProjectNumber,
  p.ProjectName,
  po.PortfolioName,
  po.PortfolioAbbrev,
  fy.ID FiscalYearID,
  fy.FiscalYear,
  p.ProjectType,
  p.ProjectStatus,
  'RiskFactor' + isnull(cast(rf.ID as varchar(max)), '') RiskFactor,
  pr.RiskScoreID
from Project p
  inner join FiscalYear fy on p.Fiscal = fy.ID
  left join Portfolio po on p.PortfolioID = po.ID
  left join ProjectRisk pr on p.ID = pr.ProjectID
  left join RiskFactor rf on pr.RiskFactorID = rf.ID --Query: qry_ProjectSummary_Contracts SQL:
select p.ID ProjectID,
  c.CONumber,
  c.COversion,
  s.SupplierName,
  sc_text.Subcontractors,
  fy.FiscalYear,
  c.TotalFeeAmount + c.TotalExpenseAmount TotalContractAmount,
  sum(id.UnitAmount * id.Rate) InvoicedToDate,
  c.TotalFeeAmount + c.TotalExpenseAmount - sum(id.UnitAmount * id.Rate) BalanceRemaining,
  c.EndDate,
  p.ID,
  c.Status
from Project p
  left join Contract c on p.ID = c.ProjectID
  left join FiscalYear fy on c.Fiscal = fy.ID
  left join Supplier s on c.SupplierID = s.ID
  left join Invoice i on c.ID = i.ContractID
  left join InvoiceDetail id on i.ID = id.InvoiceID
  outer apply (
    select stuff(
        scl.xmlDoc.value('.', 'varchar(max)'),
        1,
        2,
        ''
      ) Subcontractors
    from (
        select ', ' + sc.SubcontractorName
        from ContractSubcontractor csc
          inner join Subcontractor sc on csc.SubcontractorID = sc.ID
        where csc.ContractID = c.ID for xml path (''),
          type
      ) scl(xmlDoc)
  ) sc_text
group by p.ID,
  c.CONumber,
  c.COversion,
  s.SupplierName,
  sc_text.Subcontractors,
  fy.FiscalYear,
  c.TotalFeeAmount + c.TotalExpenseAmount,
  c.EndDate,
  p.ID,
  c.Status --Query: qry_ProjectSummary_Contracts_2 SQL:
SELECT [Project].[ProjectID] AS ProjectID,
  Contract.CONumber,
  Contract.COversion,
  Supplier.SupplierName,
  RecordsetToString(
    "select SubcontractorName from ContractSubcontractor inner join Subcontractor on ContractSubcontractor.SubcontractorID = Subcontractor.ID where ContractID = " & [Contract].[ID],
    "",
    ","
  ) AS Subcontractors,
  FiscalYear.FiscalYear,
  [TotalFeeAmount] + [TotalExpenseAmount] AS TotalContractAmount,
  Sum([UnitAmount] * [Rate]) AS InvoicedToDate,
  [TotalFeeAmount] + [TotalExpenseAmount] - Sum([UnitAmount] * [Rate]) AS BalanceRemaining
FROM Project
  RIGHT JOIN (
    (
      (
        Supplier
        INNER JOIN (
          Contract
          INNER JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
        ) ON Supplier.ID = Contract.SupplierID
      )
      INNER JOIN Invoice ON Contract.ID = Invoice.ContractID
    )
    RIGHT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
  ) ON Project.ID = Contract.ProjectID
GROUP BY [Project].[ProjectID],
  Contract.CONumber,
  Contract.COversion,
  Supplier.SupplierName,
  RecordsetToString(
    "select SubcontractorName from ContractSubcontractor inner join Subcontractor on ContractSubcontractor.SubcontractorID = Subcontractor.ID where ContractID = " & [Contract].[ID],
    "",
    ","
  ),
  FiscalYear.FiscalYear,
  [TotalFeeAmount] + [TotalExpenseAmount];
--Query: qry_ProjectSummary_Contracts_LOCAL SQL:
SELECT Project.ID AS ProjectID,
  Contract.CONumber,
  Contract.COversion,
  Supplier.SupplierName,
  RecordsetToString(
    "select SubcontractorName from ContractSubcontractor inner join Subcontractor on ContractSubcontractor.SubcontractorID = Subcontractor.ID where ContractID = " & Nz([Contract].[ID], -1),
    "",
    ","
  ) AS Subcontractors,
  FiscalYear.FiscalYear,
  [TotalFeeAmount] + [TotalExpenseAmount] AS TotalContractAmount,
  Sum([UnitAmount] * [Rate]) AS InvoicedToDate,
  [TotalFeeAmount] + [TotalExpenseAmount] - Sum([UnitAmount] * [Rate]) AS BalanceRemaining,
  Contract.EndDate,
  Project.ID,
  Contract.Status
FROM Project
  LEFT JOIN (
    (
      (
        Supplier
        RIGHT JOIN (
          Contract
          LEFT JOIN FiscalYear ON Contract.Fiscal = FiscalYear.ID
        ) ON Supplier.ID = Contract.SupplierID
      )
      LEFT JOIN Invoice ON Contract.ID = Invoice.ContractID
    )
    LEFT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
  ) ON Project.ID = Contract.ProjectID
GROUP BY Contract.CONumber,
  Contract.COversion,
  Supplier.SupplierName,
  RecordsetToString(
    "select SubcontractorName from ContractSubcontractor inner join Subcontractor on ContractSubcontractor.SubcontractorID = Subcontractor.ID where ContractID = " & Nz([Contract].[ID], -1),
    "",
    ","
  ),
  FiscalYear.FiscalYear,
  [TotalFeeAmount] + [TotalExpenseAmount],
  Contract.EndDate,
  Project.ID,
  Contract.Status,
  Project.ID;
--Query: qry_Projectswithcontracts SQL: TRANSFORM Sum(
  qry_CurrentYearRecoveries.CurrentFYTotalRecoverable
) AS SumOfCurrentFYTotalRecoverable
SELECT qry_CurrentYearRecoveries.ProjectNumber,
  qry_CurrentYearRecoveries.ProjectName,
  qry_CurrentYearRecoveries.TotalProjectBudget,
  qry_CurrentYearRecoveries.FiscalYear,
  Sum(
    qry_CurrentYearRecoveries.CurrentFYTotalRecoverable
  ) AS CurrentFYRecoverableTotal,
  qry_Project_Contracts.[Total Contract] AS [Total Contracts]
FROM qry_CurrentYearRecoveries
  INNER JOIN qry_Project_Contracts ON qry_CurrentYearRecoveries.ProjectNumber = qry_Project_Contracts.ProjectNumber
GROUP BY qry_CurrentYearRecoveries.ProjectNumber,
  qry_CurrentYearRecoveries.ProjectName,
  qry_CurrentYearRecoveries.TotalProjectBudget,
  qry_CurrentYearRecoveries.FiscalYear,
  qry_Project_Contracts.[Total Contract] PIVOT qry_CurrentYearRecoveries.PortfolioAbbrev In ("COS", "PMO", "SDT", "CTZE", "EDS");
--Query: qry_Projectswithcontracts2 SQL:
SELECT qry_Projectswithcontracts.ProjectNumber,
  qry_Projectswithcontracts.ProjectName,
  qry_Projectswithcontracts.TotalProjectBudget,
  qry_Projectswithcontracts.CurrentFYRecoverableTotal,
  qry_Projectswithcontracts.FiscalYear,
  qry_Projectswithcontracts.[Total Contracts]
FROM qry_Projectswithcontracts;
--Query: qry_RecoveriesForecastfor8809byMinistry SQL:
SELECT Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  FiscalYear.FiscalYear,
  Sum(ProjectBudget.Q1_Amount) AS SumOfQ1_Amount,
  Sum(ProjectBudget.Q2_Amount) AS SumOfQ2_Amount,
  Sum(ProjectBudget.Q3_Amount) AS SumOfQ3_Amount,
  Sum(ProjectBudget.Q4_Amount) AS SumOfQ4_Amount,
  ProjectBudget.RecoveryArea,
  ProjectBudget.STOB,
  Project.PortfolioID,
  Ministry.MinistryName
FROM (
    Ministry
    RIGHT JOIN Project ON Ministry.ID = Project.MinistryID
  )
  RIGHT JOIN (
    (
      FiscalYear
      RIGHT JOIN ProjectDeliverable ON FiscalYear.ID = ProjectDeliverable.Fiscal
    )
    RIGHT JOIN (
      Portfolio
      RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
GROUP BY Portfolio.PortfolioName,
  Project.ProjectNumber,
  Project.ProjectName,
  FiscalYear.FiscalYear,
  ProjectBudget.RecoveryArea,
  ProjectBudget.STOB,
  Project.PortfolioID,
  Ministry.MinistryName
HAVING (
    (
      (FiscalYear.FiscalYear) Like "*" & [Enter Fiscal: ] & "*"
    )
    AND ((ProjectBudget.STOB) = "8809")
    AND (
      (
        (Left([projectbudget].[STOB], 2)) Like "63"
        Or (Left([projectbudget].[STOB], 2)) = "57"
      ) = False
    )
  );
--Query: qry_RecoveryArea_Breakdown SQL:
SELECT Project.ProjectNumber,
  Project.ProjectName,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  Portfolio.PortfolioName,
  FiscalYear.FiscalYear,
  Sum(ProjectBudget.Q1_Amount) AS SumOfQ1_Amount,
  Sum(ProjectBudget.Q2_Amount) AS SumOfQ2_Amount,
  Sum(ProjectBudget.Q3_Amount) AS SumOfQ3_Amount,
  Sum(ProjectBudget.Q4_Amount) AS SumOfQ4_Amount,
  [SumOfQ1_Amount] + [SumOfQ2_Amount] + [SumOfQ3_Amount] + [SumOfQ4_Amount] AS TOTAL
FROM Project
  RIGHT JOIN (
    (
      FiscalYear
      RIGHT JOIN ProjectDeliverable ON FiscalYear.ID = ProjectDeliverable.Fiscal
    )
    RIGHT JOIN (
      Portfolio
      RIGHT JOIN ProjectBudget ON Portfolio.ID = ProjectBudget.RecoveryArea
    ) ON ProjectDeliverable.ID = ProjectBudget.ProjectDeliverableID
  ) ON Project.ID = ProjectDeliverable.ProjectID
GROUP BY Project.ProjectNumber,
  Project.ProjectName,
  Project.TotalProjectBudget,
  Project.RecoverableAmount,
  Portfolio.PortfolioName,
  FiscalYear.FiscalYear
HAVING (
    (
      (FiscalYear.FiscalYear) Like "*" & [Enter Fiscal: ] & "*"
    )
  );
--Query: qry_RecoveryArea_Breakdown_Contracts SQL: TRANSFORM IIf(
  Sum(
    IIf(
      [STOBBreakdown] <> "63",
      [CurrentFYTotalRecoverable],
      0
    )
  ) = 0,
  Null,
  Sum(
    IIf(
      [STOBBreakdown] <> "63",
      [CurrentFYTotalRecoverable],
      0
    )
  )
) AS NonContract
SELECT [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].Recoverable,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB].FiscalYear,
  IIf(
    Sum(
      IIf(
        [STOBBreakdown] = "63",
        [CurrentFYTotalRecoverable],
        0
      )
    ) = 0,
    Null,
    Sum(
      IIf(
        [STOBBreakdown] = "63",
        [CurrentFYTotalRecoverable],
        0
      )
    )
  ) AS Contracts,
  Sum(
    [qry_CurrentYearRecoveries-STOB].CurrentFYTotalRecoverable
  ) AS CYTotalRecoverable
FROM [qry_CurrentYearRecoveries-STOB]
GROUP BY [qry_CurrentYearRecoveries-STOB].ProjectNumber,
  [qry_CurrentYearRecoveries-STOB].ProjectName,
  [qry_CurrentYearRecoveries-STOB].Recoverable,
  [qry_CurrentYearRecoveries-STOB].TotalProjectBudget,
  [qry_CurrentYearRecoveries-STOB].FiscalYear PIVOT [qry_CurrentYearRecoveries-STOB].PortfolioAbbrev In ("COS", "PMO", "SDT", "CTZE", "EDS");
--Query: qry_RecoveryArea_Breakdown_Crosstab SQL: TRANSFORM Sum(
  qry_CurrentYearRecoveries.CurrentFYTotalRecoverable
) AS SumOfCurrentFYTotalRecoverable
SELECT qry_CurrentYearRecoveries.ProjectNumber,
  qry_CurrentYearRecoveries.ProjectName,
  Project.Recoverable,
  qry_CurrentYearRecoveries.TotalProjectBudget,
  qry_CurrentYearRecoveries.RecoverableAmount,
  qry_CurrentYearRecoveries.[Total Contract],
  qry_CurrentYearRecoveries.FiscalYear,
  Sum(
    qry_CurrentYearRecoveries.CurrentFYTotalRecoverable
  ) AS CurrentFYRecoverableTotal
FROM qry_CurrentYearRecoveries
  INNER JOIN Project ON qry_CurrentYearRecoveries.ProjectID = Project.ID
GROUP BY qry_CurrentYearRecoveries.ProjectNumber,
  qry_CurrentYearRecoveries.ProjectName,
  Project.Recoverable,
  qry_CurrentYearRecoveries.TotalProjectBudget,
  qry_CurrentYearRecoveries.RecoverableAmount,
  qry_CurrentYearRecoveries.[Total Contract],
  qry_CurrentYearRecoveries.FiscalYear PIVOT qry_CurrentYearRecoveries.PortfolioAbbrev In (
    "OSS",
    "DES",
    "DMS",
    "DP",
    "ANA",
    "SD",
    "CE",
    "EDS",
    "BCS",
    "DIV"
  );
--Query: qry_RiskProfile SQL:
SELECT RiskProfile.Recommendation,
  RiskProfile.RiskProfile,
  RiskProfile.LowerScoreThreshold,
  RiskProfile.UpperScoreThreshold,
  RiskProfile.ColourRed,
  RiskProfile.ColourGreen,
  RiskProfile.ColourBlue
FROM RiskProfile;
--Query: qry_Supplier_Subcontractor_COs SQL: PARAMETERS Name Text (255);
SELECT Contract.CONumber,
  Contract.StartDate,
  Contract.EndDate,
  Contract.Status,
  [TotalFeeAmount] + [TotalExpenseAmount] AS ContractAmount,
  Subcontractor.SubcontractorName,
  Supplier.SupplierName,
  Resource.ResourceLastName,
  Resource.ResourceFirstName
FROM Subcontractor
  RIGHT JOIN (
    (
      Supplier
      INNER JOIN (
        Resource
        RIGHT JOIN (
          Contract
          LEFT JOIN Contract_Resource ON Contract.[ID] = Contract_Resource.[ContractID]
        ) ON Resource.[ResourceID] = Contract_Resource.[ResourceID]
      ) ON Supplier.ID = Contract.SupplierID
    )
    LEFT JOIN ContractSubcontractor ON Contract.ID = ContractSubcontractor.ContractID
  ) ON Subcontractor.ID = ContractSubcontractor.SubcontractorID
WHERE (((Supplier.SupplierName) = [Name]))
  OR (((Subcontractor.SubcontractorName) = [Name]))
  OR (((Resource.ResourceLastName) = [Name]))
UNION
SELECT Historical_Contracts.CONumber,
  Historical_Contracts.StartDate,
  Historical_Contracts.EndDate,
  "Historical" AS Expr1,
  Historical_Contracts.TotalContractAmount,
  Subcontractor.SubcontractorName,
  Supplier.SupplierName,
  Resource.ResourceLastName,
  Resource.ResourceFirstName
FROM Resource
  RIGHT JOIN (
    Supplier
    INNER JOIN (
      Subcontractor
      RIGHT JOIN (
        Historical_Contracts
        LEFT JOIN Historical_ContractAssignments ON Historical_Contracts.CONumber = Historical_ContractAssignments.CONumber
      ) ON Subcontractor.ID = Historical_Contracts.SubcontractorID
    ) ON Supplier.ID = Historical_Contracts.SupplierID
  ) ON Resource.ResourceID = Historical_ContractAssignments.ResourceID
WHERE (((Subcontractor.SubcontractorName) = [Name]))
  OR (((Supplier.SupplierName) = [Name]))
  OR (((Resource.ResourceLastName) = [Name]))
ORDER BY EndDate DESC;
--Query: qry_SupplierResourceTypes SQL:
SELECT Supplier.SupplierName,
  SupplierRate.ResourceTypeID,
  SupplierRate.Rate,
  SupplierRate.Competency
FROM Supplier
  LEFT JOIN (
    SupplierRate
    LEFT JOIN Resource_SupplierRates ON SupplierRate.ID = Resource_SupplierRates.SupplierRateID
  ) ON Supplier.ID = SupplierRate.SupplierID
GROUP BY Supplier.SupplierName,
  SupplierRate.ResourceTypeID,
  SupplierRate.Rate,
  SupplierRate.Competency
ORDER BY Supplier.SupplierName;
--Query: qry_UniqueClientsPerFiscal SQL:
SELECT qry_UniqueClientsPerFiscalBase.FiscalYearID,
  qry_UniqueClientsPerFiscalBase.FiscalYear,
  IIf(
    [UniqueClients] Is Not Null,
    [UniqueClients],
    Count(*)
  ) AS UniqueClientCount
FROM qry_UniqueClientsPerFiscalBase
GROUP BY qry_UniqueClientsPerFiscalBase.FiscalYearID,
  qry_UniqueClientsPerFiscalBase.FiscalYear,
  qry_UniqueClientsPerFiscalBase.UniqueClients;
--Query: qry_UniqueClientsPerFiscalBase SQL:
SELECT FiscalYear.ID AS FiscalYearID,
  FiscalYear.FiscalYear,
  Historical_OfficeData.UniqueClients,
  ClientCoding.ServiceLine
FROM (
    ClientCoding
    RIGHT JOIN (
      Project
      RIGHT JOIN FiscalYear ON Project.Fiscal = FiscalYear.ID
    ) ON ClientCoding.ProjectID = Project.ID
  )
  INNER JOIN Historical_OfficeData ON FiscalYear.ID = Historical_OfficeData.FiscalYear
GROUP BY FiscalYear.ID,
  FiscalYear.FiscalYear,
  Historical_OfficeData.UniqueClients,
  ClientCoding.ServiceLine;
--Query: qryReportControlField SQL:
SELECT ReportControlField.ReportID,
  ReportControl.ControlName,
  Nz(
    [ReportControlField].[FriendlyNameOverride],
    [ReportControl.FriendlyName]
  ) AS FriendlyName,
  ReportControlField.FieldName,
  ReportControlField.Delimiter,
  ReportControlField.Operator,
  ReportControlField.Required
FROM ReportControlField
  INNER JOIN ReportControl ON ReportControlField.ReportControlID = ReportControl.ID;
--Query: Query7 SQL:
SELECT First(ClientCoding.ID) AS FirstOfID
FROM Contact
  RIGHT JOIN ClientCoding ON Contact.ID = ClientCoding.ContactID
GROUP BY ClientCoding.ProjectID
HAVING (
    (
      (ClientCoding.ProjectID) = [Forms] ! [ProjectDetail] ! [ID]
    )
  );
--Query: SelectResourceQuery SQL:
SELECT Resource_SupplierRates.ID,
  SupplierRate.Rate,
  SupplierRate.Competency,
  SupplierRate.ResourceTypeID,
  Resource.ResourceLastName,
  SupplierRate.SupplierID,
  Contract_Resource.ContractID,
  Contract_Resource.AssignmentRate,
  Resource.ResourceID,
  ResourceType.ResourceType
FROM Resource
  INNER JOIN (
    (
      (
        SupplierRate
        RIGHT JOIN Resource_SupplierRates ON SupplierRate.ID = Resource_SupplierRates.SupplierRateID
      )
      LEFT JOIN Contract_Resource ON Resource_SupplierRates.ID = Contract_Resource.ResourceSupplierRateID
    )
    LEFT JOIN ResourceType ON SupplierRate.ResourceTypeID = ResourceType.ID
  ) ON Resource.ResourceID = Resource_SupplierRates.ResourceID;
--Query: ServerTime SQL:
select getdate() dt --Query: SupplierRatesQuery SQL:
SELECT ResourceType.ResourceType,
  SupplierRate.Competency,
  SupplierRate.Rate,
  SupplierRate.SupplierID,
  SupplierRate.ID
FROM SupplierRate
  LEFT JOIN ResourceType ON SupplierRate.ResourceTypeID = ResourceType.ID
ORDER BY ResourceType.ResourceType,
  SupplierRate.Competency;
--Query: SupplierResourcesAvailable2 SQL:
SELECT SupplierRate.Rate,
  ResourceType.ResourceType,
  SupplierRate.Competency,
  Resource.ResourceLastName,
  Supplier.SupplierName,
  Resource_SupplierRates.ID,
  Resource.ResourceID,
  Resource_SupplierRates.SupplierRateID
FROM ResourceType
  RIGHT JOIN (
    Supplier
    RIGHT JOIN (
      Resource
      LEFT JOIN (
        SupplierRate
        RIGHT JOIN Resource_SupplierRates ON SupplierRate.ID = Resource_SupplierRates.SupplierRateID
      ) ON Resource.ResourceID = Resource_SupplierRates.ResourceID
    ) ON Supplier.ID = SupplierRate.SupplierID
  ) ON ResourceType.ID = SupplierRate.ResourceTypeID
ORDER BY ResourceType.ResourceType,
  SupplierRate.Competency,
  Resource.ResourceLastName;
--Query: TotalBilled SQL:
SELECT Sum([Qty] * [UnitAmount]) AS TotalBilled,
  InvoiceDetail.Type AS Expr1,
  Invoice.ContractID
FROM Invoice
  RIGHT JOIN InvoiceDetail ON Invoice.ID = InvoiceDetail.InvoiceID
GROUP BY InvoiceDetail.Type,
  Invoice.ContractID;