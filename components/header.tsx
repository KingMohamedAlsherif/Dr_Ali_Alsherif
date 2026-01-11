import Link from 'next/link';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchCommandPalette } from '@/components/search-command-palette';
import { SearchTrigger } from '@/components/search-trigger';
import type { SearchItem } from '@/lib/search';
import { navItems } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Container } from '@/components/container';

export function Header({ lang, searchItems }: { lang: 'en' | 'ar'; searchItems: SearchItem[] }) {
  const items = navItems[lang];
  const label = lang === 'ar' ? 'علي الشريف' : 'Ali Alsherif';
  const subtitle = lang === 'ar' ? 'قيادة المعرفة الرقمية' : 'Digital Knowledge Leadership';

  return (
    <header className="sticky top-4 z-40">
      <Container>
        <div className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))]/80 px-4 py-2 shadow-soft backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href={`/${lang}`} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--muted))] text-sm font-semibold">
                AA
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-tight text-foreground">{label}</span>
                <span className="hidden text-xs text-muted-foreground md:block">{subtitle}</span>
              </span>
            </Link>

            <nav className={cn('flex flex-wrap items-center gap-3 text-xs sm:text-sm', lang === 'ar' && 'justify-end')}>
              {items.map((item) => (
                <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={cn('flex items-center gap-2', lang === 'ar' && 'flex-row-reverse')}>
              <SearchTrigger label={lang === 'ar' ? 'افتح البحث' : 'Open search'} />
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
      <SearchCommandPalette
        items={searchItems}
        placeholder={lang === 'ar' ? 'ابحث في المشاريع والمنشورات' : 'Search projects, publications, workshops'}
        emptyLabel={lang === 'ar' ? 'لا توجد نتائج' : 'No results found.'}
      />
    </header>
  );
}
