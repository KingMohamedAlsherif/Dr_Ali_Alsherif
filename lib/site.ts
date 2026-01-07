export const siteConfig = {
  name: 'Ali Fathy Abdelrehim',
  title: 'Digital Knowledge Hub',
  description:
    'Executive portfolio for a Knowledge Management and Digital Library Transformation leader specializing in AI-powered repositories and academic innovation.',
  url: 'https://example.com'
};

export const navItems = {
  en: [
    { label: 'Home', href: '/en' },
    { label: 'About', href: '/en/about' },
    { label: 'Experience', href: '/en/experience' },
    { label: 'Projects', href: '/en/projects' },
    { label: 'Publications & Talks', href: '/en/publications' },
    { label: 'Workshops', href: '/en/workshops' },
    { label: 'Books', href: '/en/books' },
    { label: 'Contact', href: '/en/contact' }
  ],
  ar: [
    { label: 'الرئيسية', href: '/ar' },
    { label: 'نبذة', href: '/ar/about' },
    { label: 'الخبرات', href: '/ar/experience' },
    { label: 'المشاريع', href: '/ar/projects' },
    { label: 'المنشورات والمحاضرات', href: '/ar/publications' },
    { label: 'ورش العمل', href: '/ar/workshops' },
    { label: 'الكتب', href: '/ar/books' },
    { label: 'تواصل', href: '/ar/contact' }
  ]
} as const;

export const footerLinks = {
  en: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'Google Scholar', href: 'https://scholar.google.com' },
    { label: 'Email', href: 'mailto:a.elsherif79@gmail.com' }
  ],
  ar: [
    { label: 'لينكدإن', href: 'https://www.linkedin.com' },
    { label: 'جوجل سكولار', href: 'https://scholar.google.com' },
    { label: 'البريد الإلكتروني', href: 'mailto:a.elsherif79@gmail.com' }
  ]
} as const;
