
import { Directive, ElementRef, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
    selector: '[appGsapReveal]',
    standalone: true
})
export class GsapRevealDirective implements OnInit, OnDestroy {
    @Input() delay: number = 0;
    @Input() duration: number = 0.6;
    @Input() yOffset: number = 30;
    @Input() stagger: number = 0;

    private isBrowser: boolean;
    private animation: gsap.core.Tween | null = null;

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            if (this.stagger > 0) {
                // If expecting children to stagger, user should probably apply to parent
                // But for now, let's keep it simple: animate THIS element
            }

            this.initAnimation();
        }
    }

    private initAnimation() {
        gsap.registerPlugin(ScrollTrigger);

        this.animation = gsap.fromTo(
            this.el.nativeElement,
            {
                y: this.yOffset,
                opacity: 0,
                filter: 'blur(10px)'
            },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: this.duration,
                delay: this.delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: this.el.nativeElement,
                    start: 'top 95%', // Trigger as soon as it enters the bottom 5% of viewport
                    toggleActions: 'play none none none',
                    once: true // Ensure it stays visible once triggered
                }
            }
        );
    }

    ngOnDestroy() {
        if (this.animation) {
            this.animation.kill();
        }
    }
}
