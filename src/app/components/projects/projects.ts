import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  link: string;
  repo: string;
  period: string;
  image?: string;
  featured?: boolean;
}

interface OtherProject {
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  modules: { name: string; points: string[] }[];
  techHighlights: string[];
  impact: string;
  tags: string[];
  link: string;
  repo: string;
  period: string;
  image?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
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
      title: 'TravelBro',
      subtitle: 'Travel ERP SaaS Platform',
      description: 'Scalable multi-tenant Travel ERP built with ASP.NET Core, Clean Architecture & DDD. Features microservices, PBAC, Redis, RabbitMQ and Docker.',
      highlights: [
        // 'Multi-tenant architecture with tenant-based data isolation',
        // '3 microservices with Clean Architecture & DDD',
        // 'Dapper + Stored Procedures for optimized data access',

      ],
      tags: ['ASP.NET Core', 'C#', 'SQL Server', 'Microservices', 'Docker', 'RabbitMQ', 'Redis', 'DDD'],
      link: 'https://github.com/AnshadMV/Travel_MS_SaaS_Backend.git',
      repo: 'https://github.com/AnshadMV/Travel_MS_SaaS_Backend.git',
      period: 'Jan 2026 – Present',
      image: 'assets/projects/travelbro.png',
      featured: true
    },
    {
      title: 'Dominus',
      subtitle: 'Apple Gadgets E-Commerce Platform',
      description: 'Full-stack e-commerce platform for Apple gadgets with secure JWT auth, NgRx state management, and optimized SQL Server schema.',
      highlights: [
        // 'Product browsing, cart management & secure order placement',
        // 'JWT authentication & role-based authorization',
        // 'Angular frontend with NgRx state management',
        // 'EF Core + SQL Server schema design'
      ],
      tags: ['.NET Core', 'Angular', 'NgRx', 'JWT', 'EF Core', 'SQL Server'],
      link: 'https://ang-dominus.runasp.net/',
      repo: 'https://github.com/AnshadMV/Mini_Proj_Dominus_Backend.git',
      period: 'Dec 2025 – Jan 2026',
      image: 'assets/projects/project1_product.png',
      featured: false
    }
  ];

  otherProjects: OtherProject[] = [
    {
      title: 'WafyMajlis',
      emoji: '📱',
      subtitle: 'Student Learning Management System',
      description: 'A full-featured LMS built with Flutter & Firebase to digitize attendance, academic performance tracking, grace marking, and institutional workflows for colleges.',
      modules: [
        {
          name: 'Attendance System',
          points: ['Attendance workflow management & daily entry', 'Timetable integration & analytics', 'Data export (multiple formats)', 'Medical certificate tracking']
        },
        {
          name: 'Know Yourself (Performance)',
          points: ['Grace & minus marking system', 'Criteria-based custom marking', 'Grace application workflow (apply, approve, reject)', 'Performance analysis dashboard']
        },
        {
          name: 'Leave & Additional Systems',
          points: ['Staff & student leave management with auto-integration', 'Role-based access (Staff / Student)', 'In-app notifications & complaint management', 'Centralized link hub & leadership hierarchy']
        }
      ],
      techHighlights: [
        'Firebase Authentication & Firestore real-time updates',
        'Role-based access control (Staff / Student)',
        'Scalable mobile-first UI architecture',
        'Clean modular Flutter structure'
      ],
      impact: 'Digitized academic workflow, reduced manual processes, improved transparency in attendance & grading.',
      tags: ['Flutter', 'Firebase', 'Firestore', 'Role-based Access', 'Real-time'],
      link: 'https://majliswafycollege.web.app/',
      repo: 'https://majliswafycollege.web.app/',
      period: 'Freelance',
      image: 'assets/projects/wafymajlis.png'
    },
    {
      title: 'Remedy.Dev',
      emoji: '💻',
      subtitle: 'Developer Documentation Tool',
      description: 'A browser-based documentation engine that instantly generates complete project documentation from any code folder — zero signup, zero backend, zero data upload.',
      modules: [
        {
          name: 'Auto-Generated Docs',
          points: ['Architecture breakdown & API endpoint discovery', 'Tech stack & dependency analysis', 'Setup guide & improvement suggestions', 'Ready-to-publish GitHub README']
        },
        {
          name: 'Technical Highlights',
          points: ['100% client-side — files never leave the machine', 'Parallel file reading with live progress tracking', 'Auto-detects frameworks, layers, routes & dependencies', 'Exports codebase as annotated AI-ready context']
        },
        {
          name: 'UX Features',
          points: ['Collapsible file tree + full-text search', 'Dark / Light theme support', 'Zero dependencies, zero build step']
        }
      ],
      techHighlights: [
        '100% client-side, zero backend — files never leave user machine',
        'Parallel file reading with live progress tracking',
        'Auto-detects frameworks, layers, routes & dependencies',
        'Zero dependencies, zero build step'
      ],
      impact: 'Turns any project folder into structured documentation instantly — improving developer productivity and onboarding.',
      tags: ['Vanilla JS', 'HTML', 'CSS', 'Client-side', 'Zero-backend'],
      link: 'https://remedydevs.vercel.app/',
      repo: 'https://github.com/AnshadMV/Remedy.dev.git',
      period: 'Personal',
      image: 'assets/projects/remedy.png'
    }
  ];

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const container = this.projectsContainer.nativeElement;
      const getScrollWidth = () => container.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#projects',
          pin: true,
          pinSpacing: true,
          scrub: 1.5, // Smoother scrub
          start: 'top top',
          end: () => '+=' + (getScrollWidth() + 2000), // Increased scroll distance
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onEnter: () => {
            gsap.set('#projects', { autoAlpha: 1 });
          }
        }
      });

      // 1) Add an empty tween to act as a buffer. 
      // This means for the first part of the pinned scroll distance, nothing happens,
      // which gives the user a chance to read the intro text before it moves.
      tl.to({}, { duration: 0.3 });

      // 2) Horizontal scroll
      tl.to(container, {
        x: () => -getScrollWidth(),
        ease: 'none',
        duration: 2 // Make the scrolling part take longer relative to the buffer
      });

      // Parallax background text moves along with it
      tl.to('.projects-bg-text', {
        x: () => -getScrollWidth() * 0.3,
        ease: 'none',
        duration: 2
      }, '<'); // Starts at the same time as the horizontal scroll

      // 3) Another buffer at the end before things fade out
      tl.to({}, { duration: 0.2 });

      // 4) Fade out
      tl.to([container, '.projects-bg-text'], {
        opacity: 0,
        duration: 0.2
      });

      return () => { };
    });

    // Stagger reveal for other-project cards
    gsap.from('.other-project-card', {
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#other-projects',
        start: 'top 80%',
        once: true
      }
    });
  }
}
