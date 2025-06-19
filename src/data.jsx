import React from 'react';
import { Award, Briefcase, Users } from 'lucide-react';

export const expertise = {
  'skills.ux_design.title': [
    'skills.ux_design.items.0', 'skills.ux_design.items.1', 'skills.ux_design.items.2', 'skills.ux_design.items.3',
  ],
  'skills.dev.title': [
    'skills.dev.items.0', 'skills.dev.items.1', 'skills.dev.items.2', 'skills.dev.items.3',
  ],
  'skills.tech.title': [
    'skills.tech.items.0', 'skills.tech.items.1', 'skills.tech.items.2', 'skills.tech.items.3',
  ],
};

export const projects = [
  {
    id: 1,
    slug: 'enterprise-dashboard-system',
    tags: ['business-impact', 'visual-design'],
    titleKey: 'projects.p1.title',
    typeKey: 'projects.p1.type',
    categoryKey: 'projects.p1.category',
    descriptionKey: 'projects.p1.description',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
    technologies: ['React', 'D3.js', 'TypeScript', 'Node.js'],
    duration: '6 months',
    team: '8 members',
    contentBlocks: [
      { type: 'problem', contentKey: 'projects.p1.caseStudy.problem_desc' },
      { type: 'role', contentKey: 'projects.p1.caseStudy.role_desc' },
      { type: 'process', contentKey: 'projects.p1.caseStudy.process_steps' },
      { type: 'solution', contentKey: 'projects.p1.caseStudy.solution_desc' },
      { type: 'results', contentKey: 'projects.p1.caseStudy.results_desc', quoteKey: 'projects.p1.caseStudy.results_quote' },
      { type: 'gallery', titleKey: 'case_study.gallery', content: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80',
      ]},
    ]
  },
  {
    id: 2,
    slug: 'financial-services-platform',
    tags: ['tech-heavy', 'business-impact'],
    titleKey: 'projects.p2.title',
    typeKey: 'projects.p2.type',
    categoryKey: 'projects.p2.category',
    descriptionKey: 'projects.p2.description',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&crop=center',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Docker'],
    duration: '8 months',
    team: '12 members',
    contentBlocks: [
      { type: 'problem', contentKey: 'projects.p2.caseStudy.problem_desc' },
      { type: 'role', contentKey: 'projects.p2.caseStudy.role_desc' },
      { type: 'process', contentKey: 'projects.p2.caseStudy.process_steps' },
      { type: 'solution', contentKey: 'projects.p2.caseStudy.solution_desc' },
      { type: 'results', contentKey: 'projects.p2.caseStudy.results_desc', quoteKey: 'projects.p2.caseStudy.results_quote' },
    ]
  },
  {
    id: 3,
    slug: 'corporate-brand-identity',
    tags: ['visual-design', 'client-focused'],
    titleKey: 'projects.p3.title',
    typeKey: 'projects.p3.type',
    categoryKey: 'projects.p3.category',
    descriptionKey: 'projects.p3.description',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&crop=center',
    technologies: ['Adobe Illustrator', 'Figma', 'InDesign'],
    duration: '4 months',
    team: '6 members',
    contentBlocks: [
        { type: 'problem', contentKey: 'projects.p3.caseStudy.problem_desc' },
        { type: 'role', contentKey: 'projects.p3.caseStudy.role_desc' },
        { type: 'process', contentKey: 'projects.p3.caseStudy.process_steps' },
        { type: 'solution', contentKey: 'projects.p3.caseStudy.solution_desc' },
        { type: 'results', contentKey: 'projects.p3.caseStudy.results_desc', quoteKey: 'projects.p3.caseStudy.results_quote' },
        { type: 'figma', title: 'Interactive Prototype', url: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1Z0Z1Z0Z1Z0Z1Z0Z1Z%2FUntitled%3Fnode-id%3D1-2%26scaling%3Dmin-zoom%26page-id%3D0%253A1%26starting-point-node-id%3D1%253A2' }
    ]
  },
  {
    id: 4,
    slug: 'healthcare-management-system',
    tags: ['tech-heavy', 'system-integration'],
    titleKey: 'projects.p4.title',
    typeKey: 'projects.p4.type',
    categoryKey: 'projects.p4.category',
    descriptionKey: 'projects.p4.description',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    technologies: ['Angular', 'Spring Boot', 'MySQL', 'AWS'],
    duration: '10 months',
    team: '15 members',
    contentBlocks: [
        { type: 'problem', contentKey: 'projects.p4.caseStudy.problem_desc' },
        { type: 'role', contentKey: 'projects.p4.caseStudy.role_desc' },
        { type: 'process', contentKey: 'projects.p4.caseStudy.process_steps' },
        { type: 'solution', contentKey: 'projects.p4.caseStudy.solution_desc' },
        { type: 'results', contentKey: 'projects.p4.caseStudy.results_desc', quoteKey: 'projects.p4.caseStudy.results_quote' },
        { type: 'video', title: 'Project Demo Video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ]
  },
];

export const achievements = [
  { icon: <Award className="w-6 h-6" />, titleKey: 'achievements.recognition.title', descriptionKey: 'achievements.recognition.description' },
  { icon: <Briefcase className="w-6 h-6" />, titleKey: 'achievements.experience.title', descriptionKey: 'achievements.experience.description' },
  { icon: <Users className="w-6 h-6" />, titleKey: 'achievements.leadership.title', descriptionKey: 'achievements.leadership.description' },
];

export const articles = [
  { id: 1, slug: 'ux-design-trends-2025', titleKey: 'articles.a1.title', summaryKey: 'articles.a1.summary', contentKey: 'articles.a1.content', imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80', publishedDate: '2025-06-15' },
  { id: 2, slug: 'getting-started-with-react-hooks', titleKey: 'articles.a2.title', summaryKey: 'articles.a2.summary', contentKey: 'articles.a2.content', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', publishedDate: '2025-05-28' },
];
