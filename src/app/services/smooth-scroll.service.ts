
import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
    providedIn: 'root'
})
export class SmoothScrollService {
    private lenis: Lenis | null = null;
    private isBrowser: boolean;

    constructor(
        private ngZone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            gsap.registerPlugin(ScrollTrigger);
            this.initLenis();
        }
    }

    private initLenis() {
        this.ngZone.runOutsideAngular(() => {
            this.lenis = new Lenis({
                autoRaf: true,
                lerp: 0.1, // Smoothness (0-1)
                wheelMultiplier: 1.2, // Scroll speed
            });

            // Synchronize Lenis with GSAP ScrollTrigger
            this.lenis.on('scroll', ScrollTrigger.update);

            // Add Lenis's requestAnimationFrame to GSAP's ticker for better sync
            gsap.ticker.add((time) => {
                this.lenis?.raf(time * 1000); // 
            });

            gsap.ticker.lagSmoothing(0);
        });
    }

    public getLenisInstance(): Lenis | null {
        return this.lenis;
    }

    public scrollTo(target: string | HTMLElement, options?: any) {
        this.lenis?.scrollTo(target, options);
    }
}
