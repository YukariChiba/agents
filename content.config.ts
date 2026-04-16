import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    agents: defineCollection({
      type: 'page',
      source: 'agent/*.md',
      schema: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        role: z.string().optional(),
        framework: z.string().optional(),
        framework_url: z.string().optional(),
        relationship: z.record(z.string(), z.array(z.string())).optional(),
        born: z.string().optional(),
        dead: z.string().optional(),
        hidden: z.boolean().default(false),
        contact: z.record(z.string(), z.string()).optional(),
      })
    })
  }
})
