import { compileMDX } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">{props.children}</h2>
  ),
  h3: (props) => (
    <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">{props.children}</h3>
  ),
  p: (props) => <p className="leading-7 text-muted-foreground">{props.children}</p>,
  ul: (props) => <ul className="ml-6 list-disc text-muted-foreground">{props.children}</ul>,
  strong: (props) => <strong className="text-foreground">{props.children}</strong>
};

export async function renderMdx(content: string) {
  const { content: mdxContent } = await compileMDX({
    source: content,
    components
  });

  return mdxContent;
}
