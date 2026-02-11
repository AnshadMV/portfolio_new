
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapRevealDirective } from '../../directives/gsap-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, GsapRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  email = 'anshad.contact@gmail.com';
  phone = '+91 9400300166';

  socials = [
    { name: 'GitHub', link: 'https://github.com/AnshadMV' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/anshadmv' },
    { name: 'Portfolio', link: '#' }
  ];
}
