
export const categoryOptions: any = [
    "individual project reports",
    "individual contract reports",
    "Divisional project reports"
]

export const categoriesAndTypes: any = {
    'individual project reports': [
        {
            value: 'Tab_17_rpt_P_Status_MostRecent',
            label: 'project status (most recent)',
            description: "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status and milestone status."
        },
        {
            value: 'Tab_18_rpt_P_StatusSummary',
            label: 'project status summary',
            description: "placeholder"
        },
        {
            value: 'Tab_14_rpt_P_BudgetSummary',
            label: 'projects budget summary',
            description: "placeholder"
        },
        {
            value: 'Tab_16_rpt_P_QuarterlyReview',
            label: 'Project Quarterly Review',

            description: "placeholder"
        },
        {
            value: 'Tab_15_rpt_P_QuarterlyBillingRequest',
            label: 'Project Quarterly Billing Request',
            description: "placeholder"
        }
    ],
    'individual contract reports': [{
        value: 'contract_summary',
        label: 'Contract Summary',
        description: "placeholder"
    }],
    
    'Divisional project reports': [
        {
            value: 'Tab_35_rpt_PA_StatusPortfolioRollup',
            label: 'project Status roll-up',
            description: "placeholder"
        },
        {
            value: 'Tab_34_rpt_PA_StatusDashboard',
            label: 'project dashboard',
            description: "placeholder"
        },
        {
            value: 'Tab_19_rpt_PA_ActiveProjectsbyPortfolio',
            label: 'active projects',
            description: "placeholder"
        },
        {
            value: 'Tab_25_rpt_PA_LessonsLearnedbyCategory',
            label: 'Projects Lessons Learned',
            description: "placeholder"
        },
        {
            value: 'rpt_PA_Ministry',
            label: 'Ministry Project Usage',
            description: "placeholder"
        },
        {
            value: 'rpt_PA_Registered',
            label: 'Projects Registered by Date / Period',
            description: "placeholder"
        },
        {
            value: 'rpt_PA_Fiscal_Registry',
            label: 'Projects Registered by Fiscal',
            description: "placeholder"
        },
        {
            value: 'change_request_types',
            label: 'Change Request Types',
            description: "placeholder"
        },
        {
            value: 'rpt_PA_ChangeRequestTypesFYSummary',
            label: 'Multi-Year statistics for Project change requests',
            description: "placeholder"
        },
    ],
};



export const parameterOptions: any = {

    'Tab_17_rpt_P_Status_MostRecent': {
        parameters: ['project'],
    },
    'Tab_18_rpt_P_StatusSummary': {
        parameters: ['project'],
    },
    'Tab_14_rpt_P_BudgetSummary': {
        parameters: ['project'],
    },
    'Tab_16_rpt_P_QuarterlyReview': {
        parameters: ['project'],
    },
    'Tab_15_rpt_P_QuarterlyBillingRequest': {
        parameters: ['project', 'fiscal', 'quarter'],
    },
    'Contract Summary': {
        parameters: ['contract'],
    },
    'Tab_35_rpt_PA_StatusPortfolioRollup': {
        parameters: ['portfolio'],
    },
    'Tab_34_rpt_PA_StatusDashboard': {
        parameters: ['portfolio'],
    },
    'Tab_19_rpt_PA_ActiveProjectsbyPortfolio': {
        parameters: ['portfolio'],
    },
    'Tab_25_rpt_PA_LessonsLearnedbyCategory': {
        parameters: ['portfolio', 'fiscal', 'project'],
    },
    'rpt_PA_Ministry': {
        parameters: ['portfolio', 'fiscal'],
    },
    'rpt_PA_Registered': {
        parameters: ['date', 'portfolio'],
    },
    'rpt_PA_Fiscal_Registry': {
        parameters: ['fiscal'],
    },
    'change_request_types': {
        parameters: ['fiscal'],
    },
    'rpt_PA_ChangeRequestTypesFYSummary': {
        parameters: [],
    },
};