import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { SITE } from '../../consts';

const projects = await getCollection('projects');
const courses = await getCollection('courses');
const writing = await getCollection('writing', ({ data }) => !data.draft);

const staticPages = {
  index: {
    title: SITE.name,
    description: SITE.title,
  },
  experience: {
    title: 'Experience',
    description: 'Six years across Intel, a semiconductor enterprise, and freelance GenAI work.',
  },
  projects: {
    title: 'Projects',
    description: 'Seven production case studies in agentic AI, MLOps, and computer vision.',
  },
  courses: {
    title: 'Courses',
    description: 'Path to Senior MLOps — Foundations, MLOps Engineering, AI/GenAI.',
  },
  about: {
    title: 'About',
    description: SITE.title,
  },
  writing: {
    title: 'Writing',
    description: 'Notes from production — MLOps and agentic AI.',
  },
};

const projectPages = Object.fromEntries(
  projects.map((p) => [`projects/${p.id}`, { title: p.data.title, description: p.data.summary }])
);

const coursePages = Object.fromEntries(
  courses.map((c) => [`courses/${c.id}`, { title: c.data.title, description: c.data.summary }])
);

const writingPages = Object.fromEntries(
  writing.map((w) => [`writing/${w.id}`, { title: w.data.title, description: w.data.description }])
);

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: { ...staticPages, ...projectPages, ...coursePages, ...writingPages },
  getImageOptions: (_path, page: { title: string; description: string }) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[15, 23, 42]],
    border: { color: [56, 189, 248], width: 6, side: 'block-start' },
    font: {
      title: { color: [248, 250, 252], size: 64 },
      description: { color: [148, 163, 184], size: 32 },
    },
    padding: 80,
  }),
});
