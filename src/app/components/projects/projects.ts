
import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GsapRevealDirective } from '../../directives/gsap-reveal.directive';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  imports: [CommonModule, GsapRevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('projectsContainer') projectsContainer!: ElementRef;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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
      title: 'Task Management System',
      description: 'Collaborative project management tool with Kanban boards, real-time chat, and team performance analytics.',
      tags: ['Angular', 'Firebase', 'Tailwind', 'RxJS'],
      link: '#',
      repo: '#'
    },
    {
      title: 'Finance Dashboard',
      description: 'Real-time financial data visualization tool for enterprise clients. Supports multi-currency transactions and complex reporting.',
      tags: ['React', 'D3.js', 'Node.js', 'GraphQL'],
      link: '#',
      repo: '#'
    },
    {
      title: 'AI Content Generator',
      description: 'Machine learning powered content creation platform with natural language processing and automated SEO optimization.',
      tags: ['Python', 'TensorFlow', 'FastAPI', 'Vue.js'],
      link: '#',
      repo: '#'
    },
    {
      title: 'Cloud Monitoring Tool',
      description: 'Infrastructure monitoring and alerting system for distributed applications across multiple cloud providers.',
      tags: ['Go', 'Prometheus', 'Grafana', 'Kubernetes'],
      link: '#',
      repo: '#'
    }
  ];

  ngAfterViewInit() {
    // Removed GSAP horizontal auto-scroll for simpler native scroll
    // Users can now manually scroll horizontally with mouse/touch
  }
}
