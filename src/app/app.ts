
import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { ProfileComponent } from './components/profile/profile';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectsComponent } from './components/projects/projects';
import { EducationComponent } from './components/education/education';
import { ContactComponent } from './components/contact/contact';

import { FooterComponent } from './components/footer/footer';
import { SmoothScrollService } from './services/smooth-scroll.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HeroComponent,
    ProfileComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private isBrowser: boolean;
  public showScrollToTop: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.showScrollToTop = window.scrollY > 300;
    }
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  constructor(
    private smoothScroll: SmoothScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero to Profile Transition
    const hero = document.querySelector('app-hero');
    const profile = document.querySelector('app-profile');

    if (hero && profile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'app-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinSpacing: true
        }
      });

      tl.to(hero, {
        scale: 0.8,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 1
      });

      // Ensure profile section is visible and moves up correctly
      gsap.from(profile, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: 'app-profile',
          start: 'top bottom',
          end: 'top center',
          scrub: true
        }
      });
    }

    // Projects Transition
    const projects = document.querySelector('app-projects');
    if (projects) {
      gsap.from(projects, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: 'app-projects',
          start: 'top bottom',
          end: 'top center',
          scrub: true
        }
      });
    }

    // Comprehensive refresh to ensure all Reveal directives trigger immediately if in viewport
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }
}

