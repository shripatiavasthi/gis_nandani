export const siteUrl = "https://www.globalinfraa.com"
export const socialImage = "https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/1774869047585-gis-about-hero.jpeg"

export const pageSeo = {
  "/": {
    "title": "Turnkey Interior & Civil Construction Company in India | GIS",
    "description": "Global Infra Solutions delivers turnkey interior, civil construction and project execution solutions across India, from design and planning to final execution.",
    "ogDescription": "End-to-end turnkey interior, civil construction and project execution solutions across India by Global Infra Solutions.",
    "twitterDescription": "Turnkey interior, civil construction and project execution solutions across India."
  },
  "/about": {
    "title": "About Global Infra Solutions | Turnkey Projects & Construction",
    "description": "Learn about Global Infra Solutions, a turnkey interior, civil construction and project execution company delivering end-to-end solutions across India.",
    "ogDescription": "Discover Global Infra Solutions and our expertise in interior, civil construction and turnkey project execution."
  },
  "/turnkey-projects": {
    "title": "Turnkey Project Solutions in India | Design to Execution | GIS",
    "description": "Get complete turnkey project solutions from Global Infra Solutions, covering design, planning, civil work, interiors and end-to-end project execution.",
    "ogDescription": "Complete turnkey project execution from planning and design to civil work, interiors and final handover."
  },
  "/interior-design": {
    "title": "Interior Design & Execution Company in India | GIS",
    "description": "Global Infra Solutions provides interior design and execution services for commercial and residential spaces, delivering complete solutions from concept to completion.",
    "ogDescription": "End-to-end interior design and execution solutions for commercial and residential spaces by Global Infra Solutions."
  },
  "/commercial-interiors": {
    "title": "Commercial Interior Design & Fit-Out Company in India | GIS",
    "description": "Transform commercial spaces with Global Infra Solutions' interior design, fit-out and execution services, from planning and design to complete project delivery.",
    "ogDescription": "Complete commercial interior design, fit-out and project execution solutions by Global Infra Solutions."
  },
  "/residential": {
    "title": "Residential Interior & Construction Services in India | GIS",
    "description": "Global Infra Solutions offers residential interior and construction services with integrated design, execution and project management from concept to completion.",
    "ogDescription": "End-to-end residential interior and construction solutions with professional design and project execution."
  },
  "/civil-construction": {
    "title": "Civil Construction Company in India | Project Execution | GIS",
    "description": "Global Infra Solutions provides civil construction and project execution services across India, combining engineering, construction and professional project management.",
    "ogDescription": "Professional civil construction and project execution services by Global Infra Solutions across India."
  },
  "/projects": {
    "title": "Interior & Construction Projects Across India | GIS Portfolio",
    "description": "Explore Global Infra Solutions' interior, civil construction and turnkey project portfolio, showcasing our design, execution and project delivery capabilities.",
    "ogDescription": "Explore completed interior, construction and turnkey projects delivered by Global Infra Solutions."
  },
  "/contact": {
    "title": "Contact Global Infra Solutions | Interior & Construction Company",
    "description": "Contact Global Infra Solutions for turnkey interiors, civil construction and project execution services across India. Discuss your upcoming project with our team.",
    "ogDescription": "Get in touch with Global Infra Solutions for turnkey interior, construction and project execution requirements."
  }
}

export function getSeo(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const isProject = /^\/projects\/[^/]+$/.test(path) && !path.startsWith('/projects/sample-project-')
  const page = pageSeo[path] || (isProject ? {
    title: 'Interior & Construction Project Gallery | GIS',
    description: 'Explore project images and execution details from Global Infra Solutions’ interior and construction portfolio.',
  } : null)
  return {
    ...(page || { title: 'Global Infra Solutions | GIS', description: 'Global Infra Solutions interior, construction and project execution services.' }),
    canonical: `${siteUrl}${path}`,
    robots: page ? 'index, follow' : 'noindex, follow',
  }
}

export function seoTags(pathname) {
  const page = getSeo(pathname)
  return [
    ['name', 'description', page.description],
    ['name', 'robots', page.robots],
    ['property', 'og:title', page.title],
    ['property', 'og:description', page.ogDescription || page.description],
    ['property', 'og:url', page.canonical],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', 'Global Infra Solutions'],
    ['property', 'og:image', socialImage],
    ['property', 'og:image:alt', 'Global Infra Solutions project showcase'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.twitterDescription || page.description],
    ['name', 'twitter:image', socialImage],
  ]
}
