
import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GsapRevealDirective } from '../../directives/gsap-reveal.directive';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SkillGroup {
  category: string;
  skills: string[];
  theme: 'dark' | 'light';
  id: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, GsapRevealDirective],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('textContainer') textContainer!: ElementRef;
  @ViewChild('summaryContainer') summaryContainer!: ElementRef;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  name = 'Full Stack Developer';
  role = '.NET & Angular';
  location = 'Tirur, Malappuram, Kerala';
  email = 'anshad.contact@gmail.com';
  phone = '+91 9400300166';

  summary = 'Full Stack Developer with strong experience in designing and developing scalable web applications using C#, ASP.NET Core, Entity Framework Core, Dapper, and MS SQL Server. Skilled in building RESTful APIs, integrating Angular frontends, and optimizing database performance. Focused on clean architecture, maintainable code, and delivering reliable features in Agile development environments.';

  skillGroups: SkillGroup[] = [
    {
      id: 'Programming',
      category: 'Core Languages',
      theme: 'dark',
      skills: ['C#', 'JavaScript', 'SQL', 'HTML5', 'CSS3']
    },
    {
      id: 'Backend',
      category: 'API & Server',
      theme: 'dark',
      skills: ['ASP.NET Core', 'EF Core', 'Dapper', 'RESTful APIs']
    },
    {
      id: 'Frontend',
      category: 'UI & UX',
      theme: 'dark',
      skills: ['Angular', 'Context API', 'Tailwind CSS', 'Bootstrap']
    },
    {
      id: 'Database',
      category: 'Data Systems',
      theme: 'dark',
      skills: ['MS SQL Server', 'Stored Procedures', 'Optimization']
    },
    {
      id: 'Infrastructure',
      category: 'Cloud & Tools',
      theme: 'dark',
      skills: ['Azure', 'Firebase', 'Git & GitHub', 'CI/CD']
    }
  ];

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Summary Word Reveal Animation
    const summaryWords = this.summaryContainer.nativeElement.querySelectorAll('.word-reveal');

    // Set initial state in JS instead of CSS
    gsap.set(summaryWords, {
      opacity: 0,
      y: 30,
      rotateX: -20,
      filter: 'blur(10px)'
    });

    const summaryTl = gsap.timeline({
      scrollTrigger: {
        trigger: this.summaryContainer.nativeElement,
        start: 'top 90%', // Trigger earlier
        toggleActions: 'play none none none',
        once: true // Ensure it stays visible
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

    // 2. Special Word Effects
    const squiggle = this.summaryContainer.nativeElement.querySelector('.squiggle');
    summaryTl.to(squiggle, {
      opacity: 1,
      attr: { 'stroke-dashoffset': 0 },
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.4');

    // Char Swap Logic for "Scalable"
    const charSwaps = this.summaryContainer.nativeElement.querySelectorAll('.char-swap');
    if (charSwaps.length > 0) {
      this.summaryContainer.nativeElement.querySelector('.scalable').addEventListener('mouseenter', () => {
        gsap.to(charSwaps, {
          y: -5,
          color: '#ffffff',
          stagger: 0.05,
          duration: 0.3
        });
      });
      this.summaryContainer.nativeElement.querySelector('.scalable').addEventListener('mouseleave', () => {
        gsap.to(charSwaps, {
          y: 0,
          color: 'var(--accent)',
          stagger: 0.05,
          duration: 0.3
        });
      });
    }

    // 3. Pinned Scroll-Text Section (Existing)
    const container = this.textContainer.nativeElement;
    const phrases = container.querySelectorAll('.scroll-phrase');

    if (phrases.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scroll-text-container',
          start: 'top top',
          end: '+=2500',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      gsap.set(phrases, { opacity: 0, y: 50 });

      phrases.forEach((phrase: any, index: number) => {
        tl.to(phrase, {
          opacity: 1, y: 0, duration: 2, ease: 'power2.out'
        }, index * 4);

        if (index < phrases.length - 1) {
          tl.to(phrase, {
            opacity: 0, y: -50, duration: 2, ease: 'power2.in'
          }, (index * 4) + 2.5);
        }
      });
    }
  }
}
