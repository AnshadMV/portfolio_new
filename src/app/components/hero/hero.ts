
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {
  nameLines = ['Build.', 'Innovate.', 'Ship.'];
  subtitle = 'Full Stack Developer';
  techStack = '.NET Core // Angular // Cloud Native';
}
