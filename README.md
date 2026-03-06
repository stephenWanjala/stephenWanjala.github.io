# Stephen Wanjala - Modern Portfolio

A beautifully designed, fully responsive portfolio website built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. Showcasing skills, projects, and professional experience with a modern, professional aesthetic.

## Features

- ✨ **Modern Design**: Clean, minimalist interface with smooth animations and interactions
- 📱 **Fully Responsive**: Mobile-first design that works flawlessly on all devices
- ⚡ **High Performance**: Built with Next.js for optimal speed and SEO
- 🎨 **Dark/Light Mode**: Automatic theme detection based on system preferences
- ♿ **Accessible**: WCAG compliant with proper semantic HTML and ARIA attributes
- 🔒 **Type Safe**: Full TypeScript support throughout the application
- 🔍 **SEO Optimized**: Meta tags, Open Graph, and structured data
- 🎯 **Zero Friction**: Contact form with email integration

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org)
- **UI Library**: [React 19](https://react.dev)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com)
- **Fonts**: [Google Fonts](https://fonts.google.com) (Geist, Merriweather)
- **Package Manager**: [pnpm](https://pnpm.io)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main homepage
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── navigation.tsx      # Sticky navigation bar
│   ├── hero.tsx            # Hero section with intro
│   ├── experience.tsx      # Work experience timeline
│   ├── projects.tsx        # Project showcase gallery
│   ├── skills.tsx          # Skills, education, languages
│   ├── contact.tsx         # Contact form
│   └── footer.tsx          # Footer with links
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   └── data.ts             # Portfolio content data
├── public/
│   └── images/             # Project screenshots and logos
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- pnpm 8+ (or npm/yarn if preferred)

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd stephenwanjala-github
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Run the development server**:
```bash
pnpm dev
```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

## Customization

### Update Your Information

All content is stored in `/lib/data.ts`. Simply edit this file to update:
- **Contact Info**: Email, phone, social links
- **Experience**: Companies, roles, responsibilities, dates
- **Projects**: Descriptions, technologies, links, images
- **Skills**: Technical skills with proficiency levels
- **Education**: Degrees, schools, graduation dates
- **Languages**: Languages spoken and proficiency

### Customize Colors & Theme

Edit `/app/globals.css` to modify the design tokens:

```css
:root {
  /* Light mode colors */
  --background: 0 0% 100%;
  --foreground: 210 40% 15%;
  --primary: 210 45% 20%;
  --accent: 185 92% 44%;
  --secondary: 210 30% 85%;
  /* ... more tokens ... */
}
```

Color values use HSL format: `hue saturation lightness`

### Update Fonts

Fonts are imported in `/app/globals.css`. To change fonts:

1. Update the Google Fonts import URL
2. Update font-family declarations
3. Update `tailwind.config.ts` if using custom fonts

### Add Project Images

1. Place project images in `/public/images/`
2. Update the image paths in `/lib/data.ts`
3. Images are automatically optimized by Next.js

## Building for Production

### Build the Application

```bash
pnpm build
```

### Run Production Build Locally

```bash
pnpm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Vercel automatically detects Next.js and configures deployment
4. Your portfolio is live!

### Deploy Elsewhere

This is a standard Next.js application and can be deployed to any Node.js hosting platform.

## Performance

- ✅ Images optimized with Next.js Image component
- ✅ Static site generation for fast load times
- ✅ CSS minification and optimization
- ✅ Automatic code splitting
- ✅ SEO-friendly structure

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Development Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Code Quality

The project includes:
- **ESLint**: Configured with Next.js rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Full type safety

## License

This project is open source and available under the MIT License.

## Contact & Links

- **Email**: stephenwanjala145@gmail.com
- **GitHub**: [stephenWanjala](https://github.com/stephenWanjala)
- **LinkedIn**: [Stephen Wanjala](https://www.linkedin.com/in/wanjalastephen5/)
- **Twitter**: [@Wanjalastephen5](https://twitter.com/wanjalastephen5)

---

Built with ❤️ using **Next.js 16** + **React 19** + **TypeScript** + **Tailwind CSS**



