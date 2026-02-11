
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
  standalone: true,
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
      title: 'Dominus',
      description: 'Apple gadgets selling platform with secure REST APIs, JWT authentication, and NgRx state management. Optimized SQL performance with Dapper and stored procedures.',
      tags: ['.NET Core', 'Angular', 'NgRx', 'JWT', 'Dapper', 'SQL Server'],
      link: '#',
      repo: '#',
      featured: true
    }
  ];

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const container = this.projectsContainer.nativeElement;
      const getScrollWidth = () => container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: () => -getScrollWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: '#projects',
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + getScrollWidth(),
          invalidateOnRefresh: true,
        }
      });

      gsap.to('.projects-bg-text h2', {
        x: () => -getScrollWidth() * 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: '#projects',
          scrub: 1,
          start: 'top top',
          end: () => '+=' + getScrollWidth(),
          invalidateOnRefresh: true,
        }
      });

      return () => { };
    });
  }
}
