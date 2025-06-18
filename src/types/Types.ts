interface Experience {
  _id?: string;
  company: string;
  companyLink: string;
  logo?: string;
  roles: {
    jobTitle: string;
    time: { start: Date; end?: Date; current?: boolean };
    details: string[];
  }[];
}

interface Project {
  _id?: string;
  name: string;
  description?: string;
  image: string;
  url: string;
  gitName: string;
  stars: string;
  forks: string;
  tags: string[];
  contributors?: {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
  }[];
  webLink?: string;
}

interface Contact {
  email: string;
  phone: string;
  linkedin: Social;
  github: Social;
  twitter: Social;
}

interface Social {
  userName: string;
  link: string;
}

interface Skill {
  _id?: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: Date;
  description?: string;
  logo?: string;
}

interface Language {
  _id?: string;
  name: string;
  proficiency: number;
  icon?: string;
}

interface Hobby {
  _id?: string;
  name: string;
  description?: string;
  icon?: string;
}

interface Profile {
  _id?: string;
  name: string;
  title: string;
  summary: string;
  avatar?: string;
  socials?: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export type {
  Experience,
  Project,
  Contact,
  Social,
  Skill,
  Education,
  Language,
  Hobby,
  Profile,
};
