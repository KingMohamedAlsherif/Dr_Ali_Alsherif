import Link from 'next/link';
import { footerLinks } from '@/lib/site';
import { Container } from '@/components/container';

export function Footer({ lang }: { lang: 'en' | 'ar' }) {
  const links = footerLinks[lang];

  return (
    <footer className="border-t border-[rgb(var(--border))]">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold">{lang === 'ar' ? 'علي الشريف' : 'Ali Alsherif'}</p>
          <p className="text-sm text-muted-foreground">
            {lang === 'ar'
              ? 'قيادة التحول الرقمي وإدارة المعرفة للمكتبات الأكاديمية.'
              : 'Leading digital knowledge strategy for academic and cultural institutions.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
