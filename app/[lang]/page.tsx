import { KidsPlayAreaPage } from '@/components/kids-play-area-page';

export default function HomePage({ params }: { params: { lang: 'en' | 'ar' } }) {
  return <KidsPlayAreaPage lang={params.lang} />;
}
