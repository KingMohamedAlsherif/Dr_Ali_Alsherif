import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LANGUAGE_OPTIONS = [
  { label: 'EN', value: 'en' },
  { label: 'AR', value: 'ar' }
] as const;

export const TAGS = [
  'AI',
  'Digital Repositories',
  'Cataloging',
  'Knowledge Governance',
  'Digital Preservation'
] as const;
