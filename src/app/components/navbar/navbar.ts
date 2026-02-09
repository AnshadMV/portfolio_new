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
  isNavVisible = signal(true);
  scrollProgress = signal(0);
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

    // Always show navbar at the very top
    if (scrollTop < 10) {
      this.isNavVisible.set(true);
      this.lastScrollTop = scrollTop;

      // Update scroll progress
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      this.scrollProgress.set(scrollPercent);
      return;
    }

    // Hide when scrolling down, show when scrolling up
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      // Scrolling down - hide navbar
      this.isNavVisible.set(false);
    } else if (scrollTop < this.lastScrollTop) {
      // Scrolling up - show navbar
      this.isNavVisible.set(true);
    }

    // Show navbar when scrolling stops (after 150ms of no scroll)
    this.scrollTimeout = setTimeout(() => {
      this.isNavVisible.set(true);
    }, 150);

    this.lastScrollTop = scrollTop;

    // Scroll Progress logic
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    this.scrollProgress.set(scrollPercent);
  }

  links = [
    { name: 'Profile', path: '#profile' },
    { name: 'Experience', path: '#experience' },
    { name: 'Projects', path: '#projects' },
    { name: 'Resume', path: '/resume.pdf' },
    { name: 'Contact', path: '#contact' }
  ];

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
