import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapRevealDirective } from '../../directives/gsap-reveal.directive';

@Component({
    selector: 'app-education',
    standalone: true,
    imports: [CommonModule, GsapRevealDirective],
    templateUrl: './education.html',
    styleUrl: './education.css'
})
export class EducationComponent { }
