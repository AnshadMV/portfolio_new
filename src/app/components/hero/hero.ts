
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapRevealDirective } from '../../directives/gsap-reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, GsapRevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {
  nameLines = ['Build.', 'Innovate.', 'Ship.'];
  subtitle = 'Full Stack Developer';
  techStack = '.NET Core // Angular // Cloud Native';
}
