'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LANGUAGE_OPTIONS } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function LanguageToggle() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentLang = segments[0] === 'ar' ? 'ar' : 'en';

  return (
    <div className="flex items-center rounded-full border border-[rgb(var(--border))] p-1 text-xs">
      {LANGUAGE_OPTIONS.map((option) => {
        const nextSegments = [...segments];
        nextSegments[0] = option.value;
        const href = `/${nextSegments.join('/')}` || `/${option.value}`;
        const isActive = currentLang === option.value;
        return (
          <Link
            key={option.value}
            href={href}
            className={cn(
              'rounded-full px-3 py-1 transition',
              isActive ? 'bg-sand-500 text-black' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
