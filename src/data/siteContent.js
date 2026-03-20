const imageBase = 'https://globalinfraa.com/img/samples'

export const siteContent = {
  company: {
    name: 'Global Infra Solutions',
    shortName: 'GIS',
    logoText: 'Global Infra Solutions',
  },
  contact: {
    phones: ['+91 9873342618', '+91 8860745145'],
    emails: ['globalinfrasolu@gmail.com', 'sales@globalinfraa.com', 'supports@globalinfraa.com'],
  },
  socialLinks: [
    { label: 'Facebook', href: 'https://www.facebook.com/share/17sgvvLmz2/?mibextid=wwXIfr' },
    { label: 'Instagram', href: 'https://www.instagram.com/globalinfrasolutions?igsh=cnF6YmMzZ2xsc3pz&utm_source=qr' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/global-infra-solutions-gis/' },
  ],
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Clients', href: '#clients' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Civil And Interior Turnkey Projects',
    title: 'Welcome To Global Infra Solutions',
    description:
      'Global Infra Solutions is a distinguished partnership company specializing in civil and interior turnkey projects. With a collective experience of 25 years in the industry, the team delivers infrastructure and interior solutions with quality, precision, and client-first execution.',
    primaryCta: { label: 'Explore Services', href: '#services' },
    secondaryCta: { label: 'View Projects', href: '#gallery' },
    metrics: [
      { value: '25+', label: 'Years of combined experience' },
      { value: '132', label: 'Projects completed' },
      { value: '402', label: 'Projects ongoing' },
    ],
    heroImage: `${imageBase}/aboutUsImg.jpeg`,
  },
  about: {
    title: 'About Us',
    description:
      'At Global Infra Solutions, we are a trusted partner for civil and interior construction needs. Our work covers planning, design, execution, and post-project support across residential, commercial, industrial, and government projects. We combine modern materials, practical engineering, and disciplined delivery to create spaces that perform well and present well.',
    image: `${imageBase}/aboutUsImg.jpeg`,
  },
  highlights: [
    {
      title: 'Our Vision',
      description:
        'To be recognized as a leading provider of civil and interior solutions, setting benchmarks in quality, innovation, and customer satisfaction.',
    },
    {
      title: 'Our Mission',
      description:
        'To deliver world-class turnkey solutions that meet high standards of quality and safety while creating dependable value for every client.',
    },
    {
      title: 'Our Scope',
      description:
        'From civil structures to interior transformation and custom furniture solutions, GIS handles projects end to end with a single accountable team.',
    },
  ],
  services: {
    intro:
      'Global Infra Solutions offers a comprehensive range of services designed to meet diverse construction and interior design needs.',
    items: [
      {
        title: 'Civil Turnkey Projects',
        description:
          'Complete civil construction delivery from design coordination through final completion for residential, commercial, and industrial projects.',
      },
      {
        title: 'Interior Turnkey Projects',
        description:
          'Space planning, interior design, site execution, and fit-out management to create functional and visually strong environments.',
      },
      {
        title: 'Furniture And Fixture Solutions',
        description:
          'Customized furniture, modular systems, and interior products aligned to project requirements, budgets, and contemporary design needs.',
      },
    ],
  },
  gallery: [
    {
      title: 'Library',
      image: `${imageBase}/Library/Gallery.jpeg`,
      category: 'Institutional Interior',
    },
    {
      title: 'DCP Office FBD',
      image: `${imageBase}/CP Office/dsp-office-gallery.jpeg`,
      category: 'Government Office',
    },
    {
      title: 'Jio Mess Interior',
      image: `${imageBase}/Jio Mess/jio-6.jpeg`,
      category: 'Commercial Interior',
    },
    {
      title: 'Home Interior',
      image: `${imageBase}/Home/home-gallery.jpeg`,
      category: 'Residential Interior',
    },
  ],
  stats: [
    { value: 132, label: 'Projects Completed Till Date' },
    { value: 272, label: 'Notable Delivered Milestones' },
    { value: 402, label: 'Projects Ongoing' },
  ],
  whyChooseUs: [
    {
      title: 'Experienced Leadership',
      description:
        'The leadership team brings 25 years of experience in civil and interior works, adding strong project judgment and execution discipline.',
    },
    {
      title: 'End-To-End Solutions',
      description:
        'Planning, design, execution, and post-completion support are coordinated under one delivery model for fewer handoff risks.',
    },
    {
      title: 'Quality Assurance',
      description:
        'Strict quality and safety standards guide every stage of work, from procurement to final finishing and project handover.',
    },
    {
      title: 'Timely Delivery',
      description:
        'Execution is planned around deadlines without compromising workmanship, material standards, or site coordination quality.',
    },
    {
      title: 'Client-Centric Approach',
      description:
        'Every project is shaped around client requirements, operational needs, and long-term usability rather than a one-size-fits-all process.',
    },
    {
      title: 'Innovative Solutions',
      description:
        'Modern materials, practical detailing, and current methods are used to improve both functionality and the visual quality of each space.',
    },
  ],
  clients: [
    { name: 'Client 01', logo: `${imageBase}/clints-logo/1.png` },
    { name: 'Client 02', logo: `${imageBase}/clints-logo/2.png` },
    { name: 'Client 03', logo: `${imageBase}/clints-logo/3.png` },
    { name: 'Client 04', logo: `${imageBase}/clints-logo/4.png` },
    { name: 'Client 05', logo: `${imageBase}/clints-logo/5.png` },
    { name: 'Client 06', logo: `${imageBase}/clints-logo/6.png` },
    { name: 'Client 07', logo: `${imageBase}/clints-logo/7.png` },
    { name: 'Client 08', logo: `${imageBase}/clints-logo/8.png` },
    { name: 'Client 09', logo: `${imageBase}/clints-logo/9.png` },
    { name: 'Client 10', logo: `${imageBase}/clints-logo/10.png` },
  ],
  footer: {
    description:
      'At Global Infra Solutions, we pride ourselves on being a trusted partner for civil and interior construction needs.',
    creditLabel: 'Website inspiration based on the existing Global Infra Solutions static site.',
  },
}
