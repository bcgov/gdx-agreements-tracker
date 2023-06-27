
export const categoriesAndTypes: any = [
    {
        value: 'individual_project_reports',
        label: 'Individual Project Reports',
        types: [
            {
                value: 'Tab_17_rpt_P_Status_MostRecent',
                label: 'project status (most recent)',
                description: "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status and milestone status.",
                parameters: ['project'],
            },
            {
                value: 'Tab_18_rpt_P_StatusSummary',
                label: 'project status summary',
                description: "placeholder",
                parameters: ['project'],
            },
            {
                value: 'Tab_14_rpt_P_BudgetSummary',
                label: 'projects budget summary',
                description: "placeholder",
                parameters: ['project'],
            },
            {
                value: 'Tab_16_rpt_P_QuarterlyReview',
                label: 'Project Quarterly Review',
                description: "placeholder",
                parameters: ['project'],
            },
            {
                value: 'Tab_15_rpt_P_QuarterlyBillingRequest',
                label: 'Project Quarterly Billing Request',
                description: "placeholder",
                parameters: ['project', 'fiscal', 'quarter'],
            }
        ],
    },
    {
        value: 'individual_contract_reports',
        label: 'Individual Contract Reports',
        types: [{
            value: 'Tab_1_rpt_C_Summary',
            label: 'Contract Summary',
            description: "placeholder",
            parameters: ['contract'],
        }]
    },
    {
        value: 'divisional_project_reports',
        label: 'Divisional Project Reports',
        types: [
            {
                value: 'Tab_35_rpt_PA_StatusPortfolioRollup',
                label: 'project Status roll-up',
                description: "placeholder",
                parameters: ['portfolio'],
            },
            {
                value: 'Tab_34_rpt_PA_StatusDashboard',
                label: 'project dashboard',
                description: "placeholder",
                parameters: ['portfolio'],
            },
            {
                value: 'Tab_19_rpt_PA_ActiveProjectsbyPortfolio',
                label: 'active projects',
                description: "placeholder",
                parameters: ['portfolio'],
            },
            {
                value: 'Tab_25_rpt_PA_LessonsLearnedbyCategory',
                label: 'Projects Lessons Learned',
                description: "placeholder",
                parameters: ['portfolio', 'fiscal', 'project'],
            },
            {
                value: 'rpt_PA_Ministry',
                label: 'Ministry Project Usage',
                description: "placeholder",
                parameters: ['portfolio', 'fiscal'],
            },
            {
                value: 'rpt_PA_Registered',
                label: 'Projects Registered by Date / Period',
                description: "placeholder",
                parameters: ['date', 'portfolio'],
            },
            {
                value: 'rpt_PA_Fiscal_Registry',
                label: 'Projects Registered by Fiscal',
                description: "placeholder",
                parameters: ['fiscal'],
            },
            {
                value: 'change_request_types',
                label: 'Change Request Types',
                description: "placeholder",
                parameters: ['fiscal'],
            },
            {
                value: 'rpt_PA_ChangeRequestTypesFYSummary',
                label: 'Multi-Year statistics for Project change requests',
                description: "placeholder",
                parameters: [],
            },
        ],
    },

]
