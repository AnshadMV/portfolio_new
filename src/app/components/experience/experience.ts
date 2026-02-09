
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
  imports: [CommonModule, GsapRevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class ExperienceComponent {
  jobs: Job[] = [
    {
      role: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2023 - Present',
      description: 'Led the migration of legacy monolith to microservices architecture. Improved system scalability by 40% and reduced deployment time by 60%. Mentored junior developers and established code quality standards.',
      tags: ['Angular', '.NET 8', 'Azure', 'Microservices']
    },
    {
      role: 'Software Engineer',
      company: 'Digital Solutions Ltd.',
      period: '2021 - 2023',
      description: 'Developed and maintained multiple client-facing web applications. Implemented real-time features using SignalR and optimized database queries for high-traffic endpoints.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Docker']
    },
    {
      role: 'Junior Developer',
      company: 'Creative Web Agency',
      period: '2019 - 2021',
      description: 'Collaborated with designers to implement pixel-perfect user interfaces. Assisted in backend API development and wrote unit tests for critical components.',
      tags: ['HTML/CSS', 'JavaScript', 'C#', 'SQL']
    }
  ];
}
