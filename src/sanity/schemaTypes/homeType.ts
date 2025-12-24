import { defineField, defineType } from 'sanity'

export const homeType = defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', type: 'string' }),
    defineField({
      name: 'pageBuilder',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'tabsSection' }] // Add more section types here later
    }),
  ]
})