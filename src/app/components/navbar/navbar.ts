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
  activeSection = signal('profile');
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

    // Update Active Section
    const sections = ['hero', 'profile', 'experience', 'projects', 'contact'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection.set(section);
          break;
        }
      }
    }

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
    { name: 'Experience', path: '#experience', id: 'experience' },
    { name: 'Projects', path: '#projects', id: 'projects' },
    { name: 'Contact', path: '#contact', id: 'contact' },
  ];

  allLinks = [
    { name: 'Home', path: '#hero', id: 'hero' },
    { name: 'Profile', path: '#profile', id: 'profile' },
    { name: 'Experience', path: '#experience', id: 'experience' },
    { name: 'Projects', path: '#projects', id: 'projects' },
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
      this.smoothScrollService.scrollTo(`#${targetId}`, {
        offset: -80,
        duration: 0.8, // Faster navigation
      });
      this.closeMenu();
    }
  }
}
