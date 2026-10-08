/**
 * Centralized Site Configuration & Metadata Engine for AlgoLearn Queues
 * 
 * Provides centralized definitions for production domain, canonical URLs,
 * page titles, Open Graph tags, Twitter metadata, and Schema.org structured data.
 */

const envSiteUrl = (
  typeof import.meta !== 'undefined'
    ? (import.meta as unknown as { env?: { VITE_SITE_URL?: string } })?.env?.VITE_SITE_URL
    : undefined
);

export const SITE_URL = (envSiteUrl || 'https://algolearn-queues.vercel.app').replace(/\/$/, '');

export const SITE_CONFIG = {
  name: 'AlgoLearn Queues',
  title: 'AlgoLearn – Interactive Queue Data Structure Learning Platform',
  description:
    'Master the Queue data structure with interactive visualizations, step-by-step FIFO pointer lessons, time complexity analysis, real-world code implementations, and gamified challenges.',
  url: SITE_URL,
  ogImage: `${SITE_URL}/algolearn-logo.png`,
  logo: `${SITE_URL}/algolearn-logo.png`,
  author: 'AlgoLearn Educational Team',
  twitterHandle: '@algolearn',
  themeColor: '#2563EB',
  locale: 'en_US',
};

export interface PageMeta {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
}

export const ROUTE_METADATA: Record<string, PageMeta> = {
  HOME: {
    title: 'AlgoLearn – Interactive Queue Data Structure Learning Platform',
    description:
      'Learn Queues step-by-step with interactive visualizations, FIFO pointer traces, complexity derivations, and gamified problem-solving challenges.',
    canonicalPath: '/',
    ogType: 'website',
  },
  THEORY: {
    title: 'Queue Data Structure Guide & Comprehensive Theory | AlgoLearn',
    description:
      'Comprehensive 20-chapter curriculum covering Queue fundamentals, FIFO order, Enqueue and Dequeue operations, Circular Queues, Deque, Priority Queues, C/C++/Java/Python code, and Big-O complexity proofs.',
    canonicalPath: '/#learn',
    ogType: 'article',
  },
  VIDEO: {
    title: 'Queue Video Tutorials & Visual Demonstrations | AlgoLearn',
    description:
      'Watch curated video lessons exploring queue data structures, FIFO pointer mechanics, operations, and circular modulo wraparound.',
    canonicalPath: '/#visualize',
    ogType: 'article',
  },
  GAME: {
    title: 'Queue Interactive Quest & Challenges | AlgoLearn',
    description:
      'Test and sharpen your algorithmic intuition through 5 progressive Queue interactive game levels and earn curriculum mastery.',
    canonicalPath: '/#game',
    ogType: 'website',
  },
  QUEST: {
    title: 'Queue Quest Completion & Mastery Certificate | AlgoLearn',
    description:
      'Milestone achievement and completion certification for mastering queue operations, pointer management, and FIFO architectures.',
    canonicalPath: '/#game',
    ogType: 'website',
  },
  LAB: {
    title: 'Queue Interactive Lab & Simulation Workbench | AlgoLearn',
    description:
      'Build custom queues, adjust capacity limits, test overflow and underflow scenarios, and step through Enqueue and Dequeue operations in an interactive workbench.',
    canonicalPath: '/#lab',
    ogType: 'website',
  },
  QUIZ: {
    title: 'Queue Knowledge Quiz & Examination | AlgoLearn',
    description:
      'Evaluate your mastery with 12 comprehensive assessment questions covering FIFO principles, pointer transitions, circular wraparound, BFS, and time complexity.',
    canonicalPath: '/#quiz',
    ogType: 'website',
  },
  PROGRESS: {
    title: 'Learning Progress & Queue Mastery Ledger | AlgoLearn',
    description:
      'Track your journey through the 20 Queue theory modules, 2 video lessons, 5 quest levels, interactive lab experiments, and quiz milestones.',
    canonicalPath: '/#progress',
    ogType: 'website',
  },
  NOT_FOUND: {
    title: '404 Page Not Found | AlgoLearn Queues',
    description: 'The requested learning resource or section could not be found. Navigate back to the AlgoLearn Queue curriculum.',
    canonicalPath: '/#404',
    ogType: 'website',
  },
};

/**
 * Generates Schema.org JSON-LD structured data for the site and curriculum
 */
export function getStructuredData(tab: string = 'HOME') {
  const currentMeta = ROUTE_METADATA[tab] || ROUTE_METADATA.HOME;
  const canonicalUrl = `${SITE_URL}${currentMeta.canonicalPath}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        inLanguage: 'en-US',
      },
      {
        '@type': 'Course',
        '@id': `${SITE_URL}/#course`,
        name: 'Mastering the Queue Data Structure',
        description:
          'A comprehensive interactive course covering Queue FIFO mechanics, Enqueue/Dequeue operations, Circular Queues, Priority Queues, Deque, Big-O complexity analysis, and multi-language implementations.',
        provider: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
          url: SITE_URL,
          logo: SITE_CONFIG.logo,
        },
        educationalLevel: 'Beginner to Intermediate',
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Online',
          inLanguage: 'en-US',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: currentMeta.title.split('|')[0].trim(),
            item: canonicalUrl,
          },
        ],
      },
    ],
  };
}
