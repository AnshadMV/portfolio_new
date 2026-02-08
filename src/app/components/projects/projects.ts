
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo: string;
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured scalable e-commerce solution with microservices architecture, real-time inventory updates, and AI-powered recommendations.',
      tags: ['.NET Core', 'Angular', 'RabbitMQ', 'Redis'],
      link: '#',
      repo: '#',
      featured: true
    },
    {
      title: 'Finance Dashboard',
      description: 'Real-time financial data visualization tool for enterprise clients. Supports multi-currency transactions and complex reporting.',
      tags: ['React', 'D3.js', 'Node.js', 'GraphQL'],
      link: '#',
      repo: '#'
    },
    {
      title: 'Task Management System',
      description: 'Collaborative project management tool with Kanban boards, real-time cha, and team performance analytics.',
      tags: ['Angular', 'Firebase', 'Tailwind', 'RxJS'],
      link: '#',
      repo: '#'
    }
  ];
}
