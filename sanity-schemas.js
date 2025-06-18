// Sanity Schema Definitions for Portfolio Website
// This file contains the schema definitions for all content types

export const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'url',
      title: 'GitHub URL',
      type: 'url',
      validation: Rule => Rule.required()
    },
    {
      name: 'gitName',
      title: 'GitHub Repository Name (owner/repo)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'stars',
      title: 'Stars Count',
      type: 'string',
      initialValue: '0'
    },
    {
      name: 'forks',
      title: 'Forks Count',
      type: 'string',
      initialValue: '0'
    },
    {
      name: 'tags',
      title: 'Technologies/Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'webLink',
      title: 'Live Demo URL',
      type: 'url'
    },
    {
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'login', title: 'Username', type: 'string' },
            { name: 'avatar_url', title: 'Avatar URL', type: 'url' },
            { name: 'html_url', title: 'Profile URL', type: 'url' },
            { name: 'contributions', title: 'Contributions', type: 'number' }
          ]
        }
      ]
    }
  ]
}

export const experience = {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'companyLink',
      title: 'Company Website',
      type: 'url'
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'jobTitle', title: 'Job Title', type: 'string' },
            { name: 'startDate', title: 'Start Date', type: 'date' },
            { name: 'endDate', title: 'End Date', type: 'date' },
            { name: 'isCurrent', title: 'Current Position', type: 'boolean', initialValue: false },
            { 
              name: 'details', 
              title: 'Job Details', 
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                layout: 'list'
              }
            }
          ]
        }
      ]
    }
  ]
}

export const skill = {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Frontend',
          'Backend',
          'Mobile',
          'Database',
          'DevOps',
          'Tools',
          'Other'
        ]
      }
    },
    {
      name: 'proficiency',
      title: 'Proficiency Level (1-10)',
      type: 'number',
      validation: Rule => Rule.min(1).max(10)
    },
    {
      name: 'icon',
      title: 'Icon (Material Design Icons class)',
      type: 'string',
      description: 'e.g., mdi-vuejs, mdi-react, mdi-android'
    }
  ]
}

export const education = {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    {
      name: 'institution',
      title: 'Institution Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'field',
      title: 'Field of Study',
      type: 'string'
    },
    {
      name: 'graduationDate',
      title: 'Graduation Date',
      type: 'date'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'logo',
      title: 'Institution Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}

export const language = {
  name: 'language',
  title: 'Language',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Language Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'proficiency',
      title: 'Proficiency Level (1-10)',
      type: 'number',
      validation: Rule => Rule.min(1).max(10)
    },
    {
      name: 'icon',
      title: 'Flag Icon',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}

export const hobby = {
  name: 'hobby',
  title: 'Hobby',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Hobby Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}

export const profile = {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'summary',
      title: 'Professional Summary',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'avatar',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'socials',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'icon', title: 'Icon Class', type: 'string' }
          ]
        }
      ]
    }
  ]
}

// Export all schemas
export const schemas = [
  project,
  experience,
  skill,
  education,
  language,
  hobby,
  profile
] 