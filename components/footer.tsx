import Link from 'next/link';
import { footerLinks } from '@/lib/site';

export function Footer({ lang }: { lang: 'en' | 'ar' }) {
  const links = footerLinks[lang];

  return (
    <footer className="border-t border-[rgb(var(--border))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {lang === 'ar'
              ? 'منصة معرفة رقمية قيادية في التحول الرقمي للمكتبات.'
              : 'A digital knowledge hub for library transformation leadership.'}
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
