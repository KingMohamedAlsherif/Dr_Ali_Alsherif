'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-40">
      <Container>
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/90 px-4 py-3 shadow-soft backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href={`/${lang}`} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-sm font-semibold">
                AA
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-tight text-foreground">{label}</span>
                <span className="hidden text-xs text-muted-foreground md:block">{subtitle}</span>
              </span>
            </Link>

            <nav
              className={cn(
                'flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs',
                lang === 'ar' && 'justify-end'
              )}
            >
              {items.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <div key={item.href} className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className={cn(
                        'relative px-1 font-medium transition-colors hover:text-foreground',
                        'after:absolute after:-bottom-1 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-accent after:opacity-0 after:transition-opacity',
                        isActive && 'text-foreground after:opacity-100'
                      )}
                    >
                      {item.label}
                    </Link>
                    {index < items.length - 1 && (
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/60" aria-hidden="true" />
                    )}
                  </div>
                );
              })}
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
