import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemas} from './sanity-schemas'

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: '8d1fed2z',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },
})
