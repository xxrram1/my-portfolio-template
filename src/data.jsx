import React from 'react';
import { Award, Briefcase, Users } from 'lucide-react';

export const expertise = {
  'skills.ux_design.title': [
    'skills.ux_design.items.0',
    'skills.ux_design.items.1',
    'skills.ux_design.items.2',
    'skills.ux_design.items.3',
  ],
  'skills.dev.title': [
    'skills.dev.items.0',
    'skills.dev.items.1',
    'skills.dev.items.2',
    'skills.dev.items.3',
  ],
  'skills.tech.title': [
    'skills.tech.items.0',
    'skills.tech.items.1',
    'skills.tech.items.2',
    'skills.tech.items.3',
  ],
};

export const projects = [
  {
    id: 1,
    titleKey: 'projects.p1.title',
    typeKey: 'projects.p1.type',
    categoryKey: 'projects.p1.category',
    descriptionKey: 'projects.p1.description',
    detailsKey: 'projects.p1.details',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
    technologies: ['React', 'D3.js', 'TypeScript', 'REST API'],
    duration: '6 months',
    team: '8 members',
    link: '#',
  },
  {
    id: 2,
    titleKey: 'projects.p2.title',
    typeKey: 'projects.p2.type',
    categoryKey: 'projects.p2.category',
    descriptionKey: 'projects.p2.description',
    detailsKey: 'projects.p2.details',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&crop=center',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Docker'],
    duration: '8 months',
    team: '12 members',
    link: '#',
  },
  {
    id: 3,
    titleKey: 'projects.p3.title',
    typeKey: 'projects.p3.type',
    categoryKey: 'projects.p3.category',
    descriptionKey: 'projects.p3.description',
    detailsKey: 'projects.p3.details',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&crop=center',
    technologies: ['Adobe Illustrator', 'InDesign', 'After Effects', 'Figma'],
    duration: '4 months',
    team: '6 members',
    link: '#',
  },
  {
    id: 4,
    titleKey: 'projects.p4.title',
    typeKey: 'projects.p4.type',
    categoryKey: 'projects.p4.category',
    descriptionKey: 'projects.p4.description',
    detailsKey: 'projects.p4.details',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center',
    technologies: ['Angular', 'Spring Boot', 'MySQL', 'AWS'],
    duration: '10 months',
    team: '15 members',
    link: '#',
  },
];

export const achievements = [
  {
    icon: <Award className="w-6 h-6" />,
    titleKey: 'achievements.recognition.title',
    descriptionKey: 'achievements.recognition.description',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    titleKey: 'achievements.experience.title',
    descriptionKey: 'achievements.experience.description',
  },
  {
    icon: <Users className="w-6 h-6" />,
    titleKey: 'achievements.leadership.title',
    descriptionKey: 'achievements.leadership.description',
  },
];