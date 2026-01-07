import { compileMDX } from 'next-mdx-remote/rsc';
import { type ReactNode } from 'react';
import { cn } from './utils';

const components = {
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">{children}</h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="leading-7 text-muted-foreground">{children}</p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="ml-6 list-disc text-muted-foreground">{children}</ul>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="text-foreground">{children}</strong>
  )
};

export async function renderMdx(content: string) {
  const { content: mdxContent } = await compileMDX({
    source: content,
    components
  });

  return mdxContent;
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('prose prose-neutral dark:prose-invert max-w-none', className)}>{children}</div>;
}
