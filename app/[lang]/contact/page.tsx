import { SectionHeader } from '@/components/section-header';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  return (
    <Section className="py-0">
      <div className="space-y-10">
        <SectionHeader
          title={params.lang === 'ar' ? 'تواصل' : 'Contact'}
          description={
            params.lang === 'ar'
              ? 'تواصل لمناقشة التحول الرقمي للمكتبات وإدارة المعرفة.'
              : 'Get in touch to discuss digital library transformation and knowledge strategy.'
          }
        />
        <form
          className="index-card grid gap-4 p-6 pt-8"
          action="mailto:a.elsherif79@gmail.com"
          method="post"
          encType="text/plain"
        >
          <Input name="name" placeholder={params.lang === 'ar' ? 'الاسم الكامل' : 'Full name'} required />
          <Input
            name="email"
            type="email"
            placeholder={params.lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            required
          />
          <Textarea
            name="message"
            placeholder={params.lang === 'ar' ? 'كيف يمكنني مساعدتك؟' : 'How can I help?'}
            required
          />
          <Button type="submit">{params.lang === 'ar' ? 'إرسال الرسالة' : 'Send message'}</Button>
        </form>
        <div className="text-sm text-muted-foreground">
          {params.lang === 'ar'
            ? 'يمكنك أيضًا التواصل عبر البريد الإلكتروني أو لينكدإن.'
            : 'You can also reach out via email or LinkedIn.'}
        </div>
      </div>
    </Section>
  );
}
