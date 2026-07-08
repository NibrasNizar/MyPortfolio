import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    timeframe: z.string(),
    tags: z.array(z.string()),
    stack: z.array(z.string()),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    featured: z.boolean().default(false),
    order: z.number(),
    diagram: z.string().optional(),
    links: z
      .object({
        repo: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .optional(),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    track: z.enum(['foundations', 'mlops', 'genai']),
    summary: z.string(),
    outcomes: z.array(z.string()),
    modules: z.array(
      z.object({
        title: z.string(),
        lessons: z.array(z.string()),
      })
    ),
    prerequisites: z.array(z.string()).default([]),
    status: z.enum(['available', 'coming-soon']).default('coming-soon'),
    order: z.number(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, courses, writing };
