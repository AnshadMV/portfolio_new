import { Component, inject, signal, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService, Theme } from '../../services/theme.service';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  smoothScrollService = inject(SmoothScrollService);
  isMenuOpen = signal(false);
  activeSection = signal('hero');
  scrollProgress = signal(0);
  isScrolled = signal(false);
  private lastScrollTop = 0;
  private isBrowser: boolean;
  private scrollTimeout: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Clear existing timeout
    clearTimeout(this.scrollTimeout);

    // Update Active Section - improved detection
    const sections = ['hero', 'profile', 'projects', 'experience', 'education', 'contact'];
    let currentSection = this.activeSection();

    const threshold = typeof window !== 'undefined' ? window.innerHeight / 3 : 200;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // A section is active if it spans across our threshold (top third of the screen)
        if (rect.top <= threshold && rect.bottom > threshold) {
          currentSection = section;
        }
      }
    }

    this.activeSection.set(currentSection);

    // Update Scrolled State
    this.isScrolled.set(scrollTop > 50);

    // Always update lastScrollTop
    this.lastScrollTop = scrollTop;

    // Scroll Progress
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentValue = (scrollTop / docHeight) * 100;
    this.scrollProgress.set(scrollPercentValue);
  }

  navLinks = [
    { name: 'Home', path: '#hero', id: 'hero' },
    { name: 'Profile', path: '#profile', id: 'profile' },
    { name: 'Projects', path: '#projects', id: 'projects' },
    { name: 'Experience', path: '#experience', id: 'experience' },
    { name: 'Education', path: '#education', id: 'education' },
    { name: 'Contact', path: '#contact', id: 'contact' },
  ];

  allLinks = [
    { name: 'Home', path: '#hero', id: 'hero' },
    { name: 'Profile', path: '#profile', id: 'profile' },
    { name: 'Projects', path: '#projects', id: 'projects' },
    { name: 'Experience', path: '#experience', id: 'experience' },
    { name: 'Education', path: '#education', id: 'education' },
    { name: 'Contact', path: '#contact', id: 'contact' },
    { name: 'Resume', path: '/resume.pdf', id: 'resume' }
  ];

  resumeLink = { name: 'Resume', path: '/resume.pdf' };

  get links() {
    return this.allLinks;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
    if (this.isBrowser) {
      if (this.isMenuOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  navigateToSection(event: Event, path: string) {
    if (path.startsWith('#')) {
      event.preventDefault();
      const targetId = path.substring(1);

      // Special handling for hero section - scroll to top
      if (targetId === 'hero') {
        this.smoothScrollService.scrollTo(0, {
          duration: 1.5,
          lock: true, // prevent user interaction during scroll
        });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          this.smoothScrollService.scrollTo(element, {
            offset: -80,
            duration: 1.2,
          });
        }
      }
      this.closeMenu();
    }
  }
}
