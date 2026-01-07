import { z } from 'zod';

export const ExperienceItemSchema = z.object({
  role: z.string(),
  org: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  highlights: z.array(z.string()),
  tags: z.array(z.string())
});

export const CaseStudySchema = z.object({
  title: z.string(),
  slug: z.string(),
  year: z.string(),
  overview: z.string(),
  role: z.string(),
  problem: z.string(),
  approach: z.string(),
  standardsAndTools: z.array(z.string()),
  outcomes: z.array(z.string()),
  images: z.array(z.string()),
  links: z.array(z.object({
    label: z.string(),
    url: z.string().url()
  }))
});

export const PublicationSchema = z.object({
  title: z.string(),
  type: z.enum(['Paper', 'Talk']),
  venue: z.string(),
  date: z.string(),
  abstract: z.string(),
  links: z.array(z.object({
    label: z.string(),
    url: z.string().url()
  }))
});

export const WorkshopSchema = z.object({
  title: z.string(),
  audience: z.string(),
  duration: z.string(),
  topics: z.array(z.string()),
  language: z.string(),
  date: z.string().optional(),
  venue: z.string().optional()
});

export const BookSchema = z.object({
  title: z.string(),
  slug: z.string(),
  year: z.string(),
  publisher: z.string(),
  description: z.string(),
  coverImage: z.string(),
  access: z.enum(['public', 'gated']),
  fileRef: z.string()
});

export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type CaseStudy = z.infer<typeof CaseStudySchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Workshop = z.infer<typeof WorkshopSchema>;
export type Book = z.infer<typeof BookSchema>;
