const imageBase = 'https://globalinfraa.com/img/samples'

export const siteContent = {
  company: {
    name: 'Global Infra Solutions',
    shortName: 'GIS',
    logoText: 'Global Infra Solutions',
    logoUrl: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/1777185414644-global-logo.png',
  },
  contact: {
    phones: ['+91 9873342618', '+91 88607 45145'],
    emails: ['gis@globalinfraa.com', 'support@globalinfraa.com'],
    officeAddress:
      'Tower T03-521, 5th floor, RPS Infinia, 12th Avenue, 12/6 Milestone, Mathura Road, Sarai Khawaja, Faridabad 121013',
    factoryAddress:
      'Plot No. 1879 Dabua Pali Road Near Shri ram Dharam Kanta Sector - 49, Faridabad Haryana',
  },
  socialLinks: [
    { label: 'Facebook', href: 'https://www.facebook.com/share/17sgvvLmz2/?mibextid=wwXIfr' },
    { label: 'Instagram', href: 'https://www.instagram.com/globalinfrasolutions?igsh=cnF6YmMzZ2xsc3pz&utm_source=qr' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/global-infra-solutions-gis/' },
  ],
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Intro', href: '#intro' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Projects', href: '#projects' },
    { label: 'Feedback', href: '#feedback' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: '',
    title: 'Global Partner for Turnkey Infrastructure & Interior Solutions',
    subHeadline:
      'From foundational civil engineering to high-end corporate interiors',
    subHeadlineNew:
      'We deliver precision-led environments for brands that lead the world',
    description:
      'Global Infra Solutions brings together civil execution, interior fit-outs, and bespoke furniture systems under one accountable delivery framework.',
    primaryCta: { label: 'Get in touch', href: '#contact' },
    secondaryCta: { label: 'View Projects', href: '#projects' },
    metrics: [
      { value: '25+', label: 'Years of cross-sector expertise' },
      { value: '132+', label: 'Completed milestones' },
      { value: '402', label: 'Active site operations' },
    ],
    images: [
      'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/1774869047585-gis-about-hero.jpeg',
      `${imageBase}/Jio Mess/jio-6.jpeg`,
      `${imageBase}/Library/Gallery.jpeg`,
    ],
  },
  intro: {
    title: 'Creating spaces that stand beyond time',
    body: [
      'At Global Infra Solutions, we deliver integrated construction and interior solutions designed to meet the evolving needs of modern businesses.',
      'From initial planning to final execution, we ensure every project is completed with efficiency, transparency, and uncompromised quality.',
    ],
    image: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/1774869199162-gis-about-section.jpeg',
    pillars: [
      {
        title: 'Total Accountability',
        description: 'Single-point responsibility from blueprint to handover.',
      },
      {
        title: 'Architectural Precision',
        description: 'Merging structural integrity with premium aesthetics.',
      },
      {
        title: 'Global Standards',
        description: '25 years of cross-sector expertise in luxury retail, government, and corporate hubs.',
      },
    ],
  },
  featureStats: [
    { value: '25+', label: 'Years of combined experience' },
    { value: '113', label: 'Projects completed' },
    { value: '13', label: 'Projects ongoing' },
  ],
  solutions: {
    eyebrow: 'Services | Strategic Solutions',
    title: 'Execution models built for decision-makers who need speed, clarity, and finish quality.',
    items: [
      {
        id: 'turnkey-civil-infrastructure',
        numeral: 'I',
        title: 'Turnkey Civil Infrastructure',
        description:
          'End-to-end structural development for commercial, industrial, and institutional sectors. We manage the complexity of large-scale builds so you can focus on your core business.',
        competencies: [
          'Structural Engineering',
          'Site Preparation',
          'Industrial Facilities',
          'Institutional Foundations',
        ],
      },
      {
        id: 'high-end-interior-fit-outs',
        numeral: 'II',
        title: 'High-End Interior Fit-Outs',
        description:
          'Transforming raw shells into world-class environments. We specialize in luxury retail, executive office suites, and premium residential interiors.',
        competencies: [
          'Space Planning',
          'Material Curation',
          'MEP Integration',
          'Bespoke Finishing',
        ],
      },
      {
        id: 'bespoke-furniture-and-modular-systems',
        numeral: 'III',
        title: 'Bespoke Furniture & Modular Systems',
        description:
          'Custom-engineered furniture solutions designed for durability and aesthetic alignment, from executive boardrooms to modular retail fixtures.',
        competencies: [
          'Executive Furniture',
          'Retail Fixtures',
          'Modular Systems',
          'Custom Joinery',
        ],
      },
    ],
  },
  showcase: [
    {
      title: 'Interior Design',
      description:
        'Transforming shells into refined workplaces, flagship retail environments, and executive interiors with controlled detailing.',
      image: `${imageBase}/Home/home-gallery.jpeg`,
    },
    {
      title: 'Residential Architecture',
      description:
        'Crafting enduring structures that balance user comfort, functional planning, and premium material expression.',
      image: `${imageBase}/Library/Gallery.jpeg`,
    },
    {
      title: 'Commercial Spaces',
      description:
        'Making offices and customer-facing environments feel operationally efficient, elegant, and brand-aligned.',
      image: `${imageBase}/Jio Mess/jio-6.jpeg`,
    },
  ],
  gallery: [
    {
      title: 'Commissionerate Of Police',
      image: `${imageBase}/CP Office/dsp-office-gallery.jpeg`,
      category: 'The Heritage Series',
    },
    {
      title: 'Panchkula E-Library',
      image: `${imageBase}/Library/Gallery.jpeg`,
      category: 'The Heritage Series',
    },
    {
      title: 'Tissot Experience Zone',
      image: `${imageBase}/Jio Mess/jio-6.jpeg`,
      category: 'The Luxury Series',
    },
    {
      title: 'Executive Interior Suite',
      image: `${imageBase}/Home/home-gallery.jpeg`,
      category: 'The Corporate Series',
    },
    {
      title: 'Citizen Brand Counter',
      image: `${imageBase}/Jio Mess/jio-6.jpeg`,
      category: 'The Luxury Series',
    },
    {
      title: 'Conference Facility Upgrade',
      image: `${imageBase}/Library/Gallery.jpeg`,
      category: 'The Corporate Series',
    },
  ],
  projectSeries: [
    {
      title: 'The Heritage Series',
      image: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/project-series/1777190466854-The%20Heritage%20Series.jpeg',
      description:
        'Delivering public and institutional infrastructure with a focus on longevity and reliability. Built to support communities with strong, purpose-driven design.',
    },
    {
      title: 'The Luxury Series',
      image: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/project-series/1777190468676-The%20Luxury%20Series.jpeg',
      description:
        'Creating premium environments that reflect sophistication and brand identity. Designed with attention to detail, elegance, and superior craftsmanship.',
    },
    {
      title: 'The Corporate Series',
      image: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/project-series/1777190469455-corporate.jpeg',
      description:
        'Building efficient and modern workspaces tailored for business performance. Spaces that enhance productivity while maintaining a professional, refined aesthetic.',
    },
  ],
  testimonials: [
    {
      quote:
        'GIS handled execution with rare discipline. The team kept design intent intact while maintaining practical site control through every handover stage.',
      author: 'Corporate Delivery Lead',
      company: 'Luxury Retail Rollout',
      image: `${imageBase}/CP Office/dsp-office-gallery.jpeg`,
      location: 'Delhi NCR',
    },
    {
      quote:
        'Their ability to coordinate civil works, interior fit-out, and custom finishing through one accountable team removed a significant amount of project risk.',
      author: 'Project Consultant',
      company: 'Institutional Infrastructure Program',
      image: `${imageBase}/Home/home-gallery.jpeg`,
      location: 'Gurugram, Haryana',
    },
  ],
  clients: [
    { name: 'Client 01', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869356135-client-1.png' },
    { name: 'Client 02', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869357328-client-2.png' },
    { name: 'Client 03', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869358358-client-3.png' },
    { name: 'Client 04', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869359503-client-4.png' },
    { name: 'Client 05', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869360342-client-5.png' },
    { name: 'Client 06', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869356199-client-6.png' },
    { name: 'Client 07', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869357361-client-7.png' },
    { name: 'Client 08', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869358283-client-8.png' },
    { name: 'Client 09', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869359151-client-9.png' },
    { name: 'Client 10', logo: 'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/clients/1774869360304-client-10.png' },
  ],
  contactSection: {
    eyebrow: 'Contact Us | Connect with Experts',
    title: 'Speak with Our Project Experts',
    lead: 'Our team is ready to guide you through every stage of your infrastructure and interior project.',
    consultationLine: '+91 9873342618 | +91 88607 45145',
    cta: { label: 'Start Your Project', href: 'mailto:gis@globalinfraa.com' },
  },
  contactForm: {
    title: 'Request a Project Consultation',
    fields: [
      { label: 'Full Name', name: 'fullName', type: 'text' },
      { label: 'Email Address', name: 'email', type: 'email' },
      { label: 'Phone Number', name: 'phone', type: 'tel' },
      { label: 'Project Location', name: 'location', type: 'text' },
    ],
    categories: [
      'Turnkey Project',
      'Civil Construction',
      'Interior Fit-Out',
      'Renovation / Upgrade',
      'Project Management',
    ],
    submitLabel: 'Submit Request',
    footnote: 'Our team will review your requirements and get back to you within 24 hours.',
  },
  footer: {
    description:
      'Global Infra Solutions delivers civil infrastructure, premium fit-outs, and custom interior systems with one accountable project team.',
    creditLabel: 'Crafted for GIS with a cinematic architecture-led presentation system.',
  },
  gallerySection: {
    eyebrow: 'Project Gallery',
    title: 'Gallery',
    description: 'Explore our stunning residential designs and elegant interiors.',
  },
  logoMarquee: {
    title: 'Trusted By Our Clients',
    description: 'Brands and institutions that have partnered with GIS across execution-led projects.',
  },
}
