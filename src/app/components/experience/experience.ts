
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapRevealDirective } from '../../directives/gsap-reveal.directive';

interface Job {
  role: string;
  company: string;
  companyShort: string;
  period: string;
  type: string;
  bullets: string[];
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
      company: 'Bridgeon Solutions, Calicut',
      companyShort: 'Bridgeon Solutions',
      period: 'Jul 2025 – Present',
      type: 'Internship',
      bullets: [
        'Engineered 30+ RESTful APIs using .NET Core and SQL technologies',
        'Improved database performance by 20–30% through optimized SQL queries and Dapper integration',
        'Designed and managed 10+ SQL Server tables and 12+ stored procedures with indexing',
        'Integrated 15+ Angular components to ensure reliable data flow',
        'Created 5+ reusable and responsive UI components using Angular & Tailwind CSS',
        'Resolved 30+ bugs and functional issues across front-end and back-end modules',
        'Contributed to 10+ bi-weekly Agile sprints, delivering features on schedule'
      ],
      tags: ['ASP.NET Core', 'Angular', 'SQL Server', 'Dapper', 'Tailwind CSS', 'Agile']
    }
  ];
}
