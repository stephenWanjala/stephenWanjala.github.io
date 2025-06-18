# Stephen Wanjala Portfolio

A modern, responsive portfolio website built with Vue 3, TypeScript, and Vuetify, now powered by Sanity CMS for dynamic content management using Vue composables.

## Features

- 🎨 Modern, responsive design with Vuetify 3
- ⚡ Built with Vue 3 and TypeScript
- 📱 Mobile-first approach
- 🎯 Dynamic content management with Sanity CMS
- 🔧 Vue 3 composables for reactive data management
- 🚀 Fast performance with Vite
- 📊 Real-time data updates
- 🖼️ Optimized image handling
- 🎭 Smooth animations with GSAP

## Tech Stack

- **Frontend**: Vue 3, TypeScript, Vuetify 3
- **Build Tool**: Vite
- **State Management**: Vue 3 Composables
- **CMS**: Sanity
- **Styling**: SCSS, Vuetify
- **Animations**: GSAP
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Sanity account (free at [sanity.io](https://sanity.io))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stephenWanjala/stephenWanjala.github.io.git
cd stephenWanjala.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Set up Sanity CMS:
   - Follow the [Sanity Setup Guide](./SANITY_SETUP.md) for detailed instructions
   - Create a `.env` file based on `env.example`
   - Configure your Sanity project ID and other settings

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Sanity CMS Integration

This portfolio now uses Sanity CMS for content management, allowing you to:

- Update content without touching code
- Manage projects, skills, and experiences through a user-friendly interface
- Upload and optimize images automatically
- Preview changes before publishing
- Collaborate with others on content

### Content Types

- **Profile**: Personal information and social links
- **Projects**: Portfolio projects with images and details
- **Experience**: Work history and roles
- **Skills**: Technical skills and proficiency levels
- **Education**: Educational background
- **Languages**: Spoken languages
- **Hobbies**: Personal interests and activities

### Vue Composable Architecture

The project uses Vue 3 composables for Sanity integration:

#### Available Composables

- `useSanity()` - Master composable for all data
- `useProjects()` - Projects data
- `useExperiences()` - Work experience data
- `useSkills()` - Skills data
- `useEducation()` - Education data
- `useLanguages()` - Languages data
- `useHobbies()` - Hobbies data
- `useProfile()` - Profile data

#### Usage Example

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

### Setting Up Sanity

1. Create a Sanity account at [sanity.io](https://sanity.io)
2. Follow the [Sanity Setup Guide](./SANITY_SETUP.md)
3. Add your content through the Sanity Studio
4. Configure environment variables

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
src/
├── components/          # Vue components
├── composables/         # Vue 3 composables
│   └── useSanity.ts     # Sanity CMS composables
├── store/               # Pinia stores (legacy)
├── lib/                 # Utility libraries
├── types/               # TypeScript type definitions
├── views/               # Vue router views
└── assets/              # Static assets
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_USE_CDN=true
VITE_SANITY_TOKEN=your-token-optional
```

## Deployment

The project is configured for deployment on GitHub Pages:

1. Build the project:
```bash
npm run build
```

2. Deploy:
```bash
npm run deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **GitHub**: [@stephenWanjala](https://github.com/stephenWanjala)
- **LinkedIn**: [Stephen Wanjala](https://linkedin.com/in/stephen-wanjala)

## Acknowledgments

- [Vue.js](https://vuejs.org/) for the amazing framework
- [Vuetify](https://vuetifyjs.com/) for the UI components
- [Sanity](https://sanity.io/) for the headless CMS
- [GSAP](https://greensock.com/gsap/) for animations



