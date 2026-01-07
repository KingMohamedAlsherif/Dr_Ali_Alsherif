import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { buildMetadata } from '@/lib/metadata';
import { getSearchIndex } from '@/lib/search';

export async function generateMetadata({ params }: { params: { lang: 'en' | 'ar' } }) {
  return buildMetadata(params.lang);
}

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: 'en' | 'ar' };
}) {
  const searchItems = await getSearchIndex(params.lang);
  const isArabic = params.lang === 'ar';

  return (
    <div
      className={isArabic ? 'font-arabic' : 'font-sans'}
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={params.lang}
    >
      <Header lang={params.lang} searchItems={searchItems} />
      <main className="mx-auto max-w-6xl px-4 py-12">{children}</main>
      <Footer lang={params.lang} />
    </div>
  );
}
