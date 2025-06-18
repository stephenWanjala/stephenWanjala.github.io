# Sanity CMS Integration Setup Guide

This guide will help you set up Sanity CMS to serve content for your Vue 3 portfolio website using Vue composables.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Sanity account (free at [sanity.io](https://sanity.io))

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Choose "Clean project with no predefined schemas"
4. Note down your project ID (you'll need this later)

## Step 2: Install Sanity Dependencies

The project already includes the necessary Sanity packages:
- `@sanity/client` - Sanity client for data fetching
- `@sanity/image-url` - Image URL builder for optimized images

## Step 3: Initialize Sanity Studio

```bash
# Navigate to your project root
cd /home/wanjala/DEV/stephenWanjala.github.io

# Create a sanity-studio directory
mkdir sanity-studio
cd sanity-studio

# Initialize Sanity Studio
sanity init --template clean --create-project "Portfolio CMS" --dataset production
```

## Step 4: Configure Sanity Studio

1. Replace the contents of `sanity-studio/schemas/index.js` with:

```javascript
import { schemas } from '../schemas'

export default {
  name: 'default',
  types: schemas,
}
```

2. Copy the `sanity-schemas.js` file from your project root to `sanity-studio/schemas/sanity-schemas.js`

3. Update `sanity-studio/sanity.config.js`:

```javascript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas/sanity-schemas'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',
  projectId: 'YOUR_PROJECT_ID', // Replace with your actual project ID
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemas,
  },
})
```

## Step 5: Configure Environment Variables

1. Create a `.env` file in your project root:

```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_USE_CDN=true
VITE_SANITY_TOKEN=your-token-optional
```

2. The Sanity client in `src/composables/useSanity.ts` is already configured to use these environment variables.

## Step 6: Start Sanity Studio

```bash
cd sanity-studio
sanity start
```

This will open Sanity Studio at `http://localhost:3333`

## Step 7: Add Content

1. Open Sanity Studio in your browser
2. Create content for each section:
   - **Profile**: Add your personal information
   - **Projects**: Add your projects with images and details
   - **Experience**: Add your work experience
   - **Skills**: Add your technical skills
   - **Education**: Add your educational background
   - **Languages**: Add languages you speak
   - **Hobbies**: Add your hobbies and interests

## Step 8: Deploy Sanity Studio (Optional)

```bash
cd sanity-studio
sanity deploy
```

This will deploy your Sanity Studio to a public URL.

## Step 9: Test Your Integration

1. Start your Vue development server:
```bash
npm run dev
```

2. Your portfolio should now load content from Sanity CMS using Vue composables

## Vue Composable Architecture

This project uses Vue 3 composables for Sanity integration:

### Available Composables

- `useSanity()` - Master composable for all data
- `useProjects()` - Projects data
- `useExperiences()` - Work experience data
- `useSkills()` - Skills data
- `useEducation()` - Education data
- `useLanguages()` - Languages data
- `useHobbies()` - Hobbies data
- `useProfile()` - Profile data

### Usage Example

```vue
<script setup>
import { useProjects } from '@/composables/useSanity'

const { projects, isLoading, error, fetchProjects } = useProjects()

onMounted(async () => {
  await fetchProjects()
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <div v-for="project in projects" :key="project._id">
      {{ project.name }}
    </div>
  </div>
</template>
```

## Content Migration

To migrate your existing hardcoded data to Sanity:

1. Use the data from `src/projects/viewmodel.ts` as a reference
2. Create corresponding entries in Sanity Studio
3. Upload images to Sanity's media library
4. Update any hardcoded image paths to use Sanity image URLs

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your Sanity project allows requests from your domain
2. **Missing Environment Variables**: Ensure all environment variables are set correctly
3. **Image Loading Issues**: Check that image URLs are properly formatted using the `urlFor` function

### Debugging:

1. Check browser console for errors
2. Use Sanity Vision tool to test queries
3. Verify environment variables are loaded correctly
4. Check that composables are properly imported

## Security Notes

- Never commit your `.env` file to version control
- Use read-only tokens for production
- Configure CORS settings in your Sanity project settings

## Performance Optimization

- Enable CDN for faster image delivery
- Use image transformations for responsive images
- Implement proper caching strategies
- Vue composables provide reactive data updates

## Next Steps

1. Set up webhooks for automatic deployments
2. Configure image optimization
3. Set up preview mode for draft content
4. Implement real-time updates using Sanity's real-time API
5. Add more composables for additional content types 