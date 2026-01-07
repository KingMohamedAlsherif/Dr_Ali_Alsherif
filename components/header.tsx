import Link from 'next/link';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { SearchCommandPalette } from '@/components/search-command-palette';
import { SearchTrigger } from '@/components/search-trigger';
import type { SearchItem } from '@/lib/search';
import { navItems } from '@/lib/site';
import { cn } from '@/lib/utils';

export function Header({ lang, searchItems }: { lang: 'en' | 'ar'; searchItems: SearchItem[] }) {
  const items = navItems[lang];

  return (
    <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${lang}`} className="text-lg font-semibold tracking-tight">
          Digital Knowledge Hub
        </Link>
        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={cn('flex items-center gap-2', lang === 'ar' && 'flex-row-reverse')}
        >
          <SearchTrigger label={lang === 'ar' ? 'افتح البحث' : 'Open search'} />
          <LanguageToggle />
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/cv/Ali_Fathy_Alsherif_CV.docx" download>
              {lang === 'ar' ? 'تحميل السيرة' : 'Download CV'}
            </Link>
          </Button>
        </div>
      </div>
      <SearchCommandPalette
        items={searchItems}
        placeholder={lang === 'ar' ? 'ابحث في المشاريع والمنشورات' : 'Search projects, publications, workshops'}
        emptyLabel={lang === 'ar' ? 'لا توجد نتائج' : 'No results found.'}
      />
    </header>
  );
}
