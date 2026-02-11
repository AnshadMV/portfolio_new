
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapRevealDirective } from '../../directives/gsap-reveal.directive';

interface Job {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, GsapRevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class ExperienceComponent {
  jobs: Job[] = [
    {
      role: 'Full Stack Developer Intern',
      company: 'Bridgeon Solutions LLP, Calicut',
      period: 'Jul 2025 – Present',
      description: 'Engineered 30+ RESTful API endpoints using ASP.NET Core. Designed and managed 10+ SQL Server tables and stored procedures. Improved database performance by 20–30% through optimized queries. Integrated backend APIs with 15+ Angular components for seamless data flow.',
      tags: ['ASP.NET Core', 'Angular', 'SQL Server', 'Dapper', 'Agile']
    }
  ];
}
