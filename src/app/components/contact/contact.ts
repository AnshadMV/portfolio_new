
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapRevealDirective } from '../../directives/gsap-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, GsapRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  email = 'hello@portfolio.dev';
  socials = [
    { name: 'GitHub', link: 'https://github.com' },
    { name: 'LinkedIn', link: 'https://linkedin.com' },
    { name: 'Twitter', link: 'https://twitter.com' }
  ];
}
