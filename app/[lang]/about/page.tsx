import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/section-header';
import { Section } from '@/components/section';

const tools = ['DSpace', 'Fedora', 'Koha', 'MARC21', 'RDA', 'Dublin Core', 'OAI-PMH', 'IIIF', 'Solr'];

export default function AboutPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  return (
    <Section className="py-0">
      <div className="space-y-10">
        <SectionHeader
          title={params.lang === 'ar' ? 'نبذة قيادية' : 'Executive narrative'}
          description={
            params.lang === 'ar'
              ? 'قائد تحول رقمي يربط بين الاستراتيجية والمعايير الدولية واحتياجات المستفيدين.'
              : 'A transformation leader aligning knowledge strategy, international standards, and user-centered services.'
          }
        />
        <p className="text-sm text-muted-foreground md:text-base">
          {params.lang === 'ar'
            ? 'أقود مبادرات تحول المعرفة الرقمية للمؤسسات الأكاديمية والحكومية، مع تركيز على بناء مستودعات رقمية مرنة، وحوكمة المعرفة، وتطوير خدمات معلومات مدعومة بالذكاء الاصطناعي.'
            : 'I lead digital knowledge initiatives for academic and governmental institutions, delivering resilient repositories, governance frameworks, and AI-assisted information services.'}
        </p>
        <div>
          <h3 className="text-lg font-semibold">{params.lang === 'ar' ? 'مجالات الخبرة' : 'Expertise areas'}</h3>
          <ul className="mt-3 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <li>Knowledge Management Strategy & Governance</li>
            <li>Digital Library Transformation & Repository Architecture</li>
            <li>Metadata Standards (MARC21, RDA) & Cataloging Automation</li>
            <li>Digitization Programs & Digital Preservation</li>
            <li>AI-enabled Discovery, Classification, and Analytics</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{params.lang === 'ar' ? 'الأدوات والمعايير' : 'Tools & standards'}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
