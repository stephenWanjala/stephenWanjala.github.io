import type { Contact, Education, Experience, Language, Project, Skill } from './types'

export const contact: Contact = {
  email: 'stephenwanjala145@gmail.com',
  linkedin: {
    userName: 'Stephen Wanjala',
    link: 'https://www.linkedin.com/in/wanjalastephen5/',
  },
  github: {
    userName: 'stephenWanjala',
    link: 'https://github.com/stephenWanjala',
  },
  twitter: {
    userName: 'Wanjalastephen5',
    link: 'https://twitter.com/wanjalastephen5',
  },
}

export const projects: Project[] = [
  {
    title: 'geoSpartial Village',
    name: 'geoSpartial_village',
    image: '/images/geosparcial.jpeg',
    link: 'https://github.com/stephenWanjala/geoSpartial_village',
    gitName: 'stephenWanjala/geoSpartial_village',
    stars: '?',
    forks: '?',
    description: 'Health IT hackathon 2024 Digital solution',
    tags: ['Vue 3', 'Pinia', 'LeafLet js', 'TypeScript', 'Vuetify3'],
  },
  {
    title: 'Multiply',
    name: 'Multiply',
    image: '/images/multiply.gif',
    link: 'https://github.com/stephenWanjala/Multiply',
    gitName: 'stephenWanjala/Multiply',
    stars: '?',
    forks: '?',
    description:
      'Simple Android app to help kids improve their multiplication skills in a fun and interactive way.',
    tags: ['Android', 'Kotlin', 'JetPack Compose'],
  },
  {
    title: 'DB2JHelper',
    name: 'DB2JHelper',
    image: '/images/db2JHelper.png',
    link: 'https://github.com/stephenWanjala/DB2JHelper',
    gitName: 'stephenWanjala/DB2JHelper',
    stars: '?',
    forks: '?',
    description:
      'Simplified Database Operations for Java JDBC A lightweight, modern Java library for effortless database interactions',
    tags: ['Java', 'Library'],
  },
  {
    title: 'BRecipes',
    name: 'BRecipes',
    image: '/images/brecipes.png',
    link: 'https://github.com/stephenWanjala/brecipes-fastify',
    gitName: 'stephenWanjala/brecipes-fastify',
    stars: '?',
    forks: '?',
    description: 'Recipes Data Of BBC Holiday Dishes',
    tags: [
      'Android',
      'Kotlin',
      'JetPack Compose',
      'Room',
      'Ktor',
      'Paging & Caching',
      'Fastify',
      'Prisma',
      'Postgres',
      'NextJs',
    ],
    webLink: 'https://brecipes-fastify-web.vercel.app/',
  },
]

export const experiences: Experience[] = [
  {
    company: 'PrimeSoft Solutions Limited',
    companyLink: 'https://primesoft.co.ke',
    logo: 'images/primesoft.png',
    roles: [
      {
        time: { start: new Date('2024-09-01'), current: true },
        jobTitle: 'Software Developer',
        employmentType: 'Full time, Onsite',
        details: [
          'Developing and maintaining software applications, including mobile and desktop applications under the MaliPlus ERP.',
          'Design and implement assigned features, modules, and enhancements for MaliPlus ERP.',
          'Collaborate with Support Team to troubleshoot and resolve software issues.',
        ],
      },
      {
        time: { start: new Date('2024-05-25'), end: new Date('2024-08-30') },
        jobTitle: 'Software Developer Intern',
        employmentType: 'Full time, Onsite',
        details: [
          'Contributing to development and maintenance of software desktop applications under the MaliPlus ERP.',
          'Collaborating with cross-functional teams to analyze, design, and implement assigned new features, modules and enhancements for MaliPlus ERP.',
          'Writing clean, maintainable, and efficient code, adhering to best practices and coding standards.',
          'Debugging and troubleshooting software issues',
          'Providing technical support to clients, addressing their inquiries, troubleshooting issues, and offering guidance on using software applications effectively.',
          'Contributing to the development of software architecture, design patterns, and coding standards to ensure consistency and scalability.',
          'Participating in team meetings, stand-ups, and sprint planning sessions to coordinate work and prioritize tasks effectively.',
        ],
      },
    ],
  },
  {
    company: 'Kibabii University',
    companyLink: 'https://kibu.ac.ke',
    logo: 'images/kibabii.png',
    roles: [
      {
        time: { start: new Date('2023-05-25'), end: new Date('2023-08-08') },
        jobTitle: 'Information Technology Attachment',
        employmentType: 'Onsite',
        details: [
          'Configuring managed switches, implementing VLANs, and securing network communications through SSH and Telnet protocols.',
          'Performing general computer maintenance tasks, including hardware upgrades, memory enhancement, and installation of operating systems and software applications.',
          'Installing and configuring ABNO ERP software, ensuring seamless operation and maintaining compliance with updates and patches.',
          'Designing and executing scripts for database automation, data normalization, and de-normalization, streamlining data management processes.',
          'Managing and configuring IP cameras, editing captured videos for presentations, and maintaining the security and integrity of video evidence.',
          'Providing technical support to students and staff, troubleshooting software-related issues, and offering guidance on using software applications effectively.',
          'Collaborating with cross-functional teams to enhance IT infrastructure, including transitioning from unmanaged to managed switches and optimizing access points and point-to-point radios.',
          'Assisting in the training of staff to effectively use the ERP software and troubleshoot any issues they encountered.',
          'Developing software solutions for clients, addressing their specific needs and contributing to the department services.',
        ],
      },
    ],
  },
]

export const skills: Skill[] = [
  {
    title: 'Java & JavaFX',

    icon: 'devicon-java-plain-wordmark',
    color: 'colored',
  },
  {
    title: 'Kotlin',
    icon: 'devicon-kotlin-plain',
    color: 'colored',
  },
  {
    title: 'Jetpack Compose',
    icon: 'devicon-jetpackcompose-plain-wordmark',
    color: 'colored',
  },
  {
    title: 'Django & Rest Framework',
    icon: 'devicon-django-plain',
    color: 'colored',
  },
  {
    title: 'Kotlin Ktor & Spring Boot',
    icon: 'devicon-ktor-plain-wordmark',
    color: 'colored',
  },
  {
    title: 'React.js',
    icon: 'devicon-react-original',
    color: 'colored',
  },
]

export const educations: Education[] = [
  {
    degree: 'BSc. Information Technology',
    school: 'Maseno University',
    duration: '2020 - 2024',
  },
  {
    degree: 'KCSE',
    school: "St Peter's Sang'alo High School",
    duration: '2015 - 2019',
  },
]

export const languages: Language[] = [
  { name: 'English', description: 'Fluent' },
  { name: 'Swahili', description: 'Fluent' },
]
