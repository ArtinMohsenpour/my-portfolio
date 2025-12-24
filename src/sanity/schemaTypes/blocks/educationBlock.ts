import { defineField, defineType } from 'sanity'

export const educationBlock = defineType({
  name: 'educationBlock',
  title: 'Education Item',
  type: 'object',
  fields: [
    defineField({ name: 'university', type: 'string', title: 'University/School' }),
    defineField({ name: 'degree', type: 'string', title: 'Degree Name (e.g. Master of IT)' }),
    defineField({ name: 'startDate', type: 'date', options: { dateFormat: 'YYYY-MM' } }),
    defineField({ name: 'endDate', type: 'date', options: { dateFormat: 'YYYY-MM' }, description: 'Leave empty if current' }),
    defineField({ 
      name: 'description', 
      type: 'array', 
      title: 'Description',
      of: [{ type: 'block' }] // This enables Rich Text (Bold, Lists, etc.)
    }),
  ]
})