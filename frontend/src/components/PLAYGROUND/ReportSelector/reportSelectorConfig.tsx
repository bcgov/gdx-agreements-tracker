
export const categoryOptions: any = [
    "individual project reports",
    "individual contract reports",
    "Divisional project reports"
]

export const categoriesAndTypes: any = {
    'individual project reports': [
        'project status (most recent)',
        'project status summary',
        'projects budget summary',
        'Project Quarterly Review',
        'Project Quarterly Billing Request',
    ],
    'individual contract reports': ['Contract Summary'],
    'Divisional project reports': [
        'project Status roll-up',
        'project dashboard',
        'active projects',
        'Projects Lessons Learned',
        'Ministry Project Usage',
        'Projects Registered by Date /Period',
        'Projects Registered by Fiscal',
        'Change Request Types',
        'Multi-Year statistics for Project change requests',
    ],
};


export const parameterOptions: any = {
    'project status (most recent)': {
        parameters: ['project'],
        description: "Runs on Project #, Shows information: Sponsorship, Start/End Date, Strategic Alignment, Project Description, Goals, status reporting, deliverable status and milestone status."
    },
    'project status summary': {
        parameters: ['project'],
        description: "placeholder"
    },
    'projects budget summary': {
        parameters: ['project'],
        description: "placeholder"
    },
    'Project Quarterly Review': {
        parameters: ['project'],
        description: "placeholder"
    },
    'Project Quarterly Billing Request': {
        parameters: ['project', 'fiscal', 'quarter'],
        description: "placeholder"
    },
    'Contract Summary': {
        parameters: ['contract'],
        description: "placeholder"
    },
    'project Status roll-up': {
        parameters: ['portfolio'],
        description: "placeholder"
    },
    'project dashboard': {
        parameters: ['portfolio'],
        description: "placeholder"
    },
    'active projects': {
        parameters: ['portfolio'],
        description: "placeholder"
    },
    'Projects Lessons Learned': {
        parameters: ['portfolio', 'fiscal', 'project'],
        description: "placeholder"
    },
    'Ministry Project Usage': {
        parameters: ['portfolio', 'fiscal'],
        description: "placeholder"
    },
    'Projects Registered by Date /Period': {
        parameters: ['date', 'portfolio'],
        description: "placeholder"
    },
    'Projects Registered by Fiscal': {
        parameters: ['fiscal'],
        description: "placeholder"
    },
    'Change Request Types': {
        parameters: ['fiscal'],
        description: "placeholder"
    },
    'Multi-Year statistics for Project change requests': {
        parameters: [],
        description: "placeholder"
    },



};