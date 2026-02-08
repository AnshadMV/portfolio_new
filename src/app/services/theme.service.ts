
import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private platformId = inject(PLATFORM_ID);

    // Default to dark theme as requested for "high-end developer portfolio"
    readonly currentTheme = signal<Theme>('dark');

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            // Check local storage or system preference
            const storedTheme = localStorage.getItem('theme') as Theme;
            if (storedTheme) {
                this.currentTheme.set(storedTheme);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                this.currentTheme.set('light');
            }

            // Apply theme whenever it changes
            effect(() => {
                const theme = this.currentTheme();
                localStorage.setItem('theme', theme);

                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            });
        }
    }

    toggleTheme() {
        this.currentTheme.update(theme => (theme === 'dark' ? 'light' : 'dark'));
    }

    setTheme(theme: Theme) {
        this.currentTheme.set(theme);
    }
}
