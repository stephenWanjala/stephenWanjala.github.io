import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true',
  token: import.meta.env.VITE_SANITY_TOKEN, 
})

// Image builder for Sanity images
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries for your content
export const queries = {
  // Projects
  projects: `*[_type == "project"] | order(stars desc) {
    _id,
    name,
    description,
    image,
    url,
    gitName,
    stars,
    forks,
    tags,
    webLink,
    contributors[] {
      login,
      avatar_url,
      html_url,
      contributions
    }
  }`,
  
  // Experiences
  experiences: `*[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    companyLink,
    logo,
    roles[] {
      jobTitle,
      startDate,
      endDate,
      isCurrent,
      details
    }
  }`,
  
  // Skills
  skills: `*[_type == "skill"] | order(category asc, name asc) {
    _id,
    name,
    category,
    proficiency,
    icon
  }`,
  
  // Education
  education: `*[_type == "education"] | order(graduationDate desc) {
    _id,
    institution,
    degree,
    field,
    graduationDate,
    description,
    logo
  }`,
  
  // Languages
  languages: `*[_type == "language"] | order(proficiency desc) {
    _id,
    name,
    proficiency,
    icon
  }`,
  
  // Hobbies
  hobbies: `*[_type == "hobby"] | order(name asc) {
    _id,
    name,
    description,
    icon
  }`,
  
  // Profile/Summary
  profile: `*[_type == "profile"][0] {
    _id,
    name,
    title,
    summary,
    avatar,
    socials[] {
      platform,
      url,
      icon
    }
  }`
} 