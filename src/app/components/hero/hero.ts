import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapRevealDirective } from '../../directives/gsap-reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, GsapRevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit {
  dynamicWords = signal(['DEVELOPER', 'ENGINEER', 'CREATOR', 'ARCHITECT']);
  currentWordIndex = signal(0);

  ngOnInit() {
    setInterval(() => {
      this.currentWordIndex.update((i: number) => (i + 1) % this.dynamicWords().length);
    }, 3000);
  }

  subtitle = 'Full Stack Developer';
  techStack = '.NET Core // Angular // Cloud Native';
}
