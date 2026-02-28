import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SkillGroup {
  category: string;
  skills: string[];
  theme: 'dark' | 'light';
  id: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements AfterViewInit, OnDestroy {
  @ViewChild('summaryContainer') summaryContainer!: ElementRef;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  name = 'Anshad Muhammed V';
  role = '.NET & Angular Full Stack Developer';
  location = 'Tirur, Malappuram, Kerala';
  email = 'anshadcontacts@gmail.com';
  phone = '+91 9400300166';
  github = 'https://github.com/AnshadMV';
  linkedin = 'https://www.linkedin.com/in/anshadvelladath';

  stats: Stat[] = [
    { value: '30+', label: 'RESTful APIs' },
    { value: '30%', label: 'DB Optimized' },
    { value: '15+', label: 'Angular Components' },
    { value: '10+', label: 'Agile Sprints' },
  ];

  skillGroups: SkillGroup[] = [
    {
      id: '01 — Programming',
      category: 'Core Languages',
      theme: 'dark',
      skills: ['C#', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3']
    },
    {
      id: '02 — Backend',
      category: 'API & Server',
      theme: 'dark',
      skills: ['ASP.NET Core', 'Web API', 'EF Core', 'ADO.NET', 'Dapper', 'RESTful APIs']
    },
    {
      id: '03 — Frontend',
      category: 'UI & UX',
      theme: 'dark',
      skills: ['Angular', 'NgRx', 'Tailwind CSS', 'Bootstrap']
    },
    {
      id: '04 — Database',
      category: 'Data Systems',
      theme: 'dark',
      skills: ['SQL Server', 'Stored Procedures', 'Indexing', 'Firebase']
    },
    {
      id: '05 — Cloud & DevOps',
      category: 'Cloud & Infra',
      theme: 'dark',
      skills: ['Azure', 'AWS', 'Docker', 'Kubernetes', 'CI/CD']
    },
    {
      id: '06 — Concepts',
      category: 'Architecture',
      theme: 'dark',
      skills: ['Clean Architecture', 'Microservices', 'DDD', 'PBAC', 'Agile/Scrum']
    }
  ];

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    gsap.registerPlugin(ScrollTrigger);

    // Summary Word Reveal Animation
    const summaryWords = this.summaryContainer.nativeElement.querySelectorAll('.word-reveal');

    gsap.set(summaryWords, {
      opacity: 0,
      y: 30,
      rotateX: -20,
      filter: 'blur(10px)'
    });

    const summaryTl = gsap.timeline({
      scrollTrigger: {
        trigger: this.summaryContainer.nativeElement,
        start: 'top 90%',
        toggleActions: 'play none none none',
        once: true
      }
    });

    summaryTl.to(summaryWords, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.04,
      ease: 'power3.out'
    });

    // Special Word Effects
    const squiggle = this.summaryContainer.nativeElement.querySelector('.squiggle');
    if (squiggle) {
      summaryTl.to(squiggle, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.4');
    }

    // Char swap on "scalable"
    const scalableWord = this.summaryContainer.nativeElement.querySelector('.scalable');
    const charSwaps = this.summaryContainer.nativeElement.querySelectorAll('.char-swap');
    if (scalableWord && charSwaps.length > 0) {
      scalableWord.addEventListener('mouseenter', () => {
        gsap.to(charSwaps, { y: -5, color: '#ffffff', stagger: 0.05, duration: 0.3 });
      });
      scalableWord.addEventListener('mouseleave', () => {
        gsap.to(charSwaps, { y: 0, color: 'var(--accent)', stagger: 0.05, duration: 0.3 });
      });
    }

    // Stats counter animation
    const statEls = document.querySelectorAll('.stat-number');
    statEls.forEach((el) => {
      gsap.from(el, {
        textContent: '0',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    // Skill rows stagger reveal
    const skillRows = document.querySelectorAll('.skill-row');
    gsap.from(skillRows, {
      opacity: 0,
      x: -30,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 80%',
        once: true
      }
    });
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }
}
