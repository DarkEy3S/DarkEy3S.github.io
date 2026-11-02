import type { Dict } from './types';

export const en: Dict = {
  meta: {
    title: 'Sevak Martirosyan — Fullstack Developer',
    description:
      'Fullstack developer: React, Next.js, TypeScript, Supabase, PostgreSQL. Internal web products, large catalogs, 1C integrations and commercial websites.',
    ogLocale: 'en_US',
  },
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ui: {
    skip: 'Skip to content', theme: 'Toggle theme', language: 'Site language', present: 'present',
    back: 'All projects', openSite: 'Visit site', more: 'Read more', team: 'Team project', pet: 'Personal pet project', github: 'GitHub',
  },
  nav: { work: 'Projects', sites: 'Websites', pets: 'Pet projects', experience: 'Experience', stack: 'Stack', contacts: 'Contact' },
  hero: {
    eyebrow: 'Fullstack Developer · Armenia',
    name: 'Sevak Martirosyan',
    role: 'Fullstack Developer',
    intro:
      'I build commercial websites and internal web products. At Uroven I work on a catalog admin panel for about 88,000 products and the uroven.pro online store: React, Next.js, TypeScript, Supabase, PostgreSQL and 1C integrations.',
    toCase: 'Main case study', toContacts: 'Get in touch', toExperience: 'Experience',
    photoAlt: 'Sevak Martirosyan',
  },
  profile: [
    ['Now', 'Fullstack Developer at Uroven'],
    ['Experience', '3+ years in web development'],
    ['Location', 'Armenia'],
    ['Languages', 'Armenian — native, Russian — C2, English — B1'],
  ],
  work: {
    eyebrow: 'Now · Uroven',
    title: 'Catalog admin panel and online store',
    text: 'Two connected parts of one system: the content team prepares product cards in an internal admin panel, and the data flows through 1C to the uroven.pro storefront.',
  },
  diagram: {
    label: 'How the data flows',
    admin: ['Catalog admin', 'Next.js · Supabase · PostgreSQL'],
    oneC: ['1C', 'accounting system'],
    store: ['uroven.pro', 'online store on CS-Cart'],
    toOneC: 'saved product cards',
    fromOneC: 'products, categories, properties, templates, photos',
    toStore: 'catalog, photos from Supabase Storage',
  },
  mockup: {
    title: 'Content queue', search: 'Search: name, SKU, 1C code', demo: 'Demo data', lock: 'Card locked for you · 4:59',
    cols: ['Product', 'Priority', 'Stage'],
    rows: [
      ['Demo product 0142', 'High', 'Description'],
      ['Demo product 0587', 'High', 'Photo to replace'],
      ['Demo product 1033', 'Medium', 'Moderation'],
      ['Demo product 2210', 'Low', 'Done'],
    ],
  },
  sites: {
    eyebrow: 'Commercial websites',
    title: 'Websites and agency projects',
    text: 'Websites I worked on at web studios. These were team efforts: design, development and launch were done together with the studio.',
  },
  pets: {
    eyebrow: 'Personal work',
    title: 'Pet projects',
    text: 'Apps I build on my own — separate from commercial work and studio team projects.',
    mock: {
      title: 'MaToDo', search: 'Search tasks', demo: 'Schematic',
      items: [['Active task', false], ['Another task', false], ['Completed task', true]],
    },
  },
  experience: {
    eyebrow: 'Experience', title: 'Where I have worked',
    education: ['Education', 'Khabarovsk Institute of Infocommunications', 'Computer systems programming · 2022'],
  },
  stack: {
    eyebrow: 'Stack', title: 'What I work with',
    groups: { core: 'Core stack', backend: 'Backend and APIs', data: 'Data', devops: 'Infrastructure', platforms: 'Platforms and CMS' },
  },
  contacts: {
    eyebrow: 'Contact', title: 'Get in touch',
    text: 'Open to joining a product team and to projects: internal tools, admin panels, integrations, websites on React and Next.js.',
    phoneLabel: 'Phone',
  },
  caseLabels: { task: 'The task', role: 'My role', implemented: 'What I did', stack: 'Technologies', results: 'Results', link: 'Website', company: 'Company' },
  notFound: { title: 'Page not found', text: 'The link may be outdated, or there is a typo in the address.', home: 'Back to home' },
  companies: {
    uroven: {
      name: 'Uroven', role: 'Fullstack Developer',
      text: 'Building materials store. I develop the internal catalog management platform and the uroven.pro online store: admin panel, database, 1C integrations.',
    },
    '01cat': { name: 'Dvoichny Kot (01cat)', role: 'Web Developer', text: 'Web studio. Building commercial WordPress websites as part of the studio team.' },
    shake: { name: 'Shake', role: 'Web Developer', text: 'Web studio. Building websites as part of the studio team.' },
    redline: { name: 'Redline', role: 'Front-end Developer', text: 'Building websites.' },
  },
  projects: {
    'catalog-platform': {
      title: 'Catalog management platform',
      summary: 'A private internal system where the Uroven content team prepares product cards for a catalog of about 88,000 products.',
      alt: 'Schematic admin panel mockup: catalog content queue with demo data',
      task: 'The store catalog is maintained in 1C and published in the online store. Product cards need photos, descriptions and properties, and a whole team prepares them. The company needed an admin panel that distributes work by priority, keeps editors from getting in each other’s way, and sends moderated results back to 1C.',
      role: 'Fullstack developer: database and RPC, server logic, admin interface and the 1C integration.',
      implemented: [
        'User roles and card moderation. A card is locked to one editor for 5 minutes so two people never edit it at the same time.',
        'Catalog content queue prioritized by stock, photos, description and logistics.',
        '1C integration: products, categories, properties, templates and photos. A saved card is sent back to 1C.',
        'Editing products and categories: descriptions, templates, review and moderation.',
        'Images: approved, rejected and needs-replacement statuses, upload with WebP conversion, additional photos and sorting, checksum-based duplicate search, storage in Supabase Storage.',
        'GPT-generated description drafts, reviewed by an editor.',
        'Bug reports with user session recording. Locks are released automatically when an editor is idle.',
        'PostgreSQL indexes and RPC functions for heavy admin queries.',
      ],
      results: [{ text: 'Some heavy admin queries went from seconds to milliseconds.', confirmed: true }],
    },
    'uroven-pro': {
      title: 'uroven.pro online store',
      summary: 'A public online store for building materials and tools. In my current role I develop its connection to the catalog and 1C.',
      alt: 'Abstract thumbnail of the uroven.pro website',
      task: 'The store runs on CS-Cart and gets its catalog from 1C. Product cards prepared in the admin panel have to reach the storefront together with their photos and descriptions.',
      role: 'Company fullstack developer: development and technical support of the store and its catalog integrations.',
      implemented: [
        'Sending edited cards from the admin panel through 1C to the storefront.',
        'Publishing product photos to Supabase Storage, where the store picks them up.',
        'Product descriptions in a format ready to paste into CS-Cart.',
      ],
    },
    'khv-aero': {
      title: 'Khabarovsk Airport',
      summary: 'An airport website with a live flight board, navigation through passenger and airport services, and sections for passengers and partners.',
      alt: 'Abstract thumbnail of the khv.aero website',
      role: 'Web developer in the Dvoichny Kot studio team.',
    },
    volna: {
      title: 'VOLNA water park',
      summary: 'Website of a water entertainment complex, built as part of the Dvoichny Kot studio team.',
      alt: 'Abstract thumbnail of the volnabrosko.com website',
    },
    domart: {
      title: 'Domart',
      summary: 'A commercial website built as part of the Dvoichny Kot studio team.',
      alt: 'Abstract thumbnail of the domartkhv.ru website',
    },
    '01cat': {
      title: 'Dvoichny Kot web studio',
      summary: 'Website of the web studio where I worked as a developer.',
      alt: 'Abstract thumbnail of the 01cat.ru website',
    },
    'todo-app': {
      title: 'MaToDo',
      summary: 'A personal web app for tracking tasks: sign-up, sign-in and a todo list on React, TypeScript, Vite and Supabase.',
      alt: 'Schematic mockup of the MaToDo task list',
      task: 'I needed my own app where I could register, confirm email and keep a personal task list — with search, filters and a user profile.',
      role: 'Personal pet project: interface, routing, auth and data storage built independently.',
      implemented: [
        'Sign-up, sign-in, email confirmation, password reset pages and a privacy policy.',
        'A todo list in a Supabase table: create, edit, complete, delete, search, all / active / completed filters, and sort by date or alphabetically.',
        'React Router routing and a Supabase Auth session: the todo list and profile open after sign-in.',
        'Profile editing: name, birthday, gender and an avatar in Supabase Storage.',
        'SPA build in Docker, serving through Nginx, and static publishing to GitHub Pages via GitHub Actions.',
      ],
    },
  },
};
