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