export interface Experience {
  company: string;
  companyLink: string;
  logo?: string;
  roles: {
    jobTitle: string;
    employmentType?: string;
    time: { start: Date; end?: Date; current?: boolean };
    details: string[];
  }[];
}

export interface Project {
  title: string;
  name: string;
  link: string;
  gitName: string;
  description?: string;
  tags: string[];
  image: string;
  stars?: string;
  forks?: string;
  contributors?: Contributor[];
  webLink?: string;
}

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface Contact {
  email: string;
  phone?: string;
  linkedin: Social;
  github: Social;
  twitter: Social;
}

export interface Social {
  userName: string;
  link: string;
}

export interface Skill {
  title: string;
  icon: string;
  color: string;
}

export interface Education {
  degree: string;
  school: string;
  duration: string;
}

export interface Language {
  name: string;
  description: string;
}
