
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { ProfileComponent } from './components/profile/profile';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectsComponent } from './components/projects/projects';
import { ContactComponent } from './components/contact/contact';

import { FooterComponent } from './components/footer/footer';
import { SmoothScrollService } from './services/smooth-scroll.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeroComponent,
    ProfileComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private isBrowser: boolean;

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
          pinSpacing: false
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

    // Comprehensive refresh to ensure all Reveal directives trigger immediately if in viewport
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }
}

