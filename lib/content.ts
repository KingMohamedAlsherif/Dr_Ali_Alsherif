import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import {
  BookSchema,
  CaseStudySchema,
  ExperienceItemSchema,
  PublicationSchema,
  WorkshopSchema,
  type Book,
  type CaseStudy,
  type ExperienceItem,
  type Publication,
  type Workshop
} from './content-types';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

type Lang = 'en' | 'ar';

function resolveLangPath(lang: Lang, ...segments: string[]) {
  return path.join(CONTENT_ROOT, lang, ...segments);
}

async function readJson<T>(filePath: string, schema: { parse: (data: unknown) => T }) {
  const raw = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(raw);
  return schema.parse(data);
}

export async function getExperience(lang: Lang): Promise<ExperienceItem[]> {
  const filePath = resolveLangPath(lang, 'experience', 'experience.json');
  return readJson(filePath, ExperienceItemSchema.array());
}

export async function getPublications(lang: Lang): Promise<Publication[]> {
  const filePath = resolveLangPath(lang, 'publications', 'publications.json');
  return readJson(filePath, PublicationSchema.array());
}

export async function getWorkshops(lang: Lang): Promise<Workshop[]> {
  const filePath = resolveLangPath(lang, 'workshops', 'workshops.json');
  return readJson(filePath, WorkshopSchema.array());
}

export async function getCaseStudies(lang: Lang): Promise<CaseStudy[]> {
  const folder = resolveLangPath(lang, 'case-studies');
  const entries = await fs.readdir(folder);
  const items = await Promise.all(
    entries
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(folder, file), 'utf8');
        const { data } = matter(raw);
        return CaseStudySchema.parse(data);
      })
  );
  return items.sort((a, b) => b.year.localeCompare(a.year));
}

export async function getCaseStudyBySlug(lang: Lang, slug: string) {
  const filePath = resolveLangPath(lang, 'case-studies', `${slug}.mdx`);
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    meta: CaseStudySchema.parse(data),
    content
  };
}

export async function getBooks(lang: Lang): Promise<Book[]> {
  const folder = resolveLangPath(lang, 'books');
  const entries = await fs.readdir(folder);
  const items = await Promise.all(
    entries
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(folder, file), 'utf8');
        const { data } = matter(raw);
        return BookSchema.parse(data);
      })
  );
  return items.sort((a, b) => b.year.localeCompare(a.year));
}

export async function getBookBySlug(lang: Lang, slug: string) {
  const filePath = resolveLangPath(lang, 'books', `${slug}.mdx`);
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    meta: BookSchema.parse(data),
    content
  };
}

export function getBookFilePath(fileRef: string) {
  return path.join(CONTENT_ROOT, fileRef);
}
